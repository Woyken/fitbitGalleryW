// tslint:disable-next-line: import-name
import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { AppListState } from '../store/appList/types';
import { AppState } from '../store';
import { ThunkDispatch } from 'redux-thunk';
import { FixedSizeList, ListOnItemsRenderedProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import AppItem from './AppItem';
import { fetchNextPageAppList } from '../store/appList/actions';

interface OwnProps {
    propFromParent: number;
}

interface StateProps {
    fetchNextPageAppList: typeof fetchNextPageAppList;
    appList: AppListState;
}

interface DispatchProps {
    thunkFetchAppList: () => Promise<void>;
}

interface OwnState {
    isModalActive: boolean;
}

type Props = StateProps & DispatchProps & OwnProps;

class AppList extends Component<Props, OwnState> {
    state = { isModalActive: false };
    constructor(props: Props) {
        super(props);
    }

    componentWillMount() {
        // this.props.thunkFetchAppList();
    }

    onCloseModal() {}

    private loadingRowsPromises: Promise<void>[] = [];

    async loadMoreItems(startIndex: number, stopIndex: number): Promise<void> {
        console.log(
            startIndex +
                ' ' +
                stopIndex +
                ' load more rows ' +
                this.props.appList.isNextRequestOngoing,
        );
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

    itemCount() {
        return this.props.appList.doesMoreItemsExist
            ? Math.ceil(this.props.appList.apps.length) + 1
            : Math.ceil(this.props.appList.apps.length);
    }

    isItemLoaded(index: number) {
        return (
            !this.props.appList.doesMoreItemsExist ||
            index * 6 < this.props.appList.apps.length
        );
    }

    rowRenderer({ index, style }: { index: number; style: any }) {
        let content: JSX.Element;
        if (!this.isItemLoaded(index)) {
            content = (
                <div className="columns">
                    <div className="column is-4">
                        <p>'Loading...'</p>
                    </div>
                </div>
            );
        } else {
            const startIndex = index;
            // const endIndex = Math.min(
            //     startIndex + 6,
            //     this.props.appList.apps.length,
            // );
            // content = (
            //     <div style={style} className="columns is-mobile">
            //         {this.props.appList.apps
            //             .slice(startIndex, endIndex)
            //             .map((app) => (
            //                 <div className="column is-half-mobile is-6" key={app.id}>
            //                     <AppItem item={app} />
            //                 </div>
            //             ))}
            //     </div>
            // );
            content = (
                <div
                    key={this.props.appList.apps[index].id}
                >
                    <AppItem item={this.props.appList.apps[index]} />
                </div>
            );
        }

        return <div style={style}>{content}</div>;
    }

    render() {
        return (
            <div className="container">
                <InfiniteLoader
                    isItemLoaded={this.isItemLoaded.bind(this)}
                    loadMoreItems={this.loadMoreItems.bind(this)}
                    itemCount={this.itemCount()}
                >
                    {({
                        onItemsRendered,
                        ref,
                    }: {
                        onItemsRendered: (
                            props: ListOnItemsRenderedProps,
                        ) => any;
                        ref: React.RefObject<FixedSizeList>;
                    }) => (
                        <FixedSizeList
                            ref={ref}
                            onItemsRendered={onItemsRendered}
                            height={800}
                            itemSize={1200}
                            itemCount={this.itemCount()}
                            width={800}
                        >
                            {this.rowRenderer.bind(this)}
                        </FixedSizeList>
                    )}
                </InfiniteLoader>
            </div>
        );
        /* </InfiniteLoader>
            <div className="hello">
                <div className="greeting">
                    Hello {this.props.appList.apps.length}
                </div>
                <div>
                    <button onClick={this.props.thunkFetchAppList}>+</button>
                    <div className="container">
                        <div className="columns features is-multiline">
                            {this.props.appList.apps.map((item, index) => (
                                <div className="column is-3">
                                    <AppItem key={item.id} item={item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <AppItemModal
                    onClose={() => {
                        const another = () => {
                            this.setState((state) => {
                                return {
                                    ...state,
                                    isModalActive: !state.isModalActive,
                                };
                            });
                        };
                        another();
                        setTimeout(() => {
                            another();
                        },         1000);
                    }}
                    isActive={this.state.isModalActive}
                />
            </div>
            </InfiniteLoader> */
    }
}
//
function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
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
