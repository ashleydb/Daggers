var React = require('react');

//Basic presentational component that would only have a render function
// rewritten using arror functions from ES6.
var Club = (props) => {
  return (
    <div>
      <h1 className="text-center page-title">Club</h1>
      <p>D&amp;R FC Club</p>
          <p>Business Finder
            Visit Us
            History
            Customer_Charter
            Stadium
            Club Directory
            Club Records
            Previous Managers
            Ground Regulations
            Media
            Function Room Hire
            Work related learning</p>
    </div>
  );
}

module.exports = Club;
