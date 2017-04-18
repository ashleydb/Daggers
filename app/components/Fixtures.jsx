import React from 'react';
var {connect} = require('react-redux');
import {actions} from 'actions';
import * as FixturesAPI from 'FixturesAPI';

// TODO: Break out this table into smaller components, (like a table entry)?
// TODO: Does a fixture need a link to a Report AND a video?
// TODO: Need a league table component that pulls the full table or 5 positions, centered around Daggers where possible. Or just link to the league website for now.
// TODO: Who is going to update the league table & fixtures and how, e.g. game is postponed, or adding cup matches?
// TODO: Also need an Ad component, which can be adsense or overridden as a nice-to-have.
// TODO: Better mobile rendering? Stacking isn't great. Text is still small too.

export class Fixtures extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    componentWillMount() {
        this.props.dispatch(actions.fixtures.fetchFixturesIfNeeded());
    }
    render() {
        var {fixtures, status} = this.props.fixtures;
        
        if (status.isFetching) {
            return (
                <div>
                    <div className="callout">
                      <h5>Loading</h5>
                      <p>Please wait while we get the fixtures...</p>
                    </div>
                </div>
            );
        } else if (!fixtures || fixtures.length < 1) {
            return (
                <div>
                    <div className="callout alert">
                      <h5>Error</h5>
                      <p>No fixtures found.</p>
                    </div>
                </div>
            );
        } else {
            // Get a list of fixtures output as table rows
            var fixtureRows = fixtures.map((fixture) => {
                var logo = fixture.logo ?   `/images/uploads/teams/${fixture.logo}` :
                                            '/images/clublogo.png';
                // TODO: Need to fill in report links for all fixtures
                var w_l_d = fixture.w_l_d === 'X' ? '' : fixture.w_l_d;
                var link = '';
                if (w_l_d && fixture.report)
                    link = <a href={fixture.report}>Report</a>;
                else if (fixture.report)
                    link = <a href={fixture.report}>Preview</a>;
                else
                    link = <a href="http://www.daggerstickets.co.uk">Tickets</a>;
                
                var home_away = fixture.home_away === 'X' ? '' : fixture.home_away;

                return (
                    <tr key={fixture.id}>
                        <td>{fixture.date}</td>
                        <td><img src={logo} alt={fixture.team} className="fixture-logo"/></td>
                        <td><p className="team-name">{fixture.team}</p><p className="competition-name">{fixture.competition}</p></td>
                        <td>Att {fixture.attendance}</td>
                        <td>{home_away}</td>
                        <td>{fixture.result}</td>
                        <td>{w_l_d}</td>
                        <td>{link}</td>
                    </tr>
                );
            });
            
            return (
                <div>

                    <div className="row">
                        <div className="columns small-12 large-8">

                            <h3>Fixtures &amp; Results</h3>
                            <table className="hover stack text-center">
                                <tbody>
                                    {fixtureRows}
                                </tbody>
                            </table>

                        </div>
                        <div className="columns small-12 large-4">
                            <div className="placeholder-ad">
                                <p>Ads go here</p>
                            </div>

                            <h3>League Table</h3>
                            <table className="hover stack text-center">
                                <thead>
                                    <tr>
                                        <th>Pos</th>
                                        <th>Team</th>
                                        <th>Pld</th>
                                        <th>GD</th>
                                        <th>Pts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2</td>
                                        <td>Forest G.</td>
                                        <td>29</td>
                                        <td>+24</td>
                                        <td>54</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Tranmere</td>
                                        <td>27</td>
                                        <td>+16</td>
                                        <td>53</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Dag & Red</td>
                                        <td>28</td>
                                        <td>+16</td>
                                        <td>52</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Dover</td>
                                        <td>29</td>
                                        <td>+13</td>
                                        <td>49</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>Barrow</td>
                                        <td>27</td>
                                        <td>+15</td>
                                        <td>46</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
    }
};

export default connect(
  (state) => {
    return {
        fixtures: state.fixtures
    };
  })(Fixtures);
