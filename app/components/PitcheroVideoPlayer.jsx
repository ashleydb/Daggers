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
        //<script src="//player.daznservices.com/player.js#21205da4208e48245df5543dae.rywmih1gu61g1r2v2f4e59w8q$dfchid=g781x3oc44fp1lhvt47dzjlco" async></script>

        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//player.daznservices.com/player.js#21205da4208e48245df5543dae.rywmih1gu61g1r2v2f4e59w8q$dfchid=g781x3oc44fp1lhvt47dzjlco';
        
        return this.instance.appendChild(s);
    }

    render() {
        return <div ref={el => (this.instance = el)} />;
    }
}

export default PitcheroVideoPlayer;
