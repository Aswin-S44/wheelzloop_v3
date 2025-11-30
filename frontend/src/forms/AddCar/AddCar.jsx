import React from "react";
import "./AddCar.css";
import BasicInformation from "../MultiStepForm/BasicInformation";
import MultiStepForm from "../MultiStepForm/MultiStepForm";

function AddCar() {
  return (
    <div className="screen" style={{ marginTop: "180px", position: "relative" }}>
      <MultiStepForm />
    </div>
  );
}

export default AddCar;
