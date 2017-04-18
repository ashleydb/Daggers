import React from 'react';
import ReactDOM from 'react-dom';
var Foundation = require('foundation-sites');
import Player from 'Player';

export default class Dialog extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
        // BINDING: Keep 'this' scoped to this object in any handlers
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
        this.loadedFoundation = false;
    }

    static open(props) {
        console.log('Dialog.open');
        //var popup = new Foundation.Reveal($('#popup-modal'));
        //popup.open();

        this.$dialog = $('#my-dialog');
        //this.$dialog = new Foundation.Reveal($('#my-dialog'));

        if (!this.$dialog.length) {
            //this.$dialog = $('<div id="my-dialog" class="reveal-modal" data-reveal role="dialog"></div>')
            //    .appendTo('body');
            this.$dialog = $('<div class="reveal" id="my-dialog" data-reveal></div>')
                .appendTo('body');
        }

        //$(document).foundation();
        if (!this.loadedFoundation) {
            this.$dialog.foundation();
            this.loadedFoundation = true;
        }

        //this.$dialog.foundation('reveal', 'open');
        //this.$dialog.open();
        this.$dialog.foundation('open');

        var { title, type, id } = props;
        return ReactDOM.render(
            <Dialog close={this.close.bind(this)} title={title} type={type} id={id} />,
            this.$dialog[0]
        );
    }
    static close() {
        if (!this.$dialog || !this.$dialog.length) {
            return;
        }

        ReactDOM.unmountComponentAtNode(this.$dialog[0]);
        //this.$dialog.foundation('reveal', 'close');
        this.$dialog.foundation('close');
    }

    render() {
        var { title, type, id } = this.props;
        var content = "";
        switch (type) {
            case 'PLAYER':
                content = <Player id={id} />
                break;
        };
        return (
            <div>
                <div className="content">
                    {content}
                </div>
                <button className="close-button" aria-label="Close modal" type="button" onClick={this.props.close} data-close>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
};
