import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux";
import { FaSpinner } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, error } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    if (user && localStorage.getItem("user")) {
      navigate("/tnx");
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="loading d-flex justify-content-center align-items-center mt-5">
        <FaSpinner icon="spinner" className="spinner" />
      </div>
    );
  }

  const initialValues = { email: "", password: "" };
  const validationSchema = yup.object().shape({
    email: yup.string().email("המייל אינו תקין").required("המייל הוא שדה חובה"),
    password: yup
      .string()
      .required("הסיסמה היא שדה חובה")
      .min(6, "הסיסמה קצרה מדי, הסיסמה חייבת להכיל לפחות 6 תווים"),
  });

  return (
    <>
      <div className="main-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(loginUser(values));
          }}
        >
          {() => (
            <div id="login-container">
              <div className="strawberry-section">
                <img id="strawberry" src="/png/strawberry.png" alt="" />
              </div>
              <div className="niceToSeeYou-section">
                <img id="niceToSeeYou" src="/png/nice-to-see-you.png" alt="" />
              </div>
              <Form>
                <div className="login-input-section">
                  <Field
                    type="email"
                    name="email"
                    id="login-email-input"
                    className="login-input"
                    dir="rtl"
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="text-danger"
                    dir="rtl"
                  />
                  <Field
                    type="password"
                    name="password"
                    id="login-password-input"
                    className="login-input"
                    dir="rtl"
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="text-danger"
                    dir="rtl"
                  />
                  <img
                    id="login-forgot-password"
                    src="/png/forgot-password-text.png"
                    alt="forgot-password"
                  />
                  <div>
                    {isError && (
                      <p className="serverError" dir="rtl">
                        {error}
                      </p>
                    )}
                  </div>
                  <button type="submit" id="login-submit" disabled={isLoading}>
                    כניסה לחשבון
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
