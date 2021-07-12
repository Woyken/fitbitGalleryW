import pRetry from "p-retry";

export interface FitbitAuthResponse {
    apiConfig: APIConfig;
}

export interface APIConfig {
    galleryApiUrl: string;
    authToken:     AuthToken;
}

export interface AuthToken {
    accessToken: string;
    expiresAt:   number;
}

/**
 * Be careful to not make too many requests to this endpoint.
 * using public cors everywhere website for now. https://cors-anywhere.herokuapp.com/
 * @param url url to send request with cors ignored
 */
async function getRequestWrappedCorsEverywhere<T>(url: string): Promise<T> {
    const res = await pRetry(() => fetch(`https://cors-anywhere.herokuapp.com/${url}`));
    // Let's hope T type was passed correctly
    return await res.json() as T;
}


function isResponseValid(auth: FitbitAuthResponse): boolean {
    if (
        typeof auth?.apiConfig?.authToken?.accessToken !== 'string' ||
        typeof auth?.apiConfig?.authToken?.expiresAt !== 'number' ||
        typeof auth?.apiConfig.galleryApiUrl !== 'string' ||
        // Expired?
        auth.apiConfig.authToken.expiresAt < Date.now() / 1000
    ) {
        return false;
    }
    return true;
}

const localStorageAuthCacheName = 'AuthCacheName';

/**
 * Level 1 cache
 */
function getAuthTokenFromLocalCache(): FitbitAuthResponse | undefined {
    const str = localStorage.getItem(localStorageAuthCacheName);
    if (!str)
        return;
    const auth = JSON.parse(str) as FitbitAuthResponse;
    if (!isResponseValid(auth)) {
        return;
    }
    return auth;
}

function updateAuthTokenToLocalCache(auth: FitbitAuthResponse): void {
    localStorage.setItem(localStorageAuthCacheName, JSON.stringify(auth));
}

/**
 * Level 2 cache
 */
async function getAuthTokenFromJsonStorage(): Promise<FitbitAuthResponse | undefined> {
    // Since this is such small app without backend, this will be good enough as a cache.
    // Otherwise would have to host something proper.
    try {
        const response = await (await fetch('https://api.npoint.io/a0a34f7a0a2a6e6f5272')).json() as FitbitAuthResponse;
        // Some validation, just in case.
        if (!isResponseValid(response)) {
            // Invalid saved json. Ignore it.
            return;
        }

        return response;
    } catch (error) {
        // If for some reason it fails, ignore it.
    }
}

async function updateAuthTokenToJsonStorage(auth: FitbitAuthResponse): Promise<void> {
    // Without backend there's no real way to ensure this session is the only one writing to storage at a time.
    // It will be good enough for now.
    await fetch('https://api.npoint.io/a0a34f7a0a2a6e6f5272', {
        method: 'POST',
        body: JSON.stringify(auth),
    });
}

/**
 * Source of truth
 */
async function getAuthTokenFromFitbit(): Promise<FitbitAuthResponse> {
    // Since fitbit doesn't allow requests to it's _internal endpoint from other pages and we don't have backend here.
    // Workaround using corsEverywhere, This request is considered pricy and should be used as rarely as possible.
    return await getRequestWrappedCorsEverywhere<FitbitAuthResponse>('https://gallery.fitbit.com/_internal/config');
}

export async function getAuthToken(): Promise<FitbitAuthResponse> {
    // Check JsonStorage endpoint for valid json
    // If failed, fetch new from Fitbit
    // Update json storage with new token
    const localCache = getAuthTokenFromLocalCache();
    if (localCache) {
        return localCache;
    }

    const jsonResponse = await getAuthTokenFromJsonStorage();
    if (jsonResponse) {
        // This cache could be update by others.
        updateAuthTokenToLocalCache(jsonResponse);
        return jsonResponse;
    }

    // Let's hope this doesn't fail
    const fitbitResponse = await getAuthTokenFromFitbit();

    // Fitbit is our source of truth, update both caches.
    updateAuthTokenToLocalCache(fitbitResponse);
    // Fire and forget
    updateAuthTokenToJsonStorage(fitbitResponse)
        .catch((err: any) => console.error('When updating JSON storage error occurred', err));


    return fitbitResponse;
}
