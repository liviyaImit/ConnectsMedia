import React, { useEffect ,useRef} from 'react'
import { Container,Row, Col} from 'react-bootstrap'
import '../../style/campaign.scss'
import Parallax from 'react-rellax'
import { useHistory} from "react-router-dom";
import axios from 'axios';
import { Url } from '../../GLOBAL/global';
import "../HomePage/index.js";

var sessionstorage = require('sessionstorage');


export default function Campaigns() {

    const[campaign,setCampaign] = React.useState([]);

    React.useEffect(()=>
    {
        getCampaigns();
    },[]);

    async function getCampaigns()
    {
        const token = sessionstorage.getItem("token");
        console.log("token",token)
       

          await axios.get(Url+'getCampaign', { headers: { Authorization: `Bearer ${token}` }})
          .then(response => {
              
              console.log(response.data);
            setCampaign(response.data);
          })
          .catch((error) => {
              console.log('error ' + error);
          });

    }

    let history = useHistory();

    return (
        <>
        
    {/* <section id='campaigns1'>
        <div class="compain-main-div">
            <h1 id="campain-heading-tag">Campaigns</h1>
            <div class="main-div">
                <div class="cube">
                    <div class="top">
                        <div class="cub-content-div">
                            <img src={require('../../assets/images/mike.png')} alt="" id="cube-img" />
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s,</p>
                            
                            {sessionstorage.getItem('token') ===null ?(
                                <>
                                <button onClick={()=> redirectto("event")}>Register to start</button>
                                </>
                                ):(
                                    <>
                                <button onClick={()=>history.push('/events-creation')}>Start Here</button>
                                </>
                                )
                            }
                            <h1>Upcoming Event</h1>
                        </div>
                    </div>
                </div>
                <div class="cube">
                    <div class="top">
                        <div class="cub-content-div-second">
                            <img src={require('../../assets/images/OBJECTS.png')} alt="" id="cube-img_second" />
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s,</p>
                            
                            {sessionstorage.getItem('token') ===null ?(
                                <>
                                <button onClick={()=> redirectto("million")}>Register to start</button>
                                </>
                                ):(
                                    <>
                                <button onClick={()=>history.push('/million-posts')}>Start Here</button>
                                </>
                                )
                            }
                            <h1>Million Post</h1>
                        </div>
                    </div>
                </div>
                <div class="cube">
                    <div class="top">
                        <div class="cub-content-div-third">
                            <img src={require('../../assets/images/hands.png')} alt="" id="cube-img-third" />
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s,</p>
                           
                            {sessionstorage.getItem('token') ===null ?(
                                <>
                                <button onClick={()=> redirectto("static")}>Register to start</button>
                                </>
                                ):(
                                    <>
                                <button onClick={()=>history.push('/staticPosts')}>Start Here</button>
                                </>
                                )
                            }
                            <h1>StrengtheningMarriage</h1>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    </section> */}

    {/* Campaigns */}

<div class="section scrollbar" id="campaigns">
	<div>
	<h1>Campaigns</h1>
    <ul>

      
         
                <li>
                    <h2>Upcoming Event</h2>
                    <img src={require('../../../src/assets/imgs/mike.png')} alt="Campaigns for Upcoming Events"/>
                    <span>Share your calendar here. We will pick all your future events from here</span>
                    {/* <div><button>Start Here</button></div> */}
                            {sessionstorage.getItem('token') ===null ?(
                                <>
                                <button onClick={()=> redirectto("event")}>Register to start</button>
                                </>
                                ):(
                                    <>
                                <button onClick={()=>{postLoginRedirect('event');}}>Start Here</button>
                                </>
                                )
                            }
	            </li>

         
      
    <li>
    	<h2>Missions</h2>
		<img src={require('../../../src/assets/imgs/stand-mic.png')} alt="Million Post - Mic"/>
        <span>Click below to support missionaries from across the globe</span>
		{/* <div><button>Start Here</button></div> */}

        {sessionstorage.getItem('token') ===null ?(
                                <>
                                <button onClick={()=> redirectto("million")}>Register to start</button>
                                </>
                                ):(
                                    <>
                                <button onClick={()=>postLoginRedirect('million')}>Start Here</button>
                                </>
                                )
                            }
	</li>


    <li>
    	<h2>Strengthening Marriage</h2>
		<img src={require('../../../src/assets/imgs/strengthen-marriage.png')} alt="Strengthening Marriage"/>
        <span>Register and support for this special campaign and we will keep on posting inspirational content and bible scriptures, about togetherness and marriage on social media</span>
		

                            {sessionstorage.getItem('token') ===null ?(
                                <>
                                <button onClick={()=> redirectto("million")}>Register to start</button>
                                </>
                                ):(
                                    <>
                                <button onClick={()=>postLoginRedirect('million')}>Start Here</button>
                                </>
                                )
                            }
	</li>
    <li>
    	<h2>Youth Section</h2>
		<img src={require('../../../src/assets/imgs/youth.png')} alt="Praying Youth"/>
        <span>Register for this special campaign to engage our future generation with youthful Christian content on social media</span>
		                    {sessionstorage.getItem('token') ===null ?(
                                <>
                                <button onClick={()=> redirectto("static")}>Register to start</button>
                                </>
                                ):(
                                    <>
                                <button onClick={()=>postLoginRedirect('static')}>Start Here</button>
                                </>
                                )
                            }
	</li>
    <li>
    	<h2>Pray For Israel</h2>
		<img src={require('../../../src/assets/imgs/israel.png')} alt="Pray for Israel"/>
        <span>God loves Israel. So do we. Bible clearly mentions – “Pray for the peace of Jerusalem. May they prosper who love you”. We are creating an opportunity for you to bless Israel & Jerusalem. We will optimize videos and posters and publish on your behalf. Prosper!
		</span>
		                    {sessionstorage.getItem('token') ===null ?(
                                <>
                                <button onClick={()=> redirectto("static")}>Register to start</button>
                                </>
                                ):(
                                    <>
                                <button onClick={()=>postLoginRedirect('static')}>Start Here</button>
                                </>
                                )
                            }
	</li>
    <li>
    	<h2>Evangelism</h2>
		<img src={require('../../../src/assets/imgs/evangelism.png')} alt="Evangelism"/>
        <span>Great opportunity to share the gospel while you are busy.
 	Register, and we will keep on posting word of God on social media ON YOUR NAME.
		</span>
		                    {sessionstorage.getItem('token') ===null ?(
                                <>
                                <button onClick={()=> redirectto("static")}>Register to start</button>
                                </>
                                ):(
                                    <>
                                <button onClick={()=>postLoginRedirect('static')}>Start Here</button>
                                </>
                                )
                            }
	</li>
    </ul>
    </div>
</div>
        </>

    )


    function redirectto(type)
    {
        window.location.href="#campaigns";
        if(type === "event")
        {
            sessionstorage.setItem("camp","/events-creation");
            history.push('/login');
            history.go(0);
        }

        if(type === "million")
        {
            sessionstorage.setItem("camp","/million-posts");
            history.push('/login');
            history.go(0);
        }

        if(type === "static")
        {
            sessionstorage.setItem("camp","/staticPosts");
            history.push('/login');
            history.go(0);
        }
    }

    function postLoginRedirect(type)
    {
        window.location.href="#campaigns";
        if(type === "event")
        {
            history.push("/events-creation");
        }

        if(type === "million")
        {
            history.push("/million-posts");
        }

        if(type === "static")
        {
            history.push('/staticPosts');
        }
    }
}
