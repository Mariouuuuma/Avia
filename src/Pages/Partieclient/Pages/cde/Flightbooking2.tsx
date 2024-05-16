import React, { useState, useEffect } from "react";
import "./Flightbooking2.css";
import { Redirect, useHistory } from "react-router-dom";

export default function FlightBooking2() {
  const [counterAdult, setCounterAdult] = useState<number>(1);
  const [counterJeune, setCounterJeune] = useState<number>(0);
  const [counterEnfant, setCounterEnfant] = useState<number>(0);
  const [counterBébé, setCounterBébé] = useState<number>(0);
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
    setCounterAdult((prevCounter) => prevCounter + 1);
  };

  const handleDecrementAdult = () => {
    if (counterAdult > 0) setCounterAdult(counterAdult - 1);
  };

  const handleIncrementJeune = () => {
    setCounterJeune((prevCounter) => prevCounter + 1);
  };

  const handleDecrementJeune = () => {
    if (counterJeune > 0) setCounterJeune(counterJeune - 1);
  };

  const handleIncrementEnfant = () => {
    setCounterEnfant((prevCounter) => prevCounter + 1);
  };

  const handleDecrementEnfant = () => {
    if (counterEnfant > 0) setCounterEnfant(counterEnfant - 1);
  };

  const handleIncrementBébé = () => {
    setCounterBébé((prevCounter) => prevCounter + 1);
  };

  const handleDecrementBébé = () => {
    if (counterBébé > 0) setCounterBébé(counterBébé - 1);
  };
  const handleClickNext = () => {
    history.push("/Flightbooking3");
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
                Economy Class
              </option>
              <option>Business Class</option>
              <option>Economy Class</option>
            </select>
          </div>
          <div className="form-group2">
            <label className="label2" htmlFor="firstName">
              Devise:
            </label>
            <select
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
              <option>CAD</option>
              <option>CHF</option>
              <option>EUR</option>
              <option>GPD</option>
              <option>TND</option>
              <option>USD</option>
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
