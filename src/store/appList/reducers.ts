import {
    AppListState,
    AppListActionTypes,
    FETCH_APPLIST_NEXT_PAGE,
} from './types';

const initialState: AppListState = {
    apps: [],
    doesMoreItemsExist: true,
    isNextRequestOngoing: false,
    nextPageId: '',
};

export function appListReducer(
    state = initialState,
    action: AppListActionTypes,
): AppListState {
    switch (action.type) {
        case FETCH_APPLIST_NEXT_PAGE:
            return {
                apps: [...state.apps, ...action.payload.apps],
                doesMoreItemsExist: action.payload.doesMoreItemsExist,
                isNextRequestOngoing: action.payload.isNextRequestOngoing,
                nextPageId: action.payload.nextPageId,
            };

        default:
            return state;
    }
}
