import React from 'react';

// Renders an advertisment from Media.Net
// Usage Examples, (get the values from the script Media.Net provides when creating an Ad)
//  Tower:  <MedianetTag cid="8CUM55E8A" crid="183428731" size="160x600" divId = "183428731"/>
//  Square: <MedianetTag cid="8CUM55E8A" crid="513062281" size="300x250" divId = "513062281"/>
//  Banner: <MedianetTag cid="8CUM55E8A" crid="373432136" size="728x90" divId = "373432136"/>

class MedianetTag extends React.Component {
    componentWillMount() {
        window._mNHandle = window._mNHandle || {};
        window._mNHandle.queue = window._mNHandle.queue || [];
        const medianet_versionId = "121199";
        (() => {
            const sct = document.createElement("script"),
                sctHl = document.getElementsByTagName("script")[0],
                isSSL = 'https:' == document.location.protocol;
            sct.type = "text/javascript";
            sct.async = "async";
            sct.src = `${(isSSL ? 'https:' : 'http:')}//contextual.media.net/dmedianet.js?cid=${this.props.cid}${isSSL ? '&https=1' : ''}`;
            sctHl.parentNode.insertBefore(sct, sctHl);
        })();
    }

    componentDidMount() {
        try {
            const {
                crid,
                size,
                divId
            } = this.props;
            window._mNHandle.queue.push(function() {
                window._mNDetails.loadTag(crid, size, divId);
            });
        } catch (error) {}
    }

    render() {
        return <div id={this.props.divId} />;
    }
}

export default MedianetTag;
