import React ,{useState} from 'react';
import { Row,Col, Container } from 'react-bootstrap'
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

var sessionstorage = require('sessionstorage');


export default function Index() {

  // const [value ,setValue] = React.useState({});
  const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });
    let history  =new useHistory();

    let d = window.location.pathname.slice(7);
    console.log("current url : ",sessionstorage.getItem('camp'));
    
    // setValue(d);

    console.log("token in login ",sessionstorage.getItem('token'))

    

    function onSubmit(data)
    {
      
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
          // console.log(response.data.message);
          

          

          sessionstorage.setItem("token",response.data.token);
          sessionstorage.setItem("customerId",response.data.id);

          if((response.data.message === 'loggedin') && ( sessionstorage.getItem('camp') === ('events-creation' || 'staticPosts' || 'million-posts')) )
          {
            // window.location.href= siteUrl+'/'+sessionstorage.getItem('camp');
            console.log("url", window.location.href= siteUrl+'/'+sessionstorage.getItem('camp'))
            // history.go(0)
           
          }

          if(response.data === "Email Not verified")
          {
            toast.warning("Verify EmailId !");
            history.push('/login')
          }

          if(response.data.message === "user not found")
          {
            toast.error("Check email-id and password !!");
            history.push('/login')
          }
          
         
          
          if(response.data.message !== 'loggedin')
          {
            console.log(" no home");
            toast.error("Check email-id and password !!");
            history.push('/login')
            
          }
          else if((response.data.message === 'loggedin') && ( sessionstorage.getItem('list')=== ('standard-list' || 'customized-list')) )
          {
            history.push('/'+sessionstorage.getItem('list'));
            // history.go(0)
            console.log(" package list");
          }
          else if((response.data.message === 'loggedin') && (sessionstorage.getItem('request') !== null) )
          {
            window.location.href= siteUrl+sessionstorage.getItem('request');
            // history.go(0)
            console.log("request url");

          }
          else{
            history.push('/')
            history.go(0)
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

    <Container className='' >
      
      <Row >

           
                
                <Col xl={6} sm={12} md={12} xxl={6} className='py-5 my-5'>

                <Parallax speed={-3} >  
                  <img src={require('../../assets/images/login.png')} height={500} width={500} alt="hands" />
                </Parallax>
                </Col>

                <Col xl={6} sm={12} md={12} xxl={6} className='py-5 my-5'>
                  
                  <Parallax speed={-3}>
                    <h6 className='heading'>Login</h6>
                    <p className='para-content'>Come To The Fold And More Jesus Viral</p>
                    
                    <Form onSubmit={handleSubmit(onSubmit)}>
                       

                        <Row>
                            <Col sm={12} md={12} xl={12} xxl={12}>  <input placeholder="Email" type="email" {...register("email" , { required: true })} className='textbox login-box'/> </Col>
                            
                        </Row>

            

                        <Row>
                            <Col sm={12} md={12} xl={12} xxl={12}>  <input placeholder="Password" type="password" {...register("pass" , { required: true })} className='textbox login-box'/> </Col>
                            
                        </Row>

                        <Row className='extraRowSpace'>
                          <Buttons text="Login" type="submit" />
                        </Row>
                        
                        

                        <Row align="center" >
                          <Col> To Become New User? &nbsp;
                          <Link to='/registration'>Register</Link></Col>
                        </Row>

                        <Row align="center" >
                         
                          <Link to='/forgot_password'>forgot password</Link>
                        </Row>
            
                      
                    
                    </Form>


                    </Parallax>
                </Col>
             
            </Row>
            
            </Container>
            <ToastContainer />
  </>
  );
}