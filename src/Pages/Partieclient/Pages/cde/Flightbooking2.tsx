import React, { useState, useEffect, useContext } from "react";
import "./Flightbooking2.css";
import { Redirect, useHistory } from "react-router-dom";
import { ReservationContext } from "../../../../Contexts/ReservationContext";

export default function FlightBooking2() {
  const {
    Form1,
    CounterBébéReturn,
    CounterEnfantReturn,
    CounterAdultReturn,
    CounterJeuneReturn,
    setCounterBébéReturn,
    setCounterEnfantReturn,
    setCounterAdultReturn,
    setCounterJeuneReturn,
    Form2,
    setForm2,
    bookBusinessClassReturn,
    setBookBusinessClassReturn,
    bookEconomyClassReturn,
    setBookEconomyClassReturn,
    DeviseReturn,
    setDeviseReturn,
    setBookBusinessClass,
    bookBusinessClass,
    setBookEconomyClass,
    bookEconomyClass,
    Devise,
    setDevise,
    CounterAdult,
    setCounterAdult,
    CounterBébé,
    setCounterBébé,
    CounterJeune,
    setCounterJeune,
    setCounterEnfant,
    CounterEnfant,
  } = useContext(ReservationContext);

  const [counterAdult, setCounterAdulte] = useState<number>(CounterAdult || 1);
  const [counterAdultReturn, setCounterAdulteReturn] = useState<number>(
    CounterAdultReturn || 1
  );

  const [counterJeune, setCounterrJeune] = useState<number>(CounterJeune || 0);
  const [counterJeuneReturn, setCounterrJeuneReturn] = useState<number>(
    CounterJeuneReturn || 0
  );

  const [counterEnfant, setcounterEnfant] = useState<number>(
    CounterEnfant || 0
  );
  const [counterEnfantReturn, setcounterEnfantReturn] = useState<number>(
    CounterEnfantReturn || 0
  );
  const [counterBébé, settCounterBébé] = useState<number>(CounterBébé || 0);
  const [counterBébéReturn, settCounterBébéReturn] = useState<number>(
    CounterBébéReturn || 0
  );

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [nbPassengers, setnbpassengers] = useState<number>(0);

  const history = useHistory();

  useEffect(() => {
    if (counterAdult + counterJeune + counterEnfant + counterBébé === 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
    setnbpassengers(counterAdult + counterJeune + counterEnfant + counterBébé);
  }, [counterAdult, counterJeune, counterEnfant, counterBébé]);

  const handleClickBack = () => {
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/FlightBooking" />;
  }

  const handleIncrementAdult = () => {
    setCounterAdulte((prevCounter) => {
      const newCounter = prevCounter + 1;
      setCounterAdult(newCounter);
      return newCounter;
    });
  };

  const handleDecrementAdult = () => {
    if (counterAdult > 0) {
      setCounterAdulte((prevCounter) => {
        const newCounter = prevCounter - 1;
        setCounterAdult(newCounter);
        return newCounter;
      });
    }
  };
  const handleIncrementAdultReturn = () => {
    setCounterAdulteReturn((prevCounter) => {
      const newCounter = prevCounter + 1;
      setCounterAdultReturn(newCounter);
      return newCounter;
    });
  };

  const handleDecrementAdultReturn = () => {
    if (counterAdultReturn > 0) {
      setCounterAdulteReturn((prevCounter) => {
        const newCounter = prevCounter - 1;
        setCounterAdultReturn(newCounter);
        return newCounter;
      });
    }
  };

  const handleIncrementJeune = () => {
    setCounterrJeune((prevCounter) => {
      const newCounter = prevCounter + 1;
      setCounterJeune(newCounter);
      return newCounter;
    });
  };

  const handleDecrementJeune = () => {
    if (counterJeune > 0) {
      setCounterrJeune((prevCounter) => {
        const newCounter = prevCounter - 1;
        setCounterJeune(newCounter);
        return newCounter;
      });
    }
  };
  const handleIncrementJeuneReturn = () => {
    setCounterrJeuneReturn((prevCounter) => {
      const newCounter = prevCounter + 1;
      setCounterJeuneReturn(newCounter);
      return newCounter;
    });
  };

  const handleDecrementJeuneReturn = () => {
    if (counterJeuneReturn > 0) {
      setCounterrJeuneReturn((prevCounter) => {
        const newCounter = prevCounter - 1;
        setCounterJeuneReturn(newCounter);
        return newCounter;
      });
    }
  };

  const handleIncrementEnfant = () => {
    setcounterEnfant((prevCounter) => {
      const newCounter = prevCounter + 1;
      setCounterEnfant(newCounter);
      return newCounter;
    });
  };

  const handleDecrementEnfant = () => {
    if (counterEnfant > 0) {
      setcounterEnfant((prevCounter) => {
        const newCounter = prevCounter - 1;
        setCounterEnfant(newCounter);
        return newCounter;
      });
    }
  };
  const handleIncrementEnfantReturn = () => {
    setcounterEnfantReturn((prevCounter) => {
      const newCounter = prevCounter + 1;
      setCounterEnfantReturn(newCounter);
      return newCounter;
    });
  };

  const handleDecrementEnfantReturn = () => {
    if (counterEnfantReturn > 0) {
      setcounterEnfantReturn((prevCounter) => {
        const newCounter = prevCounter - 1;
        setCounterEnfantReturn(newCounter);
        return newCounter;
      });
    }
  };

  const handleIncrementBébé = () => {
    settCounterBébé((prevCounter) => {
      const newCounter = prevCounter + 1;
      setCounterBébé(newCounter);
      return newCounter;
    });
  };

  const handleDecrementBébé = () => {
    if (counterBébé > 0) {
      settCounterBébé((prevCounter) => {
        const newCounter = prevCounter - 1;
        setCounterBébé(newCounter);
        return newCounter;
      });
    }
  };

  const handleIncrementBébéReturn = () => {
    settCounterBébéReturn((prevCounter) => {
      const newCounter = prevCounter + 1;
      setCounterBébéReturn(newCounter);
      return newCounter;
    });
  };

  const handleDecrementBébéReturn = () => {
    if (counterBébéReturn > 0) {
      settCounterBébéReturn((prevCounter) => {
        const newCounter = prevCounter - 1;
        setCounterBébéReturn(newCounter);
        return newCounter;
      });
    }
  };

  const handleClickNext = () => {
    localStorage.setItem("NumberPassengers", `${nbPassengers}`);
    history.push("/Flightbooking3");
  };

  const renderPersonalInfo = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ margin: "0.25rem 0", color: "red" }}>
          First Name: {Form1.firstName}
        </p>
        <p style={{ margin: "0.25rem 0", color: "red" }}>
          Last Name: {Form1.lastName}
        </p>
        <p style={{ margin: "0.25rem 0", color: "red" }}>
          Email: {Form1.email}
        </p>
        <p style={{ margin: "0.25rem 0", color: "red" }}>
          Phone Number: {Form1.phoneNumber}
        </p>
        <p style={{ margin: "0.25rem 0", color: "red" }}>
          Address 1: {Form1.address1}
        </p>
        <p style={{ margin: "0.25rem 0", color: "red" }}>
          Address 2: {Form1.address2}
        </p>
      </div>
    );
  };

  const renderFlightDetails = () => {
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ margin: "0.25rem 0", color: "red" }}>
            Class:{" "}
            {bookBusinessClass ? "Business" : bookEconomyClass ? "Economy" : ""}
          </p>
          <p style={{ margin: "0.25rem 0", color: "red" }}>Devise: {Devise}</p>
          <p style={{ margin: "0.25rem 0", color: "red" }}>
            Adult Number: {counterAdult}
          </p>
          <p style={{ margin: "0.25rem 0", color: "red" }}>
            Jeune Number: {counterJeune}
          </p>
          <p style={{ margin: "0.25rem 0", color: "red" }}>
            Enfant Number: {counterEnfant}
          </p>
          <p style={{ margin: "0.25rem 0", color: "red" }}>
            Babies Number: {counterBébé}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ margin: "0.25rem 0", color: "red" }}>
            Class:{" "}
            {bookBusinessClassReturn
              ? "Business"
              : bookEconomyClassReturn
              ? "Economy"
              : ""}
          </p>
          <p style={{ margin: "0.25rem 0", color: "red" }}>
            Devise: {DeviseReturn}
          </p>
          <p style={{ margin: "0.25rem 0", color: "red" }}>
            Adult Number: {counterAdultReturn}
          </p>
          <p style={{ margin: "0.25rem 0", color: "red" }}>
            Jeune Number: {counterJeuneReturn}
          </p>
          <p style={{ margin: "0.25rem 0", color: "red" }}>
            Enfant Number: {counterEnfantReturn}
          </p>
          <p style={{ margin: "0.25rem 0", color: "red" }}>
            Babies Number: {counterBébéReturn}
          </p>
        </div>
      </div>
    );
  };
  const handleDeviseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDevise(event.target.value);
  };
  const handleDeviseChangeReturn = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDeviseReturn(event.target.value);
  };
  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClass = event.target.value;
    if (selectedClass === "Business") {
      setBookBusinessClass(true);
      setBookEconomyClass(false);
    } else if (selectedClass === "Economy") {
      setBookBusinessClass(false);
      setBookEconomyClass(true);
    }
  };
  const handleClassChangeReturn = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedClass = event.target.value;
    if (selectedClass === "Business") {
      setBookBusinessClassReturn(true);
      setBookEconomyClassReturn(false);
    } else if (selectedClass === "Economy") {
      setBookBusinessClassReturn(false);
      setBookEconomyClassReturn(true);
    }
  };

  return (
    <div className="flight-booking2-container">
      <div
        className="drawer"
        style={{
          marginTop: "-38rem",
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
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
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
            <h1 className="titleFB" style={{ marginTop: "1rem" }}>
              Reservation
            </h1>{" "}
            <li>
              <a>Personal Info :{renderPersonalInfo()}</a>
            </li>
            <li>
              <a>Flight Details:{renderFlightDetails()}</a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="form-container2"
        style={{ marginRight: "20rem", width: "100rem" }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1 className="title2">Flight Booking Form</h1>
        </div>
        {showAlert && (
          <div
            className="alert"
            style={{ backgroundColor: "red", color: "white" }}
          >
            <p>Please select at least one passenger.</p>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2 style={{ fontWeight: "bold" }}>Outbound :</h2>
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
            <form>
              <div style={{ display: "flex", gap: "2rem" }}>
                <div className="form-group2" style={{ width: "16rem" }}>
                  <label className="label2" htmlFor="firstName">
                    Class:
                  </label>
                  <select
                    id="class-select"
                    onChange={handleClassChange}
                    style={{
                      width: "100%",
                      height: "2.5rem",
                      border: "1px solid #ccc",
                      borderRadius: "0.4rem",
                      cursor: "pointer",
                    }}
                    className="Class"
                  >
                    <option disabled selected>
                      {bookBusinessClass
                        ? "Business Class"
                        : bookEconomyClass
                        ? "Economy Class"
                        : "Select Class"}{" "}
                    </option>
                    <option
                      value="Business"
                      onSelect={() => {
                        setBookBusinessClass(!bookBusinessClass);
                      }}
                    >
                      Business Class
                    </option>
                    <option
                      value="Economy"
                      onSelect={() => {
                        setBookEconomyClass(!bookEconomyClass);
                      }}
                    >
                      Economy Class
                    </option>
                  </select>
                </div>

                <div className="form-group2" style={{ width: "16rem" }}>
                  <label className="label2" htmlFor="firstName">
                    Devise:
                  </label>
                  <select
                    id="devise-select"
                    value={Devise}
                    onChange={handleDeviseChange}
                    style={{
                      width: "100%",
                      height: "2.5rem",
                      border: "1px solid #ccc",
                      borderRadius: "0.4rem",
                      cursor: "pointer",
                    }}
                    className="Class"
                  >
                    <option disabled selected>
                      TND
                    </option>
                    <option value="TND">TND</option>
                    <option value="CAD">CAD</option>
                    <option value="CHF">CHF</option>
                    <option value="EUR">EUR</option>
                    <option value="GPD">GPD</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
            </form>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h2 className="label2">Number of Passengers:</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "3rem",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    className="form-group2"
                    style={{
                      width: "8rem",
                      height: "5rem",
                      border: "1px solid #ccc",
                      padding: "1rem",
                      backgroundColor: "white",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      {" "}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",

                          alignItems: "center",
                        }}
                      >
                        <h1>Adult</h1>
                        <h3>{counterAdult}</h3>
                      </div>
                      <div
                        className="counter-buttons"
                        style={{
                          display: "flex",
                          gap: "2rem",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          style={{
                            width: "1rem",
                            height: "1rem",
                            backgroundColor: "black",
                            borderRadius: "50%",
                            color: "white",
                            marginTop: "-0.6rem",
                          }}
                          onClick={handleIncrementAdult}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginBottom: "-0.2rem",
                            }}
                          >
                            +
                          </div>
                        </button>
                        <button
                          style={{
                            width: "1rem",
                            height: "1rem",
                            backgroundColor: "black",
                            borderRadius: "50%",
                            color: "white",
                            marginTop: "-0.6rem",
                          }}
                          onClick={handleDecrementAdult}
                        >
                          {" "}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginBottom: "-0.2rem",
                            }}
                          >
                            -
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="form-group2"
                    style={{
                      width: "8rem",
                      height: "5rem",
                      border: "1px solid #ccc",
                      padding: "1rem",
                      backgroundColor: "white",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      {" "}
                      <h1>Jeune</h1>
                      <h3>{counterJeune}</h3>
                    </div>

                    <div
                      className="counter-buttons"
                      style={{
                        display: "flex",
                        gap: "2rem",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        style={{
                          width: "1rem",
                          height: "1rem",
                          backgroundColor: "black",
                          borderRadius: "50%",
                          color: "white",
                          marginTop: "-0.6rem",
                        }}
                        onClick={handleIncrementJeune}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "-0.2rem",
                          }}
                        >
                          +
                        </div>
                      </button>
                      <button
                        style={{
                          width: "1rem",
                          height: "1rem",
                          backgroundColor: "black",
                          borderRadius: "50%",
                          color: "white",
                          marginTop: "-0.6rem",
                        }}
                        onClick={handleDecrementJeune}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "-0.2rem",
                          }}
                        >
                          -
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    className="form-group2"
                    style={{
                      width: "8rem",
                      height: "5rem",
                      border: "1px solid #ccc",
                      padding: "1rem",
                      backgroundColor: "white",
                    }}
                  >
                    {" "}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      {" "}
                      <h1>Enfant</h1>
                      <h3>{counterEnfant}</h3>
                    </div>
                    <div
                      className="counter-buttons"
                      style={{
                        display: "flex",
                        gap: "2rem",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        style={{
                          width: "1rem",
                          height: "1rem",
                          backgroundColor: "black",
                          borderRadius: "50%",
                          color: "white",
                          marginTop: "-0.6rem",
                        }}
                        onClick={handleIncrementEnfant}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "-0.2rem",
                          }}
                        >
                          +
                        </div>
                      </button>
                      <button
                        style={{
                          width: "1rem",
                          height: "1rem",
                          backgroundColor: "black",
                          borderRadius: "50%",
                          color: "white",
                          marginTop: "-0.6rem",
                        }}
                        onClick={handleDecrementEnfant}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "-0.2rem",
                          }}
                        >
                          -
                        </div>
                      </button>
                    </div>
                  </div>
                  <div
                    className="form-group2"
                    style={{
                      width: "8rem",
                      height: "5rem",
                      border: "1px solid #ccc",
                      padding: "1rem",
                      backgroundColor: "white",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <h1>Bébé</h1>
                      <h3>{counterBébé}</h3>
                    </div>

                    <div
                      className="counter-buttons"
                      style={{
                        display: "flex",
                        gap: "2rem",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        style={{
                          width: "1rem",
                          height: "1rem",
                          backgroundColor: "black",
                          borderRadius: "50%",
                          color: "white",
                          marginTop: "-0.6rem",
                        }}
                        onClick={handleIncrementBébé}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "-0.2rem",
                          }}
                        >
                          +
                        </div>
                      </button>
                      <button
                        style={{
                          width: "1rem",
                          height: "1rem",
                          backgroundColor: "black",
                          borderRadius: "50%",
                          color: "white",
                          marginTop: "-0.6rem",
                        }}
                        onClick={handleDecrementBébé}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          -
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/***********************************************         ******************************************************************************** */}
          <h2 style={{ fontWeight: "bold" }}>Return :</h2>
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
            <form>
              <div style={{ display: "flex", gap: "2rem" }}>
                <div className="form-group2" style={{ width: "16rem" }}>
                  <label className="label2" htmlFor="firstName">
                    Class:
                  </label>
                  <select
                    id="class-select"
                    onChange={handleClassChangeReturn}
                    style={{
                      width: "100%",
                      height: "2.5rem",
                      border: "1px solid #ccc",
                      borderRadius: "0.4rem",
                      cursor: "pointer",
                    }}
                    className="Class"
                  >
                    <option disabled selected>
                      {bookBusinessClassReturn
                        ? "Business Class"
                        : bookEconomyClassReturn
                        ? "Economy Class"
                        : "Select Class"}{" "}
                    </option>
                    <option
                      value="Business"
                      onSelect={() => {
                        setBookBusinessClassReturn(!bookBusinessClassReturn);
                      }}
                    >
                      Business Class
                    </option>
                    <option
                      value="Economy"
                      onSelect={() => {
                        setBookEconomyClassReturn(!bookEconomyClassReturn);
                      }}
                    >
                      Economy Class
                    </option>
                  </select>
                </div>

                <div className="form-group2" style={{ width: "16rem" }}>
                  <label className="label2" htmlFor="firstName">
                    Devise:
                  </label>
                  <select
                    id="devise-select"
                    value={DeviseReturn}
                    onChange={handleDeviseChangeReturn}
                    style={{
                      width: "100%",
                      height: "2.5rem",
                      border: "1px solid #ccc",
                      borderRadius: "0.4rem",
                      cursor: "pointer",
                    }}
                    className="Class"
                  >
                    <option disabled selected>
                      TND
                    </option>
                    <option value="TND">TND</option>
                    <option value="CAD">CAD</option>
                    <option value="CHF">CHF</option>
                    <option value="EUR">EUR</option>
                    <option value="GPD">GPD</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
            </form>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h2 className="label2">Number of Passengers:</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "3rem",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    className="form-group2"
                    style={{
                      width: "8rem",
                      height: "5rem",
                      border: "1px solid #ccc",
                      padding: "1rem",
                      backgroundColor: "white",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      {" "}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",

                          alignItems: "center",
                        }}
                      >
                        <h1>Adult</h1>
                        <h3>{counterAdultReturn}</h3>
                      </div>
                      <div
                        className="counter-buttons"
                        style={{
                          display: "flex",
                          gap: "2rem",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          style={{
                            width: "1rem",
                            height: "1rem",
                            backgroundColor: "black",
                            borderRadius: "50%",
                            color: "white",
                            marginTop: "-0.6rem",
                          }}
                          onClick={handleIncrementAdultReturn}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginBottom: "-0.2rem",
                            }}
                          >
                            +
                          </div>
                        </button>
                        <button
                          style={{
                            width: "1rem",
                            height: "1rem",
                            backgroundColor: "black",
                            borderRadius: "50%",
                            color: "white",
                            marginTop: "-0.6rem",
                          }}
                          onClick={handleDecrementAdultReturn}
                        >
                          {" "}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginBottom: "-0.2rem",
                            }}
                          >
                            -
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="form-group2"
                    style={{
                      width: "8rem",
                      height: "5rem",
                      border: "1px solid #ccc",
                      padding: "1rem",
                      backgroundColor: "white",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      {" "}
                      <h1>Jeune</h1>
                      <h3>{counterJeuneReturn}</h3>
                    </div>

                    <div
                      className="counter-buttons"
                      style={{
                        display: "flex",
                        gap: "2rem",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        style={{
                          width: "1rem",
                          height: "1rem",
                          backgroundColor: "black",
                          borderRadius: "50%",
                          color: "white",
                          marginTop: "-0.6rem",
                        }}
                        onClick={handleIncrementJeuneReturn}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "-0.2rem",
                          }}
                        >
                          +
                        </div>
                      </button>
                      <button
                        style={{
                          width: "1rem",
                          height: "1rem",
                          backgroundColor: "black",
                          borderRadius: "50%",
                          color: "white",
                          marginTop: "-0.6rem",
                        }}
                        onClick={handleDecrementJeuneReturn}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "-0.2rem",
                          }}
                        >
                          -
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    className="form-group2"
                    style={{
                      width: "8rem",
                      height: "5rem",
                      border: "1px solid #ccc",
                      padding: "1rem",
                      backgroundColor: "white",
                    }}
                  >
                    {" "}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      {" "}
                      <h1>Enfant</h1>
                      <h3>{counterEnfantReturn}</h3>
                    </div>
                    <div
                      className="counter-buttons"
                      style={{
                        display: "flex",
                        gap: "2rem",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        style={{
                          width: "1rem",
                          height: "1rem",
                          backgroundColor: "black",
                          borderRadius: "50%",
                          color: "white",
                          marginTop: "-0.6rem",
                        }}
                        onClick={handleIncrementEnfantReturn}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "-0.2rem",
                          }}
                        >
                          +
                        </div>
                      </button>
                      <button
                        style={{
                          width: "1rem",
                          height: "1rem",
                          backgroundColor: "black",
                          borderRadius: "50%",
                          color: "white",
                          marginTop: "-0.6rem",
                        }}
                        onClick={handleDecrementEnfantReturn}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "-0.2rem",
                          }}
                        >
                          -
                        </div>
                      </button>
                    </div>
                  </div>
                  <div
                    className="form-group2"
                    style={{
                      width: "8rem",
                      height: "5rem",
                      border: "1px solid #ccc",
                      padding: "1rem",
                      backgroundColor: "white",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <h1>Bébé</h1>
                      <h3>{counterBébéReturn}</h3>
                    </div>

                    <div
                      className="counter-buttons"
                      style={{
                        display: "flex",
                        gap: "2rem",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        style={{
                          width: "1rem",
                          height: "1rem",
                          backgroundColor: "black",
                          borderRadius: "50%",
                          color: "white",
                          marginTop: "-0.6rem",
                        }}
                        onClick={handleIncrementBébéReturn}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "-0.2rem",
                          }}
                        >
                          +
                        </div>
                      </button>
                      <button
                        style={{
                          width: "1rem",
                          height: "1rem",
                          backgroundColor: "black",
                          borderRadius: "50%",
                          color: "white",
                          marginTop: "-0.6rem",
                        }}
                        onClick={handleDecrementBébéReturn}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          -
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
          <button
            onClick={handleClickBack}
            className="buttonNext2"
            type="button"
          >
            Back
          </button>
          <button
            onClick={handleClickNext}
            className="buttonNext2"
            type="submit"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
