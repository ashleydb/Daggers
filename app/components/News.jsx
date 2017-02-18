var React = require('react');
var NewsSummary = require('NewsSummary');

// TODO: Adjust layout at show ads in a sidebar?
// TODO: Can a story have a YouTube video in it?

//Basic presentational component that would only have a render function
// rewritten using arror functions from ES6.
var News = React.createClass({
    render: function() {
        if (this.props.children) {
            return (
                <div>
                    {/* will render `NewsStory.jsx` when at /story/:newsId */}
                    {this.props.children}
                </div>
            );
        } else {
            return (
                <div>
                    {/* will render a list of news items when at /news/ */}
                    <div className="row">
                        <div className="columns small-12 large-8">

                            <div className="row small-up-2 medium-up-3">
                                <NewsSummary id="1" style="SMALL"/>
                                <NewsSummary id="2" style="SMALL"/>
                                <NewsSummary id="1" style="SMALL"/>
                            </div>

                            <div className="row small-up-2 medium-up-3">
                                <NewsSummary id="2" style="SMALL"/>
                                <NewsSummary id="1" style="SMALL"/>
                                <NewsSummary id="2" style="SMALL"/>
                            </div>

                            <div className="row small-up-2 medium-up-3">
                                <NewsSummary id="1" style="SMALL"/>
                                <NewsSummary id="2" style="SMALL"/>
                                <NewsSummary id="1" style="SMALL"/>
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

module.exports = News;
