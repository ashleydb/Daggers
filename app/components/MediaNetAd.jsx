import React from 'react';

// Displays Media.Net ads.

/*
// Example Usage:

// This is the code that Media.Net gives you for an Ad Unit.
// Put this in the body of a separate html file, e.g. 'ad-medianet-332x280.html'.
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

// In a React Component add the following:
import MediaNetAd from 'MediaNetAd';

// Then add this component wherever you want to show an ad, getting the values from your Media.Net code.
// Note that the props are all optional, the values shown here are the defaults.
<MediaNetAd 
    width={336}
    height={280}
    src={'ad-medianet-332x280.html'}
/>
*/

export default class MediaNetAd extends React.Component {
  constructor(props) {
    super(props);
  }
//   shouldComponentUpdate(nextProps, nextState) {
//     return false;
//   }
  render() {
    var width = this.props.width || 336;
    var height = this.props.height || 280;
    var src = this.props.src || 'ad-medianet-332x280.html';
    
    return (
      <iframe frameBorder="0" style={{ width: width, height: height}} src={src}></iframe>
    );
  }
}
