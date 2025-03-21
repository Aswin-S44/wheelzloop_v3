import React, { useContext } from "react";
import MultiStepFormContext from "./MultiStepFormContext";
import { Formik } from "formik";
import { Input, Button, Row, Col, Select, Typography } from "antd";
import {
  CarOutlined,
  DashboardOutlined,
  CalendarOutlined,
  DollarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { car_brands, car_conditions } from "../../dummyData/carBrands";
import { years } from "../../dummyData/years";

const { Title } = Typography;
const { Option } = Select;

function BasicInformation() {
  const { basicDetails, setBasicDetails, next } =
    useContext(MultiStepFormContext);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <Title
        level={2}
        style={{ textAlign: "center", marginBottom: 32, color: "#30bfa1" }}
      >
        <CarOutlined style={{ marginRight: 8 }} />
        Enter Your Car Details
      </Title>

      <Formik
        initialValues={basicDetails}
        onSubmit={(values) => {
          setBasicDetails(values);
          next();
        }}
        validate={(values) => {
          const errors = {};
          if (!values.car_name) errors.car_name = "Car name is required";
          if (!values.brand) errors.brand = "Brand is required";
          if (!values.model) errors.model = "Model is required";
          if (!values.year) errors.year = "Year is required";
          if (!values.mileage) errors.mileage = "Mileage is required";
          if (!values.condition) errors.condition = "Condition is required";
          if (!values.price) errors.price = "Price is required";
          return errors;
        }}
      >
        {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              background:
                "linear-gradient(135deg, rgb(245, 247, 250), rgb(255 255 255))",
              padding: 24,
              borderRadius: 12,
            }}
          >
            <Row gutter={24}>
              <Col span={24}>
                <div
                  className={`form__item ${errors.car_name && "input__error"}`}
                >
                  <label style={{ fontWeight: 500, color: "#333" }}>
                    Car Name*
                  </label>
                  <Input
                    name="car_name"
                    placeholder="Example: Alto"
                    value={values.car_name}
                    onChange={handleChange}
                    prefix={<CarOutlined style={{ color: "#888" }} />}
                    size="large"
                    style={{ borderRadius: 8, padding: "16px" }}
                  />
                  {errors.car_name && (
                    <p
                      className="error__feedback"
                      style={{ color: "#ff4d4f", marginTop: 8 }}
                    >
                      {errors.car_name}
                    </p>
                  )}
                </div>
              </Col>
            </Row>

            <Row gutter={24} style={{ marginTop: 24 }}>
              <Col span={12}>
                <div className={`form__item ${errors.brand && "input__error"}`}>
                  <label style={{ fontWeight: 500, color: "#333" }}>
                    Brand*
                  </label>
                  <Select
                    placeholder="Select Brand"
                    size="large"
                    style={{ width: "100%", borderRadius: 8, height: "60px" }}
                    value={values.brand}
                    onChange={(value) => setFieldValue("brand", value)}
                    suffixIcon={<CarOutlined style={{ color: "#888" }} />}
                  >
                    {car_brands.map((brand) => (
                      <Option key={brand} value={brand}>
                        {brand}
                      </Option>
                    ))}
                  </Select>
                  {errors.brand && (
                    <p
                      className="error__feedback"
                      style={{ color: "#ff4d4f", marginTop: 8 }}
                    >
                      {errors.brand}
                    </p>
                  )}
                </div>
              </Col>
              <Col span={12}>
                <div className={`form__item ${errors.model && "input__error"}`}>
                  <label style={{ fontWeight: 500, color: "#333" }}>
                    Model*
                  </label>
                  <Input
                    name="model"
                    placeholder="Example: VXI Variant"
                    value={values.model}
                    onChange={handleChange}
                    prefix={<CarOutlined style={{ color: "#888" }} />}
                    size="large"
                    style={{ borderRadius: 8, height: "60px" }}
                  />
                  {errors.model && (
                    <p
                      className="error__feedback"
                      style={{ color: "#ff4d4f", marginTop: 8 }}
                    >
                      {errors.model}
                    </p>
                  )}
                </div>
              </Col>
            </Row>

            <Row gutter={24} style={{ marginTop: 24 }}>
              <Col span={12}>
                <div className={`form__item ${errors.year && "input__error"}`}>
                  <label style={{ fontWeight: 500, color: "#333" }}>
                    Year*
                  </label>
                  <Select
                    placeholder="Select Year"
                    size="large"
                    style={{ width: "100%", borderRadius: 8, height: "60px" }}
                    value={values.year}
                    onChange={(value) => setFieldValue("year", value)}
                    suffixIcon={<CalendarOutlined style={{ color: "#888" }} />}
                  >
                    {years.map((year) => (
                      <Option key={year} value={year}>
                        {year}
                      </Option>
                    ))}
                  </Select>
                  {errors.year && (
                    <p
                      className="error__feedback"
                      style={{ color: "#ff4d4f", marginTop: 8 }}
                    >
                      {errors.year}
                    </p>
                  )}
                </div>
              </Col>
              <Col span={12}>
                <div
                  className={`form__item ${errors.mileage && "input__error"}`}
                >
                  <label style={{ fontWeight: 500, color: "#333" }}>
                    Mileage*
                  </label>
                  <Input
                    name="mileage"
                    placeholder="Example: 20 km"
                    value={values.mileage}
                    onChange={handleChange}
                    prefix={<DashboardOutlined style={{ color: "#888" }} />}
                    size="large"
                    style={{ borderRadius: 8, padding: "16px" }}
                  />
                  {errors.mileage && (
                    <p
                      className="error__feedback"
                      style={{ color: "#ff4d4f", marginTop: 8 }}
                    >
                      {errors.mileage}
                    </p>
                  )}
                </div>
              </Col>
            </Row>

            <Row gutter={24} style={{ marginTop: 24 }}>
              <Col span={12}>
                <div className={`form__item ${errors.price && "input__error"}`}>
                  <label style={{ fontWeight: 500, color: "#333" }}>
                    Price*
                  </label>
                  <Input
                    name="price"
                    placeholder="Example: 289929"
                    value={values.price}
                    onChange={handleChange}
                    prefix={<DollarOutlined style={{ color: "#888" }} />}
                    size="large"
                    style={{ borderRadius: 8, padding: "16px" }}
                  />
                  {errors.price && (
                    <p
                      className="error__feedback"
                      style={{ color: "#ff4d4f", marginTop: 8 }}
                    >
                      {errors.price}
                    </p>
                  )}
                </div>
              </Col>
              <Col span={12}>
                <div
                  className={`form__item ${errors.condition && "input__error"}`}
                >
                  <label style={{ fontWeight: 500, color: "#333" }}>
                    Condition*
                  </label>
                  <Select
                    placeholder="Select Condition"
                    size="large"
                    style={{ width: "100%", borderRadius: 8, height: "60px" }}
                    value={values.condition}
                    onChange={(value) => setFieldValue("condition", value)}
                    suffixIcon={
                      <CheckCircleOutlined style={{ color: "#888" }} />
                    }
                  >
                    {car_conditions.map((condition) => (
                      <Option key={condition} value={condition}>
                        {condition}
                      </Option>
                    ))}
                  </Select>
                  {errors.condition && (
                    <p
                      className="error__feedback"
                      style={{ color: "#ff4d4f", marginTop: 8 }}
                    >
                      {errors.condition}
                    </p>
                  )}
                </div>
              </Col>
            </Row>

            <div style={{ textAlign: "right", marginTop: 32 }}>
              <button
                type="submit"
                size="large"
                style={{
                  borderRadius: 8,
                  background: "#30bfa1",
                  border: "none",
                  padding: "10px 32px",
                  color: "#fff",
                }}
              >
                Next
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default BasicInformation;
