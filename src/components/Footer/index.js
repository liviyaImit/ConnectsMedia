import React from 'react'
import { Container,Row,Col} from 'react-bootstrap'
import { AiOutlineMail } from "react-icons/ai"; 
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai"; 
import { FaYoutube } from "react-icons/fa";
import '../../style/main.scss'

export default function index() {
    return (
      
           <div className='footer-div'>
               <Row>
                   <Col sm={12} md={12} xl={2} xxl={2}></Col>
                   <Col sm={12} md={12} xl={8} xxl={8} className='footer-div py-5'>
                        <AiOutlineMail />
                        <FaFacebookF />
                        <AiOutlineInstagram />
                        <FaYoutube />
                   </Col>
                   <Col sm={12} md={12} xl={2} xxl={2}></Col>
               </Row>

               
           </div>
       
    )
}
