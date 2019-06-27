import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

interface DropdownItem {
    displayName: string;
    id: number;
}

interface OwnProps {
    items: DropdownItem[];
    prefixText: string;
    onSelectionChanged: (id: number) => void;
}

interface OwnState {
    selectedItem: DropdownItem;
    isActive: boolean;
}

export class Dropdown extends Component<OwnProps, OwnState> {
    constructor(props: OwnProps) {
        super(props);
        this.state = {
            selectedItem: props.items[0],
            isActive: false,
        };
    }

    onItemSelect(item: DropdownItem) {
        this.setState((state) => {
            return { ...state, selectedItem: item };
        });
        this.props.onSelectionChanged(item.id);
    }

    render() {
        return (
            <div
                className={`dropdown ${this.state.isActive ? 'is-active' : ''}`}
                onClick={() =>
                    this.setState((state) => {
                        return { ...state, isActive: !state.isActive };
                    })
                }
            >
                <div className="dropdown-trigger">
                    <button
                        className="button"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu"
                    >
                        <span>
                            {this.props.prefixText +
                                this.state.selectedItem.displayName}
                        </span>
                        <span className="icon is-small">
                            <FontAwesomeIcon icon={faAngleDown} />
                        </span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        {this.props.items.map((item) => {
                            return (
                                <a
                                    href="#"
                                    className={`dropdown-item ${
                                        item.id === this.state.selectedItem.id
                                            ? 'is-active'
                                            : ''
                                    }`}
                                    onClick={() => this.onItemSelect(item)}
                                >
                                    {item.displayName}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
