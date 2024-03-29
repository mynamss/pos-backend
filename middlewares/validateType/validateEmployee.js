const { check, validationResult, oneOf } = require("express-validator");
const _ = require('lodash');
const { response } = require("../../response");
const runValidation = (req, res, next) => {
const error = validationResult(req);
  if (!error.isEmpty()) {
    const deepErrors = _.flattenDeep(error.array().map(errors => errors.nestedErrors));
    const detailError = deepErrors.map(err => err.msg)
    console.log("CUMA SAMPAI SINI PAK: ", detailError);
    return response(false, 422, error.array()[0].msg, null, detailError, res);
  }
  next();
};

const validateRegister = [
  check("outlet_id")
    .notEmpty()
    .withMessage("Outlets cannot be empty")
    .isInt()
    .withMessage("Outlet id must be an integer")
    .trim()
    .escape(),
  check("role_id")
    .notEmpty()
    .withMessage("Roles cannot be empty")
    .isInt()
    .withMessage("Role id must be an integer")
    .trim()
    .escape(),
  check("status")
    .notEmpty()
    .withMessage("Status cannot be empty")
    .isString()
    .withMessage("Status must be a string")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Status must be alphabetic")
    .trim()
    .escape(),
  check("employee_code")
    .notEmpty()
    .withMessage("Employee code cannot be empty")
    .isString()
    .withMessage("Status must be a string")
    .isAlphanumeric()
    .withMessage("Employee code must be alphanumeric")
    .trim()
    .escape(),
  check("fullname")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isString()
    .withMessage("Name must be a string")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Name must be alphabetic")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .trim()
    .escape(),
  check("id_card")
    .notEmpty()
    .withMessage("ID card cannot be empty")
    .isInt()
    .withMessage("Identity Card must be a number")
    .isLength({ min: 16, max: 16 })
    .withMessage("Identity Card must be  16 characters long")
    .trim()
    .escape(),
  check("gender")
    .notEmpty()
    .withMessage("Gender cannot be empty")
    .isString()
    .withMessage("Gender must be a string")
    .isAlpha("en-US", { ignore: "-" })
    .withMessage("Name must be alphabetic")
    .trim()
    .escape(),
  check("birthdate")
    .notEmpty()
    .withMessage("Birthdate cannot be empty")
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Format date must be YYYY-MM-DD")
    .trim()
    .escape(),
  check("married_status")
    .notEmpty()
    .withMessage("Married Status cannot be empty")
    .isString()
    .withMessage("Married status must be a string")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Married status must be alphabetic")
    .trim()
    .escape(),
  check("phone")
    .notEmpty()
    .withMessage("Phone cannot be empty")
    .isNumeric()
    .withMessage("Phone must be a number")
    .isLength({ min: 11, max: 14 })
    .withMessage("Phone number must be at least 11 characters long")
    .matches(/^(^\+62\s?|^0)(\d{2,3}-?\d{6,7}|(\d{3,4}-?){2}\d{3,4})$/)
    .withMessage("Phone number must start with +62 or 0")
    .trim()
    .escape(),
  check("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail().withMessage("Email must using @")
    .toLowerCase()
    .trim()
    .escape(),
  check("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must have at least one capital letter")
    .matches(/[a-z]/)
    .withMessage("Password must have at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must have at least one digit number")
    .matches(/[^\w\s]/)
    .withMessage("Password must have at least one symbols")
    .trim()
    .escape(),
  check("main_salary")
    .notEmpty()
    .withMessage("Main salary cannot be empty")
    .isFloat()
    .withMessage("Salary must be a number")
    .trim()
    .escape(),
  check("bonus_salary")
    .isFloat()
    .withMessage("Bonus must be a number")
    .trim()
    .escape(),
  check("entry_date")
    .notEmpty()
    .withMessage("Entry date cannot be empty")
    .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .withMessage("Format date must be YYYY-MM-DD HH:MM:SS")
    .trim()
    .escape(),
  check("photo")
    .notEmpty()
    .withMessage("Photo cannot be empty")
    .isString()
    .withMessage("Photo must be a string")
    .trim()
    .escape(),
  // employee address
  check("street_name")
    .notEmpty()
    .withMessage("Street name cannot be empty")
    .isString()
    .withMessage("Street name must be a string")
    .isAlphanumeric("en-US", { ignore: " ." })
    .withMessage("Street cannot contain symbols")
    .trim()
    .escape(),
  check("district")
    .notEmpty()
    .withMessage("District cannot be empty")
    .isString()
    .withMessage("District must be a string")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("District must be an alphabetic")
    .trim()
    .escape(),
  check("city")
    .notEmpty()
    .withMessage("City cannot be empty")
    .isString()
    .withMessage("City must be a string")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("City must be an alphabetic")
    .trim()
    .escape(),
  check("province")
    .notEmpty()
    .withMessage("Province cannot be empty")
    .isString()
    .withMessage("Province must be a string")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Province must be an alphabetic")
    .trim()
    .escape(),
  check("country")
    .notEmpty()
    .withMessage("Country cannot be empty")
    .isString()
    .withMessage("Country must be a string")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Country must be an alphabetic")
    .trim()
    .escape(),
  check("postal_code")
    .notEmpty()
    .withMessage("Postal code cannot be empty")
    .isNumeric()
    .withMessage("Postal code must be a number")
    .isLength({ min: 5, max: 5 })
    .withMessage("Postal code must be 5 characters long")
    .trim()
    .escape(),
];

const validateLogin = [
  oneOf([
    check("fullname")
      .notEmpty()
      .bail()
      .withMessage("Enter your email or username")
      .isString()
      .withMessage("Name must be a string")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Name must be alphabetic")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .trim()
      .escape(),
      check("email")
      .notEmpty()
      .bail()
      .withMessage("Enter your email or username")
      .isEmail()
      .withMessage("Email must using @")
      .toLowerCase()
      .trim()
      .escape(),
  ], "Email or username has an incorrect input. Check again!"),
  // .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)
  check("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must have at least one capital letter")
    .matches(/[a-z]/)
    .withMessage("Password must have at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must have at least one digit number")
    .matches(/[^\w\s]/)
    .withMessage("Password must have at least one symbols")
    .trim()
    .escape(),
];

const validateUpdate = [
  oneOf([
    check("outlet_id")
      .isEmpty()
      .withMessage("Outlet id cannot empty")
      .isInt()
      .withMessage("Outlet id must be an integer")
      .trim()
      .escape(),
    check("role_id")
      .isInt()
      .withMessage("Role id must be an integer")
      .trim()
      .escape(),
    check("status")
      .isString()
      .withMessage("Status must be a string")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Status must be alphabetic")
      .trim()
      .escape(),
    check("employee_code")
      .isString()
      .withMessage("Status must be a string")
      .isAlphanumeric()
      .withMessage("Employee code must be alphanumeric")
      .trim()
      .escape(),
    check("fullname")
      .isString()
      .withMessage("Name must be a string")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Name must be alphabetic")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .trim()
      .escape(),
    check("id_card")
      .isInt()
      .withMessage("Identity Card must be a number")
      .isLength({ min: 16, max: 16 })
      .withMessage("Identity Card must be  16 characters long")
      .trim()
      .escape(),
    check("gender")
      .isString()
      .withMessage("Gender must be a string")
      .isAlpha("en-US", { ignore: "-" })
      .withMessage("Name must be alphabetic")
      .isEmpty({})
      .trim()
      .escape(),
    check("birthdate")
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("Format date must be YYYY-MM-DD")
      .trim()
      .escape(),
    check("married_status")
      .isString()
      .withMessage("Married status must be a string")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Married status must be alphabetic")
      .trim()
      .escape(),
    check("phone")
      .isNumeric()
      .withMessage("Phone must be a number")
      .isLength({ min: 11, max: 14 })
      .withMessage("Phone number must be at least 11 characters long")
      .matches(/^(^\+62\s?|^0)(\d{2,3}-?\d{6,7}|(\d{3,4}-?){2}\d{3,4})$/)
      .withMessage("Phone number must start with +62 or 0")
      .trim()
      .escape(),
    check("email")
      .isEmail().withMessage("Email must using @")
      .toLowerCase()
      .trim()
      .escape(),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must have at least one capital letter")
      .matches(/[a-z]/)
      .withMessage("Password must have at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must have at least one digit number")
      .matches(/[^\w\s]/)
      .withMessage("Password must have at least one symbols")
      .trim()
      .escape(),
    check("main_salary")
      .isFloat()
      .withMessage("Salary must be a number")
      .trim()
      .escape(),
    check("bonus_salary")
      .isFloat()
      .withMessage("Bonus must be a number")
      .trim()
      .escape(),
    check("entry_date")
      .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
      .withMessage("Format date must be YYYY-MM-DD HH:MM:SS")
      .trim()
      .escape(),
    check("photo")
      .isString()
      .withMessage("Photo must be a string")
      .trim()
      .escape(),
    check("street_name")
      .isString()
      .withMessage("Street name must be a string")
      .isAlphanumeric("en-US", { ignore: " ." })
      .withMessage("Street cannot contain symbols")
      .trim()
      .escape(),
    check("district")
      .isString()
      .withMessage("District must be a string")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("District must be an alphabetic")
      .trim()
      .escape(),
    check("city")
      .isString()
      .withMessage("City must be a string")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("City must be an alphabetic")
      .trim()
      .escape(),
    check("province")
      .isString()
      .withMessage("Province must be a string")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Province must be an alphabetic")
      .trim()
      .escape(),
    check("country")
      .isString()
      .withMessage("Country must be a string")
      .isAlpha("en-US", { ignore: " " })
      .withMessage("Country must be an alphabetic")
      .trim()
      .escape(),
    check("postal_code")
      .isNumeric()
      .withMessage("Postal code must be a number")
      .isLength({ min: 5, max: 5 })
      .withMessage("Postal code must be 5 characters long")
      .trim()
      .escape(),
  ], "There are some wrong inputs"),
];
module.exports = { runValidation, validateRegister, validateLogin, validateUpdate };
