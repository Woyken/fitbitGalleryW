// tslint:disable-next-line: import-name
import React, { Component } from 'react';
import { FitbitGalleryAppDetailsResponseApp } from '../../types/fitbitGalleryTypes';
import { ConfigurationState } from '../../store/configuration/types';
import store, { AppState } from '../../store';
import { connect } from 'react-redux';
import { AppDetails } from '../../actions/getAppDetails';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import {
    saveApp,
    removeSavedApp,
    saveSavedApps,
    loadSavedApps,
} from '../../store/savedApps/actions';
import { SavedAppsState } from '../../store/savedApps/types';

interface OwnProps {
    // isActive: boolean;
    appId?: string;
    onClose: () => void;
}

interface AppDetailsData extends FitbitGalleryAppDetailsResponseApp {
    isSaved: boolean;
}

interface StateProps {
    configs: ConfigurationState;
    savedApps: SavedAppsState;
}

interface OwnState {
    appsDetails: AppDetailsData[];
    currentDetails?: AppDetailsData;
}

type Props = StateProps & OwnProps;

class AppItemModal extends Component<Props, OwnState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            appsDetails: [],
        };
    }

    componentWillMount() {
        store.dispatch(loadSavedApps());
    }

    async componentDidUpdate(prevProps: Readonly<Props>) {
        if (this.props.appId && this.props.savedApps !== prevProps.savedApps) {
            // Saved apps have updated, check for current again.
            const isSaved =
                this.props.savedApps.savedApps.findIndex((app) => {
                    return app.id === this.props.appId;
                }) >= 0;

            this.setState((state) => {
                let currentDetails: AppDetailsData | undefined = undefined;
                if (state.currentDetails) {
                    currentDetails = {
                        ...state.currentDetails,
                        isSaved,
                    };
                }
                return {
                    ...state,
                    currentDetails,
                };
            });
        }

        if (this.props.appId && !prevProps.appId) {
            document.getElementsByTagName('html')[0].style.overflow = 'hidden';
            document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
            const currentAppDetails = await this.retrieveAppDetails(
                this.props.appId!,
            );

            const isSaved =
                this.props.savedApps.savedApps.findIndex((app) => {
                    return app.id === this.props.appId;
                }) >= 0;

            this.setState((state) => {
                return {
                    ...state,
                    currentDetails: { ...currentAppDetails, isSaved },
                };
            });
        }

        if (!this.props.appId && prevProps.appId) {
            document.getElementsByTagName('html')[0].style.overflow = '';
            document.getElementsByTagName('body')[0].style.overflowY = '';
            this.setState((state) => {
                return {
                    ...state,
                    currentDetails: undefined,
                };
            });
        }
    }

    saveCurrentApp() {
        if (!this.props.appId) {
            return;
        }

        // TODO convert this action to thunk and call save inside
        store.dispatch(saveApp({ id: this.props.appId }));
        store.dispatch(saveSavedApps(store.getState().savedApps));
    }

    removeCurrentAppFromSaved() {
        if (!this.props.appId) {
            return;
        }

        // TODO convert this action to thunk and call save inside
        store.dispatch(removeSavedApp({ id: this.props.appId }));
        store.dispatch(saveSavedApps(store.getState().savedApps));
    }

    render() {
        if (!this.state.currentDetails) {
            return <div />;
        }

        return (
            <div
                id="modal-card"
                className={`modal ${this.props.appId ? ' is-active' : ''}`}
            >
                <div
                    onClick={this.props.onClose}
                    className="modal-background"
                />
                <div className="modal-content is-tiny">
                    <div className="card">
                        <div className="card-image">
                            <div className="columns is-centered is-mobile">
                                <div className="column is-5">
                                    <AliceCarousel
                                        mouseDragEnabled
                                        autoPlay
                                        autoPlayInterval={3000}
                                        buttonsDisabled
                                        autoHeight
                                    >
                                        {this.state.currentDetails.screenshots.map(
                                            (screenshot) => {
                                                return (
                                                    <div className="image">
                                                        <img
                                                            src={screenshot.uri}
                                                            alt="Placeholder image"
                                                        />
                                                    </div>
                                                );
                                            },
                                        )}
                                    </AliceCarousel>
                                </div>
                            </div>
                        </div>
                        <div className="card-content">
                            <div
                                onClick={
                                    this.state.currentDetails.isSaved
                                        ? this.removeCurrentAppFromSaved.bind(
                                              this,
                                          )
                                        : this.saveCurrentApp.bind(this)
                                }
                            >
                                <FontAwesomeIcon
                                    icon={
                                        this.state.currentDetails.isSaved
                                            ? fasHeart
                                            : farHeart
                                    }
                                    size="3x"
                                />
                            </div>
                            <div className="media">
                                <div className="media-left">
                                    <div className="image is-48x48">
                                        <img
                                            src={
                                                this.state.currentDetails
                                                    .previewImage.uri
                                            }
                                            alt="linda barret avatar"
                                        />
                                    </div>
                                </div>
                                <div className="media-content">
                                    <p className="title is-4">
                                        {this.state.currentDetails.name}
                                    </p>
                                    <p className="subtitle is-6">
                                        {
                                            this.state.currentDetails.developer
                                                .name
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="content">
                                <div>
                                    Devices:
                                    {this.state.currentDetails.availability.deviceTypes.map(
                                        (device) => (
                                            <div>{device.productName}</div>
                                        ),
                                    )}
                                </div>
                                <a
                                    className="button is-info"
                                    href={`https://gallery.fitbit.com/details/${
                                        this.state.currentDetails.id
                                    }`}
                                    target="_blank"
                                >
                                    To Fitbit
                                </a>
                                <a
                                    className="button is-primary"
                                    href={`https://gallery.fitbit.com/details/${
                                        this.state.currentDetails.id
                                    }/OpenApp`}
                                    target="_blank"
                                >
                                    Open App
                                </a>
                                {this.state.currentDetails.isPaid && (
                                    <div>
                                        <FontAwesomeIcon
                                            icon={faCreditCard}
                                            size="2x"
                                        />
                                        <div
                                            style={{ display: 'inline-block' }}
                                            className="has-text-weight-bold"
                                        >
                                            This application requires a payment
                                        </div>
                                    </div>
                                )}
                                {this.state.currentDetails.description
                                    .split('\n')
                                    .map((item, i) => {
                                        return <p key={i}>{item}</p>;
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={this.props.onClose}
                />
            </div>
        );
    }

    async retrieveAppDetails(appId: string) {
        const found = this.state.appsDetails.find((details) => {
            return details.id === appId;
        });
        if (found) {
            return found;
        }
        const response = await AppDetails.fetchAppDetails(
            this.props.configs.authToken.accessToken,
            this.props.configs.galleryApiUrl,
            this.props.appId!,
        );
        this.setState((state) => {
            return {
                ...state,
                appsDetails: [
                    ...state.appsDetails,
                    { ...response.data.app, isSaved: false },
                ],
            };
        });
        return response.data.app;
    }
}

function mapStateToProps(state: AppState, ownProps: OwnProps): StateProps {
    return {
        configs: state.config,
        savedApps: state.savedApps,
    };
}

export default connect<StateProps, {}, OwnProps, AppState>(mapStateToProps)(
    // It's somehow treating props as never type. Cast to any for now.
    AppItemModal as any,
);
