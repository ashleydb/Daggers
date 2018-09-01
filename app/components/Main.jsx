import React from 'react';
import SweetAlert from 'react-redux-sweetalert2';
import CookieBanner from 'react-cookie-banner';
import Nav from 'Nav';

//Basic presentational component that would only have a render function
// rewritten using arrow functions from ES6.
var Main = (props) => {
  var SHOW_DONATE_BANNER = false;
  var donateBanner = SHOW_DONATE_BANNER ? (
    <a href="https://www.daggers-shop.co.uk/donate"
      title="Please support us by donating"
      className="donate">
      Support Us. Please Donate
    </a>
  ) : ' ';

  return (
    <div>
      <CookieBanner
        message='This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies. Find out more here.'
        link={{ msg: 'Cookie Policy', url: '/page/PrivacyPolicy' }}
        onAccept={() => {}}
        cookie='user-has-accepted-cookies'
        styles={{
          banner: { height: 'auto' }
        }} />
      {donateBanner}
      <Nav/>
      <div className="row">
        <div className="small-centered columns">
          {props.children}
        </div>
      </div>
      <SweetAlert />
    </div>
  );
}

module.exports = Main;
