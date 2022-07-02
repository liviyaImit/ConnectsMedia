import React ,{useState} from 'react';
import { Row,Col, Container ,Spinner,Button} from 'react-bootstrap'
import Parallax from 'react-rellax'
import { useForm } from 'react-hook-form';
import Buttons from '../../components/Packages/Buttons';
import { Form } from 'react-bootstrap';
import { Link ,useHistory } from 'react-router-dom';
import axios from 'axios'
import { Url,siteUrl } from '../../GLOBAL/global';
import '../../style/login.scss'
import {useLocation} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from '../../components/popUp/Index';
import { flip } from 'react-animations';
import "../MainScreen/index.js";

var sessionstorage = require('sessionstorage');

export default function Index() {

  // const [value ,setValue] = React.useState({});
  const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });
  const [spinner,setSpinner] = React.useState(false);
    let history  =new useHistory();

    let d = window.location.pathname.slice(7);
    console.log("current url : ",sessionstorage.getItem('camp'));
    
    // setValue(d);

    // console.log("token in login ",sessionstorage.getItem('token'))

    function onSubmit(data)
    {
      
      setSpinner(true);
      // console.log(data);
     let formdata = new FormData();
     formdata.append('email',data.email);
     formdata.append('password',data.pass);
     

     
          const headers ={
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods': 'post'
          }

        axios({
        method: 'post',
        url: Url+'login',
        data: formdata,
        headers: headers
        })
        .then(function (response) {
          //handle success
          console.log(response.data);
          

          setSpinner(false);

          sessionstorage.setItem("token",response.data.token);
          sessionstorage.setItem("customerId",response.data.id);

          if((response.data.message === 'loggedin') && ( sessionstorage.getItem('camp') === ('events-creation' || 'staticPosts' || 'million-posts')) )
          {
            window.location.href= siteUrl+'/'+sessionstorage.getItem('camp');
            // console.log("url", window.location.href= siteUrl+'/'+sessionstorage.getItem('camp'))
            history.go(0)
           
          }

          if(response.data === "Email Not verified")
          {
            toast.warning("Verify your Email !");
            // <Popup msg="Verify EmailId !" color="yellow" />
            setTimeout(() => history.push('/login'),3000 ) 
          }

          if(response.data.message === "user not found")
          {
            toast.error("Check email-id and password !!");
            
            setTimeout(() => history.push('/login'),3000 ) 
          }
          
         
          
          if(response.data.message !== "loggedin")
          {
            console.log(" no home");
            toast.error("Check email-id and password !!");
            
            setTimeout(() => history.push('/login'),3000 ) 
            
          }
          else if((response.data.message === 'loggedin') && ( sessionstorage.getItem('list')=== ('standard-list' || 'customized-list')) )
          {
            setTimeout(() => history.push('/'+sessionstorage.getItem('list')),3000 ) ;
            // history.go(0)
            // console.log(" package list",sessionstorage.getItem('list'));
          }
          else if((response.data.message === 'loggedin') && (sessionstorage.getItem('request') !== null) )
          {
            window.location.href= siteUrl+sessionstorage.getItem('request');
            // history.go(0)
            // console.log(siteUrl+sessionstorage.getItem('request'));
            console.log("request url");

          }
          else{
            history.push('/dashboard');
            // history.go(0);
            console.log(" home");
          }
          
        
          
      })
      .catch(function (response) {
          //handle error
          console.log(response);
      });
    
    }

  return (
  
  <>

    <Container className='login' >
      
      <Row >

           
                
                <Col xl={6} sm={12} md={12} xxl={6} className='py-5 my-5'>

                <Parallax speed={-3} >  
                  <img src={require('../../assets/images/login.png')} height={"auto"} width={"100%"} alt="hands" />
                </Parallax>
                </Col>

                <Col xl={6} sm={12} md={12} xxl={6} className='py-5 my-5 m-20 login-box-wrap' >
                  
                  <Parallax speed={-3}>
                    <h6 className='heading'>Login</h6>
                    <p className='para-content'>Come To Fold And Make Jesus Viral</p>
                    
                    <Form onSubmit={handleSubmit(onSubmit)}>
                       

                        <Row>
                            <Col sm={12} md={12} xl={12} xxl={12}>  <input placeholder="Email" type="email" {...register("email" , { required: true })} className='textbox login-box'/> </Col>
                            
                        </Row>

            

                        <Row>
                            <Col sm={12} md={12} xl={12} xxl={12}>  <input placeholder="Password" type="password" {...register("pass" , { required: true })} className='textbox login-box'/> </Col>
                            
                        </Row>
                      

                        <Row className='extraRowSpace'>
                       
                       {(!spinner ===false )? (<> <Buttons text="Login" type="submit" disabled={true}/> {spinner && 
                      <Spinner
                    
                      style={{marginLeft:'56%',marginTop:'-3.5rem'}}
                        animation="border"
                        
                        role="status"
                        
                      >
                  
                    </Spinner>} </>)
                
                      : (<><Buttons text="Login" type="submit" />{ spinner && 
                      <Spinner
                 
                   
                        animation="border"
                        
                        role="status"
                        
                      >
                  
                    </Spinner> }</>)
                
                }
                       
                        </Row>

                        </Form>
                        
                        

                        <Row align="center" >
                          <Col className=''> Not a User? &nbsp;
                          <Link className='bold-text' to='/registration' style={{color:'#000'}}>Register</Link></Col>
                        </Row>

                        <Row align="center" >
                         
                          <Link to='/forgot_password' style={{color:'#000'}}>Forgot Password</Link>
                        </Row>
            
                      
                    
                   


                    </Parallax>
                </Col>
             
            </Row>

            
            
            </Container>
            
            <ToastContainer position="top-center"  style={{marginTop:'50vh'}}/>
  </>
  );
}