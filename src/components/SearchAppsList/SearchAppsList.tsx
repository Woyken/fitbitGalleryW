import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { AppListFilter, AppType, DeviceType } from '../../store/appList/filter';
import { AppHeadsList, AppHead } from '../../store/appList/types';
import { Dropdown } from '../DropdownFilter/DropdownFilter';
import AppListView from '../AppListView';
import { AppState } from '../../store';
import { ThunkDispatch } from 'redux-thunk';
import { SavedApp } from '../../store/savedApps/types';
import { fetchAppHead, searchAppHeaders } from '../../store/appList/actions';

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
    {
        displayName: 'Versa',
        id: DeviceFilterEnum.Versa,
        value: DeviceType.Versa,
    },
    {
        displayName: 'Versa Lite',
        id: DeviceFilterEnum.Versa_Lite,
        value: DeviceType.Versa_Lite,
    },
    {
        displayName: 'Versa 2',
        id: DeviceFilterEnum.Versa2,
        value: DeviceType.Versa2,
    },
    {
        displayName: 'Ionic',
        id: DeviceFilterEnum.Ionic,
        value: DeviceType.Ionic,
    },
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
    searchInputValue: string;
}

interface StateProps {
    searchAppsList: AppHeadsList;
}

interface DispatchProps {
    searchForApps: (searchText: string) => Promise<void>;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class SavedAppsList extends Component<Props, OwnState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currentFilter: {},
            searchInputValue: '',
        };
    }

    executeSearch() {
        console.log('tettete');

        this.props.searchForApps(this.state.searchInputValue);
    }

    updateInputValue(evt: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            searchInputValue: (evt.target as any).value,
        });
    }

    render() {
        return (
            <div className="App">
                <input
                    value={this.state.searchInputValue}
                    onChange={(evt) => this.updateInputValue(evt)}
                    onKeyUp={(e) => {
                        if (
                            e.keyCode === 13 &&
                            !this.props.searchAppsList.isNextRequestOngoing
                        ) {
                            this.executeSearch();
                        }
                    }}
                    className="input"
                    type="text"
                    placeholder="Search for apps"
                />
                <button
                    className={`button is-primary ${
                        this.props.searchAppsList.isNextRequestOngoing
                            ? 'is-loading'
                            : ''
                    }`}
                    onClick={
                        this.props.searchAppsList.isNextRequestOngoing
                            ? () => {}
                            : this.executeSearch.bind(this)
                    }
                >
                    Search
                </button>
                <div>
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
                        allApps={this.props.searchAppsList}
                        filter={this.state.currentFilter}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    console.log('mapping...');
    return {
        searchAppsList: state.appList.lastSearchResult,
    };
}

function mapDispatchToProps(
    dispatch: ThunkDispatch<{}, {}, any>,
    ownProps: OwnProps,
): DispatchProps {
    return {
        searchForApps: async (searchText: string) => {
            await dispatch(searchAppHeaders(searchText));
        },
    };
}

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps,
)(SavedAppsList);
