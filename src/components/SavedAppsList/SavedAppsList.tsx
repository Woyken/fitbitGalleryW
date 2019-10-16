import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppListFilter, AppType, DeviceType } from '../../store/appList/filter';
import { AppHeadsList, AppHead } from '../../store/appList/types';
import { Dropdown } from '../DropdownFilter/DropdownFilter';
import AppListView from '../AppListView';
import { AppState } from '../../store';
import { ThunkDispatch } from 'redux-thunk';
import { SavedApp } from '../../store/savedApps/types';
import { fetchAppHead } from '../../store/appList/actions';

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

enum DeviceFilterEnum {
    All,
    Ionic,
    Versa,
    Versa_Lite,
    Versa2,
}

const deviceFilterDisplay: {
    displayName: string;
    id: DeviceFilterEnum;
    value: DeviceType | undefined;
}[] = [
    { displayName: 'All', id: DeviceFilterEnum.All, value: undefined },
    { displayName: 'Versa', id: DeviceFilterEnum.Versa, value: DeviceType.Versa },
    { displayName: 'Versa Lite', id: DeviceFilterEnum.Versa_Lite, value: DeviceType.Versa_Lite },
    { displayName: 'Versa 2', id: DeviceFilterEnum.Versa2, value: DeviceType.Versa2 },
    { displayName: 'Ionic', id: DeviceFilterEnum.Ionic, value: DeviceType.Ionic },
];

enum TypeFilterEnum {
    All,
    WatchFaces,
    Apps,
}

const typeFilterDisplay: {
    displayName: string;
    id: TypeFilterEnum;
    value: AppType | undefined;
}[] = [
    { displayName: 'All', id: TypeFilterEnum.All, value: undefined },
    {
        displayName: 'WatchFaces',
        id: TypeFilterEnum.WatchFaces,
        value: AppType.WatchFace,
    },
    { displayName: 'Apps', id: TypeFilterEnum.Apps, value: AppType.App },
];

interface OwnState {
    currentFilter: AppListFilter;
    filteredSavedApps: AppHeadsList;
}

interface StateProps {
    savedWatchFacesList: AppHeadsList;
    savedAppsList: AppHeadsList;
    savedApps: SavedApp[];
}

interface DispatchProps {
    fetchAppHead: (id: string, appType: AppType) => Promise<void>;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class SavedAppsList extends Component<Props, OwnState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentFilter: {},
            filteredSavedApps: {
                apps: [],
                doesMoreItemsExist: true,
                isNextRequestOngoing: false,
                nextPageId: '',
            },
        };
    }

    private currentlyDownloadingItems: string[] = [];

    async downloadMissingItem(itemId: string) {
        if (this.currentlyDownloadingItems.findIndex((x) => x === itemId) < 0) {
            this.currentlyDownloadingItems.push(itemId);
            await this.props.fetchAppHead(itemId, AppType.App);
            await this.props.fetchAppHead(itemId, AppType.WatchFace);
        }

    }

    componentDidUpdate(
        prevProps: Readonly<Props>,
        prevState: Readonly<OwnState>,
    ) {
        if (
            prevProps.savedApps !== this.props.savedApps ||
            prevProps.savedAppsList !== this.props.savedAppsList ||
            prevProps.savedWatchFacesList !== this.props.savedWatchFacesList
        ) {
            this.setState((state) => {
                const foundList: AppHead[] = [];
                const notFoundList: string[] = [];
                this.props.savedApps.forEach((element) => {
                    let found = this.props.savedAppsList.apps.find(
                        (a) => a.id === element.id,
                    );
                    if (!found) {
                        found = this.props.savedWatchFacesList.apps.find(
                            (a) => a.id === element.id,
                        );
                    }
                    if (found) {
                        foundList.push(found);
                    } else {
                        notFoundList.push(element.id);
                    }
                });
                for (let i = 0; i < notFoundList.length; i++) {
                    const element = notFoundList[i];
                    this.downloadMissingItem(element);
                }
                return {
                    ...state,
                    filteredSavedApps: {
                        apps: [...foundList],
                        doesMoreItemsExist: false,
                        isNextRequestOngoing:
                            this.props.savedAppsList.isNextRequestOngoing ||
                            this.props.savedWatchFacesList.isNextRequestOngoing,
                        nextPageId: '!',
                    },
                };
            });
        }
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
                    <Dropdown
                        prefixText="Device: "
                        items={deviceFilterDisplay}
                        onSelectionChanged={(id: DeviceFilterEnum) => {
                            this.setState((state) => {
                                return {
                                    ...state,
                                    currentFilter: {
                                        ...state.currentFilter,
                                        deviceType: deviceFilterDisplay.find(
                                            (filter) => filter.id === id,
                                        )!.value,
                                    },
                                };
                            });
                        }}
                    />
                    <Dropdown
                        prefixText="Type: "
                        items={typeFilterDisplay}
                        onSelectionChanged={(id: TypeFilterEnum) => {
                            this.setState((state) => {
                                return {
                                    ...state,
                                    currentFilter: {
                                        ...state.currentFilter,
                                        appType: typeFilterDisplay.find(
                                            (filter) => filter.id === id,
                                        )!.value,
                                    },
                                };
                            });
                        }}
                    />
                    <AppListView
                        allApps={this.state.filteredSavedApps}
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
        savedWatchFacesList: state.appList.watchFacesList,
        savedAppsList: state.appList.appsList,
        savedApps: state.savedApps.savedApps,
    };
}

function mapDispatchToProps(
    dispatch: ThunkDispatch<{}, {}, any>,
    ownProps: OwnProps,
): DispatchProps {
    return {
        fetchAppHead: async (id: string, appType: AppType) => {
            switch (appType) {
                case AppType.App:
                    await dispatch(fetchAppHead(id, 'APP'));
                    break;
                case AppType.WatchFace:
                    await dispatch(fetchAppHead(id, 'WATCHFACE'));
                default:
                    break;
            }
        },
    };
}

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps,
)(SavedAppsList);
