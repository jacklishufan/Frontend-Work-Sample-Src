import react from 'react'
import '../css/moodboard.css'
import React, { Component } from 'react'
import { useHistory } from "react-router-dom";
import bg from '../assets/images/bg.jpg'
import {Container,Row,Col,Button} from 'react-bootstrap'
import {EMOJI_LST } from './constants'
import Disclaimer from "./disclaimer"

function EmojyCircle({text,image}) {
    let history = useHistory();
    return (

            <Col md={3} className="mood-borad-emoji-col" onClick = {()=>history.push('/mood/'+text.substring(1))}>
    
                <div className="mood-borad-emoji">
                <img src={image}></img>
                </div>
     
                <div>{text}</div>
           
            </Col>

    )
}

function MoodBoard() {
    return (
        <Container className="moodboard-container">

            <Row>
                            
                <img src={bg} className="moodboard-bg"/>
                <Row className="moodboard-header-row">
                    <Col md={4} sm={12}>
                    <span className="moodboard-text">Mood Board</span>
                    </Col>
                    <Col md={4} sm={12}>
                   
                    </Col>
                    <Col md={4} sm={12}>
                    <Button variant="outline-secondary" className="moodboard-exercies-button">Take me to self exercise</Button>
                    </Col>
                    
                </Row>
                </Row>

            <Row className="moodboard-guide-1">
                <div> Find your <span style={{color:"#98AECA"}}>emotion community</span> and read <span style={{color:"orange"}}> top-hit stories</span> happening this week on UC Berkeley campus!</div>
            </Row>

            <Row className="moodboard-emoji-area">
                {
                    EMOJI_LST.map(ele=><EmojyCircle text={'#'+ele[0]} image={ele[2]}/>)
                }
                {/* <EmojyCircle text="s"
                image={IMG_ANGRY}/>
                                <EmojyCircle text="s"
                image={IMG_ANGRY}/>
                                <EmojyCircle text="s"
                image={IMG_ANGRY}/>
                                <EmojyCircle text="s"
                image={IMG_ANGRY}/> */}
            </Row>
                <Row className="">
                    <Disclaimer/>
                </Row>
        </Container>
    )
}

export default MoodBoard