let response = (statusCode, data, message, res) => {
  res.status(statusCode).json({
    payload: {
      statusCode: statusCode,
      message: message,
      data: data,
    },
    // pagination: {
    //   prev: "",
    //   next: "",
    //   max: "",
    //   current: "",
    // },
  });
};

let errResponse = (statusCode, error, message, res) => {
  res.status(statusCode).json({
    payload: {
      statusCode: statusCode,
      message: message,
      error: error,
    },
    // pagination: {
    //   prev: "",
    //   next: "",
    //   max: "",
    //   current: "",
    // },
  });
};

module.exports = {response, errResponse};
