var React = require('react');
var Nav = require('Nav');

//Basic presentational component that would only have a render function
// rewritten using arror functions from ES6.
var Main = (props) => {
  return (
    <div>
      <Nav/>
      <div className="row">
        <div className="small-centered columns">
          {props.children}
        </div>
      </div>
    </div>
  );
}

module.exports = Main;
