import React, { useState } from "react";
import "./ForegotPasswordScreen.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputBase } from "@mui/material";
import axios from "axios";
import { FOREGOT_PASSWORD_URL } from "../../config/api";
import { ToastContainer, toast } from "react-toastify";

function ForegotPasswordScreen() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const notify = () => toast.success("Password reset link sent to your email");
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setLoading(true);
      const res = await axios.post(`${FOREGOT_PASSWORD_URL}`, values);
      setLoading(false);
      if (res && res.status == 200) {
        notify();
      } else {
        toast.error("User not found with this email");
      }
    } catch (error) {
      toast.error("User not found with this email");
      return error;
    } finally {
      setLoading(false);
      setSubmitting(false);
      resetForm();
    }
    setSubmitting(false);
  };
  return (
    <div>
      <div className="login-screen">
        <div className="container p-4">
          <div className="row">
            <div className="col-md-6">
              <img
                src="/images/intro.png"
                className="w-100"
                // loading="lazy"
                alt="Login"
              />
            </div>
            <div className="col-md-6">
              <h1 className="font-lg">
                Foregot <span className="highlighted">Password ?</span>
              </h1>
              <p className="font-sm-2">
                The easiest and most convenient platform for buying and selling
                cars.
              </p>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    {message && <div className="message-box">{message}</div>}
                    <div className="mt-5">
                      <p className="font-sm">Email</p>
                      <Field
                        as={InputBase}
                        name="email"
                        placeholder="Email or Phone Number"
                        className="search-input-2"
                        style={{ border: "1px solid grey", width: "100%" }}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-text"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-100 highlighted-btn mt-5"
                      disabled={isSubmitting || loading}
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </button>
                  </Form>
                )}
              </Formik>
              <div className="mt-4">
                <a href="/signup" className="link">
                  Don't have an account? Sign Up
                </a>
              </div>
              <a href="/signin" className="link">
                Already have an account ?
              </a>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ForegotPasswordScreen;
