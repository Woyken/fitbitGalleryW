import {
    AppListActionTypes,
    AppHeadsListState,
    FETCH_APPHEADLIST_NEXT_PAGE,
    FETCH_WATCHFACEHEADLIST_NEXT_PAGE,
    AppHead,
    SEARCH_APPS_AND_WATCHFACES,
} from './types';

const initialState: AppHeadsListState = {
    appsList: {
        apps: [],
        doesMoreItemsExist: true,
        nextPageId: '',
        isNextRequestOngoing: false,
    },
    watchFacesList: {
        apps: [],
        doesMoreItemsExist: true,
        nextPageId: '',
        isNextRequestOngoing: false,
    },
    lastSearchResult: {
        apps: [],
        doesMoreItemsExist: false,
        isNextRequestOngoing: false,
        nextPageId: '',
    },
};

export function appListReducer(
    state = initialState,
    action: AppListActionTypes,
): AppHeadsListState {
    switch (action.type) {
        case FETCH_APPHEADLIST_NEXT_PAGE: {
            const fullAppsList = [
                ...state.appsList.apps,
                ...action.payload.apps,
            ];
            const filteredAppsList: AppHead[] = [];
            const tempMap = new Map<string, boolean>();
            for (const item of fullAppsList) {
                if (!tempMap.has(item.id)) {
                    tempMap.set(item.id, true);
                    filteredAppsList.push(item);
                }
            }
            return {
                appsList: {
                    apps: filteredAppsList,
                    doesMoreItemsExist: action.payload.doesMoreItemsExist,
                    nextPageId: action.payload.nextPageId,
                    isNextRequestOngoing: action.payload.isNextRequestOngoing,
                },
                watchFacesList: state.watchFacesList,
                lastSearchResult: state.lastSearchResult,
            };
        }

        case FETCH_WATCHFACEHEADLIST_NEXT_PAGE: {
            const fullAppsList = [
                ...state.watchFacesList.apps,
                ...action.payload.watchFaces,
            ];
            const filteredAppsList: AppHead[] = [];
            const tempMap = new Map<string, boolean>();
            for (const item of fullAppsList) {
                if (!tempMap.has(item.id)) {
                    tempMap.set(item.id, true);
                    filteredAppsList.push(item);
                }
            }
            return {
                watchFacesList: {
                    apps: filteredAppsList,
                    doesMoreItemsExist: action.payload.doesMoreItemsExist,
                    nextPageId: action.payload.nextPageId,
                    isNextRequestOngoing: action.payload.isNextRequestOngoing,
                },
                appsList: state.appsList,
                lastSearchResult: state.lastSearchResult,
            };
        }

        case SEARCH_APPS_AND_WATCHFACES: {
            return {
                appsList: state.appsList,
                watchFacesList: state.watchFacesList,
                lastSearchResult: {
                    apps: [...action.payload.watchFaces],
                    doesMoreItemsExist: false,
                    nextPageId: '',
                    isNextRequestOngoing: action.payload.isNextRequestOngoing,
                },
            };
        }

        default:
            return state;
    }
}
