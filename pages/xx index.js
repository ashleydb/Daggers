import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
//import {wrapper, action_initialCards, action_addItem} from '../store/store'
import {wrapper} from '../store/store'
import './index.module.css';
import Card from './Card';

class Index extends React.Component {
    render() {
        var cardList = null;
        if (this.props.cards) {
            cardList = this.props.cards.map((card) => (
                <Card key={card.id} />
            ))
        }
        
        return (
            <div className="App">
                <header className="App-header">
                    <Link href="/page2"><img src="logo.png" className="static-logo" alt="logo" /></Link>
                </header>
                <div className="Grid">
                    {
                        cardList
                    }
                </div>
            </div>
        )
    }
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    //store.dispatch(action_initialCards());
})

const mapDispatchToProps = (dispatch) => {
    return {
        //action_initialCards: bindActionCreators(action_initialCards, dispatch),
        //action_addItem: bindActionCreators(action_addItem, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        //cards: state.cards
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
