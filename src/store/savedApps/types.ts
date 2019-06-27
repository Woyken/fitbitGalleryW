export interface SavedApp {
    id: string;
}

export interface SavedAppsState {
    savedApps: SavedApp[];
}

export const SAVE_APP = 'SAVE_APP';
export const REMOVE_SAVED_APP = 'REMOVE_SAVED_APP';
export const LOAD_SAVED_APPS = 'LOAD_SAVED_APPS';
export const SAVE_SAVED_APPS = 'SAVE_SAVED_APPS';

interface SaveApp {
    type: typeof SAVE_APP;
    payload: {
        savedApp: SavedApp;
    };
}

interface RemoveSavedApp {
    type: typeof REMOVE_SAVED_APP;
    payload: {
        savedApp: SavedApp;
    };
}

interface LoadSavedApps {
    type: typeof LOAD_SAVED_APPS;
    payload: {
        savedApps: SavedApp[];
    };
}

interface SaveSavedApps {
    type: typeof SAVE_SAVED_APPS;
}

export type SavedAppActionTypes = SaveApp | RemoveSavedApp | LoadSavedApps | SaveSavedApps;
