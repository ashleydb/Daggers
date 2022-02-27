import React from 'react';
import ReactDOM from 'react-dom';
import Page from 'Page';
//import HubspotForm from 'react-hubspot-form'

// TODO: All content on this page.

export default class Class extends React.Component {
    // Need to override the constructor to set the initial state and do data binding
    constructor(props) {
        // Call the parent constructor with the props object we automatically get
        super(props);
    }
    componentDidMount() {
        ReactDOM.findDOMNode(this._contentTop).scrollIntoView();
    }
    // render() {
    //     return (
    //         <div>
    //             <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
    //             <div className="row">
    //                 <div className="columns small-12">

    //                     <Page pageId='Vanarama' />

    //                 </div>
    //             </div>
    //             <div className="row">
    //                 <div className="columns small-12">

    //                     <HubspotForm
    //                         portalId='4630307'
    //                         formId='db2fccad-65ee-415f-831d-5ab974b081d5'
    //                     />

    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
    render() {
        // return (
        //     <div>
        //         <div id="contentTop" name="contentTop" ref={(ref) => this._contentTop = ref} />
        //         <div className="row">
        //             <div className="columns small-12">

        //                 <Page pageId='Vanarama' />

        //             </div>
        //         </div>
        //         <div className="row">
        //             <div className="columns small-12">

        //                 <HubspotForm
        //                     portalId='4630307'
        //                     formId='db2fccad-65ee-415f-831d-5ab974b081d5'
        //                 />

        //             </div>
        //         </div>
        //     </div>
        // );
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
