import React from 'react';

// Displays Google AdSense ads.

/*
// Example Usage:

// First, put this in the index.html
<head>
...
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js">/script>
</head>

// Then in a React Component add the following:
import GoogleAd from 'GoogleAd';

// Create a style object that is applied to the div wrapping the adSense code.
// No actual styling required - just leave style object empty.
const style = {
  marginTop: '15px',
  marginBottom: '20px'
};

// Render this within a component
<GoogleAd 
    client="ca-pub-xxxxxxxxxx" 
    slot="xxxxxxxxxx" 
    format="auto" 
    wrapperDivStyle={style}
/>
*/

export default class GoogleAd extends React.Component {
//   static propTypes = {
//     client: PropTypes.string,
//     slot: PropTypes.string,
//     format: PropTypes.string,
//     wrapperDivStyle: PropTypes.object
//   }
  constructor(props) {
    super(props);
  }
  // This code runs when the component mounts
  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
  render() {
    return (
      <div style={this.props.wrapperDivStyle} > 
        <ins className="adsbygoogle"  
          style={{'display': 'block'}}
          data-ad-client={this.props.client}
          data-ad-slot={this.props.slot}
          data-ad-format={this.props.format}>
        </ins>
      </div>
    );
  }
}
