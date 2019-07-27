import React from 'react';

// National League Video Player. Renders a video player from Pitchero.

class PitcheroVideoPlayer extends React.Component {
    constructor(props) {
        super(props);
    
        this.videoPlayerScript = null;
    }
    
    componentDidMount() {
        this.videoPlayerScript = this.loadScript();
    }

    componentWillUnmount() {
    }

    loadScript() {
        //<script src="//player.performgroup.com/eplayer.js#78d4987de530194c9c9ff83b20.rywmih1gu61g1r2v2f4e59w8q" async></script>

        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//player.performgroup.com/eplayer.js#78d4987de530194c9c9ff83b20.rywmih1gu61g1r2v2f4e59w8q';
        
        return this.instance.appendChild(s);
    }

    render() {
        return <div ref={el => (this.instance = el)} />;
    }
}

export default PitcheroVideoPlayer;
