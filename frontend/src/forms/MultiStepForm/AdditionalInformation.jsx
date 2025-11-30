import React, { useContext, useState } from "react";
import MultiStepFormContext from "./MultiStepFormContext";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Typography from "antd/es/typography";
import Upload from "antd/es/upload";
import Tag from "antd/es/tag";
import {
  FileTextOutlined,
  EnvironmentOutlined,
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;

function AdditionalInformation() {
  const { additionalInformations, setAdditionalInformations, next, prev } =
    useContext(MultiStepFormContext);
  const [features, setFeatures] = useState(
    additionalInformations.features || []
  );
  const [featureInput, setFeatureInput] = useState("");
  const [images, setImages] = useState(additionalInformations.images || []);

  const addFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput)) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const removeFeature = (feature) => {
    setFeatures(features.filter((f) => f !== feature));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async ({ fileList }) => {
    const base64Images = await Promise.all(fileList.map(convertToBase64));
    setImages(base64Images);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <Title
        level={3}
        style={{ textAlign: "left", marginBottom: 32, color: "#BA1C73" }}
      >
        Additional Information
      </Title>

      <Formik
        initialValues={{
          description: additionalInformations.description || "",
          place: additionalInformations.place || "",
        }}
        validationSchema={Yup.object({
          description: Yup.string().required("Description is required"),
          place: Yup.string().required("Location is required"),
        })}
        onSubmit={(values) => {
          setAdditionalInformations({ ...values, features, images });
          next();
        }}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <form
            onSubmit={handleSubmit}
            style={{ background: "#fff", padding: 24, borderRadius: 12 }}
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} md={24}>
                <div
                  className={`form__item ${
                    errors.description && touched.description && "input__error"
                  }`}
                >
                  <label style={{ fontWeight: 500, color: "#333" }}>
                    Description*
                  </label>
                  <TextArea
                    name="description"
                    placeholder="Enter detailed description"
                    value={values.description}
                    onChange={handleChange}
                    rows={4}
                    style={{ borderRadius: 8, padding: "16px" }}
                  />
                  {errors.description && touched.description && (
                    <p
                      className="error__feedback"
                      style={{ color: "#ff4d4f", marginTop: 8 }}
                    >
                      {errors.description}
                    </p>
                  )}
                </div>
              </Col>

              <Col xs={24} md={24}>
                <div
                  className={`form__item ${
                    errors.place && touched.place && "input__error"
                  }`}
                >
                  <label style={{ fontWeight: 500, color: "#333" }}>
                    Location*
                  </label>
                  <Input
                    name="place"
                    placeholder="Example: New York, USA"
                    value={values.place}
                    onChange={handleChange}
                    prefix={<EnvironmentOutlined style={{ color: "#888" }} />}
                    size="large"
                    style={{ borderRadius: 8, padding: "16px" }}
                  />
                  {errors.place && touched.place && (
                    <p
                      className="error__feedback"
                      style={{ color: "#ff4d4f", marginTop: 8 }}
                    >
                      {errors.place}
                    </p>
                  )}
                </div>
              </Col>

              <Col xs={24} md={24}>
                <div className="form__item">
                  <label style={{ fontWeight: 500, color: "#333" }}>
                    Features
                  </label>
                  <div
                    style={{ display: "flex", gap: "10px", marginBottom: 16 }}
                  >
                    <Input
                      placeholder="Add a feature (e.g. GPS, Sunroof)"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onPressEnter={addFeature}
                      size="large"
                      style={{ borderRadius: 8, padding: "16px" }}
                    />
                    <Button
                      icon={<PlusOutlined />}
                      onClick={addFeature}
                      size="large"
                      style={{
                        height: "auto",
                        borderRadius: 8,
                        background: "#BA1C73",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      Add
                    </Button>
                  </div>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                  >
                    {features.map((feature) => (
                      <Tag
                        key={feature}
                        closable
                        onClose={() => removeFeature(feature)}
                        style={{
                          backgroundColor: "#E6F7FF",
                          border: "1px solid #91D5FF",
                          color: "#0050B3",
                          padding: "8px 16px",
                          borderRadius: "20px",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                          margin: 0,
                        }}
                      >
                        {feature}
                      </Tag>
                    ))}
                  </div>
                </div>
              </Col>

              <Col xs={24} md={24}>
                <div className="form__item">
                  <label
                    style={{
                      fontWeight: 500,
                      color: "#333",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    Upload Images
                  </label>
                  <Upload
                    listType="picture"
                    multiple
                    beforeUpload={() => false}
                    onChange={handleImageUpload}
                    showUploadList={false}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      size="large"
                      style={{
                        borderRadius: 8,
                        padding: "0 32px",
                        height: "50px",
                      }}
                    >
                      Select Images
                    </Button>
                  </Upload>

                  <div
                    style={{
                      marginTop: 24,
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(100px, 1fr))",
                      gap: 16,
                    }}
                  >
                    {images.map((image, index) => (
                      <div
                        key={index}
                        style={{
                          position: "relative",
                          borderRadius: 8,
                          overflow: "hidden",
                          height: 100,
                          border: "1px solid #d9d9d9",
                        }}
                      >
                        <img
                          src={image}
                          alt={`upload-${index}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            background: "rgba(255, 255, 255, 0.8)",
                            borderRadius: "50%",
                            padding: 4,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => removeImage(index)}
                        >
                          <DeleteOutlined style={{ color: "#ff4d4f" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 48,
              }}
            >
              <Button
                size="large"
                onClick={prev}
                style={{
                  borderRadius: 8,
                  padding: "10px 48px",
                  height: "auto",
                }}
              >
                Back
              </Button>
              <button
                type="submit"
                style={{
                  borderRadius: 8,
                  background: "#BA1C73",
                  border: "none",
                  padding: "14px 48px",
                  color: "#fff",
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "all 0.3s",
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

export default AdditionalInformation;
