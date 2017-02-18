var React = require('react');

// TODO: All content on this page.

//Basic presentational component that would only have a render function
// rewritten using arror functions from ES6.
var Club = (props) => {
    return (
        <div>
            <h1 className="text-center page-title">Club</h1>
            <p>D&amp;R FC Club</p>
            <ul>
                <li>Business Finder</li>
                <li>Visit Us</li>
                <li>History</li>
                <li>Customer Charter</li>
                <li>Stadium</li>
                <li>Club Directory</li>
                <li>Club Records</li>
                <li>Previous Managers</li>
                <li>Ground Regulations</li>
                <li>Media</li>
                <li>Function Room Hire</li>
                <li>Work related learning</li>
            </ul>
        </div>
    );
}

module.exports = Club;
