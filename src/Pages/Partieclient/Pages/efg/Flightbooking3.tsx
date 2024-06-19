import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import "./Flightbooking3.css";
import { useHistory } from "react-router-dom";
import Seat from "../../../../Components/SS/Seat";
import Man from "../../../../Assets/Images/iconMan.jpg";
import SeatArrival from "../../../../Components/SS/SeatArrival";
import CustomAlert from "../../../../Components/Alert/Alert";
import { TimeLike } from "fs";
import { ReservationContext } from "../../../../Contexts/ReservationContext";

interface Seat {
  id: number;
  number: string;
  isReserved?: boolean;
}
export default function Flightbooking3() {
  const [clickLoungeService, setClickLounge] = useState<boolean>(false);
  const [clickSiège, setClickSiège] = useState<boolean>(false);
  const [aller, setAller] = useState<boolean>(false);
  const [retour, setRetour] = useState<boolean>(false);
  const [baggage, setBaggage] = useState<boolean>(false);
  const [extraBagDep, setextraBagDep] = useState<boolean>(false);
  const [extraBagArr, setextraBagArr] = useState<boolean>(false);
  const [montantSeats, setMontantSeats] = useState<number>(0);
  const [totalBagage, settotalBagage] = useState<number>(0);
  const [animal, setAnimal] = useState<boolean>(false);
  const [animalWeight, setAnimalWeight] = useState<string>("");
  const [weight, settWeight] = useState<boolean>(false);
  const [, setAnimalName] = useState<string>("");
  const [animalOption, setAnimaOption] = useState<boolean>(false);
  const [repas, setRepas] = useState<boolean>(false);
  const [, setMealSelect] = useState<string>("");
  const [mealselected, setMealSelected] = useState<boolean>(false);
  const [assistance, setAssistance] = useState<boolean>(false);
  const [serviceSelected, setServiceSelected] = useState<boolean>(false);
  const [CityDep, clickCityDep] = useState<boolean>(true);
  const [CityArr, clickCityArr] = useState<boolean>(false);
  const [SeatDep, setSeatDep] = useState<boolean>(true);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedSeatsArr, setSelectedSeatsArr] = useState<Seat[]>([]);
  const [seatsNames, setseatsNames] = useState<String[]>([]);
  const [seatsNamesArr, setseatsNamesArr] = useState<String[]>([]);
  const [totalPet, setTotalPet] = useState<number>(0);
  const [counter, changeCounter] = useState<number>(0);
  const [totalMeal, setTotalMeal] = useState<number>(0);
  const [CounterMaals, setCounterMeals] = useState<number>(0);
  const [checkboxlounge, clickcheckboxlounge] = useState<boolean>(false);
  const [Lounge, confirmLounge] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState<FlightData | null>(null);
  const [serviceLounge, CheckServiceLounge] = useState<number>(0);

  const {
    ServiceLounge,
    setServiceLounge,
    totalServiceLounge,
    settotalServiceLounge,
  } = useContext(ReservationContext);

  const [Datedeparture, setDatedeparture] = useState<string | undefined>(
    undefined
  );
  const [DatedeArrival, setDatedeArrival] = useState<string | undefined>(
    undefined
  );
  const { chosenSeatDep, setChosenSeatDep, chosenSeatArr, setChosenSeatArr } =
    useContext(ReservationContext);
  const [calcul, calculate] = useState<number>(0);

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
  const { Form1 } = useContext(ReservationContext);
  useEffect(() => {
    const storedFlight = localStorage.getItem("selectedFlight");
    if (storedFlight) {
      setSelectedFlight(JSON.parse(storedFlight));
    }
    setDatedeparture(selectedFlight?.SchedateDep);
    setDatedeArrival(selectedFlight?.SchedateArr);
  }, []);
  const history = useHistory();
  const handleBack = () => {
    history.push("/Flightbooking2");
  };

  const handleSummary = () => {
    localStorage.setItem("TotalServices", `${calcul}`);
    history.push("/SummaryTrip");
  };
  const handleClickCancelLounge = () => {
    setClickLounge(false);
  };
  const handleClickConfirmLounge = () => {
    if (checkboxlounge === false) {
      setClickLounge(true);
    } else {
      setClickLounge(false);
      confirmLounge(!Lounge);
      CheckServiceLounge(100);
    }
  };
  const handleClickCancelSiège = () => {
    setClickSiège(false);
  };
  const handleClickConfirmSiège = () => {
    setClickSiège(false);

    localStorage.setItem("chosenSeatDep", JSON.stringify(chosenSeatDep));
    localStorage.setItem("chosenSeatArr", JSON.stringify(chosenSeatArr));
  };

  const handleSeatSelectedDep = (seat: Seat) => {
    console.log("Siège sélectionné pour le départ :", seat);
    setChosenSeatDep([...chosenSeatDep, seat.number]);
    setSelectedSeats([...selectedSeats, seat]);
  };

  const handleSeatDeselectedDep = (seat: Seat) => {
    setChosenSeatDep(chosenSeatDep.filter((name) => name !== seat.number));
    setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    setSeatDep(false);
  };
  const handleSeatSelectedArr = (seat: Seat) => {
    setSelectedSeatsArr([...selectedSeatsArr, seat]);
    setChosenSeatArr([...chosenSeatArr, seat.number]);
  };

  const handleSeatDeselectedArr = (seat: Seat) => {
    setChosenSeatArr(chosenSeatArr.filter((name) => name !== seat.number));
    setSelectedSeatsArr(selectedSeatsArr.filter((s) => s.id !== seat.id));
  };

  console.log("la valeur de aller est", aller);
  console.log("la valeur de retour est", retour);

  const TotalService = () => {
    setMontantSeats(selectedSeats.length * 25 + selectedSeatsArr.length * 25);
  };
  console.log("les seats selectionnés sont:", selectedSeats.length);
  useEffect(() => {
    console.log("les seats selectionnés sont:", selectedSeats.length);
    MontantBagage();
    TotalService();
  }, [selectedSeats, extraBagArr, extraBagDep, selectedSeatsArr]);
  const MontantBagage = () => {
    if (extraBagDep === true && totalBagage < 125) {
      settotalBagage((prevTotalBagage) => prevTotalBagage + 125);
    }
    if (extraBagArr === true && totalBagage <= 125) {
      // Assuming extraBagRet is another condition to check
      settotalBagage((prevTotalBagage) => prevTotalBagage + 150);
    }
  };
  const handleCheckboxChangeDep = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setextraBagDep(isChecked);
    if (isChecked) {
      settotalBagage((prevTotalBagage) => prevTotalBagage + 125);
    } else {
      settotalBagage((prevTotalBagage) => prevTotalBagage - 125);
    }
  };

  const handleCheckboxChangeArr = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setextraBagArr(isChecked);
    if (isChecked) {
      settotalBagage((prevTotalBagage) => prevTotalBagage + 150);
    } else {
      settotalBagage((prevTotalBagage) => prevTotalBagage - 150);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setAnimalWeight(event.target.value);
    settWeight(true);
  };

  const handleChangeAnimal = (event: ChangeEvent<HTMLSelectElement>) => {
    if (CityDep === true && (totalPet === 0 || totalPet === 100)) {
      setTotalPet(totalPet + 100);
    } else if (CityArr === true && (totalPet === 0 || totalPet === 100)) {
      setTotalPet(totalPet + 100);
    }
    setAnimalName(event.target.value);
    setAnimaOption(true);
  };

  const handleChangeMeal = (event: ChangeEvent<HTMLSelectElement>) => {
    setMealSelect(event.target.value);
    setMealSelected(true);
    if (CounterMaals < 2) {
      setCounterMeals(CounterMaals + 1);
      setTotalMeal(totalMeal + 25);
    }
  };
  const handleChangeService = (event: ChangeEvent<HTMLSelectElement>) => {
    setServiceSelected(!serviceSelected);
    if (counter < 2) {
      changeCounter(counter + 1);
    }
  };
  {
    /***const handleClickSeat = (seat: Seat) => {
    // Vérifier si le siège appartient au départ ou à l'arrivée en fonction des états aller et retour
    if (aller && SeatDep) {
      if (!selectedSeats.some((s) => s.id === seat.id)) {
        handleSeatSelectedDep(seat);
      } else {
        handleSeatDeselectedDep(seat);
      }
    } else if (retour && !SeatDep) {
      if (!selectedSeatsArr.some((s) => s.id === seat.id)) {
        handleSeatSelectedArr(seat);
      } else {
        handleSeatDeselectedArr(seat);
      }
    }
  }; */
  }

  useEffect(() => {}, [totalPet, CityDep, CityArr]);
  const handleCheckboxChange = () => {
    clickcheckboxlounge(!checkboxlounge);
    setServiceLounge(true);
    settotalServiceLounge(100);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 7000); // Set the timeout to 7 seconds

    return () => clearTimeout(timer);
    // Clean up the timer on component unmount
  }, []);

  useEffect(() => {
    calculate(
      totalBagage + totalMeal + totalPet + serviceLounge + montantSeats
    );
  }, [totalBagage, totalMeal, totalPet, serviceLounge, montantSeats]);
  console.log("le total pour service est", calcul);
  console.log("montant seats égal à:", montantSeats);
  console.log("montant meals égal à:", totalMeal);
  console.log("montant pets égal à:", totalPet);
  console.log("montant lounge égal à:", serviceLounge);
  console.log("montant  égal à:", totalBagage);

  return (
    <div className="flightbooking3-container">
      <div></div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "2rem",
          marginBottom: "-4.5rem",
        }}
      >
        <button
          style={{
            marginTop: "1rem",
            backgroundColor: "#E73737",
            color: "white",
            marginBottom: "-1rem",
          }}
          onClick={handleBack}
          className="btn btn-primary"
        >
          Back
        </button>
        <button
          style={{
            marginTop: "1rem",
            backgroundColor: "#E73737",
            color: "white",
          }}
          onClick={handleSummary}
          className="btn btn-primary"
        >
          Trip Summary
        </button>
      </div>

      <div
        style={{
          display: "flex",
          marginBottom: "-4.5rem",
          justifyContent: "flex-start",
        }}
      >
        {" "}
        <div>
          <div
            className="drawer"
            style={{
              marginTop: "1.4rem",
              backgroundColor: "#E73737 !important",
            }}
          >
            <input
              id="my-drawer"
              type="checkbox"
              className="drawer-toggle"
              style={{}}
            />
            <div className="drawer-content">
              <label
                htmlFor="my-drawer"
                className="btn btn-primary drawer-button"
              >
                My Reservation
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            marginTop: "9rem",
            gap: "2rem",
            marginLeft: "2rem",
          }}
        >
          <div
            style={{
              width: "23rem",
              height: "28rem",
              backgroundColor: "#F5F5F5",
              borderRadius: "0.5rem",
              marginLeft: "50rem",
            }}
          >
            <img
              style={{ width: "100%", height: "60%" }}
              src="https://i.pinimg.com/originals/8c/cf/ff/8ccfff00a882d3693c9472c00e91842c.jpg"
              alt="Shoes"
            ></img>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1rem",
                gap: "0.3rem",
              }}
            >
              <h1
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "black",
                  textAlign: "center",
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                }}
              >
                Book in our Lounge{" "}
              </h1>
              <button
                style={{ width: "60%" }}
                className="btn btn-primary"
                onClick={() => {
                  setClickLounge(true);
                }}
              >
                book your lounge access{" "}
              </button>
              {clickLoungeService && (
                <div>
                  <div
                    style={{
                      position: "absolute",
                      width: "42rem",
                      zIndex: "444",
                      marginLeft: "20rem",
                      marginTop: "-28rem",
                      marginBottom: "1.5rem",
                      height: "28rem",
                    }}
                    className="card lg:card-side bg-base-100 shadow-xl"
                  >
                    <div className="card-body">
                      <h2 className="card-title">Lounge Access</h2>
                      <p style={{ marginTop: "-0.4rem" }}>
                        Relax and recharge in our luxurious lounge, where
                        comfort meets elegance and exceptional service awaits.
                      </p>
                      <div style={{ display: "flex", gap: "1rem" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2rem",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "-1rem",

                              width: "22rem",
                              height: "15rem",
                              border: "1px solid #ccc",
                              borderRadius: "5%",
                              padding: "0.5rem",
                            }}
                          >
                            {" "}
                            <p
                              style={{
                                marginBottom: "0.5rem",
                                marginTop: "-0.1rem",
                                fontWeight: "bold",
                              }}
                            >
                              Important Information
                            </p>
                            <p style={{ marginTop: "-0.5rem" }}>
                              Children under 2 years are admitted free with an
                              adult
                            </p>
                            <p style={{ marginTop: "-0.5rem" }}>
                              Day beds are available
                            </p>
                            <p style={{ marginTop: "-0.5rem" }}>
                              This location is only accessible for passengers
                              departing on international flights{" "}
                            </p>
                            <p style={{ marginTop: "-0.5rem" }}>
                              Maximum 4 hours per day
                            </p>
                          </div>
                          <div style={{ marginTop: "-1.8rem" }}>
                            {" "}
                            <div
                              style={{
                                display: "flex",
                                gap: "1rem",
                              }}
                            >
                              <label htmlFor="exampleCheckbox">I agree</label>
                              <input
                                onChange={handleCheckboxChange}
                                type="checkbox"
                                id="exampleCheckbox"
                              ></input>
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            width: "15rem",
                            height: "12rem",
                            border: "1px solid #ccc",
                            borderRadius: "5%",
                          }}
                        >
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <p
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: "bold",
                              }}
                            >
                              {" "}
                              Your Services
                            </p>
                            <div style={{ display: "flex", gap: "3rem" }}>
                              <p>Total Services</p>
                              {checkboxlounge && (
                                <p style={{ color: "red" }}>100.000 DT </p>
                              )}
                              {!checkboxlounge && (
                                <p style={{ color: "red" }}>0.000 DT </p>
                              )}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              marginTop: "0.2rem",
                            }}
                          ></div>
                        </div>
                      </div>

                      <div
                        className="card-actions justify-end"
                        style={{ display: "flex", gap: "2rem" }}
                      >
                        <button
                          onClick={handleClickConfirmLounge}
                          className="btn btn-primary"
                        >
                          Confirm
                        </button>

                        <button
                          className="btn btn-primary"
                          onClick={handleClickCancelLounge}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {!Lounge && !checkboxlounge && clickLoungeService && (
              <div
                style={{
                  marginTop: "-27rem",
                  marginLeft: "35rem",
                  position: "relative",
                  width: "20rem",
                  zIndex: 9999,
                  transition: "opacity 6s", // CSS transition for opacity
                  opacity: showAlert ? 1 : 0,
                }}
              >
                {showAlert && (
                  <CustomAlert
                    severity="danger"
                    message="Please click on 'I agree' to confirm!"
                  />
                )}
              </div>
            )}
          </div>
          {/* Deuxième groupe de composants */}
          <div
            style={{
              width: "23rem",
              height: "28rem",
              backgroundColor: "#F5F5F5",
              borderRadius: "0.5rem",
            }}
          >
            <img
              style={{ width: "100%", height: "60%" }}
              src="https://media.istockphoto.com/id/586938474/fr/vectoriel/int%C3%A9rieur-de-lavion-avec-fen%C3%AAtres-et-si%C3%A8ges-illustration-vectorielle.jpg?s=612x612&w=0&k=20&c=2wLZa_ySMQ7uVCCnNz9dx8hHbIrAipsLXIlpsUpn7S0="
              alt="Shoes"
            ></img>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1rem",
                gap: "0.3rem",
              }}
            >
              <h1
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "black",
                  textAlign: "center",
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                }}
              >
                Choose your Seat
              </h1>
              <button
                onClick={() => {
                  setClickSiège(!clickSiège);
                }}
                style={{ width: "60%" }}
                className="btn btn-primary"
              >
                Choose your Seat
              </button>
              {clickSiège && (
                <div>
                  <div
                    style={{
                      position: "absolute",
                      width: "60rem",
                      marginLeft: "-2rem",
                      zIndex: "444",
                      marginTop: "-29rem",
                      marginBottom: "1.5rem",
                      height: "37rem",
                    }}
                    className="card lg:card-side bg-base-100 shadow-xl"
                  >
                    <div className="card-body">
                      <div
                        id="elementsVertical"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "7rem",
                            backgroundColor: "#F5F5F5",
                          }}
                        >
                          <p
                            style={{
                              marginTop: "1rem",
                              display: "flex",
                              justifyContent: "flex-start",
                              marginLeft: "1rem",
                              fontWeight: "bold",
                            }}
                            className="card-title"
                          >
                            Seats
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "2rem",

                            justifyContent: "center",
                            marginTop: "-2rem",
                          }}
                        >
                          <button
                            onClick={() => {
                              clickCityDep(true);
                              clickCityArr(false);
                            }}
                            className="custom-button"
                            style={{
                              backgroundColor: CityDep ? "white" : "#e73737",
                              color: CityDep ? "black" : "white",
                            }}
                          >
                            {selectedFlight?.CityDep}-{selectedFlight?.CityArr}
                          </button>
                          <button
                            onClick={() => {
                              clickCityArr(true);
                              clickCityDep(false);
                            }}
                            className="custom-button"
                            style={{
                              backgroundColor: CityArr ? "white" : "#e73737",
                              color: CityArr ? "black" : "white",
                            }}
                          >
                            {selectedFlight?.CityArr}-{selectedFlight?.CityDep}
                          </button>
                        </div>
                        <div style={{ display: "flex", gap: "2rem" }}>
                          <div
                            style={{
                              marginTop: "2rem",
                              border: "1px solid #ccc",
                              width: "22rem",
                              height: "25rem",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <p
                                style={{
                                  fontWeight: "bold",
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  marginLeft: "0.5rem",
                                }}
                              >
                                Passenger's seat :
                              </p>
                              <div style={{ display: "flex", gap: "2rem" }}>
                                <input
                                  style={{ marginTop: "1.5rem" }}
                                  type="checkbox"
                                />
                                <p style={{ marginTop: "2rem" }}>
                                  {Form1?.firstName}
                                  {""} {Form1?.lastName}{" "}
                                </p>
                                <img
                                  style={{
                                    width: "3rem",
                                    height: "3rem",
                                    marginTop: "1rem",
                                    borderRadius: "50%",
                                  }}
                                  src={Man}
                                  alt="iconMan"
                                />
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <p
                                  style={{
                                    fontWeight: "bold",
                                    justifyContent: "flex-start",
                                    display: "flex",
                                    marginLeft: "0.5rem",
                                  }}
                                >
                                  Legend :
                                </p>
                                <div style={{ display: "flex", gap: "1rem" }}>
                                  <div
                                    style={{
                                      marginLeft: "1rem",
                                      marginRight: "-9rem",
                                      marginTop: "1rem",
                                      width: "2rem",
                                      height: "2rem",
                                      backgroundColor: "darkgreen",
                                    }}
                                  ></div>{" "}
                                  <p>: Unreserved seat</p>
                                </div>
                                <div style={{ display: "flex", gap: "-1rem" }}>
                                  <div
                                    style={{
                                      marginLeft: "1rem",
                                      marginRight: "-10rem",
                                      marginTop: "1rem",
                                      width: "2rem",
                                      height: "2rem",
                                      backgroundColor: "red",
                                    }}
                                  ></div>{" "}
                                  <p>: Selected seat</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              marginTop: "2rem",
                              border: "1px solid #ccc",
                              width: "14rem",
                              height: "23rem",
                            }}
                          >
                            <div
                              style={{ marginLeft: "-3rem", marginTop: "2rem" }}
                            >
                              {CityDep && !CityArr && (
                                <Seat
                                  onSeatSelected={handleSeatSelectedDep}
                                  onSeatDeselected={handleSeatDeselectedDep}
                                />
                              )}
                              {!CityDep && CityArr && (
                                <SeatArrival
                                  onSeatSelected={handleSeatSelectedArr}
                                  onSeatDeselected={handleSeatDeselectedArr}
                                />
                              )}
                            </div>
                          </div>

                          <div
                            style={{
                              marginTop: "2rem",
                              border: "1px solid #ccc",
                              width: "12rem",
                              height: "11rem",
                              marginLeft: "2rem",
                            }}
                          >
                            <div>
                              <div>
                                <h2 style={{ marginTop: "0.5rem" }}>
                                  selected Seats :
                                </h2>
                                <div style={{ fontSize: "14px" }}>
                                  {" "}
                                  Outbound:
                                  {seatsNames.map((name, index) => (
                                    <span style={{ color: "red" }} key={index}>
                                      {name} ,{" "}
                                    </span>
                                  ))}
                                </div>
                                <span style={{ fontSize: "14px" }}>
                                  {" "}
                                  Return:
                                  {seatsNamesArr.map((name, index) => (
                                    <span style={{ color: "red" }} key={index}>
                                      {name} ,{" "}
                                    </span>
                                  ))}
                                </span>
                              </div>
                            </div>
                            <p style={{ fontWeight: "bold" }}>
                              Total Services{" "}
                            </p>{" "}
                            <p style={{ color: "red" }}>
                              {montantSeats}.000 DT
                            </p>
                          </div>
                        </div>

                        <div
                          className="card-actions justify-end"
                          style={{
                            display: "flex",
                            gap: "2rem",
                            marginTop: "-3rem",
                          }}
                        >
                          <button
                            onClick={handleClickConfirmSiège}
                            className="btn btn-primary"
                          >
                            Confirm
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={handleClickCancelSiège}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Troisième groupe de composants */}
          <div
            style={{
              width: "23rem",
              height: "28rem",
              backgroundColor: "#F5F5F5",
              borderRadius: "0.5rem",
            }}
          >
            <img
              style={{ width: "100%", height: "60%" }}
              src="https://img.freepik.com/premium-vector/baggage-color-icon-travel-bags-luggage-symbol_80590-16910.jpg"
              alt="Shoes"
            ></img>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1rem",
                gap: "0.3rem",
              }}
            >
              {" "}
              <h1
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "black",
                  textAlign: "center",
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                }}
              >
                {" "}
                Bagages supplémentaires
              </h1>
              <button
                onClick={() => {
                  setBaggage(!baggage);
                }}
                style={{ width: "60%" }}
                className="btn btn-primary"
              >
                Add Luggage
              </button>
            </div>
            {baggage && (
              <div>
                <div
                  style={{
                    position: "absolute",
                    width: "60rem",
                    marginLeft: "-20rem",
                    zIndex: "444",
                    marginTop: "-29rem",
                    marginBottom: "1.5rem",
                    height: "37rem",
                  }}
                  className="card lg:card-side bg-base-100 shadow-xl"
                >
                  <div className="card-body">
                    <div>
                      {" "}
                      <h2
                        style={{
                          height: "8rem",
                          backgroundColor: "#F5F5F5",
                          width: "100%",
                          marginTop: "-1rem",
                        }}
                        className="card-title"
                      >
                        <p
                          style={{
                            marginTop: "-4rem",
                            display: "flex",
                            justifyContent: "flex-start",
                            marginLeft: "1rem",
                          }}
                        >
                          {" "}
                          Luggage
                        </p>
                      </h2>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "3rem", // Espace entre les conteneurs
                        marginTop: "-20rem", // Ajustez ceci selon vos besoins
                      }}
                    >
                      {/* Premier conteneur */}
                      <div
                        style={{
                          width: "40rem",
                          height: "22rem",
                          border: "1px solid #ccc",
                          borderRadius: "5%",
                          padding: "0.5rem",
                          display: "flex",
                          marginTop: "21rem",
                          flexDirection: "column",
                          justifyContent: "center",
                          gap: "0.5rem", // Ajustement de l'espacement entre les éléments
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <input
                            type="checkbox"
                            style={{
                              margin: "0 0.2rem 0 0",
                              marginTop: "1rem",
                            }}
                          />
                          <p
                            style={{
                              margin: "0 0.2rem",
                              flex: "1",
                              marginTop: "1rem",
                              fontSize: "0.9rem",
                            }}
                          >
                            {Form1?.firstName}
                            {""} {Form1?.lastName}{" "}
                          </p>
                          <img
                            style={{
                              width: "3rem",
                              height: "3rem",
                              borderRadius: "50%",
                              marginLeft: "0.2rem",
                              marginTop: "1rem",
                            }}
                            src={Man}
                            alt="Man"
                          />
                        </div>
                        <p
                          style={{
                            fontWeight: "bold",
                            margin: "0.2rem 0 0.3rem",
                            display: "flex",
                            justifyContent: "flex-start",
                            marginLeft: "1rem", // Ajustement de la marge du titre
                          }}
                        >
                          {selectedFlight?.CityDep} - {""}{" "}
                          {selectedFlight?.CityArr}
                        </p>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <input
                            type="checkbox"
                            onChange={handleCheckboxChangeDep}
                            checked={extraBagDep}
                            style={{
                              margin: "0 0.2rem 0 0",
                              marginTop: "-15rem",
                            }}
                          />
                          <p
                            style={{
                              margin: "0 0.2rem",
                              flex: "1",
                              marginTop: "-15rem",
                              fontSize: "0.9rem",
                            }}
                          >
                            125.000 DT
                          </p>
                          <img
                            style={{
                              width: "4rem",
                              height: "4rem",
                              borderRadius: "50%",
                              marginLeft: "0.2rem",
                              marginTop: "-15rem",
                            }}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Suitcase_icon.svg/960px-Suitcase_icon.svg.png"
                            alt="Man"
                          />
                        </div>
                        <p
                          style={{
                            fontWeight: "bold",
                            margin: "0.2rem 0 0.3rem",
                            display: "flex",
                            marginTop: "-5rem",
                            justifyContent: "flex-start",
                            marginLeft: "1rem", // Ajustement de la marge du titre
                          }}
                        >
                          {selectedFlight?.CityArr} {""}-{" "}
                          {selectedFlight?.CityDep}
                        </p>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <input
                            type="checkbox"
                            onChange={handleCheckboxChangeArr}
                            checked={extraBagArr}
                            style={{
                              margin: "0 0.2rem 0 0",
                              marginTop: "-14rem",
                            }}
                          />
                          <p
                            style={{
                              margin: "0 0.2rem",
                              flex: "1",
                              marginTop: "-14rem",
                              fontSize: "0.9rem",
                            }}
                          >
                            150.000 DT
                          </p>
                          <img
                            style={{
                              width: "4rem",
                              height: "4rem",
                              borderRadius: "50%",
                              marginLeft: "0.2rem",
                              marginTop: "-14rem",
                            }}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Suitcase_icon.svg/960px-Suitcase_icon.svg.png"
                            alt="Man"
                          />
                        </div>
                      </div>

                      {/* Conteneur central avec "hello world" */}

                      {/* Deuxième conteneur */}
                      <div
                        style={{
                          width: "13rem",
                          height: "12rem",
                          marginLeft: "1rem",
                          marginTop: "10rem",
                          border: "1px solid #ccc",
                          borderRadius: "5%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          padding: "0.5rem", // Ajouté pour un espace intérieur
                        }}
                      >
                        <p
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            fontWeight: "bold",
                            marginBottom: "0.5rem", // Réduit l'espace entre le titre et le contenu
                          }}
                        >
                          Your Services
                        </p>
                        <div style={{ width: "20rem", height: "15rem" }}>
                          <p
                            style={{
                              marginTop: "1.5rem",
                              marginRight: "7.5rem",
                            }}
                          >
                            Total Services
                          </p>
                          <p
                            style={{
                              marginTop: "3rem",
                              color: "red",
                              marginRight: "7.5rem",
                            }}
                          >
                            {totalBagage}.000 TND
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="card-actions justify-end"
                      style={{ display: "flex", gap: "2rem" }}
                    >
                      <button
                        onClick={() => {
                          setBaggage(false);
                        }}
                        className="btn btn-primary"
                      >
                        Confirm
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setBaggage(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quatrième groupe de composants */}
          <div
            style={{
              width: "23rem",
              height: "28rem",
              backgroundColor: "#F5F5F5",
              borderRadius: "0.5rem",
            }}
          >
            <img
              style={{ width: "100%", height: "60%" }}
              src="https://static.vecteezy.com/system/resources/previews/014/498/070/non_2x/pet-travel-cage-icon-flat-style-vector.jpg"
              alt="Shoes"
            ></img>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1rem",
                gap: "0.3rem",
              }}
            >
              {" "}
              <h1
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "black",
                  textAlign: "center",
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                }}
              >
                Voyagez avec votre animal
              </h1>
              <button
                onClick={() => {
                  setAnimal(!animal);
                }}
                style={{ width: "60%" }}
                className="btn btn-primary"
              >
                Ajoutez votre animal
              </button>
            </div>
          </div>
          <div
            style={{
              width: "23rem",
              height: "28rem",
              backgroundColor: "#F5F5F5",
              borderRadius: "0.5rem",
            }}
          >
            <img
              style={{ width: "100%", height: "60%" }}
              src="https://static.vecteezy.com/system/resources/previews/015/151/942/non_2x/airline-food-tray-icon-flat-plane-trolley-vector.jpg"
              alt="Shoes"
            ></img>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1rem",
                gap: "0.3rem",
              }}
            >
              {" "}
              <h1
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "black",
                  textAlign: "center",
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                }}
              >
                Choisissez votre repas
              </h1>
              <button
                onClick={() => {
                  setRepas(!repas);
                }}
                style={{ width: "60%" }}
                className="btn btn-primary"
              >
                Choisissez votre repas
              </button>
              {repas && (
                <div>
                  {" "}
                  <div>
                    <div
                      style={{
                        position: "absolute",
                        width: "60rem",
                        marginLeft: "-80rem",
                        zIndex: "444",
                        marginTop: "-29rem",
                        marginBottom: "1.5rem",
                        height: "37rem",
                      }}
                      className="card lg:card-side bg-base-100 shadow-xl"
                    >
                      <div className="card-body">
                        <div>
                          {" "}
                          <h2
                            style={{
                              height: "8rem",
                              backgroundColor: "#F5F5F5",
                              width: "100%",
                              marginTop: "-1rem",
                            }}
                            className="card-title"
                          >
                            <p
                              style={{
                                marginTop: "-4rem",
                                display: "flex",
                                justifyContent: "flex-start",
                                marginLeft: "1rem",
                              }}
                            >
                              {" "}
                              Meals{" "}
                            </p>
                          </h2>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "3rem", // Espace entre les conteneurs
                            marginTop: "-20rem", // Ajustez ceci selon vos besoins
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "2rem",
                              marginTop: "-6rem",
                              marginLeft: "20rem",
                            }}
                          >
                            <button
                              onClick={() => {
                                clickCityDep(true);
                                clickCityArr(false);
                              }}
                              style={{
                                height: "4rem",
                                backgroundColor: CityDep ? "white" : "#e73737",
                                color: CityDep ? "black" : "white",
                              }}
                              className="custom-button"
                            >
                              {selectedFlight?.CityDep} {""}-{" "}
                              {selectedFlight?.CityArr}{" "}
                            </button>
                            <button
                              onClick={() => {
                                clickCityArr(true);
                                clickCityDep(false);
                              }}
                              style={{
                                height: "4rem",
                                backgroundColor: CityArr ? "white" : "#e73737",
                                color: CityArr ? "black" : "white",
                              }}
                              className="custom-button"
                            >
                              {selectedFlight?.CityArr} {""}-{" "}
                              {selectedFlight?.CityDep}{" "}
                            </button>
                          </div>

                          {/* Premier conteneur */}
                          <div
                            style={{
                              width: "40rem",
                              height: "22rem",
                              border: "1px solid #ccc",
                              borderRadius: "5%",
                              padding: "0.5rem",
                              display: "flex",
                              marginLeft: "-40rem",
                              marginTop: "21rem",
                              flexDirection: "column",
                              justifyContent: "center",
                              gap: "0.5rem", // Ajustement de l'espacement entre les éléments
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <input
                                type="checkbox"
                                style={{
                                  margin: "0 0.2rem 0 0",
                                  marginTop: "1rem",
                                }}
                              />
                              <p
                                style={{
                                  margin: "0 0.2rem",
                                  flex: "1",
                                  marginTop: "1rem",
                                  fontSize: "0.9rem",
                                }}
                              >
                                {Form1?.firstName} {Form1?.lastName}{" "}
                                {CityDep && <span>(Outbound)</span>}{" "}
                                {CityArr && <span>(Return)</span>}
                              </p>
                              <img
                                style={{
                                  width: "3rem",
                                  height: "3rem",
                                  borderRadius: "50%",
                                  marginLeft: "0.2rem",
                                  marginTop: "1rem",
                                }}
                                src={Man}
                                alt="Man"
                              />
                            </div>
                            <p
                              style={{
                                fontWeight: "bold",
                                margin: "0.2rem 0 0.3rem",
                                display: "flex",
                                marginTop: "2rem",
                                justifyContent: "flex-start",
                                marginLeft: "1rem", // Ajustement de la marge du titre
                              }}
                            >
                              Meals Options
                            </p>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {CityDep && (
                                <div
                                  style={{
                                    width: "40%",
                                    marginTop: "-19.5rem",
                                  }}
                                >
                                  <select
                                    style={{
                                      width: "12rem",
                                      height: "2rem",
                                      border: "1px solid #ccc",
                                      borderRadius: "0.3rem",
                                    }}
                                    onChange={handleChangeMeal}
                                    name="pets"
                                    id="pet-select"
                                  >
                                    {" "}
                                    <option value="default" disabled selected>
                                      Select the meal
                                    </option>
                                    <option>Baby meal</option>
                                    <option>Bland meal</option>
                                    <option>Child meal</option>
                                    <option>Bland meal</option>
                                    <option>Child meal</option>
                                    <option>Baby meal</option>
                                    <option>Child meal</option>
                                    <option>Baby meal</option>
                                  </select>
                                </div>
                              )}
                              {CityArr && (
                                <div
                                  style={{
                                    width: "40%",
                                    marginTop: "-19.5rem",
                                  }}
                                >
                                  <select
                                    style={{
                                      width: "12rem",
                                      height: "2rem",
                                      border: "1px solid #ccc",
                                      borderRadius: "0.3rem",
                                    }}
                                    onChange={handleChangeMeal}
                                    name="pets"
                                    id="pet-select"
                                  >
                                    {" "}
                                    <option value="default" disabled selected>
                                      Select the meal
                                    </option>
                                    <option>Baby meal</option>
                                    <option>Bland meal</option>
                                    <option>Child meal</option>
                                    <option>Bland meal</option>
                                    <option>Child meal</option>
                                    <option>Baby meal</option>
                                    <option>Child meal</option>
                                    <option>Baby meal</option>
                                  </select>
                                </div>
                              )}
                            </div>

                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            ></div>
                          </div>

                          {/* Conteneur central avec "hello world" */}

                          {/* Deuxième conteneur */}
                          <div
                            style={{
                              width: "13rem",
                              height: "12rem",
                              marginLeft: "1rem",
                              marginTop: "10rem",
                              border: "1px solid #ccc",
                              borderRadius: "5%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              padding: "0.5rem", // Ajouté pour un espace intérieur
                            }}
                          >
                            <p
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: "bold",
                                marginBottom: "0.5rem", // Réduit l'espace entre le titre et le contenu
                              }}
                            >
                              Your Services
                            </p>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  marginTop: "-8rem",
                                  marginRight: "0.5rem",
                                }}
                              >
                                Total Services{" "}
                              </p>
                              {/* Supprimé les marges pour les paragraphes */}
                              <p style={{ marginTop: "-8rem", color: "red" }}>
                                {" "}
                                {mealselected && <div>{totalMeal}.000 DT</div>}
                                {!mealselected && <div>0.000 DT</div>}{" "}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div
                          className="card-actions justify-end"
                          style={{ display: "flex", gap: "2rem" }}
                        >
                          <button
                            onClick={() => {
                              setRepas(false);
                            }}
                            className="btn btn-primary"
                          >
                            Confirm
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setRepas(false);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/********************partie reservation pour les animaux *******************************************************************************/}
            {animal && (
              <div>
                <div
                  style={{
                    position: "absolute",
                    width: "60rem",
                    marginLeft: "-80rem",
                    zIndex: "444",
                    marginTop: "-29rem",
                    marginBottom: "1.5rem",
                    height: "37rem",
                  }}
                  className="card lg:card-side bg-base-100 shadow-xl"
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex" }} className="card-body">
                      <div>
                        {" "}
                        <h2
                          style={{
                            height: "8rem",
                            backgroundColor: "#F5F5F5",
                            width: "100%",
                            marginTop: "3rem",
                          }}
                        >
                          <p
                            style={{
                              marginTop: "-4rem",
                              display: "flex",
                              justifyContent: "flex-start",
                              marginLeft: "1rem",
                            }}
                            className="card-title"
                          >
                            {" "}
                            Pets
                          </p>
                          <p style={{ marginTop: "0.2rem" }}>
                            Choose to bring your pet on board! Tunisair
                            temporarily accepts pets in the cabin only. The
                            maximum allowed weight is 8 kilos per pet, including
                            the cage (55 x 40 x 20 cm) per reservation. Only one
                            cage per reservation is permitted.
                          </p>
                        </h2>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: "15rem",
                          gap: "3rem", // Espace entre les conteneurs
                          marginTop: "-20rem", // Ajustez ceci selon vos besoins
                        }}
                      >
                        <button
                          onClick={() => {
                            clickCityDep(true);
                            clickCityArr(false);
                          }}
                          className="custom-button"
                          style={{
                            fontSize: "medium",
                            marginTop: "-5.5rem",
                            height: "3.5rem",
                            backgroundColor: CityDep ? "white" : "#e73737",
                            color: CityDep ? "black" : "white",
                          }}
                        >
                          {selectedFlight?.CityDep} {""}-{" "}
                          {selectedFlight?.CityArr}{" "}
                        </button>
                        <button
                          onClick={() => {
                            clickCityArr(true);
                            clickCityDep(false);
                          }}
                          className="custom-button"
                          style={{
                            marginTop: "-5.5rem",
                            height: "3.5rem",
                            backgroundColor: CityArr ? "white" : "#e73737",
                            color: CityArr ? "black" : "white",
                          }}
                        >
                          {" "}
                          {selectedFlight?.CityArr} {""}-{" "}
                          {selectedFlight?.CityDep}{" "}
                        </button>
                        {/* Premier conteneur */}
                        <div
                          style={{
                            width: "40rem",
                            height: "22rem",
                            border: "1px solid #ccc",
                            borderRadius: "5%",
                            padding: "0.5rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: "0.5rem",
                            marginTop: "22rem",
                            marginLeft: "-35rem",
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <input
                              type="checkbox"
                              style={{
                                margin: "0 0.2rem 0 0",
                                marginTop: "0.6rem",
                              }}
                            />
                            <p
                              style={{
                                margin: "0 0.2rem",
                                flex: "1",
                                marginTop: "1rem",
                                fontSize: "0.9rem",
                              }}
                            >
                              {Form1?.firstName} {Form1?.lastName}{" "}
                              {CityDep && <span>(Outbound)</span>}{" "}
                              {CityArr && <span>(Return)</span>}
                            </p>
                            <img
                              style={{
                                width: "3rem",
                                height: "3rem",
                                borderRadius: "50%",
                                marginLeft: "0.2rem",
                                marginTop: "1rem",
                              }}
                              src={Man}
                              alt="Man"
                            />
                          </div>
                          <p
                            style={{
                              fontWeight: "bold",
                              margin: "0.2rem 0 0.3rem",
                              display: "flex",
                              justifyContent: "flex-start",
                              marginLeft: "1rem",
                            }}
                          >
                            Animal Type
                          </p>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "22.5rem",
                            }}
                          >
                            <div style={{ width: "40%", marginTop: "-10rem" }}>
                              <select
                                onChange={handleChangeAnimal}
                                style={{
                                  width: "12rem",
                                  border: "1px solid #ccc",
                                  height: "2rem",

                                  borderRadius: "0.3rem",
                                }}
                                name="pets"
                                id="pet-select"
                              >
                                {" "}
                                <option value="default" disabled selected>
                                  Select the animal
                                </option>
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                                <option value="bird">Bird</option>
                                <option value="hamster">Rabbit</option>
                              </select>
                            </div>

                            <img
                              style={{
                                width: "3rem",
                                marginTop: "-11.5rem",
                                height: "3rem",
                                borderRadius: "40%",
                                marginLeft: "-2rem",
                              }}
                              src="https://www.svgrepo.com/show/29317/pets.svg"
                              alt="Pet Icon"
                            />
                          </div>
                          <p
                            style={{
                              fontWeight: "bold",
                              margin: "0.2rem 0 0.3rem",
                              display: "flex",
                              justifyContent: "flex-start",
                              marginLeft: "1rem",
                            }}
                          >
                            <p
                              style={{
                                marginTop: "-3rem",
                                display: "flex",
                                justifyContent: "flex-start",
                              }}
                            >
                              {" "}
                              Animal Weight
                            </p>
                          </p>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "22.5rem",
                            }}
                          >
                            <div
                              style={{ width: "40%", marginTop: "-13.5rem" }}
                            >
                              <select
                                style={{
                                  width: "12rem",
                                  height: "2rem",
                                  border: "1px solid #ccc",
                                  borderRadius: "0.3rem",
                                }}
                                name="pets"
                                id="pet-select"
                                value={animalWeight}
                                onChange={handleChange}
                              >
                                {" "}
                                <option value="default" disabled selected>
                                  Select the weight {""}(KG)
                                </option>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                              </select>
                            </div>

                            <img
                              style={{
                                width: "3rem",
                                marginTop: "-15.5rem",
                                height: "3rem",
                                borderRadius: "40%",
                                marginLeft: "-2rem",
                              }}
                              src="https://www.svgrepo.com/show/29317/pets.svg"
                              alt="Pet Icon"
                            />
                          </div>
                        </div>

                        {/* Deuxième conteneur */}
                        <div
                          style={{
                            width: "13rem",
                            height: "12rem",
                            marginLeft: "1rem",
                            marginTop: "10rem",
                            border: "1px solid #ccc",
                            borderRadius: "5%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            padding: "0.5rem", // Ajouté pour un espace intérieur
                          }}
                        >
                          <p
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              fontWeight: "bold",
                              marginBottom: "0.5rem", // Réduit l'espace entre le titre et le contenu
                            }}
                          >
                            Your Services
                          </p>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <p
                              style={{
                                marginTop: "0.2rem",
                                marginRight: "0.5rem",
                              }}
                            >
                              Total Services{" "}
                            </p>
                            <p style={{ marginTop: "0.2rem", color: "red" }}>
                              {" "}
                              {animalOption && weight && (
                                <div>{totalPet}.000 DT</div>
                              )}
                              {!animalOption && !weight && <div>0.000 DT</div>}
                            </p>
                          </div>
                          <p style={{ marginTop: "-6rem" }}>
                            {" "}
                            Animal Weight (KG) : {animalWeight}{" "}
                          </p>{" "}
                        </div>
                      </div>

                      <div
                        className="card-actions justify-end"
                        style={{
                          display: "flex",
                          gap: "2rem",
                          marginTop: "-1rem",
                        }}
                      >
                        <button
                          onClick={() => {
                            setAnimal(false);
                          }}
                          className="btn btn-primary"
                        >
                          Confirm
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setAnimal(false);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/********************partie reservation pour les animaux *******************************************************************************/}

          <div
            style={{
              width: "23rem",
              height: "28rem",
              backgroundColor: "#F5F5F5",
              borderRadius: "0.5rem",
            }}
          >
            <img
              style={{ width: "100%", height: "60%" }}
              src="https://thumbs.dreamstime.com/b/passenger-group-people-together-waiting-airport-man-disabled-woman-walking-to-board-plane-airplane-room-station-travel-240504783.jpg"
              alt="Shoes"
            ></img>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1rem",
                gap: "0.3rem",
              }}
            >
              <h1
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "black",
                  textAlign: "center",
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                }}
              >
                Besoin d'assistance?
              </h1>
              <button
                onClick={() => {
                  setAssistance(!assistance);
                }}
                style={{ width: "60%" }}
                className="btn btn-primary"
              >
                Réservez votre assistance
              </button>

              {assistance && (
                <div>
                  <div>
                    {" "}
                    <div>
                      <div
                        style={{
                          position: "absolute",
                          width: "60rem",
                          marginLeft: "-100rem",
                          zIndex: "444",
                          marginTop: "-29rem",
                          marginBottom: "1.5rem",
                          height: "37rem",
                        }}
                        className="card lg:card-side bg-base-100 shadow-xl"
                      >
                        <div className="card-body">
                          <div>
                            {" "}
                            <h2
                              style={{
                                height: "8rem",
                                backgroundColor: "#F5F5F5",
                                width: "100%",
                                marginTop: "-1rem",
                              }}
                              className="card-title"
                            >
                              <p
                                style={{
                                  marginTop: "-4rem",
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  marginLeft: "1rem",
                                }}
                              >
                                {" "}
                                Assistance{" "}
                              </p>
                            </h2>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "3rem", // Espace entre les conteneurs
                              marginTop: "-20rem", // Ajustez ceci selon vos besoins
                            }}
                          >
                            <div
                              style={{
                                marginTop: "-4rem",
                                display: "flex",
                                justifyContent: "center",
                                marginLeft: "-5rem",
                                gap: "2rem",
                              }}
                            >
                              <button
                                onClick={() => {
                                  clickCityDep(true);
                                  clickCityArr(false);
                                }}
                                className="custom-button"
                                style={{
                                  marginLeft: "22rem",
                                  height: "3.5rem",
                                  marginTop: "-2rem",
                                  backgroundColor: CityDep
                                    ? "white"
                                    : "#e73737",
                                  color: CityDep ? "black" : "white",
                                }}
                              >
                                {selectedFlight?.CityDep} -{" "}
                                {selectedFlight?.CityArr}{" "}
                              </button>
                              <button
                                onClick={() => {
                                  clickCityArr(true);
                                  clickCityDep(false);
                                }}
                                style={{
                                  height: "3.5rem",
                                  marginTop: "-2rem",
                                  backgroundColor: CityArr
                                    ? "white"
                                    : "#e73737",
                                  color: CityArr ? "black" : "white",
                                }}
                                className="custom-button"
                              >
                                {selectedFlight?.CityArr} -{" "}
                                {selectedFlight?.CityDep}{" "}
                              </button>{" "}
                            </div>

                            <div
                              style={{
                                width: "40rem",
                                height: "22rem",
                                border: "1px solid #ccc",
                                borderRadius: "5%",
                                padding: "0.5rem",
                                display: "flex",
                                marginTop: "21rem",
                                flexDirection: "column",
                                justifyContent: "center",
                                marginLeft: "-35rem",
                                gap: "0.5rem", // Ajustement de l'espacement entre les éléments
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  style={{
                                    margin: "0 0.2rem 0 0",
                                    marginTop: "1rem",
                                  }}
                                />
                                <p
                                  style={{
                                    margin: "0 0.2rem",
                                    flex: "1",
                                    marginTop: "1rem",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  {Form1?.firstName} {Form1.lastName}{" "}
                                  {CityDep && <span>(Outbound)</span>}{" "}
                                  {CityArr && <span>(Return)</span>}
                                </p>
                                <img
                                  style={{
                                    width: "3rem",
                                    height: "3rem",
                                    borderRadius: "50%",
                                    marginLeft: "0.2rem",
                                    marginTop: "1rem",
                                  }}
                                  src={Man}
                                  alt="Man"
                                />
                              </div>
                              <p
                                style={{
                                  fontWeight: "bold",
                                  margin: "0.2rem 0 0.3rem",
                                  display: "flex",
                                  marginTop: "2rem",
                                  justifyContent: "flex-start",
                                  marginLeft: "1rem", // Ajustement de la marge du titre
                                }}
                              >
                                Services Options
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {CityDep && (
                                  <div
                                    style={{
                                      width: "40%",
                                      marginTop: "-19.5rem",
                                    }}
                                  >
                                    <select
                                      style={{
                                        width: "12rem",
                                        height: "2rem",
                                        border: "1px solid #ccc",
                                        borderRadius: "0.3rem",
                                      }}
                                      onChange={handleChangeService}
                                      name="pets"
                                      id="pet-select"
                                    >
                                      {" "}
                                      <option value="default" disabled selected>
                                        Select the service
                                      </option>
                                      <option>wheel chair</option>
                                    </select>
                                  </div>
                                )}
                                {CityArr && (
                                  <div
                                    style={{
                                      width: "40%",
                                      marginTop: "-19.5rem",
                                    }}
                                  >
                                    <select
                                      style={{
                                        width: "12rem",
                                        height: "2rem",
                                        border: "1px solid #ccc",
                                        borderRadius: "0.3rem",
                                      }}
                                      onChange={handleChangeService}
                                      name="pets"
                                      id="pet-select"
                                    >
                                      {" "}
                                      <option value="default" disabled selected>
                                        Select the service
                                      </option>
                                      <option>wheel chair</option>
                                    </select>
                                  </div>
                                )}
                              </div>
                            </div>
                            {/* Conteneur central avec "hello world" */}
                            {/* Deuxième conteneur */}
                            <div
                              style={{
                                width: "13rem",
                                height: "12rem",
                                marginLeft: "1rem",
                                marginTop: "10rem",
                                border: "1px solid #ccc",
                                borderRadius: "5%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                padding: "0.5rem", // Ajouté pour un espace intérieur
                              }}
                            >
                              <p
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  fontWeight: "bold",
                                  marginBottom: "0.5rem", // Réduit l'espace entre le titre et le contenu
                                }}
                              >
                                Your Services
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <p
                                  style={{
                                    marginTop: "-8rem",
                                    marginRight: "0.5rem",
                                  }}
                                >
                                  Total Services{" "}
                                </p>
                                {/* Supprimé les marges pour les paragraphes */}
                                <p style={{ marginTop: "-8rem", color: "red" }}>
                                  {" "}
                                  {serviceSelected && CityDep && !CityArr && (
                                    <div>free charges</div>
                                  )}
                                  {serviceSelected && CityArr && !CityDep && (
                                    <div>free charges</div>
                                  )}
                                  {!serviceSelected && <div>0.000 DT</div>}{" "}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div
                            className="card-actions justify-end"
                            style={{ display: "flex", gap: "2rem" }}
                          >
                            <button
                              onClick={() => {
                                setAssistance(false);
                              }}
                              className="btn btn-primary"
                            >
                              Confirm
                            </button>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                setAssistance(false);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
