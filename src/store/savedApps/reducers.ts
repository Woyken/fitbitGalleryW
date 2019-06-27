import {
    SavedAppsState,
    SavedAppActionTypes,
    SAVE_APP,
    REMOVE_SAVED_APP,
    LOAD_SAVED_APPS,
    SAVE_SAVED_APPS,
} from './types';

const initialState: SavedAppsState = {
    savedApps: [],
};

export function savedAppsReducer(
    state = initialState,
    action: SavedAppActionTypes,
): SavedAppsState {
    switch (action.type) {
        case SAVE_APP:
            return {
                ...state,
                savedApps: [...state.savedApps, action.payload.savedApp],
            };

        case REMOVE_SAVED_APP:
            return {
                ...state,
                savedApps: [
                    ...state.savedApps.filter((app) => {
                        return app.id !== action.payload.savedApp.id;
                    }),
                ],
            };

        case LOAD_SAVED_APPS:
            return {
                ...state,
                savedApps: [...action.payload.savedApps],
            };

        case SAVE_SAVED_APPS:
            // Don't update store here.
            return state;

        default:
            return state;
    }
}
