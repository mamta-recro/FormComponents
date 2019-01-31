var validations = {
  name: {
    regex: /^[a-zA-Z ]+$/,
    min: 1,
    max: 50,
    errorMessage: "Please enter valid name"
  },

  alphanumeric: {
    regex: /^\S+[a-zA-Z0-9_ ]*$/,
    min: 1,
    errorMessage: "Please enter valid text"
  },
  address: {
    regex: /^[a-zA-Z0-9\s\,\''\-]*$/,
    min: 1,
    max: 50,
    errorMessage: "Please enter valid  address"
  },
  email: {
    regex: /^\S+@(([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6})$/,
    min: 1,
    max: 50,
    errorMessage: "Please enter valid email address"
  },
  mobile: {
    regex: /^[6789]\d{9}$/,
    min: 10,
    max: 10,
    regallow: /^[0-9]+$/,
    errorMessage: "Please enter valid mobile number"
  },

  amount: {
    regex: /^\d*\.{0,1}\d{0,2}$/,
    min: 1,
    max: 10,
    regallow: /^\d*\.{0,1}\d{0,2}$/,
    errorMessage: "Amount should be greater than 0"
  },
  otp: {
    regex: /^[0-9]+$/,
    min: 6,
    max: 6,
    regallow: /^[0-9]+$/,
    errorMessage: "Please enter 6 digits OTP number"
  },

  pin: {
    regex: /^[0-9]+$/,
    min: 6,
    max: 6,
    regallow: /^[0-9]+$/,
    errorMessage: "Please enter 6 digits pin number"
  },
  year: {
    regex: /^[0-9]+$/,
    min: 4,
    max: 4,
    regallow: /^[0-9]+$/,
    errorMessage: "Please enter 4 digits year"
  },

  password: {
    regex: /^\S+$/,
    min: 6,
    max: 100
  },
  userid: {
    regex: "",
    min: 5,
    max: 100
  },
  numberOnly: {
    regex: /^[0-9]+$/,
    min: 1,
    max: 1000000,
    regallow: /^[0-9]+$/,
    errorMessage: ""
  },

  numberAndDecimal: {
    regex: /^\d*\.{0,1}\d{0,9}$/,

    regallow: /^\d*\.{0,1}\d{0,9}$/
  },
  DecimalNumber: {
    regex: /^\d*\.{0,1}\d{0,9}$/,
    min: 1,
    regallow: /^\d*\.{0,1}\d{0,9}$/
  }
};

exports.getAllValidations = function() {
  return validations;
};

exports.validate = function(type, data) {
  var result = { data: data, error: "" };

  if (validations[type] != undefined) {
    if (validations[type].regallow != undefined) {
      var regObj = new RegExp(validations[type].regallow);
      if (!regObj.test(result.data))
        result.data = result.data.substring(0, result.data.length - 1);
    }
    if (result.data.length > validations[type].max)
      result.data = result.data.substring(0, result.data.length - 1);

    var regObj = new RegExp(validations[type].regex);
    if (!regObj.test(result.data))
      result.error = validations[type].errorMessage;

    if (result.data.length < validations[type].min)
      result.error =
        "Minimum length of field should be " +
        validations[type].min +
        " characters";

    if (result.data.length > validations[type].max)
      result.error =
        "Maximum length of field should be " +
        validations[type].max +
        " characters";
    if (type == "amount") {
      if (result.data[result.data.length - 1] != ".") {
        result.data = Number(result.data);
      }
    }

    return result;
  } else return result;
};

exports.getValidationArray = function(obj) {
  return Object.keys(obj).filter(function(key) {
    return obj[key] != "";
  });
};
