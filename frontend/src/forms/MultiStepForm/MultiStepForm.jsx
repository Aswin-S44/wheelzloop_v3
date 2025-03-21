import React, { useState } from "react";
import BasicInformation from "./BasicInformation";
import Specifications from "./Specifications";
import AdditionalInformation from "./AdditionalInformation";
import { Provider } from "./MultiStepFormContext";
import { Steps } from "antd";
import Review from "./Review";
const { Step } = Steps;

const basicInformationState = {
  car_name: "",
  brand: "",
  model: "",
  year: "",
  price: "",
  mileage: "",
  condition: "",
};

const specificationState = {
  fuel_type: "",
  transmission: "",
  body_type: "",
  color: "",
  engine_size: "",
  seats: "",
  is_negotiable: false,
};

const additionalInformationState = {
  features: [],
  description: "",
  place: "",
  images: [],
};

const renderStep = (step) => {
  switch (step) {
    case 0:
      return <BasicInformation />;
    case 1:
      return <Specifications />;
    case 2:
      return <AdditionalInformation />;
    case 3:
      return <Review />;
    default:
      return null;
  }
};

function MultiStepForm() {
  const [basicDetails, setBasicDetails] = useState(basicInformationState);
  const [specificationDetails, setSpecificationDetails] =
    useState(specificationState);
  const [additionalInformations, setAdditionalInformations] = useState(
    additionalInformationState
  );
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    if (currentStep === 3) {
      setCurrentStep(0);
      setBasicDetails(basicInformationState);
      setSpecificationDetails(specificationState);
      setAdditionalInformations(additionalInformationState);
      return;
    }
    setCurrentStep(currentStep + 1);
  };
  const prev = () => setCurrentStep(currentStep - 1);

  return (
    <div className="mt-5">
      <Provider
        value={{
          basicDetails,
          setBasicDetails,
          next,
          prev,
          specificationDetails,
          setSpecificationDetails,
          additionalInformations,
          setAdditionalInformations,
        }}
      >
        <Steps current={currentStep}>
          <Step title={"Basic information"} />
          <Step title={"Specifications"} />
          <Step title={"Additional Informations"} />
          <Step title={"Review and submit"} />
        </Steps>
        <main className="mt-5">{renderStep(currentStep)}</main>
      </Provider>
    </div>
  );
}

export default MultiStepForm;
