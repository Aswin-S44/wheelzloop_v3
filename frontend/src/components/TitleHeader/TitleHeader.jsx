import React from "react";
import "./TitleHeader.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function TitleHeader({ title1, title2, option = null, optionLink = null }) {
  return (
    <div>
      <div className="space-btn">
        <h2 className="font-md">
          {title1} <span className="span">{title2}</span>
        </h2>
        {option && (
          <span className="font-sm">
            <a
              href={optionLink}
              style={{ textDecoration: "none", color: "#111" }}
            >
              {option}
            </a>
            <ArrowForwardIosIcon style={{ fontSize: "18px" }} />
          </span>
        )}
      </div>
      <hr />
    </div>
  );
}

export default TitleHeader;
