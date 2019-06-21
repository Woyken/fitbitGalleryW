import { Action, ActionCreator } from 'redux';
import { AppState } from './store';
import { ThunkAction } from 'redux-thunk';
import { fetchAppList } from './store/appList/actions';
import graphqlTag from 'graphql-tag';
import { FitbitGalleryListResponseRoot } from './types/fitbitGalleryTypes';
import { App } from './store/appList/types';

export const thunkFetchAppList = (): ThunkAction<
    void,
    AppState,
    null,
    Action<string>
> => async (dispatch) => {
    const asyncResp = await fetchAppsList();
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
    return dispatch(fetchAppList(appsList));
};

async function fetchAppsList() {
    const bdy = {
        operationName: 'category',
        variables: {
            id: 'c3c6d097-a255-4613-b817-d5d693f13318',
            pageKey: 'QncmC1smC.',
        },
        query: getCategory,
    };
    const result = await fetch(
        'https://api.fitbit.com/1/desktop-gallery/graphql',
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(bdy),
        },
    );
    const resultObj = (await result.json()) as FitbitGalleryListResponseRoot;
    return resultObj;
}

function getAuthToken() {
    // TODO:
    // Move this to store.
    // Create parser from downloaded HTML page.
    return 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkRGTFAiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJjbGllbnRfYWNjZXNzX3Rva2VuIiwic2NvcGVzIjoiIiwiZXhwIjoxNTYxMTk1NTI1LCJpYXQiOjE1NjExMDkxMjV9.tmXYxMfB9QSPJcmNnkz7c5umxXCmYgGjm7uEy3k9HI0';
}

const getCategory = graphqlTag`
  query category($id: ID!, $pageKey: ID) {
    collection: category(id: $id) {
      id
      name
      pagedApps(pageOptions: {
        pageKey: $pageKey,
        limit: ${10},
        numNextPages: ${5},
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
      __typename
    }
    nextPages
    prevPages
    offset
    __typename
  }

  fragment appSummary on App {
    id
    previewImage(scale: 1.0) {
      uri
      __typename
    }
    icon(width: 120, height: 120) {
      uri
      __typename
    }
    description
    developer {
      name
      __typename
    }
    name
    type
    isPaid
    __typename
  }
`;
