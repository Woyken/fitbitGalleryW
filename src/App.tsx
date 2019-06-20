// tslint:disable-next-line: import-name
import React, { Component } from 'react';
import logoSvg from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import AppList from './components/AppList';
import store from './store';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <header className="App-header">
                        <img src={logoSvg} className="App-logo" alt="logo" />
                        <p>
                            Edit <code>src/App.tsx</code> and save to reload.
                        </p>
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React
                        </a>
                        <AppList propFromParent={4} />
                    </header>
                </div>
            </Provider>
        );
    }
}

export default App;
