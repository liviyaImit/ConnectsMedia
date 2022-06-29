import React,{useState} from 'react';
import { Container,Row,Col, Form,Spinner } from 'react-bootstrap';
import Service from '../../components/Packages/servicelist';
import axios from 'axios'
import { Url,isLoggin } from '../../GLOBAL/global';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import Parallax from 'react-rellax'
import '../../style/package.scss'
import { useForm } from 'react-hook-form';
import Buttons from '../../components/Packages/Buttons';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

var sessionstorage = require('sessionstorage');

export default function CustomizedList() {

  
  React.useEffect(() =>
  {
    logginornot();
  },[]);

 async function logginornot()
  {
    const cust =  await isLoggin();
    console.log("cust",cust);
    if(cust === null)
    {
      history.push('/login');
    }
    

  }

  let history = useHistory();
     const [months,setMonths] = React.useState();
     const [spinner,setSpinner] = React.useState(false);
     const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });
    const [Items_1,setItems_1] =  React.useState([]);
    const [QueAns] = React.useState([]);
    const [pack,setPack] = React.useState(false);
    // const [pkg_id,setPkgId] = React.useState();
   
     const [Items,setItems] =  React.useState([]);

     var selection ;

     const Questions =["Name and address of your ministry/church","How many branches do you have?","Total active members on premises?","Active online regular viewers?","How often do you live stream in a week?","What are the challenges you face right now?","What are your goals using our services?","How serious are you to take your online presence to the next level?"];


    const lists_1 = [
      {
        id:1,
        value:"In 1 year we want to expand our online reach"
      },
      {
        id:2,
        value:"We are a new church. We want to make our presence in the current location"
      },
      {
          id:3,
          value:"We are planting new churches in new locations. We want to attract new members in different areas"
      },
      {
          id:4,
          value:"All of the above"
      }
  ]

     const lists = [
            {
              id:1,
              value:"Google Ads"
            },
            {
              id:2,
              value:"Facebook Ads"
            },
            {
              id:3,
              value:"Instagram Ads"
            },
            {
              id:4,
              value:"Youtube Ads"
            },
            {
              id:5,
              value:"Twitter Ads"
            },
            {
              id:6,
              value:"Facebook live-stream handling"
            },
            {
              id:7,
              value:"Youtube live-stream handling"
            },
            {
              id:8,
              value:"Done-for-you personalized pictures on Instagram"
            },
            {
              id:9,
              value:"Done-for-you personalized pictures on Facebook"
            },
            {
              id:10,
              value:"Done-for-you personalized pictures on Youtube"
            },
            {
              id:11,
              value:"Short videos and reels with custom graphics"
            },
            {
              id:12,
              value:"Tech Support"
            },
            {
              id:13,
              value:"Share Performance"
            },
            {
              id:14,
              value:"Advertising your upcoming events on Facebook"
            },
            {
              id:15,
              value:"Advertising your upcoming events on Instagram"
            },
            {
              id:16,
              value:"Advertising your upcoming events on Youtube"
            },
            {
              id:16,
              value:"SEO "
            },
            {
              id:17,
              value:"Website"
            }
     ]

  return (
    <div className='mt-5'>
      
     
        <Container className='pkg-div' >

        <div className='first-div'>
            <p className='extraRowSpace font-30'> Customized Package </p>

              <label className='checkbox-label '>1. Register and check all our services</label><br></br>
              <label className='checkbox-label '>2. Pick the services that suits your ministry needs</label><br></br>
                
          </div>

         
        <div className='first-div '>
                  <p className=' font-30'> </p>

                  <p className=' font-20 '>Services under Customized Package : </p>
                  <p style={{color:'#bbb'}}>Choose your required services </p>
                  <Row >

                  {
                      lists.map((item,id) => (
                      <>
                          <Col sm={6} md={6} xl={6} xxl={6}>

                            <div className='checkbox-label'>
                            <input
                              type="checkbox"
                              key={item.id}
                              value={item.id}
                              className='checkbox'
                              onChange={(e)=> handleChange(e,item.value)}
                            /> 

                              <label style={{marginLeft:'1rem'}}>
                                {item.value}
                              </label> 

                            </div>
                          

                          </Col>
                          </>
                      ))
                    }

{pack? <>
<Col></Col> <Col><div>
                                <input
                                  type="checkbox"
                                  style={{marginTop:'1rem'}}
                                  key="1"
                                  value="Build new Website"
                                  className='checkbox'
                                  onChange={(e)=> handleChange(e,"Build new Website")}
                                /> 

                              <label style={{marginLeft:'1rem'}}>
                              Build new Website
                              </label>

                              <input
                                style={{marginLeft:'1rem'}}
                                  type="checkbox"
                                  key="2"
                                  value="Enhanced current Website"
                                  className='checkbox'
                                  onChange={(e)=> handleChange(e,"Enhanced current Website")}
                                /> 

                              <label style={{marginLeft:'1rem'}}>
                              Enhance current Website
                              </label>

                              
                                
                              </div></Col></>:<></>}
                  </Row>
          </div>


          <div className=' first-div'>
            <p className=' font-20'>Duration of Package</p>
            <Row className='mt-5'>
            <Col sm={12} md={12} xl={6} xxl={6}>
              <label>Number of Months : </label>

                  <select id="months" required={true} className="select-months" >
                    <option value="1" selected={true} >1 month</option>
                    <option value="2" >2 month</option>
                    <option value="3">3 month</option>
                    <option value="4">4 month</option>
                    <option value="5">5 month</option>
                    <option value="6">6 month</option>
                    <option value="7">7 month</option>
                    <option value="8">8 month</option>
                    <option value="9">9 month</option>
                    <option value="10">10 month</option>
                    <option value="11">11 month</option>
                    <option value="12">12 month</option>
                  </select>
            </Col>

            <Col sm={12} md={12} xl={6} xxl={6}>  
                                    
              <p>Frequency Of Time</p>
              <select id="frequency" required={true} className='select-months'>
                <option value="Daily" selected={true}>Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Custom">Custom</option>
                                            
                                        
              </select>                       
                                        
            </Col>
      </Row>
          </div>


          <div className='first-div'>
                        <Form onSubmit={handleSubmit(onSubmit)} className=''>

           
                                <Row >

                                    <Col sm={12} md={12} xl={6} xxl={6}> 
                                        <div className=''>
                                            {/* <label>1.</label> 
                                             */}
                                             <p> Name and address of your ministry/church</p>
                                            <input type="text" name="ministry" {...register("ministry" , { required: true })} className='textbox' />
                                        </div>
                                    </Col>

                                    <Col sm={12} md={12} xl={6} xxl={6}> 
                                        <div className=''>

                                            {/* <label>2.&nbsp; How many branches do you have?</label> &nbsp; */}
                                             <p> How many branches do you have?</p>
                                            <select name="branches" {...register("branches" , { required: true })} className='select-months' >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                    
                                            </select>
                                    </div>
                                    </Col>
                                </Row>

                                <Row className='extraRowSpace'>
                                    <Col sm={12} md={12} xl={6} xxl={6}>  
                                    
                                        {/* <label>3. &nbsp;&nbsp;Total active members on premises?</label>&nbsp; */}
                                        <p>Total active members on premises? </p>
                                        <select name="members" {...register("members" , { required: true })} className='select-months'>
                                            <option value="not sure">Not Sure</option>
                                            <option value="1-30">1-30</option>
                                            <option value="30-60">30-60</option>
                                            <option value="60-90">60-90</option>
                                            

                                        </select>

                                    </Col>
                                    <Col sm={12} md={12} xl={6} xxl={6}>  

                                    {/* <label>6. &nbsp;&nbsp;Active online regular viewers?</label> &nbsp; */}
                                    <p> Active online regular viewers?</p>
                                        
                                        <select name="viewers" {...register("viewers" , { required: true })} className='select-months'>
                                            <option value="not sure">Not Sure</option>
                                            <option value="1-30">1-30</option>
                                            <option value="30-60">30-60</option>
                                            <option value="60-90">60-90</option>
                                            

                                        </select>
                                    </Col>
                                </Row>

                                <Row className='extraRowSpace'>
                                    <Col sm={12} md={12} xl={6} xxl={6}>
                                    {/* <label>5. &nbsp;&nbsp;How often do you live stream in a week?</label> &nbsp; */}
                                        <p>How often do you live stream in a week?</p>
                                        <select name="liveStream" {...register("liveStream" , { required: true })}  className='select-months'>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>

                                        </select>
                                    </Col>

                                    <Col sm={12} md={12} xl={6} xxl={6}> 
                                    <div className=''>
                                        {/* <label>6.</label> &nbsp;&nbsp; &nbsp; */}
                                        <p>What are the challenges you face right now?</p>
                                    <textarea name="challeges" {...register("challenges" , { required: true })} className='textbox textArea' rows={3}></textarea>  
                                    </div>
                                    </Col>

                                </Row>

                                <Row className=''>
                                    

                                    <Col sm={12} md={12} xl={6} xxl={6}>
                                        {/* <label>7.  &nbsp;&nbsp;What are your goals using our services? </label><br></br><br></br> */}
                                              <p>What are your goals using our services? </p>
                                        {
                                            lists_1.map(item => (
                                            <>
                                               <div className='checkbox-label'>
                                                <input
                                                    type="checkbox"
                                                    key={item.id}
                                                    value={item.id}
                                                    className='checkbox'
                                                    onChange={(e)=> handle(item.value)}
                                                />  <label style={{marginLeft:'1rem'}}> {item.value}
                                                </label> 
                                                </div> 
                                                </>
                                            ))
                                        }

                                    </Col>


                                    <Col sm={12} md={12} xl={6} xxl={6}>  
                                    
                                        {/* <label>8. &nbsp;&nbsp;How serious are you to take your online presence to the next level?</label><br></br><br></br> */}
                                    
                                        <p>How serious are you to take your online presence to the next level?</p>
                                        <select name="online_presence" {...register("online_presence" , { required: true })} className='select-months'>
                                            <option value="SURE">HIGH. We see great potential in this approach</option>
                                            <option value="MEDIUM">MEDIUM. Exploring the options</option>
                                            <option value="LOW">LOW. Testing the waters</option>
                                        
                                        </select>

                                    </Col>


                                    
                                </Row>

                                <Row className='extraRowSpace'>
                                {(!spinner ===false )? (<> <Buttons text="Submit" type="submit" disabled={true}/> {spinner && 
                                  <Spinner
                                
                                  style={{marginLeft:'54%',marginTop:'-3.5rem',color:'white'}}
                                    animation="border"
                                    
                                    role="status"
                                    
                                  >
                  
                                    </Spinner>} </>)
                                
                                      : (<><Buttons text="Submit" type="submit" />{ spinner && 
                                      <Spinner
                                
                                  
                                        animation="border"
                                        
                                        role="status"
                                        
                                      >
                                  
                                    </Spinner> }</>)
                                
                                }
                                </Row>



                        </Form>
                      </div>


       <ToastContainer position='top-center' style={{marginTop:'50vh'}}/>
        </Container> 
    </div>
    );


    function handle(item)
    {
      if(item === "All of the above")
      {
        selection = "In 1 year we want to expand our online reach , We are a new church. We want to make our presence in the current location , We are planting new churches in new locations. We want to attract new members in different areas"
      }
      else{
        selection = item +", "+ selection;

      }
      console.log("selection :",selection);
      setItems_1(selection);
    }



    function handleChange(event,item1) 
    {
      // var id = event.target.value;
      var value = item1;
      console.log("temp",value)
      if(value === "Website")
      {
        setPack(true);
      }
      
      var temp = {
        "question" : value,
        "answer": "NULL"
      }
     

      // setItems(temp);
      QueAns.push(temp);

     

    }


    function onSubmit(data)
    {

      setSpinner(true);

              Questions.map(q => {
                  
                if(q === "Name and address of your ministry/church")
                {
                    var temp1 = {
                        "question" : q,
                        "answer": data.ministry
                    }
                    QueAns.push(temp1)
                }

                if(q === "How many branches do you have?")
                {
                    var temp2 = {
                        "question" : q,
                        "answer": data.branches
                    }
                    QueAns.push(temp2)
                }

                if(q === "Total active members on premises?")
                {
                    var temp3 = {
                        "question" : q,
                        "answer": data.members
                    }
                    QueAns.push(temp3)
                }
            
                if(q === "Active online regular viewers?")
                {
                    var temp4 = {
                        "question" : q,
                        "answer": data.viewers
                    }
                    QueAns.push(temp4)
                }

                if(q === "How often do you live stream in a week?")
                {
                    var temp5 = {
                        "question" : q,
                        "answer": data.liveStream
                    }
                  QueAns.push(temp5)
                }

                if(q === "What are the challenges you face right now?")
                {
                    var temp6 = {
                        "question" : q,
                        "answer": data.challenges
                    }
                    QueAns.push(temp6)
                }

                if(q === "What are your goals using our services?")
                {
                    var temp7 = {
                        "question" : q,
                        "answer": Items_1
                    }
                    QueAns.push(temp7)
                }

                if(q === "How serious are you to take your online presence to the next level?")
                {
                    var temp8 = {
                        "question" : q,
                        "answer": data.online_presence
                    }
                    QueAns.push(temp8)
                    // QueAns.push(Items)
                }

          })

          console.log("quesans",JSON.stringify(QueAns));
        

        console.log("Items,",JSON.stringify(Items));
        JSON.stringify(Items);
        var months = document.getElementById("months").value;
        // console.log("months",months);
        var fr = document.getElementById("frequency").value;
        const member_id =  sessionstorage.getItem("customerId");
        const token = sessionstorage.getItem("token");
        // console.log("mid",member_id);
    
        var data1 = new FormData();

        data1.append("member_id",member_id);
        data1.append("package_type",'CUST');
        data1.append("package_cost",1);
        data1.append("months",months);
        data1.append("frequency",fr);
        // data1.append('package_services',JSON.stringify(Items));
      
      
        
        const headers ={
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
    
        
        axios({
            method: 'post',
            url: Url+'Package',
            data: data1,
            headers: headers
            })
            .then(function (response) {
                //handle success
                console.log(response);
                // setPkgId(response.data.id);
                let pkg_id = response.data.id;
                
                var formdata = new FormData();
          
                formdata.append("package_id",pkg_id);
                formdata.append("package_services",JSON.stringify(QueAns));
              
              
              axios({
                  method: 'post',
                  url: Url+'packagespec',
                  data: formdata,
                  headers: headers
                  })
                  .then(function (response) {
                      //handle success
                      console.log("response - cust",response);
                      if(response.status === 201)
                      {
                          setSpinner(false);
                          // history.push('/home');
                          toast.success("Order Request has been send !!");
      
                          setTimeout(() => 
                              confirmAlert({
                                title: "Thanks, What's Next ?",
                                message: 'you can view the order request in Request -> Packages section',
                                buttons: [
                                  {
                                    label: 'Ok',
                                    onClick: () => history.push('/dashboard')
                                  },
                                  
                                ]
                              }),3000);
                      }
                  })
                  .catch(function (response) {
                      //handle error
                      console.log(response);
                  });
      

              })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

    }
    
   
    
}
