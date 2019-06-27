// tslint:disable-next-line: import-name
import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import AppList from './components/AppList';
import store from './store';
import './App.sass';
import { Dropdown } from './components/DropdownFilter/DropdownFilter';
import { AppListFilter } from './store/appList/filter';

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
                        <AppList filter={this.state.currentFilter} />
                    </header>
                </div>
            </Provider>
        );
    }
}

export default App;
