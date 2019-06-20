import {
    AppListState,
    AppListActionTypes,
    FETCH_APPLIST,
} from './types';

const initialState: AppListState = {
    apps: [],
};

export function appListReducer(
    state = initialState,
    action: AppListActionTypes,
): AppListState {
    switch (action.type) {
        case FETCH_APPLIST:
            return {
                apps: [/*...state.apps, */...action.payload],
            };

        default:
            return state;
    }
}
