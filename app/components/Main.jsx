import React from 'react';
import SweetAlert from 'react-redux-sweetalert2';
import Nav from 'Nav';

//Basic presentational component that would only have a render function
// rewritten using arrow functions from ES6.
var Main = (props) => {
  return (
    <div>
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
