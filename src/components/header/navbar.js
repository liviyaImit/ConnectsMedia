import React,{useEffect, useState} from 'react'
import { Container ,Row ,Col} from 'react-bootstrap'
// import '../../style/home.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsList } from "react-icons/bs";
// import { FiUser,FiMenu } from "react-icons/fi";
import { useHistory} from "react-router-dom";
import { fadeInUp } from 'react-animations'
import { StyleSheet, css } from 'aphrodite';
import { Dropdown } from 'react-bootstrap';
import Sidebar from '../sidebar/sidebar';
import Buttons from '../Packages/Buttons';
// import '../../style/button.scss'
import { animateScroll as scroll } from "react-scroll";
import { HashLink as Link} from 'react-router-hash-link';
import { FaUserTie }  from "react-icons/fa";
import axios from 'axios';
import { Url } from '../../GLOBAL/global';
import {MdDashboard} from 'react-icons/md';
var sessionstorage = require('sessionstorage');

// console.log('token is',sessionstorage.getItem('token'));




export default function Navbar(props,id) {

    let history = useHistory();
    const[orderCount,setOrderCount] =React.useState(0);
    const [homePath,setHomePath] = React.useState(false);
  

    console.log("navbar",window.location.pathname)

    useEffect(() => {

        if(window.location.pathname === ('/home'|| '/'))
        {
            setHomePath(true)
        }

       

        const token = sessionstorage.getItem("token");
        const customer_id = sessionstorage.getItem("customerId");

        async function getDatas()
        {
            await axios.get(Url+'ordercount', { headers: { Authorization: `Bearer ${token}`,'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods': 'get' } ,params:{customer_id: customer_id} })
            .then(response => {
                // If request is good...
                console.log(response.data.count);
                setOrderCount(response.data.count);
                // setAlmessages(response.data.data);
                // setLength(allmessages.length)
            })
            .catch((error) => {
                console.log('error ' + error);
            });
        }

        getDatas();

        

      },[]);


    return (
        <>
      
            <section className={'navbar '+ props.className}>
  
    
                        {/* header logo */}
        <div id="page-head">
          <div id="page-logo"><a href="/">
            <img src={require('../../../src/assets/imgs/connect-media-logo.png')}  alt='header-logo-img' onClick={()=>home()}/></a></div>
            <div id="head-filler"></div>
                <div id="user-menu">

                {((sessionstorage.getItem('token')=== null) || (sessionstorage.getItem('token')==="undefined"))  ? (<>
                   
                            
                            
                </>): (<><Dropdown variant="Secondary" id="dropdown-basic " className='menu-btn pointer dash-menu' onClick={() => history.push('/dashboard')}> <MdDashboard size={35} color='white' className='menu-btn pointer'/> </Dropdown></>)}

                           
                </div>
            <div id="page-menu">
              <div id="nav-icon">
                  <span> </span>
                  <span> </span>
                  <span> </span>
                  <span> </span>
                </div>
            </div>
        </div>
        {/* header logo end */}

        {/* side bar dots */}

        <ul id="section-nav">
          <li data-section="intro"><span>Home</span></li>
          <li data-section="video"><span>Video</span></li>
          <li data-section="about"><span>About</span></li>
          <li data-section="pillars"><span>Four Pillars</span></li>
          <li data-section="why"><span>Why Us?</span></li>
          <li data-section="services"><span>Services</span></li>
          <li data-section="packages"><span>Packages</span></li>
          <li data-section="campaigns"><span>Campaigns</span></li>
          <li data-section="faqs"><span>FAQs</span></li>
          <li data-section="give"><span>Give</span></li>
          <li data-section="testimonials"><span>Testimonials</span></li>
          <li data-section="contact"><span>Contact</span></li>
          {((sessionstorage.getItem('token')!== null) && (sessionstorage.getItem('token')!=="undefined"))  ?
           (<></>):(<><li data-section="login" onClick={() => Login()}><span>Login</span></li></>)}
          
        </ul>

         {/* side bar dots */}


        <ul id="header">
          <li id="logo">
          </li>
        </ul>
                    
                
            </section>

            {/* <Container className='profile_div'>
                {console.log("hello")}
            </Container> */}
        </>
      
    )

    

    function profileInfo()
    {
        history.push('/profile');
    }

    // function signout()
    // {
    //     sessionstorage.clear();
    //     history.push('/login');z
    //     history.go(0)
    // }

    function Login()
    {
        console.log("login button")
        history.push('/login');
    }

    function LogOut()
    {
        sessionstorage.clear();
        history.push('/login');
        history.go(0);
    }

    function home()
    {
        history.push('/home');
       
    }

    function homePage()
    {
        console.log('home')
        history.push('/');
    }

    
}