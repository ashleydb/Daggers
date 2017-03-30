var React = require('react');
var {Link} = require('react-router');

// TODO: Need to lock behind authentication

export class Admin extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <Link to={'/admin/news'} className="expanded button"><i className="fi-page-multiple"></i> News</Link>
                    <Link to={'/admin/fixtures'} className="expanded button"><i className="fi-flag"></i> Fixtures</Link>
                </ul>
            </div>
        );
    }
};

export default Admin;
