import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { fetchNextPageWatchFaceList } from '../store/appList/actions';
import { AppListFilter } from '../store/appList/filter';
import { Dropdown } from './DropdownFilter/DropdownFilter';
import { AppHeadsList } from '../store/appList/types';
import { ThunkDispatch } from 'redux-thunk';
import AppListView from './AppListView';

enum PriceFilterEnum {
    PaidFree,
    Free,
    Paid,
}

const priceFilterDisplay: {
    displayName: string;
    id: PriceFilterEnum;
    value: boolean | undefined;
}[] = [
    {
        displayName: 'Paid & Free',
        id: PriceFilterEnum.PaidFree,
        value: undefined,
    },
    { displayName: 'Free', id: PriceFilterEnum.Free, value: false },
    { displayName: 'Paid', id: PriceFilterEnum.Paid, value: true },
];

interface OwnState {
    currentFilter: AppListFilter;
}

interface StateProps {
    watchFaceList: AppHeadsList;
}

interface DispatchProps {
    fetchWatchFaceListNextPage: () => Promise<void>;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class WatchFaceList extends Component<Props, OwnState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentFilter: {},
        };
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Dropdown
                        prefixText="Price: "
                        items={priceFilterDisplay}
                        onSelectionChanged={(id: PriceFilterEnum) => {
                            this.setState((state) => {
                                return {
                                    ...state,
                                    currentFilter: {
                                        ...state.currentFilter,
                                        isPaid: priceFilterDisplay.find(
                                            (filter) => filter.id === id,
                                        )!.value,
                                    },
                                };
                            });
                        }}
                    />
                    <AppListView
                        fetchMoreApps={async () => {
                            await this.props.fetchWatchFaceListNextPage();
                        }}
                        allApps={this.props.watchFaceList}
                        filter={this.state.currentFilter}
                    />
                </header>
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    console.log('mapping...');
    return {
        watchFaceList: state.appList.watchFacesList,
    };
}

function mapDispatchToProps(
    dispatch: ThunkDispatch<{}, {}, any>,
    ownProps: OwnProps,
): DispatchProps {
    return {
        fetchWatchFaceListNextPage: async () => {
            await dispatch(fetchNextPageWatchFaceList());
        },
    };
}

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps,
)(WatchFaceList);