let response = (statusCode, data, message, res) => {
  res.json({
    payload: {
      statusCode: statusCode,
      data: data,
      message: message,
    },
    pagination: {
      prev: "",
      next: "",
      max: "",
      current: ""
    },
  });
};

module.exports = response;
