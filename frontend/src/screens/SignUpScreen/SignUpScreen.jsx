import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import {
  IconButton,
  Switch,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import { districtsInKerala } from "../../dummyData/discticts";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { OTP_SEND_URL, SIGN_UP_URL, VERIFY_OTP__URL } from "../../config/api";
import axios from "axios";
import ComboBox from "../../components/ComboBox/ComboBox";
import "./SignUpScreen.css";

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
          text: "User already exists with this email, Please use another",
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
          text: "Successfully created account",
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
        text: "User already exists with this email",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-left">
          <img
            src="https://www.autotrainingcentre.com/wp-content/uploads/2015/12/auto-sales-college.jpg"
            className="login-image"
            alt="Sign Up"
            title="signup page image"
          />
        </div>
        <div className="login-right">
          <div className="login-header">
            <h1 className="login-title">
              Welcome to <span className="highlighted">WheeelzLoop</span>
            </h1>
            <p className="login-subtitle">
              The easiest and most convenient platform for buying and selling
              cars, designed to provide a hassle-free experience for users.
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isValid, handleChange, handleBlur }) => (
              <Form className="login-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      className="form-input"
                      value={values.first_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="error-text"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      className="form-input"
                      value={values.last_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="error-text"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="form-input"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error-text"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-input"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-text"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone number"
                      className="form-input"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="error-text"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <ComboBox
                      options={districtsInKerala}
                      value={values.location || ""}
                      onChange={(e, newValue) =>
                        setFieldValue("location", newValue)
                      }
                      className="form-input"
                    />
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="error-text"
                    />
                  </div>
                </div>

                <div className="form-group">
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
                    className="form-label"
                  />
                </div>

                {hasPhysicalStore && (
                  <div className="form-group">
                    <label className="form-label">Business Name</label>
                    <input
                      type="text"
                      name="business_name"
                      placeholder="Business Name"
                      className="form-input"
                      value={values.business_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="business_name"
                      component="div"
                      className="error-text"
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="form-input"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {/* <InputAdornment position="end" className="password-toggle">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment> */}
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-text"
                  />
                </div>

                <button
                  type="submit"
                  className="login-button"
                  disabled={loading || !isValid}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>

                <div className="login-footer">
                  <a href="/signin" className="login-link">
                    Already have an account? <span>Sign In</span>
                  </a>
                  <a href="/forgot-password" className="login-link">
                    Forgot Password?
                  </a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default SignUpScreen;
