import {
    AppListActionTypes,
    FETCH_APPLIST,
    App,
} from './types';

export function fetchAppList(apps: App[]): AppListActionTypes {
    return {
        type: FETCH_APPLIST,
        payload: apps,
    };
}
