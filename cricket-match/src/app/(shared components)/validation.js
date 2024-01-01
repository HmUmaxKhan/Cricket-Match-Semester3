const isCnicValid = (cnic) => {
    if (cnic.length === 13 && /^[0-9+]+$/.test(cnic)) {
        return true;
    } else {
        return false;
    }
};
const isPhoneNumberValid = (phone) => {
    if (phone.length === 13 && /^[0-9+]+$/.test(phone)) {
        return true;
    } else {
        return false;
    }
};

const isNumberPositive = (input) => {
    if(/^\d+$/.test(input) && input>0){
        return true
    }else{
        return false;
    }
}

const isStartingDate = (input) => {
    if(input>Date.now()){
        return true
    }else{
        return false;
    }
}

const isEndingDate = (start,end) => {
    if(end>start){
        return true
    }else{
        return false;
    }
}

module.exports = { isCnicValid, isPhoneNumberValid, isNumberPositive,isStartingDate, isEndingDate };