import {
    ConfigurationState,
    ConfigurationActionTypes,
    FETCH_CONFIGURATION_DATA,
} from './types';

const initialState: ConfigurationState = {
    authToken: {
        accessToken: '',
        expiresAt: 0,
    },
    galleryApiUrl: '',
};

export function configurationReducer(
    state = initialState,
    action: ConfigurationActionTypes,
): ConfigurationState {
    switch (action.type) {
        case FETCH_CONFIGURATION_DATA:
            // Just replace the whole state object with new data.
            return action.payload;
        default:
            return state;
    }
}
