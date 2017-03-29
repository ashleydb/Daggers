var React = require('react');
var {Link} = require('react-router');

// TODO: Need to lock behind authentication

export class Admin extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to={'/admin/news'}>News</Link></li>
                    <li><Link to={'/admin/fixtures'}>Fixtures</Link></li>
                </ul>
            </div>
        );
    }
};

export default Admin;
