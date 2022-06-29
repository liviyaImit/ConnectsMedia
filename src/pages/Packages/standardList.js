import React,{useState} from 'react';
import { Container,Row,Col ,Spinner} from 'react-bootstrap';
import Service from '../../components/Packages/servicelist';
import { Form } from 'react-bootstrap';
import axios from 'axios'
import { Url,isLoggin } from '../../GLOBAL/global';
import { Link,useHistory } from 'react-router-dom';
import Questionnaire from './Questionnaire';
import '../../style/package.scss'
import '../../style/button.scss'
import Buttons from '../../components/Packages/Buttons';
import Parallax from 'react-rellax';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var sessionstorage = require('sessionstorage');


export default function StandardList() {

    let history = new useHistory();

    async function logginornot()
    {
      const cust =  await isLoggin();
      console.log("cust",cust);
      if(cust === null)
      {
        history.push('/login');
      }
      
  
    }
  
    React.useEffect(() => {
  
      logginornot();
    },[]);
    
    const [Items,setItems] =  React.useState([]);
    const [spinner,setSpinner] = React.useState(false);
    const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });
    const [Items_1,setItems_1] =  React.useState([]);
    const [QueAns] = React.useState([]);
    const [pkg_id,setPkgId] = React.useState(0);
    const { id } = useParams();
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
        }
    ]

  return (
    <div className='mt-5'>
    
        <Container className='pkg-div'>

          {/* <h1 className='text-center'>Standard Package</h1> */}
          <div className='first-div'>
            <p className='extraRowSpace font-30'> Standard Package </p>
                 <label className='checkbox-label '>1. 3 Done-for-you Posts Per Week(1 video, 2 pictures / posters)</label><br></br>
                  <label className='checkbox-label '>2. Upto 2 Social Media Platforms</label><br></br>
                  <label className='checkbox-label'>3. Post Boosting – for more views</label><br></br>
                  <label className='checkbox-label'>4. 1 Ad Promotion per month</label><br></br>
                  <label className='checkbox-label'>5. All Images, Graphics Copyrighting included</label><br></br>
                
          </div>

         
                        <div className='first-div'>

                            <p className='extraRowSpace font-30'>  </p>

                            <p className='extraRowSpace font-20 '>Services under Standard Package : </p>
                            {
                                lists.map((item,i) => (
                                <>
                                    <label className='checkbox-label' key={i}>
                                    
                                    {i+1} {'.'} {item.value}

                                
                                    </label> <br></br>
                                    </>
                                ))
                                }

                        </div>
                            
              
                      <div className='first-div  '>

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
                                            <p>Name and address of your ministry/church</p>
                                            <input  type="text" name="ministry" {...register("ministry" , { required: true })} className='textbox' />
                                        </div>
                                    </Col>

                                    <Col sm={12} md={12} xl={6} xxl={6}> 
                                        <div className=''>

                                            {/* <label>5.&nbsp; How many branches do you have?</label> &nbsp; */}
                                            <p>How many branches do you have?</p>
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
                                    
                                        {/* <label>2. &nbsp;&nbsp;Total active members on premises?</label>&nbsp; */}
                                        <p>Total active members on premises?</p>
                                        <select name="members" {...register("members" , { required: true })} className='select-months'>
                                            <option value="not sure">Not Sure</option>
                                            <option value="1-30">1-30</option>
                                            <option value="30-60">30-60</option>
                                            <option value="60-90">60-90</option>
                                            

                                        </select>

                                    </Col>
                                    <Col sm={12} md={12} xl={6} xxl={6}>  

                                    {/* <label>6. &nbsp;&nbsp;Active online regular viewers?</label> &nbsp; */}
                                        <p>Active online regular viewers?</p>
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
                                    {/* <label>3. &nbsp;&nbsp;How often do you live stream in a week?</label> &nbsp; */}
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
                                        {/* <label>7.</label> &nbsp;&nbsp; &nbsp; */}
                                        <p>What are the challenges you face right now?</p>
                                        <textarea name="challeges"  {...register("challenges" , { required: true })} className='textbox textArea' rows={3}></textarea>  
                                    </div>
                                    </Col>

                                </Row>

                                <Row className='extraRowSpace'>
                                    

                                    <Col sm={12} md={12} xl={6} xxl={6}>
                                        {/* <label>4.  &nbsp;&nbsp;What are your goals using our services? </label><br></br><br></br> */}
                                        <p>What are your goals using our services?</p>
                                        {
                                            lists_1.map(item => (
                                            <>
                                               <div className='checkbox-label' >
                                                <input
                                                        
                                                        type="checkbox"
                                                        key={item.id}
                                                        value={item.value}
                                                        className='checkbox'
                                                        onChange={(e)=> handle(e,item.value)}
                                                        
                                                    />
                                                <label style={{marginLeft:'1rem'}}>{item.value}</label> 
                                                    
                                                </div> 
                                               
                                                </>
                                            ))
                                        }

                                    </Col>


                                    <Col sm={12} md={12} xl={6} xxl={6}>  
                                    
                                        {/* <label>8. &nbsp;&nbsp;How serious are you to take your online presence to the next level?</label><br></br><br></br> */}
                                    <div className=''>
                                        <p >How serious are you to take your online presence to the next level?</p>
                                       <select name="online_presence" {...register("online_presence" , { required: true })} className='select-months'>
                                            <option value="SURE">HIGH. We see great potential in this approach</option>
                                            <option value="MEDIUM">MEDIUM. Exploring the options</option>
                                            <option value="LOW">LOW. Testing the waters</option>
                                        
                                        </select>

                                    </div>
                                       

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


                                      

    function onSubmit(data)
    {
      
      setSpinner(true);
      lists.map((d,id) => {
        
        var temp ={
            "question":d.value,
            "answer":"NULL"
        }

        QueAns.push(temp);
      })
    //   console.log("Items,",JSON.stringify(Items));
      JSON.stringify(Items);
      var months = document.getElementById("months").value;
      // console.log("months",months);
      var fr = document.getElementById("frequency").value;
      const member_id =  sessionstorage.getItem("customerId");
      const token = sessionstorage.getItem("token");
     

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
        }

  })
      
  
      var data1 = new FormData();

      data1.append("member_id",member_id);
      data1.append("package_type",'STD');
      data1.append("package_cost",0);
      data1.append("months",months);
      data1.append("frequency",fr);
    
      
         
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
            // console.log(response);
            // setPkgId(response.data.id);
            let pkg_id = response.data.id;
           

            var formdata = new FormData();
      // console.log()

          formdata.append("package_id",pkg_id);
          formdata.append("package_services",JSON.stringify(QueAns));
          
            console.log(JSON.stringify(QueAns));
        
          
          
      
          
          axios({
              method: 'post',
              url: Url+'packagespec',
              data: formdata,
              headers: headers
              })
              .then(function (response) {
                  //handle success
                  console.log("response - STD",response);
                  if(response.status === 201)
                  {
                      
                      // history.push('/home');
                      setSpinner(false);
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


      
      
    //   console.log(data);
      


    
        
  }

  

    // function handleChange(event,item1) 
    // {
      
    //   var value = item1;
      
    //   var temp = {
    //     "question":value,
    //     "answer":"NULL"
    //   }

    //   Items_1.push(temp);

    // }


    function handle(e,item)
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



    
}
