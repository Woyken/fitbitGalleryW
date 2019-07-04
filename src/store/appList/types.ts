export interface AppHead {
    name: string;
    type: string;
    developerName: string;
    previewImage: string;
    icon: string;
    id: string;
    isPaid: boolean;
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
}

export const FETCH_WATCHFACEHEADLIST_NEXT_PAGE = 'FETCH_WATCHFACEHEADLIST_NEXT_PAGE';
export const FETCH_APPHEADLIST_NEXT_PAGE = 'FETCH_APPHEADLIST_NEXT_PAGE';

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

export type AppListActionTypes = FetchAppHeadsListNextPage | FetchWatchFaceHeadsListNextPage;
