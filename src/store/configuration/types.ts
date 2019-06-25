import { FitbitConfigurationResponseApiConfig } from "../../types/fitbitGalleryTypes";

export interface AuthenticationToken {
    accessToken: string;
    expiresAt: number;
}

export interface ConfigurationState {
    galleryApiUrl: string;
    authToken: AuthenticationToken;
}

export const FETCH_CONFIGURATION_DATA = 'FETCH_CONFIGURATION_DATA';

interface FetchConfigurationData {
    type: typeof FETCH_CONFIGURATION_DATA;
    payload: FitbitConfigurationResponseApiConfig;
}

export type ConfigurationActionTypes = FetchConfigurationData;
