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
            <div className="card is-shady is-fullheight">
                <div className="card-image">
                    <figure className="image">
                        <img
                            src={this.props.item.previewImage}
                            alt="Preview Image"
                        />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="content">
                        <h4>{this.props.item.name}</h4>
                        {/* <p>{this.props.item.description}</p> */}
                        <span className="button is-link modal-button">
                            Modal card
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
