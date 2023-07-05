const { check, validationResult, oneOf } = require("express-validator");
const _ = require("lodash");
const { response } = require("../../response");
const runValidation = (req, res, next) => {
  const input = req.body;
  const error = validationResult(req);
  // save propertie name to array
  let arrInput = Object.keys(input);
  console.log("Masuk sini ga", error.array()[0]);
  // error checking
  if (!error.isEmpty()) {
    let sumErr,
      msgErr,
      msgDeepErrors = [];
    const detailError = error.array();
    console.log("ISI ERROR: ", detailError);

    if (!detailError[0].hasOwnProperty("nestedErrors")) {
      if (detailError.length > 1) {
        sumErr = `There are ${detailError.length} errors. Check details!`;
      } else {
        msgErr = detailError[0].msg;
      }
      return response(false, 422, msgErr || sumErr, null, detailError, res);
    } else {
      msgErr = detailError[0].msg;
      const deepErrors = _.flattenDeep(error.array().map((errors) => errors.nestedErrors));
      // msgDeepErrors = deepErrors;
      // for (let i = 0; i < deepErrors.length; i++) {
      //   if (arrInput.includes(`${deepErrors[i].param}`)) {
      //     console.log(i);
      //     msgDeepErrors.push({
      //       value: deepErrors[i].value,
      //       msg: deepErrors[i].msg,
      //     });
      //   }
      // }
      deepErrors.forEach((el) => {
        console.log(el);
        if (arrInput.includes(`${el.param}`)) {
          msgDeepErrors.push({
            value: el.value,
            msg: el.msg,
          });
        }
      });
      return response(false, 422, msgErr || sumErr, null, msgDeepErrors, res);
    }

    // return response(false, 422, msgErr || sumErr, null, msgDeepErrors, res);
  }
  next();
};

const validateOutlet = [
  check("company_name")
    .not()
    .isEmpty()
    .withMessage("Company name cannot be empty")
    .isString()
    .withMessage("Company name must be a string")
    .isLength({ min: 8 })
    .withMessage("Company name is too short, minimum is 8 characters")
    .isAlpha("en-US", { ignore: ". " })
    .withMessage("Company name must be alphabetic")
    .trim()
    .escape(),
  check("outlet_name")
    .not()
    .isEmpty()
    .withMessage("Outlet name cannot be empty")
    .isString()
    .withMessage("Outlet name must be a string")
    .isLength({ min: 8 })
    .withMessage("Outlet name is too short, minimum is 8 characters")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Outlet name can only be letters and numbers")
    .trim()
    .escape(),
  check("outlet_code")
    .not()
    .isEmpty()
    .withMessage("Outlet code cannot be empty")
    .isString()
    .withMessage("Outlet code must be a string")
    .isLength({ min: 5 })
    .withMessage("Outlet code is too short, minimum is 5 characters")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Outlet code can only be letters and numbers")
    .trim()
    .escape(),
  check("slogan").not().isEmpty().withMessage("Slogan cannot be empty").isString().withMessage("Slogan must be a string").isAlphanumeric("en-US", { ignore: ". ," }).withMessage("Outlet code cannot use symbols").trim().escape(),
  check("phone")
    .not()
    .isEmpty()
    .withMessage("Phone cannot be empty")
    .isNumeric()
    .withMessage("Phone must be a number")
    .isLength({ min: 11, max: 14 })
    .withMessage("Phone number must between around 11-14 characters long")
    .matches(/^(^\+62\s?|^0)(\d{2,3}-?\d{6,7}|(\d{3,4}-?){2}\d{3,4})$/)
    .withMessage("Phone number must start with +62 or 0")
    .trim()
    .escape(),
  check("email").not().isEmpty().withMessage("Email cannot be empty").isEmail().withMessage("Email must use @ once").normalizeEmail().trim().escape(),
  check("owner_name")
    .not()
    .isEmpty()
    .withMessage("Owner name cannot be empty")
    .isString()
    .withMessage("Owner name must be a string")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Owner name must be alphabetic")
    .isLength({ min: 3 })
    .withMessage("Owner name must be at least 3 characters long")
    .trim()
    .escape(),
  // address outlet
  check("street_name")
    .notEmpty()
    .withMessage("Street name cannot be empty")
    .isString()
    .withMessage("Street name must be a string")
    .isAlphanumeric("en-US", { ignore: ". " || " " })
    .withMessage("Outlet name can only be letters and numbers")
    .isLength({ min: 4 })
    .withMessage("Street name must be at least 4 characters long")
    .trim()
    .escape(),
  check("district")
    .notEmpty()
    .withMessage("District cannot be empty")
    .isString()
    .withMessage("District must be a string")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("District must be an alphabetic")
    .isLength({ min: 4 })
    .withMessage("Street name must be at least 4 characters long")
    .trim()
    .escape(),
  check("city")
    .notEmpty()
    .withMessage("City cannot be empty")
    .isString()
    .withMessage("City must be a string")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("City must be an alphabetic")
    .isLength({ min: 4 })
    .withMessage("Street name must be at least 4 characters long")
    .trim()
    .escape(),
  check("province")
    .notEmpty()
    .withMessage("Province cannot be empty")
    .isString()
    .withMessage("Province must be a string")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Province mut be an alphabetic")
    .isLength({ min: 4 })
    .withMessage("Street name must be at least 4 characters long")
    .trim()
    .escape(),
  check("country")
    .notEmpty()
    .withMessage("Country cannot be empty")
    .isString()
    .withMessage("Country must be a string")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Country must be an alphabetic")
    .isLength({ min: 4 })
    .withMessage("Street name must be at least 4 characters long")
    .trim()
    .escape(),
  check("postal_code").notEmpty().withMessage("Postal code cannot be empty").isNumeric().withMessage("Postal code must be a number").isLength({ min: 5, max: 5 }).withMessage("Postal code must be 5 characters long").trim().escape(),
];

const validateUpdate = [
  oneOf(
    [
      check("company_name")
        .isString()
        .withMessage("Company name must be a string")
        .isLength({ min: 8 })
        .withMessage("Company name is too short, minimum is 8 characters")
        .isAlpha("en-US", { ignore: ". " })
        .withMessage("Company name must be alphabetic")
        .trim()
        .escape(),
      check("outlet_name")
        .isString()
        .withMessage("Outlet name must be a string")
        .isLength({ min: 8 })
        .withMessage("Outlet name is too short, minimum is 8 characters")
        .isAlphanumeric("en-US", { ignore: " " })
        .withMessage("Outlet name can only be letters and numbers")
        .trim()
        .escape(),
      check("outlet_code")
        .isString()
        .withMessage("Outlet code must be a string")
        .isLength({ min: 5 })
        .withMessage("Outlet code is too short, minimum is 5 characters")
        .isAlphanumeric()
        .withMessage("Outlet code cannot use symbols")
        .trim()
        .escape(),
      check("slogan").isString().withMessage("Slogan must be a string").isAlphanumeric().withMessage("Outlet code cannot use symbols").trim().escape(),
      check("phone")
        .isNumeric()
        .withMessage("Phone must be a number")
        .isLength({ min: 11, max: 14 })
        .withMessage("Phone number must be at least 11 characters long")
        .matches(/^(^\+62\s?|^0)(\d{2,3}-?\d{6,7}|(\d{3,4}-?){2}\d{3,4})$/)
        .withMessage("Phone number must start with +62 or 0")
        .trim()
        .escape(),
      check("email").exists().withMessage("Email must using @").trim().escape(),
      check("owner_name")
        .isString()
        .withMessage("Owner name must be a string")
        .isAlpha("en-US", { ignore: " " })
        .withMessage("Owner name must be alphabetic")
        .isLength({ min: 3 })
        .withMessage("Owner name must be at least 3 characters long")
        .trim()
        .escape(),
      // outlet address
      check("street_name")
        .custom((el) => {
          console.log(el);
          el
          .isNumeric().withMessage("HARUS ANGKA")
        })
        .isString()
        .withMessage("Street name must be a string")
        .isLength({ min: 4 })
        .withMessage("Street name must be at least 4 characters long")
        .isAlphanumeric("en-US", { ignore: " ." })
        .withMessage("Street name can only be letters and numbers")
        .trim()
        .escape(),
      check("district")
        .isString()
        .withMessage("District must be a string")
        .isAlpha("en-US", { ignore: " " })
        .withMessage("District must be an alphabetic")
        .isLength({ min: 4 })
        .withMessage("Street name must be at least 4 characters long")
        .trim()
        .escape(),
      check("city")
        .isString()
        .withMessage("City must be a string")
        .isAlpha("en-US", { ignore: " " })
        .withMessage("City must be an alphabetic")
        .isLength({ min: 4 })
        .withMessage("Street name must be at least 4 characters long")
        .trim()
        .escape(),
      check("province")
        .isString()
        .withMessage("Province must be a string")
        .isLength({ min: 4 })
        .withMessage("Province must be at least 4 characters long")
        .isAlpha("en-US", { ignore: " " })
        .withMessage("Province must be an alphabetic")
        .trim()
        .escape(),
      check("country")
        .isString()
        .withMessage("Country must be a string")
        .isAlpha("en-US", { ignore: " " })
        .withMessage("Country must be an alphabetic")
        .isLength({ min: 4 })
        .withMessage("Street name must be at least 4 characters long")
        .trim()
        .escape(),
      check("postal_code").isNumeric().withMessage("Postal code must be a number").isLength({ min: 5, max: 5 }).withMessage("Postal code must be 5 characters long").trim().escape(),
    ],
    "There are some wrong inputs. Check details!"
  ),
];

module.exports = { runValidation, validateOutlet, validateUpdate };
