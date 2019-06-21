// tslint:disable-next-line: import-name
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAppList } from '../store/appList/actions';
import { AppListState } from '../store/appList/types';
import { AppState } from '../store';
import { thunkFetchAppList } from '../thunk';
import { ThunkDispatch } from 'redux-thunk';
import AppItem from './AppItem';

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
    }

    render() {
        return (
            <div className="hello">
                <div className="greeting">
                    Hello {this.props.appList.apps.length}
                </div>
                <div>
                    <button onClick={this.props.thunkFetchAppList}>+</button>
                    <p> </p>
                    {this.props.appList.apps.map((item) => (
                        <AppItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        );
    }
}
//
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
