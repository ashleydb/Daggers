Daggers

Website for Dagenham & Redbridge FC

Demo at http://dry-lake-73482.herokuapp.com/

Clone this code, call yarn install, then run this in a server using:
  NODE_ENV=production npm start

Needed:
* Which Team pages are needed?
 * All except 9-16?
* Sponsor details, (images, links, any other info needed)
 * Get these from the bottom of the current website
* What details will we have for players?
 * If we get everything from EFL, will it be updated by Daggers in future? If not, just omit it now?

To Prove:
* Paging content
 * Setup some placeholder stories/data on Firebase
 * Fixtures: Break up by season
 * News: Break up by year or year/month. Maybe have a most recent 10 as well.
* Fix react warnings about PropTypes, (if possible. Seems to be from a dependency.)
* Build more API routes
* Connecting to a DB - Replace Firebase with GCP Datastore?
* Hosting in a production ready setup - GCP AppEngine
  * https://www.npmjs.com/package/letsencrypt
  * https://git.daplie.com/Daplie/greenlock-express
* Uploading images in Production env.
 * (Can't do it directly with Heroku, would need to go to GCP CloudStorage or similar.)
* Listing images already on the server
 * (Does it work in prod? Likely need to change to use GCP CloudStorage)

Other stuff to do:
* Fill out other content, (even if just placeholder,) such as fixtures, teams/players, etc.
* Allow Editing of content, such as fixtures, players, ticket prices
* Adding in the player details and such for real, from the EFL export
* Putting in traffic monitoring
* Putting in advertising
* Finalizing layouts
* Cookie warnings and any other legal stuff like privacy policy
* Code cleanup and TODO's

Next:
* Try making the Tickets page editable, (then the club could try filling out their own content)
* Try making the teams/players pages.
 * Use this to try parsing and uploading existing XML. Only bother with currently active players?
 * Use this to try testing out paging-like data layout
 * Use this to try uploading images in production?

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
