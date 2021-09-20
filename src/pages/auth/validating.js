// ----Validation for Register---
export const validating =(values)=>{

if(!values.firstName){
   return{error:"*Please enter your First name.", valid:false}
}
if(!values.lastName){
    return{error:"*Please enter your Last name.", valid:false}
}
if(!values.password){
    return{error:"*Please enter a Password.", valid:false}
}
if(!values.cpassword){
    return{error:"*Please confirm the password.", valid:false}
}
if(values.password !== values.cpassword){
    return{error:"*Password  & Confirm password didn't match.", valid:false}
}
if(!values.email){
    return{error:"*Please enter your E-mail.", valid:false}
}
if(!values.profileImage){
    return{error:"*Upload Profile Picture.", valid:false}
}

if (typeof values.email !== "undefined") {
          
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(values.email)) {
      return{error:"*Please enter valid E-mail.", valid:false}
    }
}

return {error:"All are valid.", valid:true}
}


// ----E-Mail Validate for Login---
export const validateMail =(values)=>{
    if(!values.email){
        return{error:"*Please enter your E-mail.", valid:false}
    }
    if (typeof values.email !== "undefined") {
          
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(values.email)) {
          return{error:"*Please enter valid E-mail.", valid:false}
        }
    }
    return {error:"fine", valid:true}
}
