var React = require('react');

//Basic presentational component that would only have a render function
// rewritten using arror functions from ES6.
var Fans = (props) => {
    return (
        <div>
            <h1 className="text-center page-title">Fans</h1>
            <p>D&amp;R FC Fans</p>
            <p>Youtube Highlights
                Junior Daggers
                Support The Daggers Fund (250 Club)
                Daggers In The Community
                Disabled Supporters Club
                First Time Fans
                Supporters Club
                Daggers Twitter
                Daggers Facebook</p>

            <ul>
                <li><a href="https://www.youtube.com/user/OfficialDaggers">YouTube</a></li>
                <li><a href="https://www.facebook.com/OfficialDagenham.Redbridge">Facebook</a></li>
                <li><a href="http://twitter.com/dag_redfc">Twitter: @dag_redfc</a></li>
                <li><a href="https://plus.google.com/u/0/+DaggersCoUk">Google+</a></li>
            </ul>

            <div class="responsive-embed widescreen">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/LZNwwdMHVwg" frameborder="0" allowfullscreen></iframe>    
            </div>

        </div>
    );
}

module.exports = Fans;
