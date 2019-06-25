import { AppListActionTypes, FETCH_APPLIST_NEXT_PAGE, App } from './types';
import { AppState } from '..';
import { ThunkAction } from 'redux-thunk';
import { fetchConfigurationData } from '../configuration/acions';
import gql from 'graphql-tag';
import { FitbitGalleryListResponseRoot } from '../../types/fitbitGalleryTypes';
import { ConfigurationActionTypes } from '../configuration/types';

export function fetchNextPageAppList(): ThunkAction<
    void,
    AppState,
    null,
    AppListActionTypes | ConfigurationActionTypes
> {
    return async (dispatch, getState) => {
        dispatch({
            type: FETCH_APPLIST_NEXT_PAGE,
            payload: {
                isNextRequestOngoing: true,
                doesMoreItemsExist: getState().appList.doesMoreItemsExist,
                nextPageId: getState().appList.nextPageId,
                apps: [],
            },
        });
        console.log('before config fetch');
        if (!getState().config.galleryApiUrl) {
            dispatch(await fetchConfigurationData());
        }
        console.log('after config fetch');

        const asyncResp = await fetchAppsList(
            getState().config.authToken.accessToken,
            getState().config.galleryApiUrl,
            getState().appList.nextPageId,
        );
        console.log('after apps list fetch');
        const appsList = asyncResp.data.collection.pagedApps.apps.map((a) => {
            const app: App = {
                name: a.name,
                type: a.type,
                developerName: a.developer.name,
                description: a.description,
                previewImage: a.previewImage.uri,
                icon: a.icon.uri,
                id: a.id,
                isPaid: a.isPaid,
            };
            return app;
        });

        dispatch({
            type: FETCH_APPLIST_NEXT_PAGE,
            payload: {
                apps: appsList,
                nextPageId: asyncResp.data.collection.pagedApps.nextPages[0],
                doesMoreItemsExist: true,
                isNextRequestOngoing: false,
            },
        });
    };
}

async function fetchAppsList(
    accessToken: string,
    apiUrl: string,
    nextPageKey?: string,
) {
    const bdy = {
        operationName: 'category',
        variables: {
            id: 'c3c6d097-a255-4613-b817-d5d693f13318',
            pageKey: nextPageKey,
        },
        query: getCategory,
    };
    console.log('noooooooooo');
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

const getCategory = gql`
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
