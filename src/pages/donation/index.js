

import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { Form,Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ElementsConsumer, CardElement ,useElements,useStripe ,} from "@stripe/react-stripe-js";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Givenow from './Give';
import { useHistory } from 'react-router-dom';
import { Url } from '../../GLOBAL/global';

export default function Index() {
    const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });
    const [spinner,setSpinner] = React.useState(false);
    
    const stripePromise = loadStripe("pk_live_51KlNyrDp5HAOMMnMOfq5yKAHtb3WHJZyNLO6YK1so2QeT7gkDdqmHh15HH9A9UDdzMLTjdIyWQxFWTKz4QhWZHV800AA2sYk40");

    let history = useHistory();
    const CARD_ELEMENT_OPTIONS = {
        style: {
          base: {
            color: "black",
            fontSize: "16px",
            fontFamily: "sans-serif",
            fontSmoothing: "antialiased",
            "::placeholder": {
              color: "black"
            }
          },
          invalid: {
            color: "#e5424d",
            ":focus": {
              color: "#303238"
            }
          }
        }
      };

   


  return (
    <div className='body-three'>
  <div className='give-box'>
    <div className="give-box-child">

    <Elements  stripe={stripePromise}  >

    <div className="give-box-sub-child">
    <h1>You have a great opportunity to sow in the kingdom work</h1>

                        <Givenow />
                        </div>
                        </Elements>
                        </div>

                        <img src={require('../../assets/imgs/donation1.jpg')} alt="Give Now"/>
  </div>

  </div>

    // <Container>

    //     <div className='give-box'>
    //         <Row >
    //             <div className='main-div-donate'> 
    //             <Col sm={12} md={6} xl={6} xxl={6}  style={{backgroundImage:require('../../assets/imgs/dash-bg.jpg')}}>
                    
                        

    //                     <Elements stripe={stripePromise}  >
    //                          <Givenow/>
    //                     </Elements>

                        

    //             </Col>

    //             <Col sm={12} md={6} xl={6} xxl={6} >
    //                 <img src={require('../../assets/imgs/give-bg.jpg')} style={{objectFit:'contain',width:' -webkit-fill-available'}}/>
    //             </Col></div>

    //         </Row>
    //     </div>
    // </Container>
  )
}


//  add stripe_id in checkout form