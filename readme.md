Daggers

Website for Dagenham & Redbridge FC

Demo at http://dry-lake-73482.herokuapp.com/

Clone this code, call yarn install, then run this in a server using:
  NODE_ENV=production npm start

Needed:
* Assets for club badges on fixture pages
 * These need to change each season
* Basic placeholder assets, (e.g. club ground for placeholder news image)
* Which Team pages are needed?
* The list of all competitions D&R could have fixtures for
 * Fixtures can change during a season
* Pantone colours?
* Sponsor details, (images, links, any other info needed)
* Which elements are needed for news? (Headline, sumary, body, image)
* What details will we have for players?
 * If we get everything from EFL, will it be updated by Daggers in future? If not, just omit it now?

To Prove:
* Paging content
 * Setup some placeholder stories on Firebase
* Authentication & Authorization for editing content (website frontend side and API backend side)
 * http://thejackalofjavascript.com/architecting-a-restful-node-js-app/
  * https://github.com/arvindr21/myRESTApp/tree/master/server
 * http://stackoverflow.com/questions/15496915/how-to-implement-a-secure-rest-api-with-node-js
 * Store the token on the client end, e.g. localStorage or a cookie?
 * Check if the token is expired, or will soon, on the client so the user doesn't lose their work?
 * Need to finish up the Auth.js model, either with a DB with hashed passwords or using an env var or something.
* Fix react warnings about PropTypes, (if possible. Seems to be from a dependency.)
* Build more API routes
* Connecting to a DB - Replace Firebase with GCP Datastore
* Hosting in a production ready setup - GCP AppEngine
  * https://www.npmjs.com/package/letsencrypt
  * https://git.daplie.com/Daplie/greenlock-express
* Uploading images in Production env. (Can't do it directly with Heroku, would need to go to GCP CloudStorage or similar.)
* Listing images already on the server, (does it work in prod? Likely need to change to use GCP CloudStorage)
* Getting table and fixture data...
 * PA? Scrape? Done once centrally or per team? Automating this as a recurring job?
* Lazy load images?
 * https://github.com/yuanyan/react-image

Other stuff to do:
* Fill out other content, (even if just placeholder,) such as fixtures, teams/players, etc.
* Allow Editing of content, such as fixtures, players, ticket prices
* Adding in the player details and such for real, from the EFL export
* Putting in traffic monitoring
* Putting in advertising
* Finalizing layouts
* Cookie warnings and any other legal stuff like privacy policy
* Code cleanup and TODO's

Pulling Data:
* Per team pages have links to their results and fixtures, e.g.:
 * http://www.bbc.com/sport/football/teams/dagenham-and-redbridge/results
 * http://www.bbc.com/sport/football/teams/dagenham-and-redbridge/fixtures
 * Need to parse these whole pages
* Can look at the full list of data per competition, then have to parse out per team, e.g.:
 * http://www.bbc.com/sport/football/fixtures calls http://www.bbc.com/sport/football/fixtures/partial/competition-118996118?structureid=5&dateTimeNow=20170305 for National League fixtures
 * Similarly just for the National League table: http://www.bbc.com/sport/football/tables/partial/118996118?structureid=5&dateTimeNow=20170305
 * Have to parse per team, and find all competitions

Cleanup dependencies?
* uuid
* moment
* react-foundation
