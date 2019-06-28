// tslint:disable-next-line: import-name
import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { AppListState, App } from '../store/appList/types';
import { AppState } from '../store';
import { ThunkDispatch } from 'redux-thunk';
import { FixedSizeList, ListOnItemsRenderedProps } from 'react-window';
import AppItem from './AppItem';
import { fetchNextPageAppList } from '../store/appList/actions';
import AppItemModal from './AppModal/AppItemModal';
import {
    filterAppList,
    AppListFilter,
    areAppListFiltersEqual,
} from '../store/appList/filter';

interface OwnProps {
    filter: AppListFilter;
}

interface StateProps {
    fetchNextPageAppList: typeof fetchNextPageAppList;
    appList: AppListState;
}

interface DispatchProps {
    thunkFetchAppList: () => Promise<void>;
}

interface OwnState {
    modalAppIdShow?: string;
    filteredAppList: App[];
}

type Props = StateProps & DispatchProps & OwnProps;

class AppList extends Component<Props, OwnState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            filteredAppList: filterAppList(
                this.props.appList,
                this.props.filter,
            ),
        };
    }

    componentWillMount() {
        this.props.thunkFetchAppList();
    }

    componentDidUpdate(
        prevProps: Readonly<Props>,
        prevState: Readonly<OwnState>,
    ) {
        if (
            prevProps.appList !== this.props.appList ||
            !areAppListFiltersEqual(prevProps.filter, this.props.filter)
        ) {
            this.setState((state) => {
                return {
                    ...state,
                    filteredAppList: filterAppList(
                        this.props.appList,
                        this.props.filter,
                    ),
                };
            });
        }
    }

    onCloseModal() {}

    private loadingRowsPromises: Promise<void>[] = [];

    async loadMoreItems(): Promise<void> {
        if (this.props.appList.isNextRequestOngoing) {
        }
        await Promise.all(this.loadingRowsPromises);
        const fetching = this.props.thunkFetchAppList();
        this.loadingRowsPromises.push(fetching);
        await fetching;
        for (let i = 0; i < this.loadingRowsPromises.length; i++) {
            if (this.loadingRowsPromises[i] === fetching) {
                this.loadingRowsPromises.splice(i, 1);
            }
        }
    }

    render() {
        return (
            <div className="container">
                <div className="columns is-multiline is-mobile">
                    {this.state.filteredAppList.map((app) => (
                        <div
                            className="column is-half-mobile is-2-desktop"
                            key={app.id}
                        >
                            <AppItem
                                item={app}
                                onClick={() => {
                                    this.setState((state) => {
                                        return {
                                            ...state,
                                            modalAppIdShow: app.id,
                                        };
                                    });
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div
                    className={`button is-primary ${
                        this.props.appList.isNextRequestOngoing
                            ? 'is-loading'
                            : ''
                    }`}
                    onClick={
                        this.props.appList.isNextRequestOngoing
                            ? () => {}
                            : this.loadMoreItems.bind(this)
                    }
                >
                    Load more
                </div>
                <AppItemModal
                    appId={this.state.modalAppIdShow}
                    onClose={() => {
                        this.setState((state) => {
                            return {
                                ...state,
                                modalAppIdShow: undefined,
                            };
                        });
                    }}
                    // isActive={this.state.isModalActive}
                />
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    console.log('mapping...');
    return {
        fetchNextPageAppList,
        appList: state.appList,
    };
}

function mapDispatchToProps(
    dispatch: ThunkDispatch<{}, {}, any>,
    ownProps: OwnProps,
): DispatchProps {
    return {
        thunkFetchAppList: async () => {
            await dispatch(fetchNextPageAppList());
            console.log('Fetch completed [UI]');
        },
    };
}

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps,
)(AppList);
