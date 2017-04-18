import React from 'react';

// TODO: All content on this page.

export default class Commercial extends React.Component {
  // Need to override the constructor to set the initial state and do data binding
  constructor(props) {
    // Call the parent constructor with the props object we automatically get
    super(props);
  }
  render() {
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
}
