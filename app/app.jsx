//Include our npm dependencies
import React from 'react';
import ReactDOM from 'react-dom';
var {Provider} = require('react-redux');

//Creates multiple variables at once in ES6 destructuring syntax
// Same as var Route = require('react-router').Route; repeated for each item in the list.
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

//Google Analytics
var ReactGA = require('react-ga');
ReactGA.initialize('UA-99830610-1');
function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

//Include our component dependencies
import Main from 'Main';
import Home from 'Home';
import News from 'News';
import NewsStory from 'NewsStory';
import NewsEdit from 'NewsEdit';
import Fixtures from 'Fixtures';
import FixturesEdit from 'FixturesEdit';
import Admin from 'Admin';
import Page from 'Page';
import PagesEdit from 'PagesEdit';
import Tickets from 'Tickets';
import Team from 'Team';
import PlayersEdit from 'PlayersEdit';
import Fans from 'Fans';
import Club from 'Club';
import Commercial from 'Commercial';

var store = require('configureStore').configure();

//App css
require('applicationStyles');

// TODO: Need a NoMatch route for 404?

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} onUpdate={logPageView}>
      <Route path="/" component={Main}>
        <Route path="news" component={News}>
          <Route path=":newsId" component={NewsStory}/>
        </Route>
        <Route path="fixtures" component={Fixtures}/>
        <Route path="tickets" component={Tickets}/>
        <Route path="team" component={Team}/>
        <Route path="fans" component={Fans}/>
        <Route path="club" component={Club}/>
        <Route path="commercial" component={Commercial}/>
        
        <Route path="page" component={Page}>
          <Route path=":pageId" component={Page}/>
        </Route>

        <Route path="admin">
            <IndexRoute component={Admin}/>
            <Route path="news" component={NewsEdit}>
                <Route path=":newsId" component={NewsEdit}/>
            </Route>
            <Route path="fixtures" component={FixturesEdit}>
                <Route path=":fixtureId" component={FixturesEdit}/>
            </Route>
            <Route path="pages" component={PagesEdit}>
                <Route path=":pageId" component={PagesEdit}/>
            </Route>
            <Route path="players" component={PlayersEdit}>
                <Route path=":playerId" component={PlayersEdit}/>
            </Route>
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
