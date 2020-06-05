import { ConfigurationActionTypes, FETCH_CONFIGURATION_DATA } from './types';
import { FitbitConfigurationResponseRoot } from '../../types/fitbitGalleryTypes';
import { getAuthToken } from '../../actions/authentication';

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
    return getAuthToken();
}
