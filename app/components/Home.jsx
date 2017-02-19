var React = require('react');
var {connect} = require('react-redux');
var NewsSummary = require('NewsSummary');

// TODO: Add sponsors.
// TODO: Add Ad component, which can be adsense or overridden as a nice-to-have.
// TODO: Add Google Analytics component.
// TODO: Adjust layout a bit? Smaller main story with sidebar stories and ads? Twitter feed?
// TODO: Add latest video, or a link to it as a story?
// TODO: Correctly load enough stories to pass to summaries
// TODO: 3 summaries on a row on a phone doesn't look good. Breaks down to 2, 1.

export var Home = React.createClass({
    render: function() {
        var {news} = this.props.news; // TODO: .news shouldn't be needed
        return (

            <div>

                <div className="row">
                    <NewsSummary story={news[0]} style="MAIN"/>
                </div>

                <div className="row small-up-2 medium-up-3">
                    <NewsSummary story={news[1]} style="SMALL"/>
                    <NewsSummary story={news[0]} style="SMALL"/>
                    <NewsSummary story={news[1]} style="SMALL"/>
                </div>

            </div>
        );
    }
});

//module.exports = Home;

export default connect(
  (state) => {
    return {
        news: state.news
    };
  })(Home);
