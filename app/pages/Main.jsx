import React from 'react';
import SweetAlert from 'react-redux-sweetalert2';
import CookieBanner from 'react-cookie-banner';
import {Helmet} from "react-helmet";
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
      <Helmet
          defaultTitle="Dagenham &amp; Redbridge FC"
          titleTemplate="%s | Dagenham &amp; Redbridge FC"
      >
          <meta name="description" content="Home of D&amp;R Football Club in London. Digger Dagger, Digger Dagger, Oi Oi Oi!" />

          {/*<!--  Essential META Tags -->*/}
          <meta property="og:title" content="Dagenham &amp; Redbridge FC" />
          <meta property="og:description" content="Home of D&amp;R Football Club in London. Digger Dagger, Digger Dagger, Oi Oi Oi!" />
          <meta property="og:image" content="https://daggers.storage.googleapis.com/basics/News-Generic2_169.jpg" />
          <meta property="og:url" content="https://www.daggers.co.uk/" />
          <meta name="twitter:card" content="summary_large_image" />


          {/*<!--  Non-Essential, But Recommended -->*/}
          <meta property="og:site_name" content="Dagenham &amp; Redbridge FC" />
          <meta name="twitter:image:alt" content="Dagenham &amp; Redbridge FC" />
          <meta property="og:type" content="article" />

          {/*<!--  Non-Essential, But Required for Analytics -->*/}
          {/*<meta property="fb:app_id" content="your_app_id" />*/}
          <meta name="twitter:site" content="@dag_redfc" />
      </Helmet>
      <CookieBanner
        styles={{banner: { height: 'auto' }}}
        message={'This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies. Find out more here.'}
        link={<a href='/page/PrivacyPolicy'>Cookie Policy</a>}
        buttonMessage='Close'
        cookie='user-has-accepted-cookies'
        dismissOnScroll={false}
        dismissOnClick={true}
        onAccept={() => {}}
      />
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
