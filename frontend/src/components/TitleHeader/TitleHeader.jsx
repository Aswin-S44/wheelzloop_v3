import React from "react";
import "./TitleHeader.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function TitleHeader({ title1, title2, option = null }) {
  return (
    <div>
      <div className="space-btn">
        <h2 className="font-md">
          {title1} <span className="span">{title2}</span>
        </h2>
        {option && (
          <span className="font-sm">
            {option}
            <ArrowForwardIosIcon style={{ fontSize: "18px" }} />
          </span>
        )}
      </div>
      <hr />
    </div>
  );
}

export default TitleHeader;
