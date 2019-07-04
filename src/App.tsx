// tslint:disable-next-line: import-name
import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import './App.sass';
import { AppListFilter } from './store/appList/filter';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import WatchFaceList from './components/WatchFaceList';
import AppsList from './components/AppsList';
import SavedAppsList from './components/SavedAppsList/SavedAppsList';

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

class App extends Component<{}, OwnState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            currentFilter: {},
        };
    }

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Tabs selectedTabClassName="is-active">
                        <div className="tabs is-centered is-boxed">
                            <TabList>
                                <Tab><a>Watch Faces</a></Tab>
                                <Tab><a>Apps</a></Tab>
                                <Tab><a>Saved</a></Tab>
                            </TabList>
                        </div>

                        <TabPanel>
                            <WatchFaceList />
                        </TabPanel>
                        <TabPanel>
                            <AppsList />
                        </TabPanel>
                        <TabPanel>
                            <SavedAppsList />
                        </TabPanel>
                    </Tabs>
                </div>
            </Provider>
        );
    }
}

export default App;
