import {
    AppListActionTypes,
    AppHead,
    FETCH_APPHEADLIST_NEXT_PAGE,
    FETCH_WATCHFACEHEADLIST_NEXT_PAGE,
} from './types';
import { AppState } from '..';
import { ThunkAction } from 'redux-thunk';
import { fetchConfigurationData } from '../configuration/acions';
import gql from 'graphql-tag';
import { FitbitGalleryListResponseRoot } from '../../types/fitbitGalleryTypes';
import { ConfigurationActionTypes } from '../configuration/types';
import { AppDetails } from '../../actions/getAppDetails';

export enum CategoryType {
    allWatchFaces = 'c3c6d097-a255-4613-b817-d5d693f13318',
    allApps = 'a406cc65-ebae-4e47-b1bd-7f86800bb2c6',
}

export function fetchNextPageAppList(): ThunkAction<
    void,
    AppState,
    null,
    AppListActionTypes | ConfigurationActionTypes
> {
    return async (dispatch, getState) => {
        dispatch({
            type: FETCH_APPHEADLIST_NEXT_PAGE,
            payload: {
                isNextRequestOngoing: true,
                doesMoreItemsExist: getState().appList.appsList
                    .doesMoreItemsExist,
                nextPageId: getState().appList.appsList.nextPageId,
                apps: [],
            },
        });
        if (!getState().config.galleryApiUrl) {
            dispatch(await fetchConfigurationData());
        }

        const asyncResp = await fetchAppsList(
            CategoryType.allApps,
            getState().config.authToken.accessToken,
            getState().config.galleryApiUrl,
            getState().appList.appsList.nextPageId,
        );
        const appsList = asyncResp.data.collection.pagedApps.apps.map((a) => {
            const app: AppHead = {
                name: a.name,
                type: a.type,
                developerName: a.developer.name,
                previewImage: a.previewImage.uri,
                icon: a.icon.uri,
                id: a.id,
                isPaid: a.isPaid,
            };
            return app;
        });

        dispatch({
            type: FETCH_APPHEADLIST_NEXT_PAGE,
            payload: {
                apps: appsList,
                nextPageId: asyncResp.data.collection.pagedApps.nextPages[0],
                doesMoreItemsExist: true,
                isNextRequestOngoing: false,
            },
        });
    };
}

export function fetchAppHead(
    appId: string,
    type: 'APP' | 'WATCHFACE',
): ThunkAction<
    void,
    AppState,
    null,
    AppListActionTypes | ConfigurationActionTypes
> {
    return async (dispatch, getState) => {
        if (type === 'APP') {
            dispatch({
                type: FETCH_APPHEADLIST_NEXT_PAGE,
                payload: {
                    isNextRequestOngoing: true,
                    doesMoreItemsExist: getState().appList.appsList
                        .doesMoreItemsExist,
                    nextPageId: getState().appList.appsList.nextPageId,
                    apps: [],
                },
            });
        } else {
            dispatch({
                type: FETCH_WATCHFACEHEADLIST_NEXT_PAGE,
                payload: {
                    isNextRequestOngoing: true,
                    doesMoreItemsExist: getState().appList.watchFacesList
                        .doesMoreItemsExist,
                    nextPageId: getState().appList.watchFacesList.nextPageId,
                    watchFaces: [],
                },
            });
        }

        if (!getState().config.galleryApiUrl) {
            dispatch(await fetchConfigurationData());
        }

        const asyncResp = await AppDetails.fetchAppDetails(
            getState().config.authToken.accessToken,
            getState().config.galleryApiUrl,
            appId,
        );

        const app: AppHead = {
            name: asyncResp.data.app.name,
            type: asyncResp.data.app.type,
            developerName: asyncResp.data.app.developer.name,
            previewImage: asyncResp.data.app.previewImage.uri,
            icon: asyncResp.data.app.icon.uri,
            id: asyncResp.data.app.id,
            isPaid: asyncResp.data.app.isPaid,
        };

        if (type === 'APP') {
            dispatch({
                type: FETCH_APPHEADLIST_NEXT_PAGE,
                payload: {
                    apps: [app],
                    nextPageId: getState().appList.appsList.nextPageId,
                    doesMoreItemsExist: true,
                    isNextRequestOngoing: false,
                },
            });
        } else {
            dispatch({
                type: FETCH_WATCHFACEHEADLIST_NEXT_PAGE,
                payload: {
                    watchFaces: [app],
                    nextPageId: getState().appList.watchFacesList.nextPageId,
                    doesMoreItemsExist: true,
                    isNextRequestOngoing: false,
                },
            });
        }
    };
}

export function fetchNextPageWatchFaceList(): ThunkAction<
    void,
    AppState,
    null,
    AppListActionTypes | ConfigurationActionTypes
> {
    return async (dispatch, getState) => {
        dispatch({
            type: FETCH_WATCHFACEHEADLIST_NEXT_PAGE,
            payload: {
                isNextRequestOngoing: true,
                doesMoreItemsExist: getState().appList.watchFacesList
                    .doesMoreItemsExist,
                nextPageId: getState().appList.watchFacesList.nextPageId,
                watchFaces: [],
            },
        });
        if (!getState().config.galleryApiUrl) {
            dispatch(await fetchConfigurationData());
        }

        const asyncResp = await fetchAppsList(
            CategoryType.allWatchFaces,
            getState().config.authToken.accessToken,
            getState().config.galleryApiUrl,
            getState().appList.watchFacesList.nextPageId,
        );
        const watchFaceList = asyncResp.data.collection.pagedApps.apps.map(
            (a) => {
                const app: AppHead = {
                    name: a.name,
                    type: a.type,
                    developerName: a.developer.name,
                    previewImage: a.previewImage.uri,
                    icon: a.icon.uri,
                    id: a.id,
                    isPaid: a.isPaid,
                };
                return app;
            },
        );

        dispatch({
            type: FETCH_WATCHFACEHEADLIST_NEXT_PAGE,
            payload: {
                watchFaces: watchFaceList,
                nextPageId: asyncResp.data.collection.pagedApps.nextPages[0],
                doesMoreItemsExist: true,
                isNextRequestOngoing: false,
            },
        });
    };
}

async function fetchAppsList(
    categoryType: CategoryType,
    accessToken: string,
    apiUrl: string,
    nextPageKey?: string,
) {
    const bdy = {
        operationName: 'category',
        variables: {
            id: categoryType,
            pageKey: nextPageKey,
        },
        query: getAppListGql,
    };
    const result = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'content-type': 'application/json',
        },
        body: JSON.stringify(bdy),
    });
    const resultObj = (await result.json()) as FitbitGalleryListResponseRoot;
    return resultObj;
}

const getAppListGql = gql`
  query category($id: ID!, $pageKey: ID) {
    collection: category(id: $id) {
      id
      name
      pagedApps(pageOptions: {
        pageKey: $pageKey,
        limit: ${20},
        numNextPages: ${5000},
        numPrevPages: ${5}
      }) {
        ...pagedApps
      }
      appType
    }
  }

  fragment pagedApps on PagedApps {
    apps {
      ...appSummary
    }
    nextPages
    prevPages
    offset
  }

  fragment appSummary on App {
    id
    previewImage(scale: 1.0) {
      uri
    }
    icon(width: 120, height: 120) {
      uri
    }
    developer {
      name
    }
    name
    type
    isPaid
  }
`;
