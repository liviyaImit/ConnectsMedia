import React from 'react'
import { Container,Row,Col} from 'react-bootstrap'
import { AiOutlineMail } from "react-icons/ai"; 
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai"; 
import { FaYoutube } from "react-icons/fa";
import '../../style/main.scss'
import Parallax from 'react-rellax'

export default function index() {
    return (
        <div>      
        <Parallax speed={-3.2}>
        <Row className=' footer-div margin-top-10rm' >
        <Col sm={12} md={12} xl={2} xxl={2}></Col>
        <Col sm={12} md={12} xl={2} xxl={8} className=' footer-div py-5'>

            <div className=' footer-icons'>
                 <AiOutlineMail />
                 <FaFacebookF />
                 <AiOutlineInstagram />
                 <FaYoutube />
            </div>
            <p style={{fontWeight:'200',marginTop:'1rem'}}>@Connectmedianetworks | All Rights Reserved</p>
             
        </Col>
        <Col sm={12} md={12} xl={2} xxl={2}></Col>
    </Row>
    </Parallax>
    </div>

    )
}
