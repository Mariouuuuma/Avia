import React, { useState, ChangeEvent } from "react";
import "./Payment.css";
import { useHistory } from "react-router-dom";
import Calendar from "../../Calendar/Calendar";
import { Moment } from "moment";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address1: string;
  address2: string;
}

interface CreditCardFormData {
  visa: boolean;
  mastercard: boolean;
}

export default function Payment() {
  const [checkedmastercard, setCheckedmaster] = useState<boolean>(false);
  const [checkedvisa, setCheckedvisa] = useState<boolean>(false);
  const [clickcalendar, setClickcalendar] = useState<boolean>(false);
  const [dateexp, setDateexp] = useState<string>("");
  const [mastercard, setmastercard] = useState<boolean>(false);
  const [visa, setvisa] = useState<boolean>(false);
  const [clickcalendar2, setClickcalendar2] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address1: "",
    address2: "",
  });

  const history = useHistory();
  const handleDateSelect = (selectedDate: Moment) => {
    console.log(
      "Date départ sélectionnée :",
      selectedDate.format("YYYY-MM-DD")
    );
    setDateexp(selectedDate.format("YYYY-MM-DD"));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlevisa = () => {
    setCheckedvisa(!checkedvisa);
    setCheckedmaster(false);
    setvisa(true);
  };

  const handlemaster = () => {
    setCheckedmaster(!checkedmastercard);
    setCheckedvisa(false);
    setmastercard(true);
  };
  const handleClickback = () => {
    history.push("/Flightbooking3");
  };
  return (
    <div
      className="Payment-container"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div className="container">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
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

        <div className="form-containerPay" style={{ marginRight: "34rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h1 className="titlePay">Payment</h1>
          </div>

          <form>
            <div className="form-groupPay">
              <label
                className="labelPay"
                htmlFor="firstName"
                style={{ marginTop: "1rem" }}
              >
                Do you have a promotion code?
              </label>
              <input
                style={{ width: "60%", marginTop: "1rem" }}
                className="inputPay"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Example : 0123"
              />
            </div>
            <div
              className="form-groupPay"
              style={{
                width: "100%",
                height: "25rem",
                border: "1px solid #ccc",
                backgroundColor: "white",
                borderRadius: "0.5rem",
              }}
            >
              <div>
                <p style={{ marginTop: "0.5rem" }}>
                  Total to be paid is TND 400.000
                </p>
                <p>Please select a type of credit card</p>
                <div
                  style={{
                    display: "flex",
                    marginTop: "1.75rem",
                    gap: "1rem",
                    marginLeft: "1rem",
                  }}
                >
                  <label>
                    <input
                      type="checkbox"
                      name="visa"
                      onChange={handlevisa}
                      checked={checkedvisa}
                    />
                    <img
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "50%",
                      }}
                      src="https://logowik.com/content/uploads/images/219_visa.jpg"
                    />
                  </label>
                  <label>
                    <input
                      checked={checkedmastercard}
                      type="checkbox"
                      name="mastercard"
                      onChange={handlemaster}
                    />
                    <img
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "50%",
                      }}
                      src="https://www.investopedia.com/thmb/F8CKM3YkF1fmnRCU2g4knuK0eDY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MClogo-c823e495c5cf455c89ddfb0e17fc7978.jpg"
                    ></img>
                  </label>
                </div>
              </div>
            </div>
            {mastercard && (
              <div
                className="card card-side bg-base-100 shadow-xl"
                style={{
                  position: "absolute",
                  width: "40rem",
                  zIndex: "444",
                  marginTop: "-28rem",
                  marginBottom: "1.5rem",
                  height: "26.5rem",
                }}
              >
                <figure>
                  <img
                    style={{ width: "17.5rem", height: "10rem" }}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <div>
                      {" "}
                      Credit Card number :{" "}
                      <input
                        style={{
                          width: "40%",
                          padding: "0.5rem",
                          border: "1px solid #ccc",
                          borderRadius: "0.4rem",
                        }}
                      ></input>{" "}
                    </div>
                    <div>
                      {" "}
                      Security Code :{" "}
                      <input
                        type="password"
                        style={{
                          width: "52%",
                          padding: "0.5rem",
                          border: "1px solid #ccc",
                          borderRadius: "0.4rem",
                        }}
                      ></input>
                    </div>
                    <div>
                      {" "}
                      Expiry * :{"     "}
                      <button
                        style={{
                          marginTop: "0.5rem",
                          backgroundColor: "#e73838",
                          color: "#fff",
                          width: "5rem",
                          height: "3rem",
                          padding: "0.5rem",
                          border: "1px solid #ccc",
                          borderRadius: "0.4rem",
                        }}
                        onClick={() => {
                          setClickcalendar(!clickcalendar);
                        }}
                      >
                        Expiry
                      </button>
                    </div>

                    <div>
                      Name On Card :{" "}
                      <input
                        style={{
                          width: "51%",
                          padding: "0.5rem",
                          border: "1px solid #ccc",
                          borderRadius: "0.4rem",
                        }}
                      ></input>
                    </div>
                    <div>
                      Card Holder e-mail :{" "}
                      <input
                        style={{
                          width: "70%",
                          padding: "0.5rem",
                          marginLeft: "3.5rem",
                          border: "1px solid #ccc",
                          borderRadius: "0.4rem",
                        }}
                      ></input>{" "}
                    </div>
                    <div>
                      Card Holder Phone-number:{" "}
                      <input
                        style={{
                          width: "40%",
                          padding: "0.5rem",
                          border: "1px solid #ccc",

                          borderRadius: "0.4rem",
                        }}
                      ></input>
                    </div>
                  </div>

                  <div className="card-actions justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setmastercard(false);
                      }}
                      className="btn btn-primary"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        setClickcalendar(false);
                        setmastercard(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {clickcalendar && (
              <div
                style={{
                  marginTop: "-30rem",
                  position: "relative",
                  zIndex: "999",
                  marginRight: "80%",
                  marginLeft: "-30%",
                }}
              >
                {" "}
                <Calendar
                  onDateSelect={handleDateSelect}
                  calendarName="Expiry"
                ></Calendar>
              </div>
            )}
            {visa && (
              <div
                className="card card-side bg-base-100 shadow-xl"
                style={{
                  position: "absolute",
                  width: "40rem",
                  zIndex: "444",
                  marginTop: "-28rem",
                  marginBottom: "1.5rem",
                  height: "26.5rem",
                }}
              >
                <figure>
                  <img
                    style={{ width: "17.5rem", height: "10rem" }}
                    src="https://lh6.googleusercontent.com/proxy/T8fjld7xQK5zAxSh8SfzGOT7Ufidp8BZcHByP9_Bl3r-opUtdBHT_Ws7XoOkKkb7mloIy-U3GQEr_dhFYg8Sjosli8qBKIY6HA"
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <div>
                      {" "}
                      Credit Card number :{" "}
                      <input
                        style={{
                          width: "40%",
                          padding: "0.5rem",
                          border: "1px solid #ccc",
                          borderRadius: "0.4rem",
                        }}
                      ></input>{" "}
                    </div>
                    <div>
                      {" "}
                      Security Code :{" "}
                      <input
                        type="password"
                        style={{
                          width: "52%",
                          padding: "0.5rem",
                          border: "1px solid #ccc",
                          borderRadius: "0.4rem",
                        }}
                      ></input>
                    </div>
                    <div>
                      {" "}
                      Expiry * :{"     "}
                      <button
                        style={{
                          marginTop: "0.5rem",
                          backgroundColor: "#e73838",
                          color: "#fff",
                          width: "5rem",
                          height: "3rem",
                          padding: "0.5rem",
                          border: "1px solid #ccc",
                          borderRadius: "0.4rem",
                        }}
                        onClick={() => {
                          setClickcalendar2(!clickcalendar2);
                          setClickcalendar(false);
                        }}
                      >
                        Expiry
                      </button>
                    </div>

                    <div>
                      Name On Card :{" "}
                      <input
                        style={{
                          width: "51%",
                          padding: "0.5rem",
                          border: "1px solid #ccc",
                          borderRadius: "0.4rem",
                        }}
                      ></input>
                    </div>
                    <div>
                      Card Holder e-mail :{" "}
                      <input
                        style={{
                          width: "70%",
                          padding: "0.5rem",
                          marginLeft: "3.5rem",
                          border: "1px solid #ccc",
                          borderRadius: "0.4rem",
                        }}
                      ></input>{" "}
                    </div>
                    <div>
                      Card Holder Phone-number:{" "}
                      <input
                        style={{
                          width: "40%",
                          padding: "0.5rem",
                          border: "1px solid #ccc",

                          borderRadius: "0.4rem",
                        }}
                      ></input>
                    </div>
                  </div>

                  <div className="card-actions justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setvisa(false);
                      }}
                      className="btn btn-primary"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        setClickcalendar2(false);
                        setvisa(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {clickcalendar2 && (
              <div
                style={{
                  marginTop: "-30rem",
                  position: "relative",
                  zIndex: "999",
                  marginRight: "80%",
                  marginLeft: "-30%",
                }}
              >
                {" "}
                <Calendar
                  onDateSelect={handleDateSelect}
                  calendarName="Expiry"
                ></Calendar>
              </div>
            )}
            <div
              style={{
                display: "flex",
                gap: "2rem",
                justifyContent: "center",
              }}
            >
              <button
                onClick={handleClickback}
                className="buttonPay"
                type="button"
              >
                Back
              </button>
              <button className="buttonPay" type="button">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
