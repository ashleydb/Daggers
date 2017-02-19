var React = require('react');
var {connect} = require('react-redux');
var NewsSummary = require('NewsSummary');

// TODO: Adjust layout at show ads in a sidebar?
// TODO: Can a story have a YouTube video in it?
// TODO: Correctly load enough stories to pass to summaries
// TODO: 3 wide on a phone doesn't look good. Breaks down to 2, 1.

//Basic presentational component that would only have a render function
// rewritten using arror functions from ES6.
export var News = React.createClass({
    render: function() {
        if (this.props.children) {
            return (
                <div>
                    {/* will render `NewsStory.jsx` when at /story/:newsId */}
                    {this.props.children}
                </div>
            );
        } else {
            var {news} = this.props.news; //TODO: .news shouldn't be needed
            return (
                <div>
                    {/* will render a list of news items when at /news/ */}
                    <div className="row">
                        <div className="columns small-12 large-8">

                            <div className="row small-up-2 medium-up-3">
                                <NewsSummary story={news[0]} style="SMALL"/>
                                <NewsSummary story={news[1]} style="SMALL"/>
                                <NewsSummary story={news[0]} style="SMALL"/>
                            </div>

                            <div className="row small-up-2 medium-up-3">
                                <NewsSummary story={news[1]} style="SMALL"/>
                                <NewsSummary story={news[0]} style="SMALL"/>
                                <NewsSummary story={news[1]} style="SMALL"/>
                            </div>

                            <div className="row small-up-2 medium-up-3">
                                <NewsSummary story={news[0]} style="SMALL"/>
                                <NewsSummary story={news[1]} style="SMALL"/>
                                <NewsSummary story={news[0]} style="SMALL"/>
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
        }
    }
});

//module.exports = News;

export default connect(
  (state) => {
    return {
        news: state.news
    };
  })(News);
