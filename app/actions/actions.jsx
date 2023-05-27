// Helper for importing all actions
import * as newsActions from 'app/actions/NewsActions';
import * as newsletterActions from 'app/actions/NewsletterActions';
import * as fixturesActions from 'app/actions/FixturesActions';
import * as loginActions from 'app/actions/LoginActions';
import * as pageActions from 'app/actions/PageActions';
import * as playersActions from 'app/actions/PlayersActions';
import * as bannerActions from 'app/actions/BannerActions';
import * as tableActions from 'app/actions/TableActions';
import * as sponsorsActions from 'app/actions/SponsorsActions';

export var actions = {
    news: newsActions,
    newsletter: newsletterActions,
    fixtures: fixturesActions,
    login: loginActions,
    pages: pageActions,
    players: playersActions,
    banner: bannerActions,
    table: tableActions,
    sponsors: sponsorsActions
};
