import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
// import '../../style/about.scss'
import  Parallax from 'react-rellax';

export default function index() {
    return (
<>


{/* video section */}
<div class="section" id="video">
	<div>
    	<div id="player-wrap">
            <div id="player">
                <i id="play-btn" class="fa fa-play-circle" aria-hidden="true"></i>
                <i id="decvolume" class="fa fa-volume-down" aria-hidden="true" style={{display:"block"}}></i>
                <i id="incvolume" class="fa fa-volume-up" aria-hidden="true" style={{display:"block"}}></i>
                <i id="stop-play" class="fa fa-stop-circle-o" aria-hidden="true" style={{display:"block"}}></i>

                <video autoPlay={false} loop onLoadStart="this.volume=0.05">
                  <source src={require('../../../src/assets/imgs/video.mp4')} type="video/mp4"/>
                </video>
               

            </div>
        </div>
        <div id="video-text">
        	<div><h1>Gospel through Generations</h1>As ministers of God, we pray for souls and strive to do our best to spread the good news of Jesus to the world.Times have changed but the true essence of gospel has and will never change. But the channels through which we spread the gospel has always evolved.
In the present age of technology, you have great opportunity to spread the gospel like never before. Almost everyone uses smart phones. And through this medium, we can spread the loving knowledge of Jesus to the ends of the earth. Scroll below to know more!
          </div>
        </div> 
    </div>
</div>


{/* About section */}

<div class="section" id="about">
	<div>
	<div class="video">
        <video autoPlay={true} loop muted playsInline >
          <source src={require('../../../src/assets/imgs/mic.mp4')} type="video/mp4" />
          <span></span>
        </video>
    </div>
	<div id="about-slides">
        <div>
                <div class="content">
                <h2>Who We Are</h2>
                We are a faith based, passionate and creative team of Christian believers and engagement specialists carrying the ever-relevant gospel of the Lord Jesus Christ to the present generation using social media. We are tech professionals equipped with modern-day IT and marketing skills, fully committed to utilizing social media to its fullest extent in spreading the gospel of the Lord Jesus Christ.
                </div>
        </div>
        <div>
                <div class="content">
                <h2>What We Do</h2>
                Driven by Matthew 28:19-20, we have an opportunity that no other previous generations had in spreading the gospel to the masses through the internet; specifically social media. With our army of tech soldiers and our love for Jesus, we help churches and ministries have a strong presence in a variety of global media platforms.
                </div>
        </div>
    </div>
    </div>
</div>
{/* <section id='About1'>    */}
          {/*   <section id="section1">
                <div class="second-container">
                    <div class="sc-div-one">
                        <img src={require('../../assets/images/banner-img.png')} alt="" />
                        <h1>About us</h1>
                    </div>
                    <h1>Play</h1>
                </div>
            </section> */}


    {/* <section>
        <div class="second-container">
            <div class="sc-div-one">
                <img src={require('../../assets/images/banner-img.png')} alt="" />
            </div>
            <h1 id="play">Play</h1>
        </div>
    </section> */}


    
      {/* <section id='About1'>
        <div class="about-container">
            <h1>About us</h1>
            <div class="about-row-one">
                <div class="left-div-one">
                <img src={require('../../assets/images/about.png')} alt="" />
                    <h1>Who we are</h1>
                </div>
                <div class="right-div-one">
                    <p>
                    We are a faith based, passionate and creative team of Christian believers and engagement specialists carrying the ever-relevant gospel of the Lord Jesus Christ to the present generation using social media. We are tech professionals equipped with modern-day IT and marketing skills, fully committed to utilizing social media to its fullest extent in spreading the gospel of the Lord Jesus Christ.  
                    </p>
                </div>
            </div>

            <div class="about-row-two">
                <div class="left-div-two">
                    <p>
                    Driven by Matthew 28:19-20, we have an opportunity that no other previous generations had in spreading the gospel to the masses through the internet; specifically social media. With our army of tech soldiers and our love for Jesus, we help churches and ministries have a strong presence in a variety of global media platforms.
                    </p>
                </div>
                <div class="right-div-two">
                    <h1>What we do</h1>
                    <img src={require('../../assets/images/what-next.png')} alt="" />
                </div>
            </div>
        </div>
    </section> */}



{/* </section>   */}
</>

    )
}
