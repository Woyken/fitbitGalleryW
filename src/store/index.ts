// import { systemReducer } from './system/reducers';
import { appListReducer } from './appList/reducers';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { configurationReducer } from './configuration/reducers';
import { savedAppsReducer } from './savedApps/reducers';

const rootReducer = combineReducers({
    appList: appListReducer,
    config: configurationReducer,
    savedApps: savedAppsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const initialState = {};

const middleware = [reduxThunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__
            ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
            : (f: any) => f,
    ),
);

export default store;
