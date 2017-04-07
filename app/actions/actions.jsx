// Helper for importing all actions
import * as newsActions from 'app/actions/NewsActions';
import * as fixturesActions from 'app/actions/FixturesActions';
import * as loginActions from 'app/actions/LoginActions';

export var actions = {
    news: newsActions,
    fixtures: fixturesActions,
    login: loginActions
};
