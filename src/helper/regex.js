const regex = {
  regEx: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/,
  checkMobileNumber: /^-?\d*\.?\d*$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
  //  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?!.*\.com$)[a-zA-Z]{2,}$/,
       email : /^(?!.*@.*@)(?!.*\.com.*\.com).*@.*\.com.*$/,
};

export default regex;
