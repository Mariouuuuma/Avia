import React, {
  ChangeEvent,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import NavBar from "../../../Components/NavBar/NavBar";
import InputContainer from "../../../Components/InputContainer";
import LeftMessage from "../../../Components/LeftMessage/LeftMessage";
import RightChatBubble from "../../../Components/RightChatBubble/RightChatBubble";
import { MessengingContext } from "../../../Contexts/MessengingContext";
import { SideBarContext } from "../../../Contexts/SideBarContext"; // Assuming SenderType is defined in SideBarContext
import supabase from "../../../Utils/api";
import image from "../../../Assets/Images/logoAvia.png";
import { createClient } from "@supabase/supabase-js";
import NavBarCli from "../NavBarCli/NavBarCli";
import "./index.css";
import Calendar from "../Calendar/Calendar";
import { Moment } from "moment/moment";
import { TimeLike } from "fs";
import Reservation from "../Pages/passenger/Passenger";
import { Link } from "react-router-dom";

interface ChatMessage {
  message: string;
  receiverFN: string;
  receiverLN: string;
}

interface ChatRoomProps {
  children?: ReactNode;
  imageReceiver?: string;
}

interface FlightData {
  id: number;
  created_at: EpochTimeStamp;
  CityDep: string;
  CityArr: string;
  SchedateDep: Date;
  SchedateArr: Date;
  TimeDepStart: string;
  TimeDepEnd: string;
  TimeArrStart: TimeLike;
  TimeArrEnd: TimeLike;
  Type: string;
}
const ChatRoomCli: React.FC<ChatRoomProps> = ({ children, imageReceiver }) => {
  const { messagesent } = useContext(MessengingContext);
  const { sender, receiver, inboxClicked } = useContext(SideBarContext);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [listofflights, setListofflights] = useState(false);
  const [departureCity, setDepartureCity] = useState(""); // État pour stocker la ville de départ sélectionnée
  const [arrivalCity, setArrivalCity] = useState("");
  const [insertedData, setInsertedData] = useState(false);
  const [dateDep, setDateDep] = useState<Moment | null>(null);
  const [dateArr, setDateArr] = useState<Moment | null>(null);
  const [type, setType] = useState<string>("");
  const [type2Flight, setType2flight] = useState(false);
  const [type1Flight, setType1flight] = useState(false);
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [displayForm, setDisplayForm] = useState(false);
  const messageEl = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([]);

  const handleDateSelectDep = (selectedDate: Moment) => {
    console.log(
      "Date départ sélectionnée :",
      selectedDate.format("YYYY-MM-DD")
    );
    setDateDep(selectedDate);
  };
  const handleDateSelectArr = (selectedDate: Moment) => {
    console.log(
      "Date Retour sélectionnée :",
      selectedDate.format("YYYY-MM-DD")
    );
    setDateArr(selectedDate);
  };
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("UserChats")
      .select("message, OwnerFirstName, OwnerLastName");

    if (data) {
      const formattedMessages: ChatMessage[] = data.map((msg: any) => ({
        message: msg.message,
        receiverFN: msg.OwnerFirstName,
        receiverLN: msg.OwnerLastName,
      }));
      setChatMessages(formattedMessages);
    }
  };

  useEffect(() => {
    const realtimeSubscription = supabase
      .channel("UserChats")
      .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
        console.log("Change received!", payload);
      })
      .subscribe();

    return () => {
      realtimeSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, [messagesent]);

  const handleDepartureCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDepartureCity(event.target.value);
  };

  const handleArrivalCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setArrivalCity(event.target.value);
  };
  const handleSaveCitiesToDatabase = async () => {
    try {
      const { data, error } = await supabase.from("Information").insert([
        {
          CityDep: departureCity,
          CityArr: arrivalCity,
        },
      ]);

      if (error) {
        console.error("Erreur lors de l'insertion des villes :", error.message);
      } else {
        console.log("Villes insérées avec succès :", data);
        setInsertedData(true);
      }
    } catch (error) {
      console.error("Erreur lors de l'insertion des villes :");
    }
  };
  useEffect(() => {
    if (departureCity && arrivalCity && !insertedData) {
      handleSaveCitiesToDatabase();
    }
  }, [departureCity, arrivalCity, insertedData]);
  useEffect(() => {
    let flightData: FlightData[] = [];

    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("ScheduleFlights")
          .select("*")
          .eq("CityDep", departureCity)
          .eq("CityArr", arrivalCity)
          .eq("Type", type);

        if (error) {
          console.error(
            "Erreur lors de la récupération des vols:",
            error.message
          );
        } else {
          console.log("Données récupérées avec succès:", data);
          flightData = data;
          setFlights(flightData);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des vols:", error);
      }
    };

    fetchData();
  }, [departureCity, arrivalCity, type]);
  const DisplayForm = () => {
    setDisplayForm(!displayForm);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "auto",
        borderRadius: "10px",
      }}
    >
      <NavBarCli status="Etudiant" Image={image} />
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            flexGrow: 1,

            backgroundColor: "#F6F7FB",
          }}
          className="fadeIn"
        >
          <div style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>
            <LeftMessage
              message="Bonjour et bienvenue sur le service de chat AviaHelper ! Je suis ici pour vous aider à planifier votre voyage et répondre à toutes vos questions sur nos vols, services et destinations."
              ImageUrl={image}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                gap: "3rem",
                marginTop: "1rem",
                justifyContent: "center",
              }}
            >
              <button className="btn btn-outline btn-error">Réclamation</button>
              <button
                onClick={() => setShowAdditionalButtons(!showAdditionalButtons)}
                className="btn btn-outline btn-error"
              >
                Réservation de vols
              </button>
            </div>
            {showAdditionalButtons && (
              <div
                className="showAdditionalButtons"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1.5rem",
                    marginTop: "1rem",
                  }}
                >
                  <button className="btn btn-outline btn-error">
                    Je veux faire une réservation
                  </button>
                  <button className="btn btn-outline btn-error">
                    Je veux annuler une réservation
                  </button>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1.5rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <button className="btn btn-outline btn-error">
                    Je veux consulter ma réservation
                  </button>
                  <button
                    onClick={() => setListofflights(!listofflights)}
                    className="btn btn-outline btn-error"
                  >
                    Puis-je voir les vols disponibles?
                  </button>
                </div>
              </div>
            )}
            {listofflights && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>
                  <LeftMessage
                    message="Entendu, je vais vous aider à consulter les vols disponibles. Pour commencer, pourriez-vous me donner vos critères de voyage tels que la ville de départ et destination?"
                    ImageUrl={image}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "2rem",
                    justifyContent: "center",
                  }}
                >
                  <select
                    onChange={handleDepartureCityChange}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option disabled selected>
                      Ville de départ
                    </option>
                    <option>Tunis</option>
                    <option>Nice</option>
                    <option>Rome</option>
                  </select>
                  <select
                    onChange={handleArrivalCityChange}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option disabled selected>
                      Ville d'arrivée
                    </option>
                    <option>Tunis</option>
                    <option>Rome</option>
                    <option>Nice</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          {insertedData && (
            <div
              style={{
                display: "flex",
                gap: "3rem",
                marginTop: "1rem",
                justifyContent: "center",
              }}
            >
              <button
                className="btn btn-outline btn-error"
                onClick={() => {
                  setType2flight(!type2Flight);
                  setType("Aller-Retour");
                }}
              >
                Aller-Retour
              </button>
              <button
                className="btn btn-outline btn-error"
                onClick={() => {
                  setType1flight(!type1Flight);
                  setType("Aller-simple");
                }}
              >
                Aller simple
              </button>
            </div>
          )}
          {type2Flight && (
            <div>
              <div style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>
                <LeftMessage
                  message="Pour quelle date souhaitez-vous consulter les vols disponibles ?"
                  ImageUrl={image}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <div>
                  <Calendar onDateSelect={handleDateSelectDep} />
                </div>
                <div>
                  <Calendar onDateSelect={handleDateSelectArr} />
                </div>
              </div>
            </div>
          )}
          {dateDep && dateArr && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>
                <LeftMessage
                  message={`ci-joint les vols Aller-Retour disponibles de ${departureCity} à ${arrivalCity}`}
                  ImageUrl={image}
                />
              </div>
              <div />
              <div style={{ display: "flex", gap: "1rem" }}>
                <div
                  className="card card-compact w-96 bg-base-100 shadow-xl"
                  style={{ marginBottom: "1rem" }}
                >
                  <figure>
                    <img
                      src="https://i0.wp.com/lapresse.tn/wp-content/uploads/2019/03/tunisair.jpg?resize=740%2C421&ssl=1"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem",
                      }}
                    >
                      <h2
                        className="card-title"
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          marginLeft: "5rem",
                        }}
                      >
                        {flights[1]?.id} - ({flights[1]?.TimeDepStart}-
                        {flights[1]?.TimeDepEnd})
                      </h2>
                      <p style={{ marginTop: "0.2rem" }}>
                        {" "}
                        {flights[1].CityDep} -{flights[1].CityArr}{" "}
                      </p>
                    </div>

                    <div className="card-actions justify-end">
                      <button className="btn btn-primary" onClick={DisplayForm}>
                        Réserver maintenant
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="card card-compact w-96 bg-base-100 shadow-xl"
                  style={{ marginBottom: "1rem" }}
                >
                  <figure>
                    <img
                      src="https://i0.wp.com/lapresse.tn/wp-content/uploads/2019/03/tunisair.jpg?resize=740%2C421&ssl=1"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem",
                      }}
                    >
                      <h2
                        className="card-title"
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          marginLeft: "5rem",
                        }}
                      >
                        {flights[0]?.id} - ({flights[0]?.TimeDepStart}-
                        {flights[0]?.TimeDepEnd})
                      </h2>
                      <p style={{ marginTop: "0.2rem" }}>
                        {" "}
                        {flights[0].CityDep} -{flights[0].CityArr}{" "}
                      </p>
                    </div>

                    <div className="card-actions justify-end">
                      <Link to="/Passenger">
                        <button className="btn btn-primary">
                          Réserver maintenant
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {type1Flight && !type2Flight && (
            <div>
              <div style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>
                <LeftMessage
                  message="Pour quelle date souhaitez-vous consulter les vols disponibles ?"
                  ImageUrl={image}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <div>
                  <Calendar onDateSelect={handleDateSelectDep} />
                </div>
              </div>
            </div>
          )}

          {chatMessages.map((message, index) =>
            message.receiverFN === receiver.firstName ? (
              <LeftMessage
                key={index}
                message={message.message}
                ImageUrl="https://example.com/avatar.jpg"
              />
            ) : message.receiverFN === sender.firstName ? (
              <RightChatBubble
                key={index}
                message={message.message}
                ImageUrl="https://example.com/avatar.jpg"
              />
            ) : null
          )}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "10px",
          marginBottom: "3rem",
        }}
      >
        <InputContainer />
      </div>
    </div>
  );
};
export default ChatRoomCli;
