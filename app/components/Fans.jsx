var React = require('react');
var Timeline = require('react-twitter-widgets').Timeline;

//Basic presentational component that would only have a render function
// rewritten using arror functions from ES6.
var Fans = (props) => {
    return (
        <div>

            <div className="row">
                <div className="columns small-12 large-8">

                    <div className="row">
                        <div className="columns small-3">
                            <a href="https://www.youtube.com/user/OfficialDaggers">
                                <i className="fi-social-youtube social-icon-large social-color-youtube"></i>
                            </a>
                        </div>
                        <div className="columns small-3">       
                            <a href="https://www.facebook.com/OfficialDagenham.Redbridge">
                                <i className="fi-social-facebook social-icon-large social-color-facebook"></i>
                            </a>
                        </div>
                        <div className="columns small-3">      
                            <a href="http://twitter.com/dag_redfc">
                                <i className="fi-social-twitter social-icon-large social-color-twitter"></i>
                            </a>
                        </div>
                        <div className="columns small-3">      
                            <a href="https://plus.google.com/u/0/+DaggersCoUk">
                                <i className="fi-social-google-plus social-icon-large social-color-google"></i>
                            </a>
                        </div>
                    </div>

                    <div className="row">
                        <div className="columns small-12">

                            <h2>Latest Video</h2>
                            <div class="responsive-embed widescreen">
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/LZNwwdMHVwg" frameborder="0" allowfullscreen></iframe>    
                            </div>

                            <p>Youtube Highlights
                                Junior Daggers
                                Support The Daggers Fund (250 Club)
                                Daggers In The Community
                                Disabled Supporters Club
                                First Time Fans
                                Supporters Club
                                Daggers Twitter
                                Daggers Facebook</p>
                            
                        </div>
                    </div>

                </div>
                <div className="columns small-12 large-4">
                    <div className="placeholder-ad">
                        <p>Ads go here</p>
                    </div>

                    <Timeline
                        dataSource={{
                            sourceType: 'profile',
                                screenName: 'Dag_RedFC'
                        }}
                        options={{
                            tweetLimit: '5',
                                height: '400'
                        }}
                        />

                </div>
            </div>

        </div>
    );
}

module.exports = Fans;
