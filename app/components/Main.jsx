var React = require('react');

//Basic presentational component that would only have a render function
// rewritten using arror functions from ES6.
var Main = (props) => {
  return (
    <div>
      <div className="row">
        <div className="small-centered medium-6 large-4 columns">
          <p className="text-center">Daggers</p>
          {props.children}
        </div>
      </div>
    </div>
  );
}

module.exports = Main;
