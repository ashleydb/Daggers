var React = require('react');

//Basic presentational component that would only have a render function
// rewritten using arror functions from ES6.
var News = (props) => {
    return (
        <div>
            <div className="row">
                <div className="columns small-12 large-8">

                    <div className="row small-up-2 medium-up-3">
                        <div className="column column-block">
                            <div className="card">
                                <img src="images/news-thumbnail.jpg" alt="Dagenham & Redbridge FC Stand" className="news-thumbnail"/>
                                <div className="card-section">
                                    <h5>D&amp;R 5-0 Man Utd</h5>
                                    <p>Daggers ease to another win at Old Trafford.</p>
                                </div>
                            </div>
                        </div>
                        <div className="column column-block">
                            <div className="card">
                                <img src="images/news-thumbnail.jpg" alt="Dagenham & Redbridge FC Stand" className="news-thumbnail"/>
                                <div className="card-section">
                                    <h5>D&amp;R 5-0 Man Utd</h5>
                                    <p>Daggers ease to another win at Old Trafford.</p>
                                </div>
                            </div>
                        </div>
                        <div className="column column-block">
                            <div className="card">
                                <img src="images/news-thumbnail.jpg" alt="Dagenham & Redbridge FC Stand" className="news-thumbnail"/>
                                <div className="card-section">
                                    <h5>D&amp;R 5-0 Man Utd</h5>
                                    <p>Daggers ease to another win at Old Trafford.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row small-up-2 medium-up-3">
                        <div className="column column-block">
                            <div className="card">
                                <img src="images/news-thumbnail.jpg" alt="Dagenham & Redbridge FC Stand" className="news-thumbnail"/>
                                <div className="card-section">
                                    <h5>D&amp;R 5-0 Man Utd</h5>
                                    <p>Daggers ease to another win at Old Trafford.</p>
                                </div>
                            </div>
                        </div>
                        <div className="column column-block">
                            <div className="card">
                                <img src="images/news-thumbnail.jpg" alt="Dagenham & Redbridge FC Stand" className="news-thumbnail"/>
                                <div className="card-section">
                                    <h5>D&amp;R 5-0 Man Utd</h5>
                                    <p>Daggers ease to another win at Old Trafford.</p>
                                </div>
                            </div>
                        </div>
                        <div className="column column-block">
                            <div className="card">
                                <img src="images/news-thumbnail.jpg" alt="Dagenham & Redbridge FC Stand" className="news-thumbnail"/>
                                <div className="card-section">
                                    <h5>D&amp;R 5-0 Man Utd</h5>
                                    <p>Daggers ease to another win at Old Trafford.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row small-up-2 medium-up-3">
                        <div className="column column-block">
                            <div className="card">
                                <img src="images/news-thumbnail.jpg" alt="Dagenham & Redbridge FC Stand" className="news-thumbnail"/>
                                <div className="card-section">
                                    <h5>D&amp;R 5-0 Man Utd</h5>
                                    <p>Daggers ease to another win at Old Trafford.</p>
                                </div>
                            </div>
                        </div>
                        <div className="column column-block">
                            <div className="card">
                                <img src="images/news-thumbnail.jpg" alt="Dagenham & Redbridge FC Stand" className="news-thumbnail"/>
                                <div className="card-section">
                                    <h5>D&amp;R 5-0 Man Utd</h5>
                                    <p>Daggers ease to another win at Old Trafford.</p>
                                </div>
                            </div>
                        </div>
                        <div className="column column-block">
                            <div className="card">
                                <img src="images/news-thumbnail.jpg" alt="Dagenham & Redbridge FC Stand" className="news-thumbnail"/>
                                <div className="card-section">
                                    <h5>D&amp;R 5-0 Man Utd</h5>
                                    <p>Daggers ease to another win at Old Trafford.</p>
                                </div>
                            </div>
                        </div>
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

module.exports = News;
