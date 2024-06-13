import React, { useState, useEffect, useContext } from "react";
import "./Flightbooking2.css";
import { Redirect, useHistory } from "react-router-dom";
import { ReservationContext } from "../../../../Contexts/ReservationContext";

export default function FlightBooking2() {
  const {
    Form1,
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
  const [counterJeune, setCounterrJeune] = useState<number>(CounterJeune || 0);
  const [counterEnfant, setcounterEnfant] = useState<number>(
    CounterEnfant || 0
  );
  const [counterBébé, settCounterBébé] = useState<number>(CounterBébé || 0);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    if (counterAdult + counterJeune + counterEnfant + counterBébé === 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
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

  const handleClickNext = () => {
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
    );
  };
  const handleDeviseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDevise(event.target.value);
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
      <div className="form-container2" style={{ marginRight: "35rem" }}>
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
        <form>
          <div className="form-group2">
            <label className="label2" htmlFor="firstName">
              Class:
            </label>
            <select
              id="class-select"
              onChange={handleClassChange}
              style={{
                width: "80%",
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
          <div className="form-group2">
            <label className="label2" htmlFor="firstName">
              Devise:
            </label>
            <select
              id="devise-select"
              value={Devise}
              onChange={handleDeviseChange}
              style={{
                width: "80%",
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
        </form>
        <div style={{ display: "flex", justifyContent: "center", gap: "3rem" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              className="form-group2"
              style={{
                width: "10rem",
                height: "7rem",
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
                      width: "1.5rem",
                      height: "1.5rem",
                      backgroundColor: "black",
                      borderRadius: "50%",
                      color: "white",
                      marginTop: "0.5rem",
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
                      width: "1.5rem",
                      height: "1.5rem",
                      backgroundColor: "black",
                      borderRadius: "50%",
                      color: "white",
                      marginTop: "0.5rem",
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
                width: "10rem",
                height: "7rem",
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
                    width: "1.5rem",
                    height: "1.5rem",
                    backgroundColor: "black",
                    borderRadius: "50%",
                    color: "white",
                    marginTop: "0.5rem",
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
                    width: "1.5rem",
                    height: "1.5rem",
                    backgroundColor: "black",
                    borderRadius: "50%",
                    color: "white",
                    marginTop: "0.5rem",
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
                width: "10rem",
                height: "7rem",
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
                    width: "1.5rem",
                    height: "1.5rem",
                    backgroundColor: "black",
                    borderRadius: "50%",
                    color: "white",
                    marginTop: "0.5rem",
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
                    width: "1.5rem",
                    height: "1.5rem",
                    backgroundColor: "black",
                    borderRadius: "50%",
                    color: "white",
                    marginTop: "0.5rem",
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
                width: "10rem",
                height: "7rem",
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
                    width: "1.5rem",
                    height: "1.5rem",
                    backgroundColor: "black",
                    borderRadius: "50%",
                    color: "white",
                    marginTop: "0.5rem",
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
                    width: "1.5rem",
                    height: "1.5rem",
                    backgroundColor: "black",
                    borderRadius: "50%",
                    color: "white",
                    marginTop: "0.5rem",
                  }}
                  onClick={handleDecrementBébé}
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
