var React = require('react');

// TODO: All content on this page.

//Basic presentational component that would only have a render function
// rewritten using arror functions from ES6.
var Commercial = (props) => {
  return (
    <div>
      <h1 className="text-center page-title">Commercial</h1>
      <p>D&amp;R FC Commercial</p>
          <ul>
              <li>Club Shop</li>
              <li>Mascots</li>
              <li>Player Kit Sponsorship</li>
              <li>Matchday Hospitality</li>
              <li>Advertising</li>
              <li>Club Sponsors</li>
              <li>Commercial Brochure</li>
          </ul>
    </div>
  );
}

module.exports = Commercial;
