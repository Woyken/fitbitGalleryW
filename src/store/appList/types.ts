export interface AppHead {
    name: string;
    type: string;
    developerName: string;
    previewImage: string;
    icon: string;
    id: string;
    isPaid: boolean;
    deviceTypes: string[];
}

export interface AppHeadsList {
    apps: AppHead[];
    doesMoreItemsExist: boolean;
    nextPageId: string;
    isNextRequestOngoing: boolean;
}

export interface AppHeadsListState {
    appsList: AppHeadsList;
    watchFacesList: AppHeadsList;
    lastSearchResult: AppHeadsList;
}

export const FETCH_WATCHFACEHEADLIST_NEXT_PAGE =
    'FETCH_WATCHFACEHEADLIST_NEXT_PAGE';
export const FETCH_APPHEADLIST_NEXT_PAGE = 'FETCH_APPHEADLIST_NEXT_PAGE';
export const SEARCH_APPS_AND_WATCHFACES = 'SEARCH_APPS_AND_WATCHFACES';

interface FetchAppHeadsListNextPage {
    type: typeof FETCH_APPHEADLIST_NEXT_PAGE;
    payload: {
        apps: AppHead[];
        isNextRequestOngoing: boolean;
        doesMoreItemsExist: boolean;
        nextPageId: string;
    };
}

interface FetchWatchFaceHeadsListNextPage {
    type: typeof FETCH_WATCHFACEHEADLIST_NEXT_PAGE;
    payload: {
        watchFaces: AppHead[];
        isNextRequestOngoing: boolean;
        doesMoreItemsExist: boolean;
        nextPageId: string;
    };
}

interface SearchAppsAndWatchfaces {
    type: typeof SEARCH_APPS_AND_WATCHFACES;
    payload: {
        watchFaces: AppHead[];
        isNextRequestOngoing: boolean;
    };
}

export type AppListActionTypes =
    | FetchAppHeadsListNextPage
    | FetchWatchFaceHeadsListNextPage
    | SearchAppsAndWatchfaces;
