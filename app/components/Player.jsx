import React from 'react';

export default class Player extends React.Component {
    componentWillMount() {
        this.loadPlayer(this.props.id);
    }
    loadPlayer(id) {
        this.setState({
            id: id,
            name: "Oliver Hawkins",
            image: "/images/player-head.jpg",
            position: "Striker",
            sponsors: [
                {type: "Kit", name: "Paul Gwinn"},
                {type: "Boots", name: "George Portlock"}
            ],
            description: "<p>Oliver joined the Daggers for a record transfer fee in January 2016.</p><p>He began his career at North Greenford United, but it was at Hillingdon Borough where he really began to break through during the 2010/11 season. He followed the manager to Northwood in March 2011 and finished top scorer two seasons running.</p><p>Unsurprisingly Hawkins' excellent form attracted the attention of clubs at higher levels, and the striker duly signed for Hemel Hempstead Town in the summer of 2013. The tall striker spent time at Harrow Borough, before returning and establishing himself as a regular for the Tudors.</p><p>He made his Daggers debut in the home game against Northampton Town in January, scoring his first goal a couple of weeks later at Mansfield Town.</p>"
        });
    }
    render() {
        return (
            <div>
                <h1 id="playerModalHeader">{this.state.name}</h1>
                <img src={this.state.image} alt={this.state.name} className="player-portrait float-right"/>
                <h3>{this.state.position}</h3>
                {this.state.sponsors.map((sponsor, index) => {
                    return (
                        <h5 key={index}>{sponsor.type} sponsored by {sponsor.name}</h5>
                    );
                })}
                <div dangerouslySetInnerHTML={{__html: this.state.description}}></div>
            </div>
        );
    }
};
