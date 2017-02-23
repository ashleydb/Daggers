//Include our npm dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');

//Creates multiple variables at once in ES6 destructuring syntax
// Same as var Route = require('react-router').Route; repeated for each item in the list.
var {Route, Router, IndexRoute, browserHistory} = require('react-router');

//Include our component dependencies
var Main = require('Main');
//var Home = require('Home'); // This is the React version of the Home component. Would only want this for testing. require() is a webpack convention.
//import {Home} from 'Home';  // This is the React version of the Home component. Would only want this for testing. import is an ES6 cnovention.
import Home from 'Home';      // This is the Redux version of the Home component
import News from 'News';
import NewsStory from 'NewsStory';
import NewsEdit from 'NewsEdit';
var Fixtures = require('Fixtures');
var Tickets = require('Tickets');
var Team = require('Team');
var Fans = require('Fans');
var Club = require('Club');
var Commercial = require('Commercial');

var NewsAPI = require('NewsAPI');

var actions = require('actions');
var store = require('configureStore').configure();

store.dispatch(actions.fetchNewsStoriesIfNeeded());

//App css
require('applicationStyles');

// TODO: Need a NoMatch route for 404?

ReactDOM.render(
  <Provider store={store}>
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
    </Router>
  </Provider>,
  document.getElementById('app')
);

//Use jQuery to start foundation
$(document).ready(function($) {
    $(document).foundation();
});
