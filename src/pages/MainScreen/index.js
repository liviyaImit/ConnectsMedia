import React from 'react';
import Home from '../../pages/home/index'
import About from '../../pages/About/index'
// import Features from '../../pages/About/features'
import Service from '../../pages/services/index'
import Campaign from '../../pages/campaign/index'
import Package from '../../pages/Packages/index'
import Contact from '../../pages/contact/contact'
import Whyconnect from '../../pages/About/whyconnect'
import Pillars from '../../pages/About/pillars'
import Statistics from '../../pages/statistics/index';
import Faq from '../../pages/faq/index';
import Give from '../../pages/Give/index';
import Testimonial from '../../pages/Testimonial/index';
import {  animateScroll as scroll } from 'react-scroll';
import { Link } from 'react-router-dom';
import Section from '../Section';
import Navbar from '../../components/header/navbar';
import FooterPage from '../../components/Footer/FooterPage';

import '../../../node_modules/font-awesome/css/font-awesome.min.css';
// import '../node_modules/seamless-scroll-polyfill/lib/bundle.min.cjs';
import $ from 'jquery';

export default function Index() {

  React.useEffect(()=>
{
  $(document).ready(function(){
		$("#video #play-btn").click(function(){
			$("#video").addClass("playing");
			$("#player video").trigger("play");
		});
		$("#video #stop-play").click(function(){
			$('#player video').get(0).pause();
    		//$('#player video').get(0).currentTime = 0;
			$("#video").removeClass("playing");
		});
		$("#video #decvolume").click(function(){
			var volume=$("#video video").prop("volume");
			volume-=0.1;
			if(volume<0) {
				volume=0;
				$("#video #decvolume").hide();
			}
			$("#video video").prop("volume",volume);
			$("#video #incvolume").show();
		});
		$("#video #incvolume").click(function(){
			var volume=$("#video video").prop("volume");
			volume+=0.1;
			if(volume>1) {
				volume=1;
				$("#video #incvolume").hide();
			}
			$("#video video").prop("volume",volume);
			$("#video #decvolume").show();
		});
		var playing=false;
		$('body #scroll-snap').click(function (e) {
			var section=$(e.target).closest(".section").attr("id");
			//stop video and reset play controls
			if(section!=='video' && $("#player video").get(0).paused===false){
				$("#player video").trigger("pause");
				$("#video").removeClass("playing");
			}
		});
		});


    // scroll-start

    var activeSec="intro";
var sectionId="";
function onEntryEffects(){
	//pagemenu sticky
  // console.log("onentery")
	if($(window).scrollTop()>200)
		$("#page-head").addClass("sticky");
	else
		$("#page-head").removeClass("sticky");

	//find section
	var sections=$("#scroll-snap .section");
  // console.log("sections",sections)
	$(sections).each(function(index, e) {
        var section=$(e);
		sectionId=$(e).attr("id");
		// console.log(sectionId,section.offset().top,$(window).scrollTop(), section.height(),section.css("display"));
		if (section.offset().top - $(window).scrollTop() < $(window).height() - 150 && section.offset().top+section.height() > $(window).scrollTop() + 150 && section.css("display")!=='none') {
			//activeSec=sectionId;
      // console.log("condition statisfied")
			return false;
		}
	});
	
	if(sectionId===activeSec) return;
	activeSec=sectionId;
	$(".onfocus:not(#"+activeSec+")").removeClass("onfocus");
	$("#"+activeSec).addClass("onfocus");	
	$("#section-nav li").removeClass("active");
	$("#section-nav li[data-section="+activeSec+"]").addClass("active");
	//close mobile menu
	$('#nav-icon').removeClass("open");
	$("#section-nav").removeClass("open");
	// console.log(activeSec);
	
	//sanitize popups
	if(activeSec!=='pillars') $("#pillars .subtitle").removeClass("active");
		
}


$(window).on("scroll", function () {
	onEntryEffects();
});
$(document).ready(function(){
	onEntryEffects();

	//check for back button calls - receiving hash tag
	var hash = window.location.hash;
	if(hash!=''){
		window.location.href=hash;
		console.log('in');
	}

	$("#section-nav li:not([data-section=login])").click(function(){
		var section=$(this).attr("data-section");
		if (section === 'login')
		{
			return;
		}
		$("body,html").removeClass("freeze");
		window.location.href="#"+section;
		$('body,html').animate({
			scrollTop: $("#"+section).offset().top
		});
		
		//close mobile menu
		$('#nav-icon').removeClass("open");
		$("#section-nav").removeClass("open");
	});
	$('#nav-icon').click(function(){
		$(this).toggleClass('open');
		$("body,html").toggleClass("freeze");
		$("#section-nav").toggleClass('open');
	});
});

// scroll-end

// pillar section

$("#pillars li").click(function(){
  var i=$(this).index()+1;
  $("#pillars .subtitle").removeClass("active");
  $("#pillar"+i).addClass("active");
});
$("#pillars .subtitle i").click(function(){
  $(this).parent().removeClass("active");
});



// why-connect


function graphRepaint(){
  var availableWidth=$("#graph-container").width();
  var availableHeight=$("#graph-container").innerHeight();
  var contentWidth=$("#graph-container svg").width();
  var contentHeight=$("#graph-container svg").innerHeight();
  var scale = Math.min( 
    availableWidth / contentWidth, 
    availableHeight / contentHeight 
  );
  $("#graph-wrap").css("transform","scale("+scale+","+scale+")").fadeIn(1000);
}
$(window).on('load',function () {
  if($("#why .stats").css("display")==="none"){
      $("#why .stats").remove();
      return;
  }
  graphRepaint();				
});
$(window).resize(graphRepaint);



// service 

$("#service-list li").click(function(){
  var i=$(this).index()+1;
  console.log(i);
  $("#service-list .subtitle").removeClass("active");
  $("#service"+i).addClass("active");
});
$(".popup .subtitle i").click(function(){
  $(this).parent().removeClass("active");
});
$(document).on('keydown', function(event) {
   if (event.key === "Escape") {
     $(".popup .subtitle i").parent().removeClass("active");
   }
 });
$("#socials li").click(function(){
  var i=$(this).index()+1;
  // console.log(i);
  $("#socials .subtitle").removeClass("active");
  $("#social"+i).addClass("active");
});


//faqs

$("#faqs li h2").click(function(){
  if($(this).hasClass("active")){
    $(this).removeClass("active");
    $(this).next().hide();
    return;
  }
  $("#faqs li h2").removeClass("active");
  $("#faqs li div[itemprop=acceptedAnswer]").hide();
  $(this).next().show();
  $(this).addClass("active");
});

// testimonial

var txtSlide=1;
var newPos=0;

	$("#txt-version .nav.prev").click(function(){
		txtSlide--;
		window.location.href="#txt-testimony"+txtSlide;
		$("#txt-version .nav.next").show();
		if(txtSlide===1) {$("#txt-version .nav.prev").hide();}
	});
	$("#txt-version .nav.next").click(function(){
		txtSlide++;
		window.location.href="#txt-testimony"+txtSlide;
		var txtSlideCnt=$("#txt-version li").length;
		$("#txt-version .nav.prev").show();
		if(txtSlide===txtSlideCnt)  {$("#txt-version .nav.next").hide();}
	});
	//video testimonials
	var vidSlide=1;
	// console.log($("#vid-version .content").offset().left,$("#vid-testimony1").offset().left);
	$("#vid-version .nav.prev").click(function(){
		vidSlide--;
		//location.href="#vid-testimony"+vidSlide;
		newPos=$("#vid-version .content").offset().left + $("#vid-testimony"+vidSlide).offset().left;		
		// console.log("P",$("#vid-version .content").offset().left,$("#vid-testimony"+vidSlide).offset().left,$("#vid-testimony"+vidSlide).width());
		$("#vid-version .content").animate({
			scrollLeft:$("#vid-testimony1").width()*(vidSlide-1)
		},100);
		$("#vid-version .nav.next").show();
		if(vidSlide===1) {$("#vid-version .nav.prev").hide();}
	});
	$("#vid-version .nav.next").click(function(){
		vidSlide++;
		newPos=$("#vid-version .content").offset().left - $("#vid-testimony"+vidSlide).offset().left;
		// console.log("N",$("#vid-version .content").offset().left,$("#vid-testimony"+vidSlide).offset().left,$("#vid-testimony"+vidSlide).width());
		//location.href="#vid-testimony"+vidSlide;
		$("#vid-version .content").animate({
			scrollLeft:$("#vid-testimony1").width()*vidSlide
		},100);
		var vidSlideCnt=$("#vid-version li").length;
		$("#vid-version .nav.prev").show();
		if(vidSlide===vidSlideCnt)  {$("#vid-version .nav.next").hide();}
	});

  // tidio- chatbot


  (function() {
    console.log("first")
    function onTidioChatApiReady() {
      console.log("tidio")
      window.tidioChatApi.hide();
      window.tidioChatApi.on("close", function() {
        window.tidioChatApi.hide();
      });
    }

  if (window.tidioChatApi) {
    window.tidioChatApi.on("ready", onTidioChatApiReady);
  } else {
    document.addEventListener("tidioChat-ready", onTidioChatApiReady);
  }

  document.querySelector(".chat-button").addEventListener("click", function() {
    console.log("tidio clicked")
    window.tidioChatApi.show();
    window.tidioChatApi.open();
  });
})();

//  logo

$("#page-logo").click(function(){
	$('body,html').animate({
		scrollTop: $("#intro").offset().top
	});
});

},[])
  return (
    <>

	<Navbar className='home-nav' style={{paddingTop:'0 !important',paddingBottom:'0 !important',backgroundColor:'transparent'}}/>

    <div id="scroll-snap">
		{/* <div className='main-screen-hide-section'> */}
		<Home/>
		<About />
		<Pillars />
		<Whyconnect />
		{/* <Statistics /> */}
		<Service />
		<Package />
		<Campaign />
		<Faq/>
		<Give/>
		<Testimonial/>
		{/* </div> */}
		<Contact />
		{/* <FooterPage/> */}
    </div>
    </>
  );

}
