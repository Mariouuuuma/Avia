import React, { useContext, useEffect, useState } from "react";
import "./SummaryTrip.css";
import Summary from "./Summary";
import Upgrade from "./Upgrade/upgrade";
import { ReservationContext } from "../../../../Contexts/ReservationContext";
import { TimeLike } from "fs";
import Alert from "../../../../Components/Alert/Alert";

interface FlightData {
  id: number;
  created_at: EpochTimeStamp;
  CityDep: string;
  CityArr: string;
  SchedateDep: string;
  SchedateArr: string;
  ScheTimeDep: string;
  ScheTimeArr: string;
  TimeArrStart: TimeLike;
  TimeArrEnd: TimeLike;
  Type: string;
}
export default function SummaryTrip() {
  const [selectedFlight, setSelectedFlight] = useState<FlightData | null>(null);
  const [typeflight, settypeflight] = useState<string>();
  const [nbPassengers, setnbpassengers] = useState<string | null>(null);
  const [montant, setMontant] = useState<string | null>("");
  const [totalServices, setTotalServices] = useState<string | null>("");
  const [montantDue, setMontDue] = useState<number | null>();
  const [newFlight, clickNewFlight] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(true);
  const storedChosenSeatDep = localStorage.getItem("chosenSeatDep");
  const storedChosenSeatArr = localStorage.getItem("chosenSeatArr");
  const storedFlight = localStorage.getItem("selectedFlight");

  const { chosenSeatDep } = useContext(ReservationContext);

  console.log("chosen seats for departure are", storedChosenSeatDep);
  console.log("chosen seats for arrival are", storedChosenSeatArr);

  useEffect(() => {
    if (storedFlight) {
      setSelectedFlight(JSON.parse(storedFlight));
    }
    const storedTypeOfFlight = localStorage.getItem("typeOfFlight");
    if (storedTypeOfFlight) {
      settypeflight(storedTypeOfFlight);
    }
    const storedNbPassengers = localStorage.getItem("NumberPassengers");

    setnbpassengers(storedNbPassengers);

    const storedAmmount = localStorage.getItem("montantBillet");
    setMontant(storedAmmount);
    const storedTotalServices = localStorage.getItem("TotalServices");
    setTotalServices(storedTotalServices);
  }, [storedFlight, nbPassengers, montant, totalServices]);

  console.log(
    "le temps est supposé etre égal à :",
    selectedFlight?.TimeArrStart
  );

  useEffect(() => {
    // Convertir les valeurs de montant et totalServices en nombres
    const montantNumber = parseFloat(montant || "0");
    const totalServicesNumber = parseFloat(totalServices || "0");

    // Calculer la somme
    const sum = montantNumber + totalServicesNumber;

    // Mettre à jour montantDue avec la somme calculée
    setMontDue(sum);
  }, [montant, totalServices]);

  const hundleReturnFlights = () => {};

  return (
    <div className="scroll-container">
      <div style={{ display: "flex", gap: "2rem" }}>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <p>{""}</p>
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                marginRight: "-25rem",
              }}
              className="TitleSummary"
            >
              Trip Summary
            </h1>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              marginLeft: "10rem",
              marginTop: "2rem",
              gap: "2rem",
            }}
          >
            <div>
              <Summary
                type="Outbound"
                cityDepArr={`${selectedFlight?.CityDep} - ${selectedFlight?.CityArr}`}
                date={`${selectedFlight?.SchedateDep}`}
                schedule={`${selectedFlight?.ScheTimeDep}-${selectedFlight?.ScheTimeArr}`}
                dateDep={`${selectedFlight?.SchedateDep}`}
                dateArr={`${selectedFlight?.SchedateArr}`}
                cityDep={`${selectedFlight?.CityDep}`}
                cityArr={`${selectedFlight?.CityArr}`}
                serviceType="VIP Service"
                services={{
                  wifi: true,
                  cables: true,
                  video: true,
                  other: false,
                }}
                mealServices="Exclusive Meals"
                loungeServices="Private Lounge"
                assistanceServices="24/7 Assistance"
                petsServices="Pet Friendly"
                luggageServices="Unlimited Luggage"
              />
            </div>
            <Summary>
              {showAlert && (
                <Alert
                  severity="danger"
                  message="You haven't scheduled your Return flight, please select an option here!"
                />
              )}

              <div>
                <button
                  style={{
                    width: "6rem",
                    height: "3rem",
                    marginTop: "-3.5rem",
                    marginLeft: "20rem",
                    backgroundColor: "#007BFF", // Bleu pour un bouton primaire
                    borderRadius: "8%", // Bouton circulaire
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "0.9rem",
                    border: "none", // Pas de bordure par défaut
                    cursor: "pointer",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Ombre pour donner du relief
                    transition: "background-color 0.3s ease",
                  }}
                  onClick={() => {
                    clickNewFlight(!newFlight);
                  }}
                >
                  Select a flight
                </button>
              </div>
            </Summary>
            {newFlight && (
              <div>
                <div
                  className="card lg:card-side bg-base-100 shadow-xl"
                  style={{
                    width: "50rem",
                    position: "relative",
                    zIndex: "9999",
                    marginLeft: "5rem",
                    marginTop: "-1.9rem",
                  }}
                >
                  <div className="card-body">
                    <h2 className="card-title">New album is released!</h2>
                    <p>Click the button to listen on Spotiwhy app.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              marginTop: "3rem",
              marginLeft: "15rem",
            }}
          >
            <Upgrade
              backgroundColor="bg-base-100"
              imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHJfMzW2mTZHDcF6nWN7vMv97A6MJXcO-J7Q&s"
              title="Main"
              description="If a dog chews shoes whose shoes does he choose?"
              buttonText="Upgrade"
            />
            <Upgrade
              backgroundColor="bg-base-100"
              imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLqbNSrbSw-a9bD499O86ggIrGfHE9qdxfXvTsX0_Cm3M46VCb41HBMDg58Ept_ZGJ0_A&usqp=CAU"
              title="Refundable Main Cabin"
              description="If a dog chews shoes whose shoes does he choose?"
              buttonText="Upgrade"
            />
          </div>
        </div>

        <div>
          <div
            className="card w-96 bg-base-100 shadow-xl"
            style={{
              marginLeft: "2rem",
              marginTop: "4rem",
              height: "27rem",
            }}
          >
            <div
              className="card-body"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "-0.25rem",
              }}
            >
              <h2
                className="card-title"
                style={{
                  fontSize: "1.75rem",
                  textAlign: "center",
                  marginLeft: "6rem",
                  marginBottom: "1rem",
                }}
              >
                Trip Total
              </h2>
              <p>
                Number of passengers: <span>{nbPassengers}</span>
              </p>
              <p>
                Flight(s): <span>{montant}.000 DT</span>
              </p>
              <p>
                Taxes, Fees & Charges: <span>{totalServices}.000 DT</span>
              </p>
              <div className="card-actions justify-end">
                <p>
                  Amount Due:{" "}
                  <p
                    style={{
                      fontSize: "1.5rem",
                      display: "flex",
                      marginLeft: "6rem",
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{ fontSize: "1.75rem", marginRight: "0.2rem" }}
                    >
                      {montantDue}
                    </span>
                    <span style={{ fontSize: "1.25rem" }}>.000 DT</span>
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
