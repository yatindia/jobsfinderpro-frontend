import React,{useEffect,useState} from "react";

import items from '../../../components/asserts/data.json'

function Jobs(){
    const [bank, setBank] = useState([]);

    useEffect(() => {
            const city = items.filter( (bs) => bs.level.includes("Midweight"))
            setBank(city)
      },[]);




    return (<>
          <div className="container-flex">
            {bank.map(({id,logo,company,level,location,position,postedAt,contract,languages})=>(
            <div className="row d-flex justify-content-center " key={id}>
                <div className="col-md-10 mt-2 pt-s border">
                    <div className="row z-depth-3">
                        <div className="col-sm-3 bg-info rounded-left">
                            <div className="card-block text-center text-white">
                                <img className="mt-2 img-fluid imglogo" src={logo} alt="sample"></img>
                                <h2 className="font-weight-bold mt-2">{company}</h2>
                                <p>{level}</p>
                                <i className="far-fa-edit fa-2x mb-2"></i>
                            </div>
                        </div>
                        <div className="col-sm-9 bg-white rounded-right">
                            <h3 className="mt-3 text-start">{position}</h3>
                            <div className="row">
                                <div className="col-sm">
                                    <p className="font-weight-bold">Location</p>
                                    <h6 className="text-muted">{location}</h6>
                                </div>
                                <div className="col-sm">
                                    <p className="font-weight-bold">Posted On</p>
                                    <h6 className="text-muted">{postedAt}</h6>
                                </div>
                                <div className="col-sm">
                                    <p className="font-weight-bold">Contract type</p>
                                    <h6 className="text-muted">{contract}</h6>
                                </div>
                                <div className="col-lg">
                                    <button className="btn btn-info mr-4">Modify</button>
                                    <button className="btn btn-danger">Remove</button>
                                </div>
                            </div>
                            <hr className="bg-primary"/>
                            <ul className="list-unstyled d-flex justify-content-start">
                            <h5 className="">Skills:</h5>
                            {languages.map((country,i)=>(
                                <li key={i}><i className="h5 m-2 text-muted">{country}</i></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
             ))} 
        </div>
   </> )
}

export default Jobs