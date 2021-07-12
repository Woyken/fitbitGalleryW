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
import SearchAppsList from './components/SearchAppsList/SearchAppsList';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Tabs selectedTabClassName="is-active">
                        <div className="tabs is-centered is-boxed">
                            <TabList>
                                <Tab>
                                    <a href='#/WatchFaces'>Watch Faces</a>
                                </Tab>
                                <Tab>
                                    <a href='#/Apps'>Apps</a>
                                </Tab>
                                <Tab>
                                    <a href='#/Search'>Search</a>
                                </Tab>
                                <Tab>
                                    <a href='#/Saved'>Saved</a>
                                </Tab>
                                <Tab>
                                    <a href='#/About'>About</a>
                                </Tab>
                            </TabList>
                        </div>

                        <TabPanel>
                            <WatchFaceList />
                        </TabPanel>
                        <TabPanel>
                            <AppsList />
                        </TabPanel>
                        <TabPanel>
                            <SearchAppsList />
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
