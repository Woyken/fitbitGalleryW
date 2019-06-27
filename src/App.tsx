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

const priceFilterDisplay: { displayName: string; id: PriceFilterEnum }[] = [
    { displayName: 'Paid & Free', id: PriceFilterEnum.PaidFree },
    { displayName: 'Free', id: PriceFilterEnum.Free },
    { displayName: 'Paid', id: PriceFilterEnum.Paid },
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
                                let isPaidNew: boolean | undefined = undefined;
                                switch (id) {
                                    case PriceFilterEnum.PaidFree:
                                        isPaidNew = undefined;
                                        break;
                                    case PriceFilterEnum.Free:
                                        isPaidNew = false;
                                        break;
                                    case PriceFilterEnum.Paid:
                                        isPaidNew = true;
                                        break;
                                    default:
                                        break;
                                }
                                this.setState((state) => {
                                    return {
                                        ...state,
                                        currentFilter: {
                                            ...state.currentFilter,
                                            isPaid: isPaidNew,
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
