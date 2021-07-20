import React, { useEffect, useState } from 'react'
import vid1 from './fashion.mp4';
import vid2 from './frog.mp4';
import vid3 from './tree.mp4';
import vid4 from './water.mp4';
import Video from './Video';
function Ioa() {
    const[sources,setSources]=useState([{url:vid1},{url:vid2},{url:vid3},{url:vid4}])
    //intersection Api is an async api the call back it calls works Asynchronously
    //step 1: setting callback i.e. what to do when objects are in the given threshold of the root (in our case view port)
    //callback takes in 2 parameter 1 is enteries array i.e. array of elements that went in and out of root's threshold
    //                              2nd is observer i.e. in some cases like in lazy loading we would like to remove the intersectn. observer once our work is done only in those cases we pass observer
    const callback = entries=>{
        entries.forEach(element => {
            console.log(element);
            let el = element.target.childNodes[0];
            //video play is an async fn. initially we play all vid and later when this promise is resolved we pause the vids on below condition
            el.play().then(()=>{
                //if this video is not in viewport then pause it
                if(!el.paused && !element.isIntersecting)
                {
                    el.pause();                
                }
            })
        });
    }
    const observer = new IntersectionObserver(callback,{
        //other options for intersectionobserver include root which is viewport in our case so no need to set
        // padding is also optional
        threshold:0.9
    })
    useEffect(()=>{
        //once the videos are mounted we would like to attach observer to it
        console.log('Effect');
        let elements = document.querySelectorAll('.videos')
        elements.forEach(el=>{
            observer.observe(el)
        })

    },[])
    return (
        <div className='video-container' >
            <div className='videos'>
                <Video source={sources[0].url} />
            </div>
            <div className='videos'>
                <Video source={sources[1].url} />
            </div>
            <div className='videos'>
                <Video source={sources[2].url} />
            </div>
            <div className='videos'>
                <Video source={sources[3].url} />
            </div>
            
        </div>
    )
}

export default Ioa