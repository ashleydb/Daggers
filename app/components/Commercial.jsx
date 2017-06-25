import React from 'react';
import Page from 'Page';
import MedianetTag from 'MedianetTag';

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
          <div className="row">
              <div className="columns small-12 large-8">

                  <Page pageId='Commercial' />

              </div>
              <div className="columns small-12 large-4">
                  <div className="placeholder-ad">
                      <MedianetTag cid="8CUM55E8A" crid="513062281" size="300x250" divId = "513062281"/>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}
