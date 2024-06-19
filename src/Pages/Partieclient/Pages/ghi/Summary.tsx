import React from "react";
import "./Summary.css";
import Wifi from "../../../../Assets/Images/wif.png";
import cables from "../../../../Assets/Images/cable.jpg";
import vid from "../../../../Assets/Images/vid.png";

interface SummaryProps {
  headerContent?: React.ReactNode;
  type?: string;
  cityDepArr?: string;
  date?: string;
  schedule?: string;
  dateDep?: string;
  dateArr?: string;
  cityDep?: string;
  cityArr?: string;
  serviceType?: string;
  services?: {
    wifi?: boolean;
    cables?: boolean;
    video?: boolean;
    other?: boolean;
  };
  mealServices?: string;
  loungeServices?: string;
  assistanceServices?: string;
  petsServices?: string;
  luggageServices?: string;
  children?: React.ReactNode;
}

const Summary: React.FC<SummaryProps> = ({
  headerContent,
  type = "Return",
  cityDepArr = "",
  date = "",
  schedule = "",
  dateDep = "",
  dateArr = "",
  cityDep = "",
  cityArr = "",
  serviceType = "",
  services = { wifi: true, cables: true, video: true, other: true },
  mealServices = "",
  loungeServices = "",
  assistanceServices = "",
  petsServices = "",
  luggageServices = "",
  children,
}) => {
  return (
    <div style={{ marginLeft: "5rem", width: "50rem" }}>
      <div
        tabIndex={0}
        className="collapse collapse-arrow border border-base-300 bg-white"
      >
        <div className="collapse-title text-xl font-medium">
          <div style={{ display: "flex", gap: "1rem" }}>
            <div
              style={{
                marginLeft: "1rem",
                fontWeight: "bold",
              }}
            >
              {type}
            </div>
            <div style={{ marginLeft: "1.5rem" }}> {children}</div>

            <div style={{ marginLeft: "3rem" }}>{cityDepArr}</div>
            <div style={{ marginLeft: "3rem" }}>{date}</div>
            <div style={{ marginLeft: "3rem" }}>{schedule}</div>
          </div>
          {headerContent && <div>{headerContent}</div>}
        </div>
        <div className="collapse-content">
          <hr className="divider" />
          <div className="flight-details">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "1rem",
              }}
            >
              <p
                style={{
                  marginBottom: "0.2rem",
                  fontWeight: "bold",
                  marginTop: "-2rem",
                }}
              >
                {dateDep}
              </p>
              <div className="vertical-line">
                <div
                  style={{ marginTop: "0.3rem" }}
                  className="dot top-dot"
                ></div>
                <div className="dot bottom-dot"></div>
              </div>
              <p style={{ marginTop: "0.2rem", fontWeight: "bold" }}>
                {dateArr}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "-15rem",
              }}
            >
              <p style={{ marginBottom: "0.2rem", marginTop: "0.5rem" }}>
                {cityDep}
              </p>
              <div style={{ marginTop: "4rem" }}>{cityArr}</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "-5rem",
              }}
            >
              <p style={{ marginBottom: "0.2rem", marginTop: "1.5rem" }}>
                {serviceType}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "0.25rem",
                  marginTop: "0.5rem",
                }}
              >
                {services.wifi && (
                  <img
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    src={Wifi}
                    alt="Wifi"
                  />
                )}
                {services.cables && (
                  <img
                    style={{ width: "2.2rem", height: "1.75rem" }}
                    src={cables}
                    alt="Cables"
                  />
                )}
                {services.video && (
                  <img
                    style={{ width: "1.75rem", height: "1.75rem" }}
                    src={vid}
                    alt="Video"
                  />
                )}
                {services.other && (
                  <img
                    style={{ width: "1.75rem", height: "1.75rem" }}
                    src="https://static.thenounproject.com/png/3837048-200.png"
                    alt="Other"
                  />
                )}
              </div>
              <p style={{ marginTop: "2rem" }}>{mealServices}</p>
              <p style={{ marginTop: "2rem" }}>{loungeServices}</p>
              <p style={{ marginTop: "2rem" }}>{assistanceServices}</p>
              <p style={{ marginTop: "2rem" }}>{petsServices}</p>
              <p style={{ marginTop: "2rem" }}>{luggageServices}</p>
            </div>
            <div className="flight-time">
              <span className="time"></span>
              <span className="airport"></span>
            </div>
          </div>
          <div className="flight-status"></div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
