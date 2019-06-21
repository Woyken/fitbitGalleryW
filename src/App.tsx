// tslint:disable-next-line: import-name
import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import AppList from './components/AppList';
import store from './store';
import './App.sass';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <header className="App-header">
                        <AppList propFromParent={4} />
                    </header>
                </div>
            </Provider>
        );
    }
}

export default App;
