Daggers

Website for Dagenham & Redbridge FC

Demo at http://dry-lake-73482.herokuapp.com/

Clone this code, call yarn install, then run this in a server using:
  NODE_ENV=production npm start

To Do:
* Fix images not updating when paging through news, (is it because of lazy load?)
* Code cleanup, (remove console logging,) and TODO's
* Add caching to server, (e.g. to News, like I've done with Table data)

Nice to Have:
* Add a customizable background image, (so you can see it on the sides.)
* Structured Data for Search Results, (see Google IO 2017 Notes in Google Docs)
* Fix react warnings about PropTypes, (if possible. Seems to be from a dependency.)
* Need SSL?
  * https://cloud.google.com/appengine/docs/flexible/nodejs/using-custom-domains-and-ssl?hl=fr
  * https://www.npmjs.com/package/letsencrypt
  * https://git.daplie.com/Daplie/greenlock-express
  * https://stackoverflow.com/questions/7185074/heroku-nodejs-http-to-https-ssl-forced-redirect
  * Document prod settings?
* Heroku image uploading now working, (need to fix Google authentication)
 * https://developers.google.com/accounts/docs/application-default-credentials
* Image uploading bug, (list doesn't work if it is empty and you are uploading the first image?)
* Admin Authentication & Authorization
 * Store the token on the client end, e.g. localStorage or a cookie, so you can refresh the browser and still be logged in.
 * Check if the token is expired, or will soon, on the client so the user doesn't lose their work?
 * Change the Auth.js model to use a DB with hashed passwords, not env vars.
* Putting in (more detailed) traffic monitoring
* Storing Secrets
 * https://cloud.google.com/kms/docs/secret-management

Cleanup dependencies?
* uuid
* moment
* react-foundation
