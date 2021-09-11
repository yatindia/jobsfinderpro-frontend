import React, {useEffect, useState} from 'react';
import './style.css';

const Range = (props) => {
    return (
        <div className="range" style={{width: `${props.percentRange}%`}}/>
    );
};

const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
            <Range percentRange={props.percentRange}/>
        </div>
    );
};

export  const ProgressBarContainer = ({move}) => {
    let [percentRange, setProgress] = useState(0);

useEffect(()=>{
    if(move>0){
        setProgress(percentRange < 100 ? percentRange + move : 100)
    }else{
        setProgress(0)
    }
    
},[move])

    return (
        <div className="container">
            <ProgressBar percentRange={percentRange}/>
            {/* <div>
                <button onClick={() => setProgress(percentRange > 0 ?
                    percentRange - 20 : 0)}>Decrease
                </button>
                <button onClick={() => setProgress(percentRange < 100 ? percentRange + 10 : 100)}>Increase</button>
                <button onClick={() => setProgress(0)}>Reset</button> 
            </div>*/}
        </div>
    );
};

export default ProgressBarContainer;