import React, {useEffect, useState} from "react";


function Test() {

    const profile_1 = JSON.parse(localStorage.getItem( 'userDetails'));
    const profile_2 = JSON.parse(localStorage.getItem( 'userInfo'));

    const [newEdu, setNewEdu] =useState()

      const [profile, setProfile] = useState({
        qualifications:profile_2.qualifications,
        state:profile_2.state,
        city:profile_2.city,
        resume:profile_2.resume
      })
      

const detailUpdate =async()=>{
    console.log(profile)
}

const deleteEdu=(i,e)=>{
    const items = [...profile.qualifications]
    items.splice(i,1)
    console.log("8",items)
    setProfile({...profile,qualifications:items})
}

const eduAdd =()=>{
   let arr = profile.qualifications.concat(newEdu)
   setProfile({...profile,qualifications:arr})
}

const eduChange=(i,e)=>{
    const items = Object.assign([],profile.qualifications)
    items.splice(i, 1, e.target.value)
    setProfile({...profile,qualifications:items})
}

useEffect(()=>{

})

    return (<>
    <div className="conatiner-flex m-3 p-2 border tab-content">
        <div className="tab-pane fade show active m-4">
            <h3 className="mb-4 p-2 border-bottom text-secondary"><small>Employment Update</small></h3>
            <div className='row'>
                <div className="col-md-10">
                    <div className="form-group">
                        <label className="formFieldLabel">Qualifications</label>
                        <div className="row">
                            <div className='col'>
                                <input className="form-control" onChange={(e) => setNewEdu(e.target.value)}/>
                            </div>
                            <div className='col-sm'>
                                <button className="btn btn-resume" onClick={eduAdd}>Add New</button>
                            </div>
                        </div>
                        {profile.qualifications ? (
                        <div className='row p-2'>
                            {profile.qualifications.map((item, i)=>(
                            <div key={i} className="d-flex">
                                <input className="m-2 p-1 form-control" value={item} onChange={(e)=>eduChange(i,e)}/>
                                <button className="m-2 btn btn-outline-danger" value={item} onClick={(e)=>deleteEdu(i,e)}>X</button>
                            </div>
                            ))}
                        </div>):null}
                    </div>
                </div>
            </div>
            <div className ='row'>
                <div className ="col ml-auto text-right">
                    <button className="btn btn-findJob m-2" type="button" onClick={detailUpdate}>Update</button>
                    <a className="btn btn-outline-danger m-2" type="button"  href="/users/dashboard" >Cancel</a>
                </div>
            </div>
        </div>
    </div>
    </>);
}

export default Test;
