import React, { useState, ChangeEvent, FormEvent } from "react";
import "./FlightBooking.css";
import { useHistory } from "react-router-dom";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address1: string;
  address2: string;
}

export default function FlightBooking() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address1: "",
    address2: "",
  });

  const history = useHistory();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(formData);
  };

  const handleClickCancel = () => {
    history.push("/MessengingClient");
  };

  const handleClickNext = () => {
    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phoneNumber &&
      formData.address1
    ) {
      history.push("/Flightbooking2");
    } else {
      alert("Please fill out all the fields.");
    }
  };

  return (
    <div className="flight-booking-container ">
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
      <div className="form-container" style={{ marginRight: "35rem" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1 className="titleFB">Flight Booking Form</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="labelFB" htmlFor="firstName">
              First Name:
            </label>
            <input
              className="inputFlightBooking"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="labelFB" htmlFor="lastName">
              Last Name:
            </label>
            <input
              className="inputFlightBooking"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="labelFB" htmlFor="email">
              Email:
            </label>
            <input
              className="inputFlightBooking"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="labelFB" htmlFor="phoneNumber">
              Phone Number:
            </label>
            <input
              className="inputFlightBooking"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="labelFB" htmlFor="address1">
              Address 1:
            </label>
            <input
              className="inputFlightBooking"
              type="text"
              id="address1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="labelFB" htmlFor="address2">
              Address 2:
            </label>
            <input
              className="inputFlightBooking"
              type="text"
              id="address2"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
            }}
          >
            <button
              onClick={handleClickCancel}
              className="buttonNext"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={handleClickNext}
              className="buttonNext"
              type="button"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
