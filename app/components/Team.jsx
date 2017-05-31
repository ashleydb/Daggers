import React from 'react';
//import { Foundation, ButtonGroup, Link, Row, Column, Thumbnail } from 'react-foundation';

//import Dialog from 'Dialog';

import Player from 'Player';

// TODO: Break this up into /team/ to select which team, default to main squad,
// Have Link buttons to which group of people e.g. /team/:teamId, for staff, academy, etc.
// Have a list of people on that page, per position, which are links to each profile /team/:teamId/:playerId
// Render the child props to show everything here.
// Clean up react-foundation usage?
// Restyle the list of players.

export default class Team extends React.Component {

    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // BINDING: Keep 'this' scoped to this object in any handlers
        //this.openDialog = this.openDialog.bind(this);
    }

    //    componentDidMount() {
    //        $(document).foundation();
    //    }

    // openDialog(id) {
    //     console.log('openDialog');
    //     Dialog.open({ title: 'Player Detail', type: 'PLAYER', id: id });
    // }

    render() {
        // TODO: Create Player Edit forms
        // TODO: Just remove this component and replace with Player. (Maybe rename Player to Team.)
        return (
            <div><Player /></div>
        );

{/*
        return (
            <div>

                <div className="expanded button-group">
                    <a className="button">Player Profiles</a>
                    <a className="button">Staff Profiles</a>
                    <a className="button">Academy</a>
                    <a className="button">Academy Staff Profiles</a>
                    <a className="button">Scholar Profiles</a>
                    <a className="button">Academy U16-U9</a>
                    <a className="button">Player Recruitment</a>
                    <a className="button">Academy Fixtures</a>
                    <a className="button">College Academy</a>
                </div>

                <div className="row">
                    <div className="columns small-12 large-8">



                        <div className="button-group-basics-example">
                            <ButtonGroup>
                                <Link to="team/goalkeepers">Goalkeepers</Link>
                                <Link to="team/defenders">Defenders</Link>
                                <Link to="team/midfielders">Midfielders</Link>
                                <Link to="team/strikers">Strikers</Link>
                            </ButtonGroup>
                        </div>

                        <div className="grid-block-example">
                            <Row upOnSmall={1} upOnMedium={2} upOnLarge={4}>
                                <Column >
                                    <Thumbnail onClick={() => this.openDialog(1)} src="/images/player-head.jpg" alt="Oliver Hawkins" />
                                </Column>
                                <Column >
                                    <Thumbnail onClick={() => this.openDialog(1)} src="/images/player-head.jpg" alt="Oliver Hawkins" />
                                </Column>
                                <Column >
                                    <Thumbnail onClick={() => this.openDialog(1)} src="/images/player-head.jpg" alt="Oliver Hawkins" />
                                </Column>
                                <Column >
                                    <Thumbnail onClick={() => this.openDialog(1)} src="/images/player-head.jpg" alt="Oliver Hawkins" />
                                </Column>
                                <Column >
                                    <Thumbnail onClick={() => this.openDialog(1)} src="/images/player-head.jpg" alt="Oliver Hawkins" />
                                </Column>
                                <Column >
                                    <Thumbnail onClick={() => this.openDialog(1)} src="/images/player-head.jpg" alt="Oliver Hawkins" />
                                </Column>
                            </Row>
                        </div>





                        <ul className="tabs" data-tabs id="example-tabs">
                            <li className="tabs-title"><a href="#panel1">Goalkeepers</a></li>
                            <li className="tabs-title"><a href="#panel2">Defenders</a></li>
                            <li className="tabs-title"><a href="#panel3">Midfielders</a></li>
                            <li className="tabs-title is-active"><a href="#panel4" aria-selected="true">Strikers</a></li>
                        </ul>

                        <div className="tabs-content" data-tabs-content="example-tabs">
                            <div className="tabs-panel is-active" id="panel1">
                                <img src="/images/player-head.jpg" alt="Oliver Hawkins" className="player-thumbnail" onClick={() => this.openDialog(1)} />
                            </div>
                            <div className="tabs-panel" id="panel2">
                                <a onClick={() => this.openDialog(1)}>
                                    <img src="/images/player-head.jpg" alt="Oliver Hawkins" className="player-thumbnail" />
                                </a>
                                <a onClick={() => this.openDialog(1)}>
                                    <img src="/images/player-head.jpg" alt="Oliver Hawkins" className="player-thumbnail" />
                                </a>
                            </div>
                            <div className="tabs-panel" id="panel3">
                                <a data-open="playerModal">
                                    <img src="/images/player-head.jpg" alt="Oliver Hawkins" className="player-thumbnail" />
                                </a>
                            </div>
                            <div className="tabs-panel" id="panel4">
                                <a data-open="playerModal">
                                    <img src="/images/player-head.jpg" alt="Oliver Hawkins" className="player-thumbnail" />
                                </a>
                                <a data-open="playerModal">
                                    <img src="/images/player-head.jpg" alt="Oliver Hawkins" className="player-thumbnail" />
                                </a>
                                <a className="button" onClick={() => this.openDialog(1)}>dialog</a>
                            </div>
                        </div>

                    </div>

                    <div className="columns small-12 large-4">
                        <div className="placeholder-ad">
                            <p>Ads go here</p>
                        </div>
                        <div className="placeholder-ad">
                            <p>Ads go here</p>
                        </div>
                    </div>
                </div>

            </div>
        );
*/}
    }
};
