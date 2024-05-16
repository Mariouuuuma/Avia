import React from "react";
import "./Flightbooking3.css";
import { useHistory } from "react-router-dom";

export default function Flightbooking3() {
  const history = useHistory();
  const handleBack = () => {
    history.push("/Flightbooking2");
  };

  const handlePayment = () => {
    history.push("/Payment");
  };
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
          onClick={handlePayment}
          className="btn btn-primary"
        >
          Payment
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
                Réserver dans notre Lounge
              </h1>
              <button style={{ width: "60%" }} className="btn btn-primary">
                Réservez votre accés lounge
              </button>
            </div>
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
                Sélectionnez votre siège
              </h1>
              <button style={{ width: "60%" }} className="btn btn-primary">
                Choisissez votre siège
              </button>
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
              <button style={{ width: "60%" }} className="btn btn-primary">
                Ajoutez des bagages
              </button>
            </div>
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
              <button style={{ width: "60%" }} className="btn btn-primary">
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
              <button style={{ width: "60%" }} className="btn btn-primary">
                Choisissez votre repas
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
              <button style={{ width: "60%" }} className="btn btn-primary">
                Réservez votre assistance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
