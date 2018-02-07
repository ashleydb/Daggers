import React from 'react';

// National League Video Player. Renders a video player from Pitchero.

class PitcheroVideoPlayer extends React.Component {
    componentDidMount() {
        //<!-- Put this line just before the closing body tag -->
        //<script type="text/javascript" src="https://cdn.pitchero.com/nl/dagr.js"></script> 

        // TODO: Is there a way to only do this once?
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = 'https://cdn.pitchero.com/nl/dagr.js';
        document.body.appendChild(s);
    }

    render() {
        //<!-- Put this line where you would like the video unit to display -->
        //<div id="ph-vjs-video-highlights"></div>

        return <div id="ph-vjs-video-highlights" />;
    }
}

export default PitcheroVideoPlayer;
