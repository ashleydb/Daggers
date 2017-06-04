import React from 'react';

// Displays Media.Net ads.

/*
// Example Usage:

// First, put this in the index.html
<head>
...
 <script> ????
</head>

// Then in a React Component add the following:
import MediaNetAd from 'MediaNetAd';

// Render this within a component, getting the values from your Media.Net code
<MediaNetAd 
    width={336}
    height={280}
    crid={482223462}
    version={111299}
/>
*/

// This is the code that Media.Net gives you for an Ad Unit
/*
<script id="mNCC" language="javascript">
   medianet_width = "336";
   medianet_height = "280";
   medianet_crid = "482223462";
   medianet_versionId = "111299";
   (function() {
       var isSSL = 'https:' == document.location.protocol;
       var mnSrc = (isSSL ? 'https:' : 'http:') + '//contextual.media.net/nmedianet.js?cid=8CUM55E8A' + (isSSL ? '&https=1' : '');
       document.write('<scr' + 'ipt type="text/javascript" id="mNSC" src="' + mnSrc + '"></scr' + 'ipt>');
   })();
</script>
*/

export default class MediaNetAd extends React.Component {
  constructor(props) {
    super(props);
  }
  // This code runs when the component mounts
  componentDidMount() {
    var medianet_width = this.props.width;
    var medianet_height = this.props.height;
    var medianet_crid = this.props.crid;
    var medianet_versionId = this.props.version;
    // (function() {
    //     var isSSL = 'https:' == document.location.protocol;
    //     var mnSrc = (isSSL ? 'https:' : 'http:') + '//contextual.media.net/nmedianet.js?cid=8CUM55E8A' + (isSSL ? '&https=1' : '');
    //     document.write('<scr' + 'ipt type="text/javascript" id="mNSC" src="' + mnSrc + '"></scr' + 'ipt>');
    // })();
  }
  render() {
    return (
      <script id="mNCC"></script>
    );
  }
}
