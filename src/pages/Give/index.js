
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Index() {

  let history = useHistory();



  function givenow()
  {
    history.push('/donate');
  }

  return (
   
    <>
{/* give */}
<div class="section" id="give">
	<div>
        <div class="content">
        <small>Inspired of what we are doing?</small><br></br>
        <br></br>
        <b>The world needs JESUS like never before!</b><br></br>
        <br></br>
        <button onClick={() => givenow()}>GIVE NOW</button>
        </div>
    </div>
</div>
</>
  )
}