var React = require('react');

//Basic presentational component that would only have a render function
// rewritten using arror functions from ES6.
var Commercial = (props) => {
  return (
    <div>
      <h1 className="text-center page-title">Commercial</h1>
      <p>D&amp;R FC Commercial</p>
          <p>Club Shop
            Mascots
            Player Kit Sponsorship
            Matchday Hospitality
            Advertising
            Club Sponsors
            Commercial Brochure</p>
    </div>
  );
}

module.exports = Commercial;
