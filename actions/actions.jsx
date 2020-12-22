// Helper for importing all actions
import * as newsActions from './NewsActions';
import * as fixturesActions from './FixturesActions';
import * as loginActions from './LoginActions';
import * as pageActions from './PageActions';
import * as playersActions from './PlayersActions';
import * as bannerActions from './BannerActions';
import * as tableActions from './TableActions';
import * as sponsorsActions from './SponsorsActions';

export var actions = {
    news: newsActions,
    fixtures: fixturesActions,
    login: loginActions,
    pages: pageActions,
    players: playersActions,
    banner: bannerActions,
    table: tableActions,
    sponsors: sponsorsActions
};
