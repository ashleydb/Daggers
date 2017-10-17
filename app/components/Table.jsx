import React from 'react';
var {connect} = require('react-redux');
import {Link} from 'react-router';
import {actions} from 'actions';
import MedianetTag from 'MedianetTag';

// Table is a Component to render essentially static content.
export class Table extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }

    // componentWillMount() {
    //     this.props.dispatch(actions.table.fetchTableIfNeeded());
    // }
    // render() {
    //     var {table, status} = this.props.table;

    //     if (status.isFetching) {
    //         return (
    //             <div>
    //                 <div className="callout">
    //                   <h5>Loading</h5>
    //                   <p>Please wait while we get the table...</p>
    //                 </div>
    //             </div>
    //         );
    //     } else if (!table || !table.standing) {
    //         return (
    //             <div>
    //                 <div className="callout alert">
    //                   <h5>Error</h5>
    //                   <p>No table found.</p>
    //                 </div>
    //             </div>
    //         );
    //     } else {
    //         // Turn the table data into an HTML table
    //         var tableRows = table.standing.map((team) => {
    //             return (
    //                 <tr key={team.position}>
    //                     <td className='text-center'>{team.position}</td>
    //                     <td>{team.teamName.replace('&amp;', '&')}</td>
    //                     <td className='text-center'>{team.playedGames}</td>
    //                     <td className='text-center'>{team.wins}</td>
    //                     <td className='text-center'>{team.draws}</td>
    //                     <td className='text-center'>{team.losses}</td>
    //                     <td className='text-center'>{team.goals}</td>
    //                     <td className='text-center'>{team.goalsAgainst}</td>
    //                     <td className='text-center'>{team.points}</td>
    //                 </tr>
    //             );
    //         });
            
    //         return (
    //             <div>
    //                 <div className="row">
    //                     <div className="columns small-12 large-8">

    //                         <h3>League Table</h3>
    //                         <p>Check the full League Table via the <a href="https://thenationalleague.org.uk/tables.php?division_id=7">National League</a></p>

    //                         <div className="table-scroll">
    //                             <table className="hover">
    //                                 <thead>
    //                                     <tr>
    //                                         <th className='text-center'>Pos</th>
    //                                         <th>Team</th>
    //                                         <th className='text-center'>Played</th>
    //                                         <th className='text-center'>W</th>
    //                                         <th className='text-center'>D</th>
    //                                         <th className='text-center'>L</th>
    //                                         <th className='text-center'>Goals</th>
    //                                         <th className='text-center'>Against</th>
    //                                         <th className='text-center'>Points</th>
    //                                     </tr>
    //                                 </thead>
    //                                 <tbody>
    //                                     {tableRows}
    //                                 </tbody>
    //                             </table>
    //                         </div>

    //                     </div>
    //                     <div className="columns small-12 large-4">
    //                         <div className="placeholder-ad">
    //                             <MedianetTag cid="8CUM55E8A" crid="183428731" size="160x600" divId = "183428731"/>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         );
    //     }
    // }

    render() {
        var iframeStyle = {
            width: '95%',
            height: '500px'
          };
          
        var tableFrame = (<iframe style={iframeStyle} src={`https://www.thenationalleague.org.uk/match-info/tables?division_id=35403`}></iframe>);
        return (
            <div>
                <div className="row">
                    <div className="columns small-12 large-8">
                        <h3>League Table</h3>
                        <p>Check the full League Table via the <a href="https://thenationalleague.org.uk/tables.php?division_id=7">National League</a></p>
                        {tableFrame}
                    </div>
                    <div className="columns small-12 large-4">
                        <div className="placeholder-ad">
                            <MedianetTag cid="8CUM55E8A" crid="183428731" size="160x600" divId = "183428731"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default connect(
  (state) => {
    return {
        table: state.table
    };
  })(Table);
