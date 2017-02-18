var React = require('react');

// TODO: Break out this table into an API and other components.
// TODO: Does a fixture need a link to a Report and a video?
// TODO: Need to link to reports, (/news/id?) or ticket sales.
// TODO: Need a league table component that pulls the full table or 5 positions, centered around Daggers where possible.
// TODO: Who is going to update the league table & fixtures and how, e.g. game is postponed, or adding cup matches?
// TODO: Also need an Ad component, which can be adsense or overridden as a nice-to-have.
// TODO: Better mobile rendering? Stacking isn't great. Text is still small too.

//Basic presentational component that would only have a render function
// rewritten using arror functions from ES6.
var Fixtures = (props) => {
    return (
        <div>

            <div className="row">
                <div className="columns small-12 large-8">

                    <h3>Fixtures &amp; Results</h3>
                    <table className="hover stack text-center">
                        <tbody>
                            <tr>
                                <td>7-Jan-17</td>
                                <td><img src="/images/clublogo.png" alt="Dagenham & Redbridge FC Logo" className="fixture-logo"/></td>
                                <td><p className="team-name">Braintree Town</p><p className="competition-name">Vanarama National League</p></td>
                                <td>Att 1000</td>
                                <td>H</td>
                                <td>3-0</td>
                                <td>W</td>
                                <td><a href="#">Report</a></td>
                            </tr>
                            <tr>
                                <td>14-Jan-17</td>
                                <td><img src="/images/clublogo.png" alt="Dagenham & Redbridge FC Logo" className="fixture-logo"/></td>
                                <td><p className="team-name">North Ferriby Utd</p><p className="competition-name">Vanarama National League</p></td>
                                <td>Att 1000</td>
                                <td>A</td>
                                <td>1-1</td>
                                <td>D</td>
                                <td><a href="#">Report</a></td>
                            </tr>
                            <tr>
                                <td>7-Jan-17</td>
                                <td><img src="/images/clublogo.png" alt="Dagenham & Redbridge FC Logo" className="fixture-logo"/></td>
                                <td><p className="team-name">Braintree Town</p><p className="competition-name">Vanarama National League</p></td>
                                <td>Att 1000</td>
                                <td>H</td>
                                <td>3-0</td>
                                <td>W</td>
                                <td><a href="#">Report</a></td>
                            </tr>
                            <tr>
                                <td>14-Jan-17</td>
                                <td><img src="/images/clublogo.png" alt="Dagenham & Redbridge FC Logo" className="fixture-logo"/></td>
                                <td><p className="team-name">North Ferriby Utd</p><p className="competition-name">Vanarama National League</p></td>
                                <td>Att 1000</td>
                                <td>A</td>
                                <td>1-1</td>
                                <td>D</td>
                                <td><a href="#">Report</a></td>
                            </tr>
                            <tr>
                                <td>7-Jan-17</td>
                                <td><img src="/images/clublogo.png" alt="Dagenham & Redbridge FC Logo" className="fixture-logo"/></td>
                                <td><p className="team-name">Braintree Town</p><p className="competition-name">Vanarama National League</p></td>
                                <td>Att 1000</td>
                                <td>H</td>
                                <td>3-0</td>
                                <td>W</td>
                                <td><a href="#">Report</a></td>
                            </tr>
                            <tr>
                                <td>14-Jan-17</td>
                                <td><img src="/images/clublogo.png" alt="Dagenham & Redbridge FC Logo" className="fixture-logo"/></td>
                                <td><p className="team-name">North Ferriby Utd</p><p className="competition-name">Vanarama National League</p></td>
                                <td>Att 1000</td>
                                <td>A</td>
                                <td>1-1</td>
                                <td>D</td>
                                <td><a href="#">Report</a></td>
                            </tr>
                            <tr>
                                <td>7-Jan-17</td>
                                <td><img src="/images/clublogo.png" alt="Dagenham & Redbridge FC Logo" className="fixture-logo"/></td>
                                <td><p className="team-name">Braintree Town</p><p className="competition-name">Vanarama National League</p></td>
                                <td>Att 1000</td>
                                <td>H</td>
                                <td>3-0</td>
                                <td>W</td>
                                <td><a href="#">Report</a></td>
                            </tr>
                            <tr>
                                <td>14-Jan-17</td>
                                <td><img src="/images/clublogo.png" alt="Dagenham & Redbridge FC Logo" className="fixture-logo"/></td>
                                <td><p className="team-name">North Ferriby Utd</p><p className="competition-name">Vanarama National League</p></td>
                                <td>Att 1000</td>
                                <td>A</td>
                                <td>1-1</td>
                                <td>D</td>
                                <td><a href="#">Report</a></td>
                            </tr>
                            <tr>
                                <td>21-Jan-17</td>
                                <td><img src="/images/clublogo.png" alt="Dagenham & Redbridge FC Logo" className="fixture-logo"/></td>
                                <td><p className="team-name">Lincoln</p><p className="competition-name">Vanarama National League</p></td>
                                <td>-</td>
                                <td>H</td>
                                <td>KO 15:00</td>
                                <td>-</td>
                                <td><a href="#">Tickets</a></td>
                            </tr>
                            <tr>
                                <td>21-Jan-17</td>
                                <td><img src="/images/clublogo.png" alt="Dagenham & Redbridge FC Logo" className="fixture-logo"/></td>
                                <td><p className="team-name">Lincoln</p><p className="competition-name">Vanarama National League</p></td>
                                <td>-</td>
                                <td>H</td>
                                <td>KO 15:00</td>
                                <td>-</td>
                                <td><a href="#">Tickets</a></td>
                            </tr>
                            <tr>
                                <td>21-Jan-17</td>
                                <td><img src="/images/clublogo.png" alt="Dagenham & Redbridge FC Logo" className="fixture-logo"/></td>
                                <td><p className="team-name">Lincoln</p><p className="competition-name">Vanarama National League</p></td>
                                <td>-</td>
                                <td>H</td>
                                <td>KO 15:00</td>
                                <td>-</td>
                                <td><a href="#">Tickets</a></td>
                            </tr>
                            <tr>
                                <td>21-Jan-17</td>
                                <td><img src="/images/clublogo.png" alt="Dagenham & Redbridge FC Logo" className="fixture-logo"/></td>
                                <td><p className="team-name">Lincoln</p><p className="competition-name">Vanarama National League</p></td>
                                <td>-</td>
                                <td>H</td>
                                <td>KO 15:00</td>
                                <td>-</td>
                                <td><a href="#">Tickets</a></td>
                            </tr>
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

module.exports = Fixtures;
