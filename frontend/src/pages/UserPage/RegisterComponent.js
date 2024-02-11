import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import ValidSchema from "../../schemas/regSchema";
import Alert from "react-bootstrap/Alert";

function RegisterComponent() {
  let accounts = JSON.parse(localStorage.getItem("Account Storage") || "[]");
  const [isSucess, setIsSucess] = useState(false);

  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        name: "",
        password: "",
      },
      validationSchema: ValidSchema,

      onSubmit: (values, { resetForm }) => {
        if (isValidEmail(values.email)) {
          accounts.push(values);
          localStorage.setItem("Account Storage", JSON.stringify(accounts));
          resetForm(); // h3ml reset ll form l ana 3mltha ashan afdeha
          // bas mesh htban ashan hyn2lo
        } else {
          setIsSucess(true);
        }
      },
    });

  // hnshghl l function bas enha tdini error bdl mt3ml push

  const isValidEmail = (email) => {
    const found = accounts.find((item) => item.email === email);
    return !found;
  };

  // const [state, setState] = React.useState({
  //   name: "",
  //   email: "",
  //   password: ""
  // });
  // const handleChange = evt => {
  //   const value = evt.target.value;
  //   setState({
  //     ...state,
  //     [evt.target.name]: value
  //   });
  // };

  // const handleOnSubmit = evt => {
  //   evt.preventDefault();

  //   const { name, email, password } = state;
  //   alert(
  //     `You are sign up with name: ${name} email: ${email} and password: ${password}`
  //   );

  //   for (const key in state) {
  //     setState({
  //       ...state,
  //       [key]: ""
  //     });
  //   }
  // };

  return (
    <>
      <div className="form-containerx sign-up-containerx">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <div className="social-containerx">
            <a href="#" className="icon a">
              <i id="id-btn-register-phone" className="fa-solid fa-phone"></i>
            </a>
            <a href="#" className="icon a">
              <i
                id="id-btn-register-google"
                className="fa-brands fa-google"
              ></i>
            </a>
            {/* <a href="#" className="icon a"><i id="id-btn-register-twitter" className="fa-brands fa-twitter"></i></a>
          <a href="#" className="icon a"><i id="id-btn-register-github" className="fa-brands fa-github"></i></a>
          <a href="#" className="icon a"><i id="id-btn-register-microsoft" className="fa-brands fa-microsoft"></i></a>
          <a href="#" className="icon a"><i id="id-btn-register-yahoo" className="fa-brands fa-yahoo"></i></a> */}
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            className="input"
            name="name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Please, enter your name"
            class={errors.name && touched.name ? "input-error" : ""}
          />
          {errors.name && touched.name && (
            <p className="error">{errors.name}</p>
          )}
          <input
            type="email"
            className="input"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Please, enter your email"
            class={errors.email && touched.email ? "input-error" : ""}
          />
          {errors.email && touched.email && (
            <p className="error">{errors.email}</p>
          )}
          <input
            type="password"
            className="input"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Please, enter your password"
            class={errors.password && touched.password ? "input-error" : ""}
          />
          {errors.password && touched.password && (
            <p className="error">{errors.password}</p>
          )}
          {/* <select id="id-select-reg-usertype" required>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select> */}
          {/* <span>By clicking "Register," you agree to our <a className="a" href="http://">Terms of Use</a> and our <a href="http://">Privacy Policy</a>.</span> */}
          <button type="submit" className="button">
            Register
          </button>

          {isSucess && (
            <>
              <div class="fluid pt-3">
                <div className="fluid">
                  <Alert
                    variant="danger"
                    style={{ width: "200px", height: "100px" }}
                    className="fluid"
                  >
                    <Alert.Heading>Whoa not so fast</Alert.Heading>
                    <p>Account Already Registered</p>
                  </Alert>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default RegisterComponent;
