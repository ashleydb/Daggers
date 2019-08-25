// For Polyfilling Internet Explorer
import 'babel-polyfill';

// NPM dependencies for React and Redux
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
import CalendarSubscribe from 'CalendarSubscribe';
import Admin from 'Admin';
import Page from 'Page';
import PagesEdit from 'PagesEdit';
import Tickets from 'Tickets';
import Team from 'Team';
import PlayersEdit from 'PlayersEdit';
import Fans from 'Fans';
import Community from 'Community';
import Club from 'Club';
import Commercial from 'Commercial';
import BannerEdit from 'BannerEdit';
import SponsorsEdit from 'SponsorsEdit';
import Table from 'Table';
import Vanarama from 'Vanarama';

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
        <Route path="fixturescalendar" component={CalendarSubscribe}/>
        <Route path="table" component={Table}/>
        <Route path="tickets" component={Tickets}/>
        <Route path="team" component={Team}/>
        <Route path="fans" component={Fans}/>
        <Route path="community" component={Community}/>
        <Route path="club" component={Club}/>
        <Route path="commercial" component={Commercial}/>
        <Route path="vanarama" component={Vanarama}/>
        
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
            <Route path="banner" component={BannerEdit}>
                <Route path=":bannerId" component={BannerEdit}/>
            </Route>
            <Route path="sponsors" component={SponsorsEdit}>
                <Route path=":sponsorId" component={SponsorsEdit}/>
            </Route>
        </Route>
        <IndexRoute component={Home}/>
        <Route path="*" component={Home}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

//Use jQuery to start foundation
$(document).ready(function($) {
    $(document).foundation();
});
