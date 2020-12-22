import React from 'react';
//import SweetAlert from 'react-redux-sweetalert2';
//import {Helmet} from "react-helmet";
import Layout from '../components/Layout';

class Index extends React.Component {
  // Need to override the constructor to set the initial state and do data binding
  constructor(props) {
      // Call the parent constructor with the props object we automatically get
      super(props);
  }

  render() {
    return (
      <Layout>Hello there</Layout>
    );
  }
}

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//     //store.dispatch(action_initialCards());
// })

// const mapDispatchToProps = (dispatch) => {
//     return {
//         //action_initialCards: bindActionCreators(action_initialCards, dispatch),
//         //action_addItem: bindActionCreators(action_addItem, dispatch)
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         //cards: state.cards
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Index);
export default Index;