import React from 'react';
import ReactDOM from 'react-dom';
import Page from 'Page';

export default class Class extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    componentDidMount() {
        ReactDOM.findDOMNode(this._contentTop).scrollIntoView();
    }
    render() {
        return (
            <div>
                <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
                <div className="row">
                    <div className="columns small-12">

                        <Page pageId='Vanarama' />

                    </div>
                </div>
            </div>
        );
    }
}
