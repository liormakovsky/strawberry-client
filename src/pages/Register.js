import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux";
import _ from "lodash";
import Cookies from "js-cookie";
import { FaSpinner } from "react-icons/fa";

const Register = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.userReducer);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && Cookies.get("XSRF-TOKEN")) {
      navigate("/total-messages");
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="loading d-flex justify-content-center align-items-center mt-5">
        <FaSpinner icon="spinner" className="spinner" />
      </div>
    );
  }

  const initialValues = {
    usr_name: "",
    email: "",
    passwordRegister: "",
    mailAdvertiseCheckbox: false,
    firstName: "",
    lastName: "",
  };
  const validationSchema = yup.object().shape({
    email: yup.string().email("המייל לא חוקי").required("המייל הינו שדה חובה"),
    passwordRegister: yup
      .string()
      .required("הסיסמה הינה שדה חובה")
      .min(6, "הסיסמה קצרה מדי, הסיסמה חייבת להכיל לפחות 6 תווים"),
    passwordConfirmation: yup
      .string()
      .required("אימות הסיסמה הינו שדה חובה")
      .oneOf(
        [yup.ref("passwordRegister"), null],
        "הסיסמה אינה תואמת לסיסמה המקורית"
      ),
    firstName: yup.string().required("השם הפרטי הינו שדה חובה"),
    lastName: yup.string().required("שם המשפחה הינו שדה חובה"),
    homeNumber: yup
      .number()
      .typeError("הכנס מספרים בלבד")
      .required("מספר הבית הינו שדה חובה"),
    address: yup.string().required("כתובת הינה שדה חובה"),
  });

  return (
    <>
      <div className="main-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(signupUser(values));
          }}
        >
          {({ dirty, errors }) => (
            <div id="register-container">
              <div id="sub-register-container">
                <div className="top-register-section">
                  <div className="register-strawberry-section">
                    <img
                      id="register-strawberry-img"
                      src="/png/logo.png"
                      alt=""
                    />
                  </div>
                  <div className="peginate-section">
                    <img id="pegination-img" src="/png/pagination.png" alt="" />
                  </div>
                </div>
                <Form id="registerForm">
                  <div className="client-details">
                    <Link to="/login">
                      <img
                        id="signin-text-img"
                        src="/png/signin-text.png"
                        alt=""
                      />
                    </Link>
                    <img
                      id="client-details-img"
                      src="/png/client-details-text.png"
                      alt=""
                    />
                  </div>

                  <div className="email-register-section">
                    <Field
                      type="email"
                      name="email"
                      id="register-email-input"
                      className="login-input"
                      dir="rtl"
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="text-danger"
                      dir="rtl"
                    />
                  </div>

                  <div className="password-register-section">
                    <div id="validate-password-register-group">
                      <Field
                        type="password"
                        name="passwordConfirmation"
                        id="passwordConfirmation"
                        className="login-input doubleInputs"
                        dir="rtl"
                      />
                      <ErrorMessage
                        name="passwordConfirmation"
                        component="span"
                        className="text-danger"
                        dir="rtl"
                      />
                    </div>

                    <div id="password-register-group">
                      <Field
                        type="password"
                        name="passwordRegister"
                        id="passwordRegister"
                        className="login-input doubleInputs"
                        dir="rtl"
                      />
                      <ErrorMessage
                        name="passwordRegister"
                        component="span"
                        className="text-danger"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div id="mailAdvertiseSection">
                    <p>אני מאשר/ת קבלת פרסומים במייל</p>
                    <div id="mailAdvertiseCheckboxContainer">
                      <Field
                        type="checkbox"
                        name="mailAdvertiseCheckbox"
                        id="mailAdvertiseCheckbox"
                      />
                    </div>
                  </div>
                  <div id="deliveryDetailsContainer">
                    <img
                      id="deliveryDetailsImg"
                      src="/png/address-title-text.png"
                      alt=""
                    />
                  </div>

                  <div className="doubleSection">
                    <div className="doubleInputStart">
                      <Field
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="login-input doubleInputs"
                        dir="rtl"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="span"
                        className="text-danger"
                        dir="rtl"
                      />
                    </div>

                    <div className="doubleInputEnd">
                      <Field
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="login-input doubleInputs"
                        dir="rtl"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="span"
                        className="text-danger"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div className="doubleSection">
                    <div className="doubleInputStart">
                      <Field
                        type="text"
                        name="homeNumber"
                        id="homeNumber"
                        className="login-input doubleInputs"
                        dir="rtl"
                      />
                      <ErrorMessage
                        name="homeNumber"
                        component="span"
                        className="text-danger"
                        dir="rtl"
                      />
                    </div>

                    <div className="doubleInputEnd">
                      <Field
                        type="text"
                        name="address"
                        id="address"
                        className="login-input doubleInputs"
                        dir="rtl"
                      />
                      <ErrorMessage
                        name="address"
                        component="span"
                        className="text-danger"
                        dir="rtl"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-outline-primary mt-2"
                    disabled={isLoading || !_.isEmpty(errors) || !dirty}
                  >
                    Sign Up
                  </button>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Register;