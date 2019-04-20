import React, { Component } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import FooterBarNav from './FooterBarNav'
import AnimalCard from './AnimalCard'
import ClosingInformationCard from './ClosingInformationCard'
import OpeningInformationCard from './OpeningInformationCard'

// import Swiper from 'react-id-swiper';
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import './../../App.css'

class AnimalCardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showStore: true,
            cards: [
                {   
                    id: 0, 
                    name: "Vitalik", // let user set this on first buy
                    age: 12,
                    lineage: "african",
                    weight : 900,
                    is_female: false,
                    img_source_url: "myurl",

                    // Values we will be pulling from chain
                    // hardcoding them for now...
                    price: 100,
                    current_owner: 0x348341035837599834,
                    time_held: 12, //must define if this is hours days etc...
                    highest_price: 12314,
                    revenue_generated: 9
                },
                {   
                    id: 1, 
                    name: "Andrew", // let user set this on first buy
                    age: 12,
                    lineage: "african",
                    weight : 900,
                    is_female: false,
                    img_source_url: "myurl",

                    // Values we will be pulling from chain
                    // hardcoding them for now...
                    price: 100,
                    current_owner: 0x348341035837599834,
                    time_held: 12, //must define if this is hours days etc...
                    highest_price: 12314,
                    revenue_generated: 9
                },
                {   
                    id: 2, 
                    name: "Simon", // let user set this on first buy
                    age: 12,
                    lineage: "african",
                    weight : 900,
                    is_female: true,
                    img_source_url: "myurl",

                    // Values we will be pulling from chain
                    // hardcoding them for now...
                    price: 100,
                    current_owner: 0x348341035837599834,
                    time_held: 12, //must define if this is hours days etc...
                    highest_price: 12314,
                    revenue_generated: 9
                },
                {   
                    id: 3, 
                    name: "Griff", // let user set this on first buy
                    age: 12,
                    lineage: "african",
                    weight : 900,
                    is_female: false,
                    img_source_url: "myurl",

                    // Values we will be pulling from chain
                    // hardcoding them for now...
                    price: 100,
                    current_owner: 0x348341035837599834,
                    time_held: 12, //must define if this is hours days etc...
                    highest_price: 12314,
                    revenue_generated: 9
                },
                {   
                    id: 4, 
                    name: "Anastasia", // let user set this on first buy
                    age: 12,
                    lineage: "african",
                    weight : 900,
                    is_female: true,
                    img_source_url: "myurl",

                    // Values we will be pulling from chain
                    // hardcoding them for now...
                    price: 100,
                    current_owner: 0x348341035837599834,
                    time_held: 12, //must define if this is hours days etc...
                    highest_price: 12314,
                    revenue_generated: 9
                },
                {   
                    id: 5, 
                    name: "Justin", // let user set this on first buy
                    age: 12,
                    lineage: "african",
                    weight : 900,
                    is_female: false,
                    img_source_url: "myurl",

                    // Values we will be pulling from chain
                    // hardcoding them for now...
                    price: 100,
                    current_owner: 0x348341035837599834,
                    time_held: 12, //must define if this is hours days etc...
                    highest_price: 12314,
                    revenue_generated: 9
                },
                {   
                    id: 6, 
                    name: "Michael", // let user set this on first buy
                    age: 12,
                    lineage: "african",
                    weight : 900,
                    is_female: false,
                    img_source_url: "myurl",

                    // Values we will be pulling from chain
                    // hardcoding them for now...
                    price: 100,
                    current_owner: 0x348341035837599834,
                    time_held: 12, //must define if this is hours days etc...
                    highest_price: 12314,
                    revenue_generated: 9
                },
                {   
                    id: 7, 
                    name: "Gustav", // let user set this on first buy
                    age: 12,
                    lineage: "african",
                    weight : 900,
                    is_female: true,
                    img_source_url: "myurl",

                    // Values we will be pulling from chain
                    // hardcoding them for now...
                    price: 100,
                    current_owner: 0x348341035837599834,
                    time_held: 12, //must define if this is hours days etc...
                    highest_price: 12314,
                    revenue_generated: 9
                },
                {   
                    id: 8, 
                    name: "George", // let user set this on first buy
                    age: 12,
                    lineage: "african",
                    weight : 900,
                    is_female: false,
                    img_source_url: "myurl",

                    // Values we will be pulling from chain
                    // hardcoding them for now...
                    price: 100,
                    current_owner: 0x348341035837599834,
                    time_held: 12, //must define if this is hours days etc...
                    highest_price: 12314,
                    revenue_generated: 9
                },
                {   
                    id: 9, 
                    name: "Sean", // let user set this on first buy
                    age: 12,
                    lineage: "african",
                    weight : 900,
                    is_female: false,
                    img_source_url: "myurl",

                    // Values we will be pulling from chain
                    // hardcoding them for now...
                    price: 100,
                    current_owner: 0x348341035837599834,
                    time_held: 12, //must define if this is hours days etc...
                    highest_price: 12314,
                    revenue_generated: 9
                },

            ]
        }
    }

    renderCards() {
        const cardStyle = {
            backgroundColor: "#2a3132",
            height: '80vh',
            marginTop: '20px'
        }
        return this.state.cards.map((specificCard, index) => {
            return (
                <div key={'mykey' + index}>
                    <AnimalCard Rhino={specificCard}/>
                </div>
            );
        });
    }

    render() {

        const params = {
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            }
        };

        const containerViewPort = {
            backgroundImage: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
            width: '100%',
            height: '100vh',
            position: 'absolute',
            top: 0,
            left: 0
        }

        return (

            <div style={containerViewPort}>
            {/* div> */}
                <Swiper {...params}>
                    <div key={'finalkey'}>
                        <OpeningInformationCard/>  
                    </div>           
                    {this.renderCards()}     
                    <div key={'finalkey'}>
                        <ClosingInformationCard/>  
                    </div>           
                </Swiper>
                <FooterBarNav />
            </div>
        );
    }
}

AnimalCardContainer.propTypes = {
    // someprop: PropTypes.object.isRequired,
};

export default AnimalCardContainer;