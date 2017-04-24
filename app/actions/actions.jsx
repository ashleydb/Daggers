// Helper for importing all actions
import * as newsActions from 'app/actions/NewsActions';
import * as fixturesActions from 'app/actions/FixturesActions';
import * as loginActions from 'app/actions/LoginActions';
import * as pageActions from 'app/actions/PageActions';

export var actions = {
    news: newsActions,
    fixtures: fixturesActions,
    login: loginActions,
    pages: pageActions
};
