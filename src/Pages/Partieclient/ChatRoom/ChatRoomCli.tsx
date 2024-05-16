import React, {
  ChangeEvent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import InputContainerCli from "../../../Pages/Partieclient/InputContainerCli/InputContainerCli";
import LeftMessage from "../../../Components/LeftMessage/LeftMessage";
import RightChatBubble from "../../../Components/RightChatBubble/RightChatBubble";
import { MessengingContext } from "../../../Contexts/MessengingContext";
import { SideBarContext } from "../../../Contexts/SideBarContext";
import supabase from "../../../Utils/api";
import image from "../../../Assets/Images/logoAvia.png";
import NavBarCli from "../NavBarCli/NavBarCli";
import "./index.css";
import Calendar from "../Calendar/Calendar";
import { Moment } from "moment/moment";
import { TimeLike } from "fs";
import { Link } from "react-router-dom";
import { monDictionnaire } from "../../../Data/Dictionnaire";
import { ClientContext } from "../../../Contexts/ClientContext";

interface ChatMessage {
  body: string;
  id: number;
  ConversationName: string;
  sender_id: number;
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
  SchedateDep: string;
  SchedateArr: Date;
  TimeDepStart: string;
  TimeDepEnd: string;
  TimeArrStart: TimeLike;
  TimeArrEnd: TimeLike;
  Type: string;
}
const ChatRoomCli: React.FC<ChatRoomProps> = ({ children, imageReceiver }) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [listofflights, setListofflights] = useState(false);
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [insertedData, setInsertedData] = useState(false);
  const [dateDep, setDateDep] = useState<string | null>(null);
  const [dateArr, setDateArr] = useState<string | null>(null);
  const [type, setType] = useState<string>("");
  const [type2Flight, setType2flight] = useState(false);
  const [type1Flight, setType1flight] = useState(false);
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [clickedOption, setClickedOption] = useState<string>("");
  const [annulervol, setAnnulerVol] = useState<boolean>(false);
  const [réclam, setRéclam] = useState<boolean>(false);
  const [bord, clickBord] = useState<boolean>(false);
  const [hospitalié, clickHospitalié] = useState<boolean>(false);
  const { clickedButtons, setClickedButtons } = useContext(MessengingContext);
  const {
    convName,
    guestId,
    msgGuest,
    setmessageGuest,
    messageReclm,
    setMessageReclm,
  } = useContext(MessengingContext);
  let TabReclamButtons: string[] = [];

  useEffect(() => {
    const fetchChatMessages = async () => {
      const { data, error } = await supabase.from("Messages").select("*");

      if (data) {
        const formattedMessages: ChatMessage[] = data.map((msg: any) => ({
          body: msg.body,
          id: msg.id,
          ConversationName: msg.ConversationName,
          sender_id: msg.Sender_id,
        }));
        setChatMessages(formattedMessages);
        console.log();
      }
    };

    fetchChatMessages();

    const realtimeSubscription = supabase
      .channel("Messages")
      .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
        console.log("Change received!", payload);
      })
      .subscribe();

    return () => {
      realtimeSubscription.unsubscribe();
    };
  }, [chatMessages]);

  const { vol, setVol } = useContext(ClientContext);

  const handleDateSelectDep = (selectedDate: Moment) => {
    console.log(
      "Date départ sélectionnée :",
      selectedDate.format("YYYY-MM-DD")
    );
    setDateDep(selectedDate.format("YYYY-MM-DD"));
  };
  useEffect(() => {
    console.log("date dep est:", dateDep);
  }, [dateDep]);

  const handleDateSelectArr = (selectedDate: Moment) => {
    console.log(
      "Date Retour sélectionnée :",
      selectedDate.format("YYYY-MM-DD")
    );
    setDateArr(selectedDate.format("YYYY-MM-DD"));
  };

  useEffect(() => {
    console.log("date arr est:", dateArr);
  }, [dateArr]);

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
  let flightData: FlightData[] = [];

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("ScheduleFlights")
        .select("*")
        .eq("CityDep", departureCity)
        .eq("CityArr", arrivalCity)
        .eq("Type", type)
        .eq("SchedateDep", dateDep)
        .eq("ShedateArr", dateArr);

      if (error) {
        console.error(
          "Erreur lors de la récupération des vols:",
          error.message
        );
      } else {
        console.log("Données récupérées avec succès:", data);
        flightData = data;
        setFlights(flightData);
        console.log(flights);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des vols:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [departureCity, arrivalCity, type, dateArr, dateDep]);

  useEffect(() => {
    if (departureCity && arrivalCity) {
      setClickedOption("Consultation vols");
    }
  }, [departureCity, arrivalCity]);

  const handleConsultClick = (flight: any) => {
    setVol(flight);
    localStorage.setItem("selectedFlight", JSON.stringify(flight));

    window.location.href = "/InfoVol";
  };
  useEffect(() => {
    if (TabReclamButtons.length >= 3) {
      setClickedButtons(true);
      setMessageReclm(
        `Donc je vois que vous souhaitez faire une ${TabReclamButtons[0]} - ${TabReclamButtons[1]} de type ${TabReclamButtons[2]}.`
      );
    }
  }, [TabReclamButtons]);

  const handleButtonClick = (index: number, value: string) => {
    TabReclamButtons[index] = value;
    setMessageReclm(
      `Donc je vois que vous souhaitez faire une ${TabReclamButtons[0]} - ${TabReclamButtons[1]} de type ${TabReclamButtons[2]}.`
    );
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
              message={monDictionnaire["bienvenue"]}
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                {" "}
                <button
                  onClick={() => {
                    setRéclam(!réclam);
                    handleButtonClick(0, "Réclamation");
                  }}
                  className="btn btn-outline btn-error"
                >
                  Réclamation
                </button>
                {réclam && (
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
                      {" "}
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {" "}
                        <button
                          onClick={() => {
                            clickBord(!bord);
                            handleButtonClick(1, "A bord");
                          }}
                          className="btn btn-outline btn-error"
                        >
                          A bord
                        </button>
                        {bord && (
                          <div
                            style={{
                              marginTop: "2rem",
                              marginBottom: "0.5rem",
                              display: "flex",
                              gap: "1rem",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              {" "}
                              <button
                                onClick={() => {
                                  clickHospitalié(!hospitalié);
                                  handleButtonClick(2, "Hospitalité");
                                }}
                                className="btn btn-outline btn-error"
                              >
                                Hospitalité
                              </button>
                              {hospitalié && (
                                <div
                                  style={{
                                    marginTop: "2rem",
                                    marginBottom: "0.5rem",
                                  }}
                                >
                                  <LeftMessage
                                    message={
                                      monDictionnaire["Réclamation-bord"]
                                    }
                                    ImageUrl={image}
                                  />
                                </div>
                              )}
                            </div>
                            {/*{msgGuest && (
                              <LeftMessage
                                message={monDictionnaire["Réclamation-bord"]}
                                ImageUrl={image}
                                onShow={() => {
                                  setmessageGuest(false);
                                }}
                              />
                            )}*/}
                            <button
                              onClick={() => {
                                TabReclamButtons[2] = "Bien-être";
                              }}
                              className="btn btn-outline btn-error"
                            >
                              Bien-être
                            </button>
                            <button className="btn btn-outline btn-error">
                              Restauration
                            </button>
                            <button className="btn btn-outline btn-error">
                              Distraction
                            </button>
                            <button className="btn btn-outline btn-error">
                              Achat
                            </button>
                          </div>
                        )}
                      </div>
                      <button className="btn btn-outline btn-error">Sol</button>
                      <button className="btn btn-outline btn-error">
                        Baggage
                      </button>
                      <button className="btn btn-outline btn-error">
                        Autre
                      </button>
                    </div>
                  </div>
                )}
              </div>

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
                  {" "}
                  <Link to="/Reservation">
                    {" "}
                    <button className="btn btn-outline btn-error">
                      Je veux faire une réservation
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      setAnnulerVol(!annulervol);
                    }}
                    className="btn btn-outline btn-error"
                  >
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
                    onClick={() => {
                      setListofflights(!listofflights);
                      setClickedOption(" Consultation vols");
                      console.log(clickedOption);
                    }}
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
                    message={monDictionnaire["Consultation-Vols"]}
                    ImageUrl={image}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "2rem",
                    justifyContent: "center",
                    marginBottom: "2rem",
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
                    <option>Paris</option>
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
                    <option>Paris</option>
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
                marginBottom: "2rem",
              }}
            >
              <button
                className="btn btn-outline btn-error"
                onClick={() => {
                  setType2flight(!type2Flight);
                  setType("Aller-Retour");
                  setClickedOption("Aller-Retour");
                }}
              >
                Aller-Retour
              </button>
              <button
                className="btn btn-outline btn-error"
                onClick={() => {
                  setType1flight(!type1Flight);
                  setType("Aller-simple");
                  setClickedOption("Aller-simple");
                }}
              >
                Aller simple
              </button>
            </div>
          )}
          {(type1Flight || type2Flight) && (
            <div style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>
              <LeftMessage
                message={monDictionnaire["Sélection-Date"]}
                ImageUrl={image}
              />
            </div>
          )}
          {type2Flight && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <div>
                  <Calendar
                    onDateSelect={handleDateSelectDep}
                    calendarName="Departure"
                  />
                </div>
                <div>
                  <Calendar
                    onDateSelect={handleDateSelectArr}
                    calendarName="Arrival"
                  />
                </div>
              </div>
            </div>
          )}
          {type1Flight && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <div>
                  <Calendar
                    onDateSelect={handleDateSelectDep}
                    calendarName="Departure"
                  />
                </div>
              </div>
            </div>
          )}

          {flights.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div style={{ marginTop: "1.5rem" }}>
                {" "}
                <LeftMessage
                  message={monDictionnaire["Liste-Vols"]}
                  ImageUrl={image}
                />
              </div>
              <div
                style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
              ></div>
              <div />
              <div style={{ display: "flex", gap: "1rem" }}>
                {flights.map((flight, index) => (
                  <div
                    key={index}
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
                          {flight.id} - ({flight.TimeDepStart}-
                          {flight.TimeDepEnd})
                        </h2>
                        <p style={{ marginTop: "0.2rem" }}>
                          {flight.CityDep} - {flight.CityArr}
                        </p>
                      </div>

                      <div className="card-actions justify-end">
                        <a href="/InfoVol" className="btn btn-primary">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              handleConsultClick(flight);
                            }}
                          >
                            Consulter
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ((dateDep && dateArr && type2Flight) ||
              (dateDep && type1Flight)) && (
              <div style={{ marginBottom: "1rem", textAlign: "center" }}>
                <LeftMessage
                  message={monDictionnaire["vols-indisponibles"]}
                  ImageUrl={image}
                />
              </div>
            )
          )}
          {annulervol && (
            <div>
              {" "}
              <div style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>
                <LeftMessage
                  message={monDictionnaire["Annulation-Réservation"]}
                  ImageUrl={image}
                />
              </div>{" "}
            </div>
          )}
          <div>
            {chatMessages.map((message, index) => {
              if (
                message?.ConversationName === convName &&
                message?.sender_id === guestId
              ) {
                return (
                  <RightChatBubble
                    key={index}
                    message={message.body}
                    ImageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNVi9cbmMkUabLiF_3kfI94qngwPIM4gnrztEUv6Hopw&s"
                  />
                );
              } else if (
                message?.ConversationName === convName &&
                message?.sender_id !== guestId
              ) {
                return (
                  <LeftMessage
                    key={index}
                    message={message.body}
                    ImageUrl={image}
                  />
                );
              }
            })}
          </div>
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
        <InputContainerCli />
      </div>
    </div>
  );
};
export default ChatRoomCli;
