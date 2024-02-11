import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import LoginSchema from "../../schemas/loginSchema";
import { useFormik } from "formik";


const LoginComponent = () => {
  const navigate = useNavigate();
  let locally = JSON.parse(localStorage.getItem("Account Storage") || "[]");
  let sessionLogin = JSON.parse(sessionStorage.getItem("login") || "[]");
  const [isError, setIsError] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState("signIn");

  const { handleSubmit, values, errors, handleBlur, touched, handleChange } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,

      onSubmit: (event) => {
        if (findAccount(values.email, values.password)) {
          // console.log("Found");
          // console.log(!sessionLogin);
          // console.log(storedEmail);
          // console.log(storedPassword);
          // if(!sessionLogin){}
          // sessionLogin.push(values);
          sessionStorage.setItem("login", JSON.stringify(values));
          setIsError(false);
          handleRefresh();
          navigate("/");
        } else {
          console.log("ERROR");
          setIsError(true);
        }
      },
    });

    useEffect(() => {
      if (sessionStorage.getItem("login")!=null) {
        navigate("/");
      }
    }, [navigate]);

  useEffect(() => {
    let showUserPanel = () => {
      if (sessionLogin.length > 0) {
        setIsLoggedin(true);
        setShowForm(false);
      } else {
        setIsLoggedin(false);
        setShowForm(true);
      }
    };

    showUserPanel();
  }, []);

  let findAccount = (email, password) => {
    let found = locally.find(
      (item) => item.email === email && item.password === password
    );
    return found ? true : false;
  };

  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
    let showUserPanel = () => {
      if (sessionLogin.length > 0) {
        setIsLoggedin(true);
        setShowForm(false);
      } else {
        setIsLoggedin(false);
        setShowForm(true);
      }
    };

    showUserPanel();
  };
  const logoutFun = () => {
    sessionLogin.pop();
    sessionStorage.setItem("login", JSON.stringify(sessionLogin));
    handleRefresh();
    console.log(sessionLogin);
  };

  // const navigate = useNavigate();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [emailError, setEmailError] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const [alertVisible, setAlertVisible] = useState(false);

  // const validateEmail = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // const validatePassword = (password) => {
  //   return password.length >= 8;
  // };

  // const handleEmailChange = (e) => {
  //   const newEmail = e.target.value;
  //   setEmail(newEmail);

  //   if (!validateEmail(newEmail)) {
  //     setEmailError("Invalid email");
  //   } else {
  //     setEmailError("");
  //   }
  // };

  // const handlePasswordChange = (e) => {
  //   const newPassword = e.target.value;
  //   setPassword(newPassword);

  //   if (!validatePassword(newPassword)) {
  //     setPasswordError("Password must be at least 8 characters");
  //   } else {
  //     setPasswordError("");
  //   }
  // };

  // const handleOnSubmit = (e) => {
  //   e.preventDefault();

  //   const users = JSON.parse(localStorage.getItem("users")) || [];
  //   const foundUser = users.find((user) => user.email === email && user.password === password);

  //   if (foundUser) {
  //     const currentUsers = JSON.parse(localStorage.getItem("currentUser")) || [];
  //     currentUsers.push(foundUser.name);
  //     localStorage.setItem("currentUser", JSON.stringify(currentUsers));

  //     navigate("/products");

  //   } else {
  //     setAlertVisible(true);
  //     setTimeout(() => {
  //       setAlertVisible(false);
  //     }, 3000);
  //   }

  //   setEmail("");
  //   setPassword("");
  // };

  return (
    <div className="form-containerx sign-in-containerx">
      <Form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="social-containerx">
          <a href="#" className="icon a">
            <i id="id-btn-login-phone" className="fa-solid fa-phone"></i>
          </a>
          <a href="#" className="icon a">
            <i id="id-btn-login-google" className="fa-brands fa-google"></i>
          </a>
          {/* <a href="#" className="icon a"><i id="id-btn-login-twitter" className="fa-brands fa-twitter"></i></a>
          <a href="#" className="icon a"><i id="id-btn-login-github" className="fa-brands fa-github"></i></a>
          <a href="#" className="icon a"><i id="id-btn-login-microsoft" className="fa-brands fa-microsoft"></i></a>
          <a href="#" className="icon a"><i id="id-btn-login-yahoo" className="fa-brands fa-yahoo"></i></a> */}
        </div>
        <span>or use your email for registeration</span>
        <Form.Control
          type="text"
          value={values.email}
          id="email"
          placeholder="Please, enter your email"
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )}
        {/* <Form.Control.Feedback type="invalid">
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}
        </Form.Control.Feedback> */}
        <Form.Control
          value={values.password}
          id="password"
          onBlur={handleBlur}
          placeholder="Please, enter your password"
          onChange={handleChange}
        />
        {errors.password && touched.password && (
          <p className="error">{errors.password}</p>
        )}
        {/* <Form.Control.Feedback type="invalid">
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}
        </Form.Control.Feedback> */}
        {/* <span>By clicking " Login," you agree to our <a href="http://">Terms of Use</a> and our <a href="http://">Privacy Policy</a>.</span> */}
        <a className="a" href="#">
          Forgot your password?
        </a>
        <Button className="my-3" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginComponent;
