Daggers

Website for Dagenham & Redbridge FC

Demo at http://dry-lake-73482.herokuapp.com/

Clone this code, call yarn install, then run this in a server using:
  NODE_ENV=production npm start

Needed:
* Which Team pages are needed?
 * All except 9-16?
* What details will we have for players?
 * If we get everything from EFL, will it be updated by Daggers in future? If not, just omit it now?

To Do:
* Fix react warnings about PropTypes, (if possible. Seems to be from a dependency.)
* Update DNS to point to GCP
* Need SSL?
  * https://www.npmjs.com/package/letsencrypt
  * https://git.daplie.com/Daplie/greenlock-express
  * Document prod settings?
* Migrate Pages, such as Fans and Commercial
* Add a recommended image size to the docs, (e.g. for news, should be 1200x~600. How about Players, etc.?)
* Put in advertising
* Finalize layouts
* Add League table from API
* Code cleanup, (remove console logging,) and TODO's
* Putting in (more detailed) traffic monitoring
* Finish migrating any other old content, (e.g. news, match reports)

Pulling Data:
* Per team pages have links to their results and fixtures, e.g.:
 * http://www.bbc.com/sport/football/teams/dagenham-and-redbridge/results
 * http://www.bbc.com/sport/football/teams/dagenham-and-redbridge/fixtures
 * Need to parse these whole pages
* Can look at the full list of data per competition, then have to parse out per team, e.g.:
 * http://www.bbc.com/sport/football/fixtures calls http://www.bbc.com/sport/football/fixtures/partial/competition-118996118?structureid=5&dateTimeNow=20170305 for National League fixtures
 * Similarly just for the National League table: http://www.bbc.com/sport/football/tables/partial/118996118?structureid=5&dateTimeNow=20170305
 * Have to parse per team, and find all competitions
 * Note these return HTML, not JSON

Nice to Have:
* Authentication & Authorization
 * Store the token on the client end, e.g. localStorage or a cookie, so you can refresh the browser and still be logged in.
 * Check if the token is expired, or will soon, on the client so the user doesn't lose their work?
 * Change the Auth.js model to use a DB with hashed passwords, not env vars.
* Getting table and fixture data...
 * Fixtures are setup manually at the start of the season.
 * Tables can just be linked to from National League website, if nothing else.
 * PA? Scrape? Done once centrally or per team? Automating this as a recurring job?
* Lazy load images?
 * https://github.com/yuanyan/react-image

Cleanup dependencies?
* uuid
* moment
* react-foundation
