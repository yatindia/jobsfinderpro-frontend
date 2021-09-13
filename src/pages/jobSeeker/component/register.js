import React,{useState} from 'react'
import {Modal} from 'react-bootstrap';

import DynamicInput from './dynamicInputs';
import category from '../../../components/asserts/category.json'
import skilldata from '../../../components/asserts/skill.json'

const Registration = ({show, title, dialogClose}) => {

    const [cate, setCat] = useState(true);
    const [skills, setSkills] =useState([])
    const [edu, setEdu] =useState([])
    const [lang, setLang] =useState([])
    const [project, setProject] =useState([])




const categoryChange =(e)=>{
    if(e==='Select..' || e ===''){
        setCat('')
    }else{
        try {
            let subData = require('../../../components/asserts/subCategory/'+e+'.json');
            setCat(subData)
        } catch (error) {
            setCat('')
            console.log(error)
        }
    }
}


    if(!show){
        return <> </>
    }
    else {
    return(<>
            <Modal show={show} onHide={dialogClose} className="justify-content-center">
                <Modal.Header closeButton> {title} </Modal.Header>
                    <Modal.Body>
                    <div className="">
                        <div className=" fade show active border-bottom p-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" className="form-control" defaultValue="Kiran"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" className="form-control" defaultValue="kiranacharya287@gmail.com"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Phone number</label>
                                        <input type="text" className="form-control" defaultValue="+91 9876543215"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Employment Summary <small className="text-secondary"> Min 50- Characters</small></label>
                                        <textarea className="form-control" rows="4" minLength="50"
                                            defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero enim error similique quia numquam ullam corporis officia odio repellendus aperiam consequatur laudantium porro voluptatibus, itaque laboriosam veritatis voluptatum distinctio!"></textarea>
                                    </div>
                                </div>
                                 <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Career Summary <small className="text-secondary"> Min 50- Characters</small></label>
                                        <textarea className="form-control" rows="4" minLength="50"
                                            defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero enim error similique quia numquam ullam corporis officia odio repellendus aperiam consequatur laudantium porro voluptatibus, itaque laboriosam veritatis voluptatum distinctio!"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Category</label>
                                        <div className="app_dropdown">
                                            <select className="form-control selector border" onChange={(e) => categoryChange(e.target.value)}>
                                                <option>Select..</option>
                                                {category.map((items,i)=>(<option key={i} value={items}> {items}</option>))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Sub Category</label>
                                        <div className="app_dropdown">
                                        {cate.length > 0 ? (
                                            <select className="form-control selector border">
                                                {cate.map((items,i)=>(<option key={i} value={items}> {items}</option>))}
                                            </select>):<select className="form-control selector border"><option>Select..</option></select>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Skills</label>
                                        <div className="">
                                        <DynamicInput get={setSkills} dataset ={skilldata}></DynamicInput>
                                        <p>{(JSON.stringify(skills))}</p> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Educations</label>
                                        <div className="">
                                        <DynamicInput get={setEdu}></DynamicInput>
                                         <p>{(JSON.stringify(edu, null, 2))}</p> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea className="form-control" rows="4" minLength="50"
                                            defaultValue="Lorem ipsum dolor\n sit amet consectetur \nadipisicing \nelit."></textarea>
                                    </div>
                                </div>
                                 <div className="col-md-6">
                                    <div className="form-group calender">
                                        <label>Date of Birth</label>
                                        <input type="date" name="begin" className="form-control" placeholder="dd-mm-yyyy" onChange={(e)=>console.log(e.value)} min="1980-01-01"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6 col-sm">
                                    <label>Martial Status</label>
                                    <div className="input-group">
                                        <input className="form-control selector border" type="text" placeholder="Select.." list="stat"/>
                                        <datalist id = "stat">
                                            <option>Unmarried</option>
                                            <option>Married</option>
                                            <option>Single</option>
                                            <option>Widowed</option>
                                        </datalist>
                                    </div>
                                </div>
                                <div className="form-group col-md-6 col-sm">
                                    <label>Gender</label>
                                    <div className="input-group">
                                        <select className="form-control selector border" type="text" list="gender">
                                            <option>Select</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Transgender</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Language</label>
                                        <div className="">
                                        <DynamicInput get={setLang}></DynamicInput>
                                        <p>{(JSON.stringify(lang))}</p> 
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Projects</label>
                                        <div className="">
                                        <DynamicInput get={setProject}></DynamicInput> 
                                        <p>{(JSON.stringify(project))}</p> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group p-2">
                                        <p className="form-group text-primary">Kiran resume.pdf</p>
                                        <label>Resume Update</label>
                                        <input type="file" className="form-control" accept="application/pdf"/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-findJob m-2">Update</button>
                            </div>
                        </div>
                    </div>
                         
                    </Modal.Body>
            </Modal>
    </>) }

}
export default Registration