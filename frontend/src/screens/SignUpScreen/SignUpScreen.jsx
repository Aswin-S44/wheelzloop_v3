import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { IconButton, InputBase, Switch, FormControlLabel } from "@mui/material";
import { districtsInKerala } from "../../dummyData/discticts";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./SignUpScreen.css";
import ComboBox from "../../components/ComboBox/ComboBox";
import axios from "axios";
import { OTP_SEND_URL, SIGN_UP_URL, VERIFY_OTP__URL } from "../../config/api";

function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [hasPhysicalStore, setHasPhysicalStore] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const initialValues = {
    username: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    email: "",
    business_name: "",
    location: "",
    has_physical_store: false,
    otp: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    business_name: hasPhysicalStore
      ? Yup.string().required("Business name is required")
      : Yup.string(),
    location: Yup.string().required("Location is required"),
    otp: otpSent ? Yup.string().required("OTP is required") : Yup.string(),
  });

  const handleSendOtp = async (email) => {
    try {
      setLoading(true);

      const otpRes = await axios.post(`${OTP_SEND_URL}`, { email });

      setOtpSent(true);
      if (otpRes && otpRes.status == 200) {
        Swal.fire({
          title: "Success",
          text: "OTP Sent",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "User already exists wtth this email, Please use another",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to send OTP",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp, email) => {
    try {
      setLoading(true);

      const verifyOtp = await axios.post(`${VERIFY_OTP__URL}`, { email, otp });

      setEmailVerified(true);
      Swal.fire({
        title: "Success",
        text: "Email verified successfully",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Invalid OTP",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);

      const res = await axios.post(`${SIGN_UP_URL}`, values);

      if (res && res.status == 200) {
        Swal.fire({
          title: "Success!",
          text: "Successfully created  account",
          icon: "success",
        }).then(() => {
          navigate("/signin");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong, please try again",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Unable to process request",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sign-up-screen">
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6">
            <img
              src="https://img.freepik.com/free-vector/features-overview-concept-illustration_114360-1481.jpg"
              alt="Sign Up"
              className="w-100 mt-5"
              loading="lazy"
              title="signup page image"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="font-lg">
              Welcome to <span className="highlighted">WheeelzLoop</span>
            </h1>
            <p className="font-sm-2">
              The easiest and most convenient platform for buying and selling
              cars, designed to provide a hassle-free experience for users.
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, isValid }) => (
                <Form>
                  <div className="mt-4">
                    <p className="font-sm">Email</p>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Field
                        as={InputBase}
                        name="email"
                        placeholder="Email"
                        className="search-input"
                        style={{ border: "1px solid grey", width: "100%" }}
                        disabled={otpSent}
                      />
                      {!otpSent && (
                        <button
                          type="button"
                          className="highlighted-btn"
                          onClick={() => handleSendOtp(values.email)}
                          disabled={!values.email || loading}
                        >
                          Send OTP
                        </button>
                      )}
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-text"
                    />
                  </div>

                  {otpSent && (
                    <div className="mt-4">
                      <p className="font-sm">OTP Verification</p>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <Field
                          as={InputBase}
                          name="otp"
                          placeholder="Enter OTP"
                          className="search-input"
                          style={{ border: "1px solid grey", width: "100%" }}
                          disabled={emailVerified}
                        />
                        {!emailVerified && (
                          <button
                            type="button"
                            className="highlighted-btn"
                            onClick={() =>
                              handleVerifyOtp(values.otp, values.email)
                            }
                            disabled={!values.otp || loading}
                          >
                            Verify
                          </button>
                        )}
                      </div>
                      <ErrorMessage
                        name="otp"
                        component="div"
                        className="error-text"
                      />
                    </div>
                  )}

                  {emailVerified && (
                    <>
                      <div className="mt-4">
                        <p className="font-sm">Username</p>
                        <Field
                          as={InputBase}
                          name="username"
                          placeholder="Username"
                          className="search-input"
                          style={{ border: "1px solid grey", width: "100%" }}
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="error-text"
                        />
                      </div>

                      <div className="mt-4">
                        <p className="font-sm">First Name</p>
                        <Field
                          as={InputBase}
                          name="first_name"
                          placeholder="First Name"
                          className="search-input"
                          style={{ border: "1px solid grey", width: "100%" }}
                        />
                        <ErrorMessage
                          name="first_name"
                          component="div"
                          className="error-text"
                        />
                      </div>

                      <div className="mt-4">
                        <p className="font-sm">Last Name</p>
                        <Field
                          as={InputBase}
                          name="last_name"
                          placeholder="Last Name"
                          className="search-input"
                          style={{ border: "1px solid grey", width: "100%" }}
                        />
                        <ErrorMessage
                          name="last_name"
                          component="div"
                          className="error-text"
                        />
                      </div>

                      <div className="mt-4">
                        <p className="font-sm">Phone Number</p>
                        <Field
                          as={InputBase}
                          name="phone"
                          placeholder="Phone number"
                          className="search-input"
                          style={{ border: "1px solid grey", width: "100%" }}
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="error-text"
                        />
                      </div>

                      <div className="mt-4">
                        <p className="font-sm">Location</p>
                        <ComboBox
                          options={districtsInKerala}
                          value={values.location || ""}
                          onChange={(e, newValue) =>
                            setFieldValue("location", newValue)
                          }
                        />
                        <ErrorMessage
                          name="location"
                          component="div"
                          className="error-text"
                        />
                      </div>

                      <div className="mt-4">
                        <FormControlLabel
                          control={
                            <Switch
                              checked={hasPhysicalStore}
                              onChange={() => {
                                setHasPhysicalStore(!hasPhysicalStore);
                                setFieldValue(
                                  "has_physical_store",
                                  !hasPhysicalStore
                                );
                              }}
                            />
                          }
                          label="Do you have a physical store?"
                        />
                      </div>

                      {hasPhysicalStore && (
                        <div className="mt-4">
                          <p className="font-sm">Business Name</p>
                          <Field
                            as={InputBase}
                            name="business_name"
                            placeholder="Business Name"
                            className="search-input"
                            style={{ border: "1px solid grey", width: "100%" }}
                          />
                          <ErrorMessage
                            name="business_name"
                            component="div"
                            className="error-text"
                          />
                        </div>
                      )}

                      <div
                        className="mt-4"
                        style={{ position: "relative", width: "100%" }}
                      >
                        <p className="font-sm">Password</p>
                        <Field
                          as={InputBase}
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="search-input"
                          style={{
                            border: "1px solid grey",
                            padding: "10px 40px 10px 10px",
                            width: "100%",
                            borderRadius: "4px",
                          }}
                        />
                        <IconButton
                          onClick={togglePasswordVisibility}
                          style={{
                            position: "absolute",
                            top: "65%",
                            right: "10px",
                            transform: "translateY(-100%)",
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="error-text"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-100 highlighted-btn mt-4"
                        disabled={loading || !isValid}
                      >
                        {loading ? "Signing Up..." : "Sign Up"}
                      </button>
                    </>
                  )}

                  <div className="mt-4">
                    <a href="/signin" className="link">
                      Already have an account?
                    </a>
                  </div>
                  <a href="/forgot-password" className="link">
                    Forgot Password?
                  </a>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpScreen;
