import Resizer from "react-image-file-resizer";
import axios from "axios";
//export const API_URL = 'http://212.71.239.166:5300' 
import user from './asserts/user.jpg'


export const API_URL = 'http://127.0.0.1:5300'
export const userDp = user

// ----Image Resizer-------
export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,500,500,"JPEG",100,0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

// ----Image data to Blob-------
  export const dataURIToBlob = (dataURI) => {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
  
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  
    return new Blob([ia], { type: mimeString });
  }; 

  export const rawImg =(image)=>{
    var rawResponse = image 
    var b64Response = window.btoa(unescape(encodeURIComponent(rawResponse)))
    var outputImg = new Image();
    return outputImg.src = `data:image/jpeg;base64,${b64Response}`;
  }
  
// ----Validation for Seeker Profile---
var phoneno = /^\d{10}$/;

  export const formValid =(values)=>{
    if(values.qualifications.length<=0){
      return{error:"*Enter your Qualification.", valid:false}
  }
  if(values.pastJob.length<=0){
    return{error:"*Enter your Past Jobs.", valid:false}
}
    if(!values.mobile){
       return{error:"*Enter Mobile number.", valid:false}
    }
    if(!values.mobile.match(phoneno)){
      return{error:"*Enter Valid Phone Number.", valid:false}
    }
    if(!values.dateOfBirth){
        return{error:"*Enter Date fo Birth.", valid:false}
    }
    if(!values.jobTitle){
        return{error:"*Enter Your Job Title.", valid:false}
    }
    if(!values.gender){
        return{error:"*Eonfirm the Gender.", valid:false}
    }
    if(!values.state){
        return{error:"*Enter your Home State.", valid:false}
    }
    if(!values.city){
        return{error:"*Enter your Home City.", valid:false}
    }
    
    return {error:"All are valid.", valid:true}
    }
    

// ----Validation for Employer Profile---
export const empformValid =(values)=>{

  if(!values.orgLogo){
     return{error:"*Upload Organization Logo.", valid:false}
  }
  if(!values.orgName){
      return{error:"*Enter Organization Name.", valid:false}
  }
  if(!values.orgEmail){
      return{error:"*Enter Organization E-mail.", valid:false}
  }
  if(!values.orgPhone){
      return{error:"*Enter Organization Contact Number.", valid:false}
  }
  if(!values.orgPhone.match(phoneno)){
  return{error:"*Enter Valid Contact Number.", valid:false}
}
  if(!values.orgWebsite){
    return{error:"*Enter Organization Website.", valid:false}
}
  if(!values.orgAddress){
      return{error:"*Enter Organization Address.", valid:false}
  }
  if(!values.orgCountry){
    return{error:"*Enter Organization Landmark.", valid:false}
}
  
  return {error:"All are valid.", valid:true}
  }

  // ----Validation for post Job---
  export const formPostJob =(values)=>{
    if(!values.authid){
       return{error:"*Invalid User Id.", valid:false}
    }
    if(!values.jobTitle){
        return{error:"*Enter the Title of Job.", valid:false}
    }
    if(!values.jobDescription){
        return{error:"*Enter the Job Description.", valid:false}
    }
    if(!values.jobCity){
        return{error:"*Enter the Job Location.", valid:false}
    }
    if(!values.jobSalary){
        return{error:"*Enter the Salary Details.", valid:false}
    }
    if(!values.jobRequirement){
        return{error:"*Enter the Job Requirement.", valid:false}
    }
    if(!values.jobType){
      return{error:"*Enter Job Type.", valid:false}
  }
  if(!values.jobApplyEnd){
      return{error:"*Enter the Deadline of application.", valid:false}
  }
    
    return {error:"All are valid.", valid:true}
    }


  export  const getUser = async()=>{

    const userDetils = (JSON.parse(localStorage.getItem( 'userDetails'))||'')
    if (userDetils === ''){
      return null
    }
    else{
      const header = {'authorization': `<Bearer> ${userDetils.Auth_token}`}
      const formData = {email:userDetils.job_email,type:userDetils.Role_Type}
  
          try {
            const res = await axios.post(`${API_URL}/profile/getprofile`,formData,{headers:header})
            if(res.data.error === false){
              const datas = res.data.data
              localStorage.setItem('userInfo', JSON.stringify(datas.part2));
              addToLocalStorageObject('userDetails','dpName',datas.part1.profileImage)
              addToLocalStorageObject('userDetails','job_fname',datas.part1.firstName)
              addToLocalStorageObject('userDetails','job_lname',datas.part1.lastName)
              return datas
            }
            else{
             return null
            }
          } catch (error) {
            return console.log(error)
          }

    }
  }
    
    var addToLocalStorageObject = function (name, key, value) {
      var existing = localStorage.getItem(name);
      existing = existing ? JSON.parse(existing) : {};
      existing[key] = value;
      localStorage.setItem(name, JSON.stringify(existing));
    
    };