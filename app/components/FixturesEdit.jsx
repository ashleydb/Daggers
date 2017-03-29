var React = require('react');
var {Link, browserHistory} = require('react-router');
var {connect} = require('react-redux');
var FixtureEditForm = require('FixtureEditForm');
import {actions} from 'actions';
import * as FixturesAPI from 'FixturesAPI';

// TODO: Need to lock behind authentication

export var FixturesEdit = React.createClass({
    componentWillMount: function() {
        this.props.dispatch(actions.fixtures.fetchFixturesIfNeeded());
    },
    handleSaveFixture: function(fixture) {
        this.props.dispatch(actions.fixtures.submitFixture(fixture));

        // TODO: Not great, since write could fail and then we've gone away from the form's contents
        browserHistory.push('/admin/fixtures');
    },
    render: function() {
        var {fixtureId} = this.props.params;
        var {fixtures, status} = this.props.fixtures;
        var fixture = FixturesAPI.getFixture(fixtureId, fixtures);
        
        if (status.isFetching) {
            // Still loading data, so show a message
            return (
                <div>
                    <Link to="/admin" className="expanded button alert"><i className="fi-home"></i> Admin Tools Menu</Link>
                    <div className="callout">
                      <h5>Loading</h5>
                      <p>Please wait while we get the fixtures...</p>
                    </div>
                </div>
            );
        } else if (fixtureId == "new" || (fixture.id && fixture.id == fixtureId)) {
            // Editing a fixture, so show the form
            return (
                <div>
                    <FixtureEditForm fixture={fixture} onSaveFixture={this.handleSaveFixture}/>
                </div>
            );
        } else if (fixtures && fixtures.length > 0) {
            // Got a list of fixtures, so show them
            var errorMessage = status.error === undefined ? null : (
                <div className="callout alert">
                  <h5>Error</h5>
                  <p>{status.error}</p>
                </div>
            );
            
            return (
                <div>
                    <Link to="/admin" className="expanded button alert"><i className="fi-home"></i> Admin Tools Menu</Link>
                    {errorMessage}
                    
                    <table className="hover text-center">
                        <tbody>
                            {fixtures.map(game => (
                                <tr key={game.id}>
                                    <td>{game.date}</td>
                                    <td><p className="team-name">{game.team}</p><p className="competition-name">{game.competition}</p></td>
                                    <td><Link to={`/admin/fixtures/${game.id}`}><i className="fi-pencil"></i> Edit</Link></td>
                                </tr>
                            ))}
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td><Link to={`/admin/fixtures/new`}><i className="fi-plus"></i> Create New</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else {
            // Nothing is loading but we have no data, so show an error
            return (
                <div>
                    <Link to="/admin" className="expanded button alert"><i className="fi-home"></i> Admin Tools Menu</Link>
                    <div className="callout alert">
                      <h5>Error</h5>
                      <p>No fixtures found.</p>
                    </div>
                </div>
            );
        }
    }
});

export default connect(
  (state) => {
    return {
        fixtures: state.fixtures
    };
  })(FixturesEdit);
