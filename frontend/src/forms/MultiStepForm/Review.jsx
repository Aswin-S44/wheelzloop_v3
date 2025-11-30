import React, { useContext, useState } from "react";
import MultiStepFormContext from "./MultiStepFormContext";
import Button from "antd/es/button";
import Col from "antd/es/col";
import Row from "antd/es/row";
import Typography from "antd/es/typography";
import Tag from "antd/es/tag";
import Divider from "antd/es/divider";
import Image from "antd/es/image";
import {
  CarOutlined,
  DashboardOutlined,
  DollarCircleOutlined,
  EnvironmentOutlined,
  CheckCircleFilled,
  FireOutlined,
  ToolOutlined,
  SafetyCertificateOutlined,
  CalendarOutlined,
  BgColorsOutlined,
  TeamOutlined,
  RocketOutlined,
  PictureOutlined,
  LeftOutlined,
  CheckOutlined
} from "@ant-design/icons";
import axios from "axios";
import { ADD_CAR_URL } from "../../config/api";
import Swal from "sweetalert2";
import { AnimatePresence } from "framer-motion";
import Overlay from "../../components/Overlay/Overlay";
import { useParams } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

function Review() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const {
    basicDetails,
    specificationDetails,
    additionalInformations,
    next,
    prev,
  } = useContext(MultiStepFormContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const body = {
      ...basicDetails,
      ...specificationDetails,
      ...additionalInformations,
    };
    let res = null;
    const token = localStorage.getItem("token");
    if (id && token) {
      res = await axios.patch(`${ADD_CAR_URL}/${id}`, body, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      res = await axios.post(ADD_CAR_URL, body, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    setLoading(false);
    if (res && res.status === 200) {
      Swal.fire({
        title: "Success!",
        text: "Car listing published successfully.",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Add Another",
        cancelButtonText: "Go to Profile",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/car/add";
        } else {
          window.location.href = "/profile";
        }
      });
    }
  };

  const SpecCard = ({ icon, label, value }) => (
    <div
      style={{
        background: "#F8F9FA",
        borderRadius: "12px",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        border: "1px solid #E9ECEF",
        height: "100%",
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          color: "#BA1C73",
          fontSize: "20px",
        }}
      >
        {icon}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text type="secondary" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {label}
        </Text>
        <Text strong style={{ fontSize: "16px", color: "#212529" }}>
          {value || "N/A"}
        </Text>
      </div>
    </div>
  );

  const coverImage =
    additionalInformations.images && additionalInformations.images.length > 0
      ? additionalInformations.images[0]
      : "https://via.placeholder.com/600x400?text=No+Image+Provided";

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh", padding: "40px 20px" }}>
      <AnimatePresence>
        {loading && <Overlay isOpen={loading}>Finalizing Listing...</Overlay>}
      </AnimatePresence>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <Title level={2} style={{ margin: 0, color: "#1a1a1a" }}>Review & Publish</Title>
          <Text type="secondary">Double check your details before going live.</Text>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <div style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <div style={{ position: "relative", height: "400px", background: "#000" }}>
                 <img 
                    src={coverImage} 
                    alt="Cover" 
                    style={{ width: "100%", height: "100%", objectFit: "contain", opacity: 0.9 }} 
                 />
                 <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", padding: "40px 32px 24px" }}>
                    <Tag color="#BA1C73" style={{ border: "none", marginBottom: 8, padding: "4px 12px", fontSize: "12px" }}>
                       {basicDetails.condition}
                    </Tag>
                    <h1 style={{ color: "#fff", margin: 0, fontSize: "32px", fontWeight: 700 }}>
                        {basicDetails.year} {basicDetails.brand} {basicDetails.model}
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                        <EnvironmentOutlined style={{ color: "#fff" }} />
                        <span style={{ color: "#eee" }}>{additionalInformations.place || "Location not specified"}</span>
                    </div>
                 </div>
              </div>

              <div style={{ padding: "32px" }}>
                <Title level={4}>Vehicle Overview</Title>
                <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
                   <Col xs={12} sm={8}>
                      <SpecCard icon={<DashboardOutlined />} label="Mileage" value={basicDetails.mileage} />
                   </Col>
                   <Col xs={12} sm={8}>
                      <SpecCard icon={<FireOutlined />} label="Fuel Type" value={specificationDetails.fuel_type} />
                   </Col>
                   <Col xs={12} sm={8}>
                      <SpecCard icon={<ToolOutlined />} label="Transmission" value={specificationDetails.transmission} />
                   </Col>
                   <Col xs={12} sm={8}>
                      <SpecCard icon={<RocketOutlined />} label="Engine" value={specificationDetails.engine_size} />
                   </Col>
                   <Col xs={12} sm={8}>
                      <SpecCard icon={<CarOutlined />} label="Body Type" value={specificationDetails.body_type} />
                   </Col>
                   <Col xs={12} sm={8}>
                      <SpecCard icon={<CalendarOutlined />} label="Year" value={basicDetails.year} />
                   </Col>
                </Row>

                <Divider />

                <Title level={4}>Description</Title>
                <Paragraph style={{ color: "#666", lineHeight: "1.8", fontSize: "16px" }}>
                    {additionalInformations.description || "No description provided by the seller."}
                </Paragraph>

                <div style={{ marginTop: 32 }}>
                    <Title level={4}>Features</Title>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {additionalInformations.features && additionalInformations.features.length > 0 ? (
                            additionalInformations.features.map((feature, idx) => (
                                <Tag 
                                    key={idx} 
                                    icon={<CheckCircleFilled style={{ color: "#52c41a" }} />} 
                                    style={{ 
                                        padding: "8px 16px", 
                                        borderRadius: "20px", 
                                        border: "1px solid #d9d9d9",
                                        background: "#fff",
                                        fontSize: "14px",
                                        margin: 0
                                    }}
                                >
                                    {feature}
                                </Tag>
                            ))
                        ) : (
                            <Text type="secondary">No specific features listed.</Text>
                        )}
                    </div>
                </div>

                {additionalInformations.images && additionalInformations.images.length > 1 && (
                    <div style={{ marginTop: 32 }}>
                         <Title level={4}>Gallery</Title>
                         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 12 }}>
                            {additionalInformations.images.map((img, idx) => (
                                <Image 
                                    key={idx} 
                                    src={img} 
                                    width="100%" 
                                    height={100} 
                                    style={{ objectFit: "cover", borderRadius: 8, cursor: "pointer" }}
                                />
                            ))}
                         </div>
                    </div>
                )}
              </div>
            </div>
          </Col>

          <Col xs={24} lg={8}>
             <div style={{ position: "sticky", top: 24 }}>
                <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                    <Text type="secondary">Asking Price</Text>
                    <div style={{ color: "#BA1C73", fontSize: "36px", fontWeight: 800, lineHeight: 1, margin: "10px 0 20px" }}>
                        {Number(basicDetails.price).toLocaleString()}
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
                            <span style={{ color: "#888" }}><BgColorsOutlined /> Color</span>
                            <span style={{ fontWeight: 600 }}>{specificationDetails.color || "N/A"}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
                            <span style={{ color: "#888" }}><TeamOutlined /> Seats</span>
                            <span style={{ fontWeight: 600 }}>{specificationDetails.seats} Persons</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}>
                            <span style={{ color: "#888" }}><SafetyCertificateOutlined /> Condition</span>
                            <span style={{ fontWeight: 600 }}>{basicDetails.condition}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
                            <span style={{ color: "#888" }}><DollarCircleOutlined /> Negotiable</span>
                            <Tag color={specificationDetails.price_negotiable === "Yes" ? "green" : "red"}>
                                {specificationDetails.price_negotiable || "No"}
                            </Tag>
                        </div>
                    </div>

                    <Divider />

                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        loading={loading}
                        icon={<CheckOutlined />}
                        block
                        size="large"
                        style={{
                            background: "#BA1C73",
                            borderColor: "#BA1C73",
                            height: "50px",
                            fontSize: "16px",
                            fontWeight: 600,
                            borderRadius: "8px",
                            marginBottom: "12px"
                        }}
                    >
                        Confirm & Publish
                    </Button>
                    <Button
                        onClick={prev}
                        icon={<LeftOutlined />}
                        block
                        size="large"
                        style={{
                            height: "50px",
                            fontSize: "16px",
                            borderRadius: "8px",
                            color: "#666"
                        }}
                    >
                        Go Back
                    </Button>
                </div>

                <div style={{ marginTop: 24, textAlign: "center", color: "#999", fontSize: "13px" }}>
                    <SafetyCertificateOutlined style={{ marginRight: 6 }} />
                    Your listing will be reviewed by our team.
                </div>
             </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Review;