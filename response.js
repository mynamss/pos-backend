// response(error.success, error.code, error.message, error.data,  error.details, res);
let response = (success, code, message, data, details, res) => {
  if (success == false) {
    return res.status(code).json({
      success: success,
      code: code,
      error: {
        message: message,
        details: details,
      },
    });
  }
  return res.status(code).json({
    success: success,
    code: code,
    message: message,
    data: data,
  });
};

module.exports = { response };
