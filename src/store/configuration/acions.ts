import { ConfigurationActionTypes, FETCH_CONFIGURATION_DATA } from './types';
import { FitbitConfigurationResponseRoot } from '../../types/fitbitGalleryTypes';
import configJson from '../../generatedConfig/configuration.json';

export async function fetchConfigurationData(): Promise<
    ConfigurationActionTypes
> {
    const config = await getAuthTokenAndEndpoint();
    return {
        type: FETCH_CONFIGURATION_DATA,
        payload: config.apiConfig,
    };
}


async function getAuthTokenAndEndpoint(): Promise<FitbitConfigurationResponseRoot> {
    return configJson as FitbitConfigurationResponseRoot;

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
    // const authData: FitbitConfigurationResponseRoot = {
    //     apiConfig: {
    //         authToken: {
    //             accessToken:
    //                 // tslint:disable-next-line: max-line-length
    //                 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkRGTFAiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJjbGllbnRfYWNjZXNzX3Rva2VuIiwic2NvcGVzIjoiIiwiZXhwIjoxNTYxNjA5NTk5LCJpYXQiOjE1NjE1MjMxOTl9.F9YKiETsCBunnbM0Y04L-T9Jyb4ypBj73i90ZggtPoQ',
    //             expiresAt: 1561361126,
    //         },
    //         galleryApiUrl: 'https://api.fitbit.com/1/desktop-gallery/graphql',
    //     },
    // };
    // return authData;
}
