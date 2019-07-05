// tslint:disable-next-line: import-name
import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import './App.sass';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import WatchFaceList from './components/WatchFaceList';
import AppsList from './components/AppsList';
import SavedAppsList from './components/SavedAppsList/SavedAppsList';
import About from './components/About/About';

class App extends Component {

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
                                <Tab><a>About</a></Tab>
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
                        <TabPanel>
                            <About />
                        </TabPanel>
                    </Tabs>
                </div>
            </Provider>
        );
    }
}

export default App;
