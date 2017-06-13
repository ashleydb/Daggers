Two sections:

* Files to upload to a cloud storage provider
 * In our case we have been using Google Cloud Storage, so there are URLs like this in the code:
  * 'https://daggers-demo-eu.storage.googleapis.com' + '/some/file.jpg'
 * These are the basics, but there may be a lot more historical data.
* Helper code for dealing with uploading data to Firebase
 * See the /tools/ folder
