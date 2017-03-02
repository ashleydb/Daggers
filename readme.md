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

Other stuff to do:
* Fill out other content, (even if just placeholder,) such as fixtures, teams/players, etc.
* Allow Editing of content, such as fixtures, players, ticket prices
* Adding in the player details and such for real, from the EFL export
* Putting in traffic monitoring
* Putting in advertising
* Finalizing layouts
* Code cleanup and TODO's
