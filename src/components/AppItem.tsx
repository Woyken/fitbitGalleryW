// tslint:disable-next-line: import-name
import React, { Component } from 'react';

interface OwnProps {
    item: {
        name: string;
        type: string;
        developerName: string;
        previewImage: string;
        icon: string;
        id: string;
        description: string;
        isPaid: boolean;
    };
}

export default class AppItem extends Component<OwnProps> {
    render() {
        return (
            <div>
                <img src={this.props.item.previewImage}></img>
                <h2>{this.props.item.isPaid + ''} {this.props.item.name}</h2>
                <p>{this.props.item.description}</p>
            </div>
        );
    }
}
