// ----Validation for Register---
export const formValid =(values)=>{

    if(!values.mobile){
       return{error:"*Please enter Mobile number.", valid:false}
    }
    if(!values.dateOfBirth){
        return{error:"*Please enter Date fo Birth.", valid:false}
    }
    if(!values.jobTitle){
        return{error:"*Please enter Your Job Title.", valid:false}
    }
    if(!values.gender){
        return{error:"*Please confirm the Gender.", valid:false}
    }
    if(values.qualifications.length<=0){
        return{error:"*Please enter your Qualification.", valid:false}
    }
    if(!values.state){
        return{error:"*Please enter your Home State.", valid:false}
    }
    if(!values.city){
        return{error:"*Please enter your Home City.", valid:false}
    }
    
    return {error:"All are valid.", valid:true}
    }
    