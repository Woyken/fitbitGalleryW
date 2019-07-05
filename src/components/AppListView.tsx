// tslint:disable-next-line: import-name
import React, { Component } from 'react';
import AppItem from './AppItem';
import AppItemModal from './AppModal/AppItemModal';
import { filterAppList, AppListFilter } from '../store/appList/filter';
import { AppHead, AppHeadsList } from '../store/appList/types';

interface OwnProps {
    allApps: AppHeadsList;
    filter: AppListFilter;
    fetchMoreApps?: () => Promise<void>;
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
        this.onScroll = this.onScroll.bind(this);
    }

    async onScroll(event: Event) {
        if (!event.target) {
            return;
        }

        const element = (event.target as any).scrollingElement || event.target;
        if (
            (element as any).scrollHeight - (element as any).scrollTop <=
            (element as any).clientHeight * 2
        ) {
            if (
                this.props.fetchMoreApps &&
                !this.props.allApps.isNextRequestOngoing
            ) {
                await this.props.fetchMoreApps();
            }
        }
    }

    componentWillMount() {
        if (
            this.props.allApps.apps.length < 1 &&
            this.props.fetchMoreApps &&
            !this.props.allApps.isNextRequestOngoing
        ) {
            this.props.fetchMoreApps();
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    componentDidUpdate(
        prevProps: Readonly<Props>,
        prevState: Readonly<OwnState>,
    ) {
        if (
            prevProps.allApps !== this.props.allApps ||
            prevProps.filter !== this.props.filter
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
        if (!this.props.fetchMoreApps) {
            return;
        }
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
                {this.props.fetchMoreApps ? (
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
                ) : (
                    ''
                )}

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
