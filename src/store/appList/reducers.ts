import {
    AppListActionTypes,
    AppHeadsListState,
    FETCH_APPHEADLIST_NEXT_PAGE,
    FETCH_WATCHFACEHEADLIST_NEXT_PAGE,
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
};

export function appListReducer(
    state = initialState,
    action: AppListActionTypes,
): AppHeadsListState {
    switch (action.type) {
        case FETCH_APPHEADLIST_NEXT_PAGE:
            return {
                appsList: {
                    apps: [...state.appsList.apps, ...action.payload.apps],
                    doesMoreItemsExist: action.payload.doesMoreItemsExist,
                    nextPageId: action.payload.nextPageId,
                    isNextRequestOngoing: action.payload.isNextRequestOngoing,
                },
                watchFacesList: state.watchFacesList,
            };

        case FETCH_WATCHFACEHEADLIST_NEXT_PAGE:
            return {
                watchFacesList: {
                    apps: [
                        ...state.watchFacesList.apps,
                        ...action.payload.watchFaces,
                    ],
                    doesMoreItemsExist: action.payload.doesMoreItemsExist,
                    nextPageId: action.payload.nextPageId,
                    isNextRequestOngoing: action.payload.isNextRequestOngoing,
                },
                appsList: state.appsList,
            };

        default:
            return state;
    }
}
