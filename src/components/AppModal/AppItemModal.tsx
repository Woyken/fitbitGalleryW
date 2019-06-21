// tslint:disable-next-line: import-name
import React, { Component } from 'react';

interface OwnProps {
    isActive: boolean;
    onClose: () => void;
}

export default class AppItemModal extends Component<OwnProps> {

    componentDidUpdate(prevProps: Readonly<OwnProps>) {
        if (this.props.isActive && !prevProps.isActive) {
            document.getElementsByTagName('html')[0].style.overflow = 'hidden';
            document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
        }

        if (!this.props.isActive && prevProps.isActive) {
            document.getElementsByTagName('html')[0].style.overflow = '';
            document.getElementsByTagName('body')[0].style.overflowY = '';
        }
    }

    render() {
        return (
            <div
                id="modal-card"
                className={`modal ${this.props.isActive ? ' is-active' : ''}`}
            >
                <div
                    onClick={this.props.onClose}
                    className="modal-background"
                />
                <div className="modal-content is-tiny">
                    <div className="card">
                        <div className="card-image">
                            <div className="image is-4by3">
                                <img
                                    src="https://source.unsplash.com/6Ticnhs1AG0"
                                    alt="Placeholder image"
                                />
                            </div>
                        </div>
                        <div className="card-content">
                            <div className="media">
                                <div className="media-left">
                                    <div className="image is-48x48">
                                        <img
                                            src="http://www.radfaces.com/images/avatars/linda-barret.jpg"
                                            alt="linda barret avatar"
                                        />
                                    </div>
                                </div>
                                <div className="media-content">
                                    <p className="title is-4">Jane Doe</p>
                                    <p className="subtitle is-6">@jane_doe</p>
                                </div>
                            </div>
                            <div className="content">
                                Laum Ipsum junkah potatoes bookin' it. Moosetown
                                rig up I'm tellin' you way up north bookin' it
                                can't get theyah from heeyah native bean suppah
                                whawf Powrtland Museum of Aht, back woods hawsun
                                around the pit mummah Yessah, mummah muckle
                                riyht on'ta her Bean's dinnahbucket bub geez bud
                                sumpin' fierce ayuhpawt Bangah naw, Powrtland
                                Museum of Aht down cellah sumpin' fierce hoppa
                                bub If you can't stand the wintah you don't
                                deserve the summah slower than molasses going
                                uphill in January. Sgn'wahl shoggor hrii uaaah
                                R'lyeh uh'e k'yarnak Hastur hupadgh li'hee, hai
                                f'nilgh'ri nilgh'ri n'ghftor ngftaghu vulgtlagln
                                h'hrii throd Nyarlathotep lloig, naflsll'ha
                                nnnsll'ha athg y-ebunma goka chtenff ehyeog
                                cehye. Zhro y'hah nogoth phlegeth stell'bsna
                                orr'e ph'Hastur gnaiih throd, uln ya lw'nafh mg
                                nar'luh li'hee wgah'n, sgn'wahl mg nakadishtu
                                chlirgh hupadgh tharanak h'gnaiih.
                                <a>@bulmaio</a>.<a href="#">#css</a>
                                <a href="#">#responsive</a>
                                <br />
                                <p>12:45 AM - 20 June 2018</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close" />
            </div>
        );
    }
}
