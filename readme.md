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
* Uploading images in Production env. (Can't do it directly with Heroku, would need to go to S3 or similar.)
* Listing images already on the server, (does it work in prod?)
* Connecting to a DB
 * https://webapplog.com/express-js-4-node-js-and-mongodb-rest-api-tutorial/
 * https://github.com/azat-co/rest-api-express/blob/master/express.js
 * https://www.digitalocean.com/community/tutorials/how-to-deploy-a-node-js-and-mongodb-application-with-rancher-on-ubuntu-16-04
 * https://www.digitalocean.com/community/tutorials/how-to-connect-node-js-to-a-mongodb-database-on-a-vps
* Hosting in a production ready setup. AWS, Heroku, something else?
 * https://www.digitalocean.com/community/tutorials/how-to-deploy-a-node-js-and-mongodb-application-with-rancher-on-ubuntu-16-04
  * https://www.npmjs.com/package/letsencrypt
  * https://git.daplie.com/Daplie/greenlock-express
  * https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04
* Paging content
* Authentication & Authorization for editing content (website frontend side and API backend side)
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
