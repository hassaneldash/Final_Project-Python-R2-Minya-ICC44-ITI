import * as yup from "yup";

const loginPat = /^[a-zA-Z0-9._]+@[a-z]{1,8}\.(com|eg|gov|edu)$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=])(?=.*[^\w\d\s]).{8,}$/;

const ValidSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter a Valid Email")
    .required("Must Add Email")
    .matches(loginPat, "Email Didn't Meet Requriments should contain @ and ."),
  password: yup
    .string()
    .min(8)
    .max(20)
    .matches(passwordRegex, "Password Requriment Error")
    .required("Password Must Match")
    .required("Must Fill this Field"),
  name: yup
    .string()
    .min(3, "Name must be at Least 3 Letters")
    .max(15, "Name must be Maximum 15 Letters")
    .required("Must Fill this Field"),
});

export default ValidSchema;
