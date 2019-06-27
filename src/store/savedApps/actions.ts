import {
    SavedAppActionTypes,
    SavedApp,
    SAVE_APP,
    REMOVE_SAVED_APP,
    LOAD_SAVED_APPS,
    SavedAppsState,
    SAVE_SAVED_APPS,
} from './types';

const localStorageKeySerializedSavedApps: string = 'serializedSavedApps';

// TODO convert this action to thunk and call save inside
export function saveApp(appToSave: SavedApp): SavedAppActionTypes {
    return {
        type: SAVE_APP,
        payload: { savedApp: appToSave },
    };
}

// TODO convert this action to thunk and call save inside
export function removeSavedApp(appToRemove: SavedApp): SavedAppActionTypes {
    return {
        type: REMOVE_SAVED_APP,
        payload: { savedApp: appToRemove },
    };
}

export function loadSavedApps(): SavedAppActionTypes {
    const serializedData = localStorage.getItem(
        localStorageKeySerializedSavedApps,
    );

    if (!serializedData) {
        return {
            type: LOAD_SAVED_APPS,
            payload: {
                savedApps: [],
            },
        };
    }

    const data = JSON.parse(serializedData) as SavedApp[];
    return {
        type: LOAD_SAVED_APPS,
        payload: {
            savedApps: data,
        },
    };
}

export function saveSavedApps(
    savedAppsState: SavedAppsState,
): SavedAppActionTypes {
    localStorage.setItem(
        localStorageKeySerializedSavedApps,
        JSON.stringify(savedAppsState.savedApps),
    );
    return {
        type: SAVE_SAVED_APPS,
    };
}
