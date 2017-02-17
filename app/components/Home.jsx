var React = require('react');
var NewsSummary = require('NewsSummary');

// TODO: Add sponsors.
// Also need an Ad component, which can be adsense or overridden as a nice-to-have.
// Also want a Google Analytics component.

//Basic presentational component that would only have a render function
// rewritten using arror functions from ES6.
var Home = (props) => {
    return (

        <div>

            <div className="row">
                <NewsSummary id="1" style="MAIN"/>
            </div>

            <div className="row small-up-2 medium-up-3">
                <NewsSummary id="2" style="SMALL"/>
                <NewsSummary id="1" style="SMALL"/>
                <NewsSummary id="2" style="SMALL"/>
            </div>

        </div>
    );
}

module.exports = Home;
