// tslint:disable-next-line: import-name
import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { ThunkDispatch } from 'redux-thunk';
import AppItem from './AppItem';
import { fetchNextPageAppList } from '../store/appList/actions';
import AppItemModal from './AppModal/AppItemModal';
import {
    filterAppList,
    AppListFilter,
    areAppListFiltersEqual,
} from '../store/appList/filter';
import { AppHeadsListState, AppHead, AppHeadsList } from '../store/appList/types';

interface OwnProps {
    allApps: AppHeadsList;
    filter: AppListFilter;
    fetchMoreApps: () => Promise<void>;
}

interface OwnState {
    modalAppIdShow?: string;
    filteredAppList: AppHead[];
}

type Props = OwnProps;

export default class AppListView extends Component<Props, OwnState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            filteredAppList: filterAppList(
                this.props.allApps,
                this.props.filter,
            ),
        };
    }

    componentWillMount() {
        if (this.props.allApps.apps.length < 1) {
            this.props.fetchMoreApps();
        }
    }

    componentDidUpdate(
        prevProps: Readonly<Props>,
        prevState: Readonly<OwnState>,
    ) {
        if (
            prevProps.allApps !== this.props.allApps ||
            !areAppListFiltersEqual(prevProps.filter, this.props.filter)
        ) {
            this.setState((state) => {
                return {
                    ...state,
                    filteredAppList: filterAppList(
                        this.props.allApps,
                        this.props.filter,
                    ),
                };
            });
        }
    }

    onCloseModal() {}

    private loadingRowsPromises: Promise<void>[] = [];

    async loadMoreItems(): Promise<void> {
        if (this.props.allApps.isNextRequestOngoing) {
        }
        await Promise.all(this.loadingRowsPromises);
        const fetching = this.props.fetchMoreApps();
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
                        this.props.allApps.isNextRequestOngoing
                            ? 'is-loading'
                            : ''
                    }`}
                    onClick={
                        this.props.allApps.isNextRequestOngoing
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

// function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
//     console.log('mapping...');
//     return {
//         fetchNextPageAppList,
//         appListState: state.appList,
//     };
// }

// function mapDispatchToProps(
//     dispatch: ThunkDispatch<{}, {}, any>,
//     ownProps: OwnProps,
// ): DispatchProps {
//     return {
//         thunkFetchAppList: async () => {
//             await dispatch(fetchNextPageAppList());
//             console.log('Fetch completed [UI]');
//         },
//     };
// }

// export default connect<StateProps, DispatchProps, OwnProps, AppState>(
//     mapStateToProps,
//     mapDispatchToProps,
// )(AppList);
