import Logo from "../../Assets/Images/logoAvia.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import supabase from "../../Utils/api";
import { useContext } from "react";
import { ClientContext } from "../../Contexts/ClientContext";
import { TimeLike } from "fs";
import { ReservationContext } from "../../Contexts/ReservationContext";
import { useHistory } from "react-router-dom";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

interface FlightData {
  id: number;
  created_at: EpochTimeStamp;
  CityDep: string;
  CityArr: string;
  SchedateDep: string;
  SchedateArr: string;
  TimeDepStart: string;
  TimeDepEnd: string;
  TimeArrStart: TimeLike;
  TimeArrEnd: TimeLike;
  Type: string;
  PriceBC: number;
  PriceEC: number;
}
const InfoVol: React.FC = () => {
  const { vol, setVol } = useContext(ClientContext);
  console.log("vol est", vol);
  const [selectedFlight, setSelectedFlight] = useState<FlightData | null>(null);
  const [Datedeparture, setDatedeparture] = useState<string | undefined>(
    undefined
  );
  const [DatedeArrival, setDatedeArrival] = useState<string | undefined>(
    undefined
  );
  const history = useHistory();

  const [montant, setMontant] = useState<number>();
  const {
    setBookBusinessClass,
    bookBusinessClass,
    setBookEconomyClass,
    bookEconomyClass,
  } = useContext(ReservationContext);
  useEffect(() => {
    const storedFlight = localStorage.getItem("selectedFlight");
    if (storedFlight) {
      setSelectedFlight(JSON.parse(storedFlight));
    }
    setDatedeparture(selectedFlight?.SchedateDep);
    setDatedeArrival(selectedFlight?.SchedateArr);
  }, []);
  {
    /*console.log("vol est", selectedFlight);
  console.log(selectedFlight?.SchedateArr);
  console.log(selectedFlight?.SchedateDep);
  console.log("Date arrivée", selectedFlight?.SchedateArr);
  console.log("booking business class is:", bookBusinessClass);
  console.log("booking economy class is:", bookEconomyClass);
*/

    useEffect(() => {}, [montant]);

    // Navigue après la mise à jour de l'état
  }

  useEffect(() => {
    const storedFlight = localStorage.getItem("selectedFlight");
    if (storedFlight) {
      setSelectedFlight(JSON.parse(storedFlight));
    }
  }, []);

  useEffect(() => {
    if (selectedFlight && bookBusinessClass) {
      setMontant(selectedFlight.PriceBC ?? 0);
    } else if (selectedFlight && bookEconomyClass) {
      setMontant(selectedFlight.PriceEC ?? 0);
    }
  }, [selectedFlight, montant, bookEconomyClass, bookBusinessClass]);

  useEffect(() => {
    localStorage.setItem("montantBillet", `${montant}`);
  }, [montant]);

  const handleBusinessClassClick = () => {
    if (selectedFlight) {
      setMontant(selectedFlight.PriceBC ?? 0);
      setBookBusinessClass(true);
      setBookEconomyClass(false);
      history.push("/FlightBooking2");
    }
  };

  const handleEconomyClassClick = () => {
    if (selectedFlight) {
      setMontant(selectedFlight.PriceEC ?? 0);
      setBookBusinessClass(false);
      setBookEconomyClass(true);
      history.push("/FlightBooking2");
    }
  };
  console.log("le montant est à :", `${localStorage.getItem("montantBillet")}`);
  return (
    <div
      className="flex items-center justify-center p-20 Vol"
      style={{ display: "flex", gap: "2.5rem" }}
    >
      <div className="containerInfoVol">
        <h1
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
            marginBottom: "0.5rem",
            textTransform: "uppercase",
          }}
        >
          Business Class
        </h1>
        <div className="content-block">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                width: "23rem",
                height: "10rem",
                borderColor: "#f5f5f5",
                border: "0.25rem",
                borderRadius: "5%",
                backgroundColor: "#e0e0e0",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "0.5rem",
                      gap: "0.75rem",
                    }}
                  >
                    <img
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        marginLeft: "1rem",
                      }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVwdySlHJwZ8e7ZcTdiVMdzDop7jun8RroeNLF9PsIgQ&shttps://w7.pngwing.com/pngs/600/461/png-transparent-money-bag-computer-icons-bank-coin-money-bag-saving-donation-payment-thumbnail.png"
                      alt="Price Icon"
                    />
                    <h2
                      style={{
                        fontWeight: "bolder",
                        fontSize: "1.25rem",
                        fontFamily: "inherit",
                      }}
                    >
                      Price starting from
                    </h2>
                  </div>
                  <div style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}>
                    <h2
                      style={{
                        fontWeight: "bolder",
                        fontSize: "1.25rem",
                        fontFamily: "inherit",
                      }}
                    >
                      {selectedFlight?.PriceBC}DT
                    </h2>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontFamily: "inherit",
                    marginLeft: "1rem",
                    marginRight: "1rem",
                  }}
                >
                  The round-trip fare for all travelers (including taxes and
                  fees). If you made your reservation through our web channels,
                  you may request a refund of taxes and fees when you did not
                  actually board and your ticket did not result in
                  transportation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "1rem",
            width: "23rem",
            height: "10rem",
            borderColor: "#f5f5f5",
            border: "0.25rem",
            borderRadius: "5%",
            backgroundColor: "#e0e0e0",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0.5rem",
                  gap: "0.75rem",
                }}
              >
                <img
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    marginLeft: "1rem",
                  }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjsZTimL8AuBFPz3c70hcu1wxw0JZhwEI8jIdAPrpkSQ&shttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVwdySlHJwZ8e7ZcTdiVMdzDop7jun8RroeNLF9PsIgQ&shttps://w7.pngwing.com/pngs/600/461/png-transparent-money-bag-computer-icons-bank-coin-money-bag-saving-donation-payment-thumbnail.png"
                  alt="Price Icon"
                />
                <h2
                  style={{
                    fontWeight: "bolder",
                    fontSize: "1.25rem",
                    fontFamily: "inherit",
                  }}
                >
                  Itinerary
                </h2>
              </div>
              <div style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}>
                <h2
                  style={{
                    fontWeight: "bolder",
                    fontSize: "1.25rem",
                    fontFamily: "inherit",
                  }}
                ></h2>
              </div>
            </div>
            <div>
              <div
                style={{ display: "flex", gap: "0.5rem", marginLeft: "2rem" }}
              >
                <img
                  style={{
                    width: "1.4rem",
                    height: "1.4rem",
                    marginTop: "1rem",
                  }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjsZTimL8AuBFPz3c70hcu1wxw0JZhwEI8jIdAPrpkSQ&s"
                />
                <p>
                  {selectedFlight?.CityDep} - {selectedFlight?.CityArr} ,{" "}
                  {selectedFlight?.SchedateDep}
                </p>
              </div>
              <div
                style={{ display: "flex", gap: "0.5rem", marginLeft: "2rem" }}
              ></div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "1rem",
            width: "23rem",
            height: "10rem",
            borderColor: "#f5f5f5",
            border: "0.25rem",
            borderRadius: "5%",
            backgroundColor: "#e0e0e0",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0.5rem",
                  gap: "0.75rem",
                }}
              >
                <img
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    marginLeft: "1rem",
                  }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSseZHERtAGpz1bB0mymNe3EWLIKxSRhjQ4Flf_qNwDU_ijQwG6DLr-D4uM42SejKEiCyQ&usqp=CAU"
                  alt="Price Icon"
                />
                <h2
                  style={{
                    fontWeight: "bolder",
                    fontSize: "1.25rem",
                    fontFamily: "inherit",
                  }}
                >
                  Flight Status
                </h2>
              </div>
              <div style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}>
                <h2
                  style={{
                    fontWeight: "bolder",
                    fontSize: "1.25rem",
                    fontFamily: "inherit",
                  }}
                ></h2>
              </div>
            </div>
            <p
              style={{
                fontSize: "0.75rem",
                fontFamily: "inherit",
                marginLeft: "1rem",
                marginRight: "1rem",
              }}
            >
              The round-trip fare for all travelers (including taxes and fees).
              If you made your reservation through our web channels, you may
              request a refund of taxes and fees when you did not actually board
              and your ticket did not result in transportation.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "0.5rem",
          }}
        >
          <button
            onClick={handleBusinessClassClick}
            className="btn btn-wide"
            style={{ backgroundColor: "#E73838", color: "white" }}
          >
            Book Now
          </button>
        </div>
      </div>

      <div className="containerInfoVol">
        <h1
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
            marginBottom: "0.5rem",
            textTransform: "uppercase",
          }}
        >
          Economy Class
        </h1>

        <div className="content-block">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                width: "23rem",
                height: "10rem",
                borderColor: "#f5f5f5",
                border: "0.25rem",
                borderRadius: "5%",
                backgroundColor: "#e0e0e0",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "0.5rem",
                      gap: "0.75rem",
                    }}
                  >
                    <img
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        marginLeft: "1rem",
                      }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVwdySlHJwZ8e7ZcTdiVMdzDop7jun8RroeNLF9PsIgQ&shttps://w7.pngwing.com/pngs/600/461/png-transparent-money-bag-computer-icons-bank-coin-money-bag-saving-donation-payment-thumbnail.png"
                      alt="Price Icon"
                    />
                    <h2
                      style={{
                        fontWeight: "bolder",
                        fontSize: "1.25rem",
                        fontFamily: "inherit",
                      }}
                    >
                      Price starting from
                    </h2>
                  </div>
                  <div style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}>
                    <h2
                      style={{
                        fontWeight: "bolder",
                        fontSize: "1.25rem",
                        fontFamily: "inherit",
                      }}
                    >
                      {selectedFlight?.PriceEC}DT
                    </h2>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontFamily: "inherit",
                    marginLeft: "1rem",
                    marginRight: "1rem",
                  }}
                >
                  The round-trip fare for all travelers (including taxes and
                  fees). If you made your reservation through our web channels,
                  you may request a refund of taxes and fees when you did not
                  actually board and your ticket did not result in
                  transportation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "1rem",
            width: "23rem",
            height: "10rem",
            borderColor: "#f5f5f5",
            border: "0.25rem",
            borderRadius: "5%",
            backgroundColor: "#e0e0e0",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0.5rem",
                  gap: "0.75rem",
                }}
              >
                <img
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    marginLeft: "1rem",
                  }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjsZTimL8AuBFPz3c70hcu1wxw0JZhwEI8jIdAPrpkSQ&shttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVwdySlHJwZ8e7ZcTdiVMdzDop7jun8RroeNLF9PsIgQ&shttps://w7.pngwing.com/pngs/600/461/png-transparent-money-bag-computer-icons-bank-coin-money-bag-saving-donation-payment-thumbnail.png"
                  alt="Price Icon"
                />
                <h2
                  style={{
                    fontWeight: "bolder",
                    fontSize: "1.25rem",
                    fontFamily: "inherit",
                  }}
                >
                  Itinerary
                </h2>
              </div>
              <div style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}>
                <h2
                  style={{
                    fontWeight: "bolder",
                    fontSize: "1.25rem",
                    fontFamily: "inherit",
                  }}
                ></h2>
              </div>
            </div>
            <div>
              <div
                style={{ display: "flex", gap: "0.5rem", marginLeft: "2rem" }}
              >
                <img
                  style={{
                    width: "1.4rem",
                    height: "1.4rem",
                    marginTop: "1rem",
                  }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjsZTimL8AuBFPz3c70hcu1wxw0JZhwEI8jIdAPrpkSQ&s"
                />
                <p>
                  {selectedFlight?.CityDep} - {selectedFlight?.CityArr} ,{" "}
                  {selectedFlight?.SchedateDep}
                </p>
              </div>
              <div
                style={{ display: "flex", gap: "0.5rem", marginLeft: "2rem" }}
              ></div>
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "1rem",
            width: "23rem",
            height: "10rem",
            borderColor: "#f5f5f5",
            border: "0.25rem",
            borderRadius: "5%",
            backgroundColor: "#e0e0e0",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0.5rem",
                  gap: "0.75rem",
                }}
              >
                <img
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    marginLeft: "1rem",
                  }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSseZHERtAGpz1bB0mymNe3EWLIKxSRhjQ4Flf_qNwDU_ijQwG6DLr-D4uM42SejKEiCyQ&usqp=CAU"
                  alt="Price Icon"
                />
                <h2
                  style={{
                    fontWeight: "bolder",
                    fontSize: "1.25rem",
                    fontFamily: "inherit",
                  }}
                >
                  Flight Status
                </h2>
              </div>
              <div style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}>
                <h2
                  style={{
                    fontWeight: "bolder",
                    fontSize: "1.25rem",
                    fontFamily: "inherit",
                  }}
                ></h2>
              </div>
            </div>
            <p
              style={{
                fontSize: "0.75rem",
                fontFamily: "inherit",
                marginLeft: "1rem",
                marginRight: "1rem",
              }}
            >
              The round-trip fare for all travelers (including taxes and fees).
              If you made your reservation through our web channels, you may
              request a refund of taxes and fees when you did not actually board
              and your ticket did not result in transportation.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "0.5rem",
          }}
        >
          <button
            onClick={handleEconomyClassClick}
            className="btn btn-wide"
            style={{ backgroundColor: "#E73838", color: "white" }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoVol;
