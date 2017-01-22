var React = require('react');

//Basic presentational component that would only have a render function
// rewritten using arror functions from ES6.
var Tickets = (props) => {
  return (
    <div>
      <h1 className="text-center page-title">Tickets</h1>
      <p>D&amp;R FC Tickets</p>
          <p>Ticket Information
            Away Tickets
            Season Tickets
            Ticket Office/Club Shop Opening Hours
          Buy Online</p>
    </div>
  );
}

module.exports = Tickets;
