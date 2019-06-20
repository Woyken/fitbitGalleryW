// tslint:disable-next-line: import-name
import React, { Component } from 'react';
import graphqlTag from 'graphql-tag';
import { FitbitGalleryListResponseRoot } from '../types/fitbitGalleryTypes';

import { connect } from 'react-redux';
import { fetchAppList } from '../store/appList/actions';
import { AppListState } from '../store/appList/types';
import store, { AppState } from '../store';
import { thunkFetchAppList } from '../thunk';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

interface OwnProps {
    propFromParent: number;
}

interface StateProps {
    fetchAppList: typeof fetchAppList;
    appList: AppListState;
}

interface DispatchProps {
    thunkFetchAppList: () => void;
}

type Props = StateProps & DispatchProps & OwnProps;

class AppList extends Component<Props> {
    componentWillMount() {
        this.props.thunkFetchAppList();
        // TODO
        // Do fetchs here.
        // fetch().then(tojson).then(data logconsole...)
    }
    render() {
        return (
            <div className="hello">
                <div className="greeting">Hello {this.props.appList.apps.length}</div>
                <div>
                    <button onClick={this.props.thunkFetchAppList}>
                        +
                    </button>
                    <p> </p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    return {
        fetchAppList,
        appList: state.appList,
    };
}

function mapDispatchToProps(
    dispatch: ThunkDispatch<{}, {}, any>,
    ownProps: OwnProps,
): DispatchProps {
    return {
        thunkFetchAppList: async () => {
            await dispatch(thunkFetchAppList());
            console.log('Fetch completed [UI]');
        },
    };
}

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps,
)(AppList);

function getAuthToken() {
    // TODO:
    // Create parser from downloaded HTML page.
    return 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkRGTFAiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJjbGllbnRfYWNjZXNzX3Rva2VuIiwic2NvcGVzIjoiIiwiZXhwIjoxNTYxMTEyOTIzLCJpYXQiOjE1NjEwMjY1MjN9.hkPXWOdzcRul_ZY60OTebnbhGZTtxzzdrdjC12VzdYw';
}

const exampleRequestData = `
query category($id: ID!, $pageKey: ID) {
  collection: category(id: $id) {
    id
    name
    pagedApps(pageOptions: {pageKey: $pageKey, limit: 24, numNextPages: 5, numPrevPages: 5}) {
      ...pagedApps
      __typename
    }
    appType
    __typename
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
  __typename
}
`;

const yt = `
Host: api.fitbit.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0
Accept: */*
Accept-Language: en-us,en;q=0.9
Accept-Encoding: gzip, deflate, br
Referer: https://gallery.fitbit.com/
content-type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkRGTFAiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJjbGllbnRfYWNjZXNzX3Rva2VuIiwic2NvcGVzIjoiIiwiZXhwIjoxNTYxMTEyOTIzLCJpYXQiOjE1NjEwMjY1MjN9.hkPXWOdzcRul_ZY60OTebnbhGZTtxzzdrdjC12VzdYw
Origin: https://gallery.fitbit.com
Content-Length: 790
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
TE: Trailers
`;

const t = `
Host: api.fitbit.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: http://localhost:3000/
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMkRGTFAiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJjbGllbnRfYWNjZXNzX3Rva2VuIiwic2NvcGVzIjoiIiwiZXhwIjoxNTYxMTEyOTIzLCJpYXQiOjE1NjEwMjY1MjN9.hkPXWOdzcRul_ZY60OTebnbhGZTtxzzdrdjC12VzdYw
Content-Type: text/plain;charset=UTF-8
Origin: http://localhost:3000
Content-Length: 4945
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
TE: Trailers
`;
