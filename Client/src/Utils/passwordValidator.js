export default function validatePassword(password){
    let warnings = {
        errors : [],
    };
    if(password.length<8){
        warnings.errors.push("The password needs to be atleast 8 characters long");
    }
    if(!/[A-Z]/.test(password)){
        warnings.errors.push("The password must contain atleast 1 upperCase letter");
    }
    if(!/[a-z]/.test(password)){
        warnings.errors.push("The password must contain atleast 1 lowerCase letter");
    }
    if(!/[0-9]/.test(password)){
        warnings.errors.push("The password must contain atleast 1 Number");
    }
    if(!/[!@#$%^&*]/.test(password)){
        warnings.errors.push("The password must contain a special character");
    }
    return warnings;
}