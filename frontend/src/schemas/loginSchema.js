import * as yup from "yup";

const loginPat = /^[a-zA-Z0-9._]+@[a-z]{1,8}\.(com|eg|gov|edu)$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=])(?=.*[^\w\d\s]).{8,}$/;
// At least one uppercase letter,
// one lowercase letter, one digit,
// one special character, one non-alphanumeric character, and
// minimum length of 8
// At least one non-alphanumeric charact.{8,}$/;
// Minimum length 8

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter a Valid Email")
    .required("Must Add Email")
    .matches(loginPat, "Email Doesnt Meet Req"),
  password: yup
    .string()
    .min(8)
    .max(20)
    .matches(passwordRegex, "Password Req Error")
    .required("Password Must Match")
    .required("Must Fill this Field"),
});

export default LoginSchema;
