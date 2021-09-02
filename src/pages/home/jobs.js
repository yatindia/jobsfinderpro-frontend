import React,{useEffect,useState} from "react";
import {Row, Col, Modal} from 'react-bootstrap'

import ApplyBtn from "../../components/applyBtn";

function Jobs({items}){
    const [bank, setBank] = useState([]);
    const [position,setPosition]=useState([])
    const [show, setShow] = useState(false);


    useEffect(() => {
        setBank(items)
      },[items]);

    const handleChange=(e)=>{
        if (e === ""){
            setPosition(bank)
            setBank(items)
        }else{
        const filteredUsers = items.filter(view => {
            const company = view.company
            const position = view.position
            const level = view.level
            const contract = view.contract
            const info = company + position + level + contract
            return info.trim().toLowerCase().includes(e.trim().toLowerCase())
        });
        setBank(filteredUsers)
        setPosition(filteredUsers)
        }
    }

    const  handlePositionChange = (e) =>{
        if(e === ""){
            setBank(position)
        }else{
        const filteredUsers = position.filter((view) => view.location.toLowerCase().includes(e.toLowerCase()) )
        setBank(filteredUsers)}
    }

    const getData=(event)=>{
        setShow(true)
    }

    return (<>
        <Row>
            <Col xs={6}>
                <Modal onHide={() => setShow(false)} show={show} >
                <Modal.Header closeButton><strong className="me-auto">Job Listing app</strong></Modal.Header>
                <Modal.Body>
                    <p>You are Applied to the job </p>
                </Modal.Body>
                </Modal>
            </Col>
        </Row>

        <form className="container-flex ">
          <div className="row d-flex justify-content-center">
              <div className="col-lg">
                  <div className="row">
                       <div className="col-lg col-md col-sm p-1 input-group">
                      <input className="form-control selector border"  type="text" 
                        onChange={(e) => handleChange(e.target.value)}  placeholder="Company, Title, Level, Contract.. " list="browsers"/>
                        <span className="input-group-append">
                            <div className="input-group-text"><i className="fa fa-search text-info"></i></div>
                        </span>
                      </div> 
                      <div className="col-lg col-md col-sm p-1 input-group">
                      <input className="form-control selector border"  type="text" onChange={(e) => handlePositionChange(e.target.value)} placeholder="Job Location" list="browsers1"/>
                        <span className="input-group-append">
                            <div className="input-group-text"><i className="fa fa-search text-info"></i></div>
                        </span>
                      </div>
                  </div>
              </div>
            </div>
          </form> 
       
         {bank.length > 0 ? (
          <div className="container-flex">
            {bank.map((items,key)=>(
            <div className="row d-flex justify-content-center " key={key}>
                <div className="col-md mt-2 pt-s border">
                    <div className="row z-depth-3">
                        <div className="col-sm-3 bg-info rounded-left">
                            <div className="card-block text-center text-white">
                                <img className="mt-2 img-fluid imglogo" src={items.logo} alt="sample"></img>
                                <h2 className="font-weight-bold mt-2">{items.company}</h2>
                                <p>{items.level}</p>
                                <i className="far-fa-edit fa-2x mb-2"></i>
                            </div>
                        </div>
                        <div className="col-sm-9 bg-white rounded-right">
                            <h3 className="mt-3 text-start">{items.position}</h3>
                            <div className="row">
                                <div className="col-sm">
                                    <p className="font-weight-bold">Location</p>
                                    <h6 className="text-muted">{items.location}</h6>
                                </div>
                                <div className="col-sm">
                                    <p className="font-weight-bold">Posted On</p>
                                    <h6 className="text-muted">{items.postedAt}</h6>
                                </div>
                                <div className="col-sm">
                                    <p className="font-weight-bold">Contract type</p>
                                    <h6 className="text-muted">{items.contract}</h6>
                                </div>
                                <div className="col-sm">
                                    <button className="btn btn-outline-info ">View</button>
                                    <ApplyBtn  handleClick={getData} job={items.position}></ApplyBtn>
                                </div>
                            </div>
                            <hr className="bg-primary"/>
                            <ul className="list-unstyled d-flex justify-content-start">
                            <h5 className="">Skills:</h5>
                            {items.languages.map((country, idx)=>(
                                <li><i className="h5 m-2 text-muted" key={idx}>{country}</i></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
             ))} 
        </div>
        ):<h4 className="text-danger text-center m-5">No Jobs available for your search keywords</h4>} 
   </> )
}

export default Jobs