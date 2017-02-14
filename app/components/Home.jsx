var React = require('react');

//Basic presentational component that would only have a render function
// rewritten using arror functions from ES6.
var Home = (props) => {
    return (

        <div>

            <div className="row">
                <div className="column">
                    <div className="card card-block">
                        <div className="card-divider">
                            <h4>Zlatan Signs for the Daggers</h4>
                        </div>
                        <img src="images/news-main.jpg" alt="Dagenham & Redbridge FC Zlatan" className="news-main-image"/>
                        <div className="card-section">
                            <p>"This is the move my whole career has been leading up to."</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row small-up-2 medium-up-3">
                <div className="column column-block">
                    <div className="card">
                        <img src="images/news-thumbnail.jpg" alt="Dagenham & Redbridge FC Stand" className="news-thumbnail"/>
                        <div className="card-section">
                            <h4>D&amp;R 5-0 Man Utd</h4>
                            <p>Daggers ease to another win at Old Trafford.</p>
                        </div>
                    </div>
                </div>
                <div className="column column-block">
                    <div className="card">
                        <img src="images/news-thumbnail.jpg" alt="Dagenham & Redbridge FC Stand" className="news-thumbnail"/>
                        <div className="card-section">
                            <h4>D&amp;R 5-0 Man Utd</h4>
                            <p>Daggers ease to another win at Old Trafford.</p>
                        </div>
                    </div>
                </div>
                <div className="column column-block">
                    <div className="card">
                        <img src="images/news-thumbnail.jpg" alt="Dagenham & Redbridge FC Stand" className="news-thumbnail"/>
                        <div className="card-section">
                            <h4>D&amp;R 5-0 Man Utd</h4>
                            <p>Daggers ease to another win at Old Trafford.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

module.exports = Home;
