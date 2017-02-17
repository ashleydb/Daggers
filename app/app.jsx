//Include our npm dependencies
var React = require('react');
var ReactDOM = require('react-dom');

//Creates multiple variables at once in ES6 destructuring syntax
// Same as var Route = require('react-router').Route; repeated for each item in the list.
var {Route, Router, IndexRoute, browserHistory} = require('react-router');

//Include our component dependencies
var Main = require('Main');
var Home = require('Home');
var News = require('News');
var NewsStory = require('NewsStory');
var NewsEdit = require('NewsEdit');
var Fixtures = require('Fixtures');
var Tickets = require('Tickets');
var Team = require('Team');
var Fans = require('Fans');
var Club = require('Club');
var Commercial = require('Commercial');

//Use jQuery to start foundation
//$(document).foundation();

//App css
require('applicationStyles');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <Route path="news" component={News}>
        <Route path="/story/:newsId" component={NewsStory}/>
      </Route>
      <Route path="fixtures" component={Fixtures}/>
      <Route path="tickets" component={Tickets}/>
      <Route path="team" component={Team}/>
      <Route path="fans" component={Fans}/>
      <Route path="club" component={Club}/>
      <Route path="commercial" component={Commercial}/>
      <Route path="editnews" component={NewsEdit}>
          <Route path="/editnews/:newsId" component={NewsEdit}/>
      </Route>
      <IndexRoute component={Home}/>
    </Route>
  </Router>,
  document.getElementById('app')
);

$(document).ready(function($) {
    $(document).foundation();
});
