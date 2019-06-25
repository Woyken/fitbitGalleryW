import { ConfigurationActionTypes, FETCH_CONFIGURATION_DATA } from './types';
import { FitbitConfigurationResponseRoot } from '../../types/fitbitGalleryTypes';
import { AppState } from '..';
import { ThunkAction } from 'redux-thunk';

export async function fetchConfigurationData(): Promise<
    ConfigurationActionTypes
> {
    console.log('before actual fetch');
    const config = await getAuthTokenAndEndpoint();
    console.log('after actual fetch');
    return {
        type: FETCH_CONFIGURATION_DATA,
        payload: config.apiConfig,
    };
}

async function getAuthTokenAndEndpoint() {
    // One way to do this. Blocked by cors.

    // const fullHtml = await fetch('https://gallery.fitbit.com/').then((res) =>
    //     res.text(),
    // );

    // const apiconfigeq = fullHtml.slice(
    //     fullHtml.search('_API_CONFIG__ ='),
    //     fullHtml.search('window.__SENTRY_CONFIG__ '),
    // );

    // const resultObj = JSON.parse(apiconfigeq.slice(
    //     apiconfigeq.search('{'),
    //     apiconfigeq.lastIndexOf('}') + 1,
    // )) as FitbitConfigurationResponseRoot;

    // Another way to do this. blocked by cors.

    // const result = await fetch('https://gallery.fitbit.com/_internal/config', {
    //     method: 'GET',
    // });
    // const resultObj = (await result.json()) as FitbitConfigurationResponseRoot;
    // return resultObj;

    // For now hardcoded.
    const authData: FitbitConfigurationResponseRoot = {
        apiConfig: {
            authToken: {
                accessToken:
                    // tslint:disable-next-line: max-line-length
                    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkRGTFAiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJjbGllbnRfYWNjZXNzX3Rva2VuIiwic2NvcGVzIjoiIiwiZXhwIjoxNTYxNTI2NzI2LCJpYXQiOjE1NjE0NDAzMjZ9.oLVfbSBogWW5COC4-J0Ex1uYk7Vd_kEZnH6UPWWW5cY',
                expiresAt: 1561361126,
            },
            galleryApiUrl: 'https://api.fitbit.com/1/desktop-gallery/graphql',
        },
    };
    return authData;
}
