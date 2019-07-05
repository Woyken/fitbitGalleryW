import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default class SavedAppsList extends Component {
    render() {
        return (
            <div className="container">
                <section className="articles">
                    <div className="column is-8 is-offset-2">
                        <div className="card article">
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content has-text-centered">
                                        <p className="title article-title">About</p>
                                    </div>
                                </div>
                                <div className="content article-body">
                                    <p>This website is NOT affiliated with Fitbit</p>
                                    <p>This website was made as a fun side project. I'm not making any money of this.</p>

                                    <p>
                                        This website is not intended to replace any of Fitbit apps or websites.
                                    </p>
                                    <h3 className="has-text-centered">Transparency</h3>
                                    <p>All your saved apps are saved only in your browser.</p>
                                    <p>For anyone concerned, you can look at the source files here</p>
                                    <a
                                        href="https://github.com/Woyken/fitbitGalleryW"
                                        target="_blank"
                                        className="button is-primary is-medium"
                                    >
                                        <span className="icon">
                                            <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
                                        </span>
                                        <span>Github</span>
                                    </a>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
