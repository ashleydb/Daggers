// Helper for importing all actions
import * as newsActions from 'app/actions/NewsActions';
import * as fixturesActions from 'app/actions/FixturesActions';
import * as loginActions from 'app/actions/LoginActions';
import * as pageActions from 'app/actions/PageActions';
import * as playersActions from 'app/actions/PlayersActions';
import * as bannerActions from 'app/actions/BannerActions';

export var actions = {
    news: newsActions,
    fixtures: fixturesActions,
    login: loginActions,
    pages: pageActions,
    players: playersActions,
    banner: bannerActions
};
