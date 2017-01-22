var React = require('react');

//Basic presentational component that would only have a render function
// rewritten using arror functions from ES6.
var Team = (props) => {
  return (
    <div>
      <h1 className="text-center page-title">Team</h1>
      <p>D&amp;R FC Team</p>
          <p>Player Profiles
            Staff Profiles
            Academy
            Academy Staff Profiles
            Scholar Profiles
            Academy U16-U9
            Player Recruitment
            Academy Fixtures
          College Academy</p>
    </div>
  );
}

module.exports = Team;
