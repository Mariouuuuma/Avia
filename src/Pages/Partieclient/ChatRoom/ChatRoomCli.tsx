import React, {
  ChangeEvent,
  Fragment,
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
import axios from "axios";

interface ChatMessage {
  body: string;
  id: number;
  ConversationName: string;
  sender_id: number;
  ResponseId: number;
}

interface predefMessage {
  id: number;
  Context: string;
  OptionContext: string;
  message: string;
  QuestionId: number;
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
  SchedateArr: string;
  ScheTimeDep: string;
  ScheTimeArr: string;
  TimeArrStart: TimeLike;
  TimeArrEnd: TimeLike;
  Type: string;
}

const ChatRoomCli: React.FC<ChatRoomProps> = ({ children, imageReceiver }) => {
  const [baggage, ClickBaggage] = useState<boolean>(false);
  const [sol, ClickSol] = useState<boolean>(false);
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
  const [bien, clickBien] = useState<boolean>(false);
  const [Restau, clickRestau] = useState<boolean>(false);
  const [Distraction, clickDistraction] = useState<boolean>(false);
  const [Achat, clickAchat] = useState<boolean>(false);
  const [predefined] = useState<any>({});
  const [reclamButtons, setReclamButtons] = useState<any>({});
  const [predef, setPredef] = useState<any>();
  const [Enregist, setEnregist] = useState<boolean>(false);
  const [Fidelys, ClickFidelys] = useState<boolean>(false);
  const [Embarq, ClickEmbarq] = useState<boolean>(false);
  const [Salon, ClickSalon] = useState<boolean>(false);
  const { clickedButtons, setClickedButtons, messageBot, Context } =
    useContext(MessengingContext);
  const {
    convName,
    guestId,
    setMessageReclm,
    increment,
    setIncrement,
    setContext,
    setIdReclamation,
    IdReclamation,
  } = useContext(MessengingContext);
  const [numBillet, setNumBillet] = useState<string>("");
  const [predefs, setPredefs] = useState<predefMessage[]>([]);
  const [Retardé, clickRetardé] = useState<boolean>(false);
  const [Endommagé, clickEndommagé] = useState<boolean>(false);
  const [Perdu, clickPerdu] = useState<boolean>(false);
  const [Manquant, clickManquant] = useState<boolean>(false);
  const [Excés, clickExcés] = useState<boolean>(false);
  const [billet, ClickBillet] = useState<boolean>(false);
  const [Achatbillet, ClickAchatBillet] = useState<boolean>(false);
  const [Paiement, clickPaiement] = useState<boolean>(false);
  const [Autre, ClickAutre] = useState<boolean>(false);
  const [question, setQuestion] = useState<boolean>(false);
  const [numVol, setNumVol] = useState<string>("");
  const [commentaire, setComment] = useState<string>("");
  const [reserv, findReserv] = useState<any>();
  const [, setEmail] = useState("");
  const [, setMessage] = useState("");
  const [, sendCode] = useState<boolean>(false);
  const [IdReclam, setIdReclam] = useState("");
  const [réclamation, setRéclamation] = useState<boolean>(false);
  const [faireRéclam, setFaireRéclam] = useState<boolean>(false);
  const [annulerRéclam, setAnnulerRéclam] = useState<boolean>(false);
  const [consulterRéclam, setConsulterRéclam] = useState<boolean>(false);
  const [reclamData, setReclamData] = useState<any>();
  const [reclamInfo, setReclamInfo] = useState<boolean>(false);
  const [insertIdConsult, setInsertIdConsult] = useState<string>();
  const [insertId, setInsertId] = useState<string>();
  const [envoiMail, setEnvoiMail] = useState<boolean>(false);
  const [faireRéserv, setFaireRéserv] = useState<boolean>(false);

  let predefElement = predefined[increment];
  useEffect(() => {
    const RetrieveReclam = async () => {
      try {
        const { data, error } = await supabase
          .from("Reclamations")
          .select("state")
          .eq("IdReclam", insertIdConsult);

        if (data && data.length > 0) {
          setReclamData(data[0].state);
          setReclamInfo(true);
          console.log("Réclamation récupérée avec succès", data[0]);
        } else {
          console.log("Aucune réclamation trouvée pour l'ID spécifié");
        }

        if (error) {
          throw error;
        }

        console.log("Réclamation récupérée avec succès");
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la réclamation:",
          error
        );
      }
    };

    if (consulterRéclam) {
      RetrieveReclam();
    }
  }, [consulterRéclam, reclamInfo, insertIdConsult]);

  useEffect(() => {
    if (annulerRéclam === true) {
      const DeleteReclam = async () => {
        try {
          // Tentative de suppression d'une réclamation de la table "Reclamations"
          const { error } = await supabase
            .from("Reclamations")
            .delete()
            .eq("IdReclam", insertId);

          // Vérification s'il y a eu une erreur lors de la suppression
          if (error) {
            throw error; // Lancer une erreur si une erreur s'est produite
          }

          console.log("Réclamation supprimée avec succès"); // Message de succès
        } catch (error) {
          console.error(
            "Erreur lors de la suppression de la réclamation:",
            error
          );
        }
      };

      // Appel de la fonction pour supprimer la réclamation
      DeleteReclam();
    }
  }, [IdReclam, insertId]);

  useEffect(() => {
    if (convName) {
      const parts = convName.split(" ");
      if (parts.length > 1) {
        setIdReclam(parts[1]);
      }
    }
  }, [convName]);
  useEffect(() => {
    const fetchChatMessages = async () => {
      setIncrement(0);
      if (predefElement) {
        setPredef(predefElement);
      }

      const { data, error } = await supabase.from("Messages").select("*");

      if (data) {
        const formattedMessages: ChatMessage[] = data.map((msg: any) => ({
          body: msg.body,
          id: msg.id,
          ConversationName: msg.ConversationName,
          sender_id: msg.Sender_id,
          ResponseId: msg.ResponseId,
        }));
        if (convName !== null) {
          const mots: string[] = convName.split(" ");
          const deuxiemePartie: string = mots.slice(1).join(" ");
          setMessage(deuxiemePartie);
        }
        formattedMessages.forEach((msg) => {
          if (réclam === true && msg.ResponseId === 4) {
            setNumBillet(msg.body);
          }
          if (réclam === true && msg.ResponseId === 3) {
            setNumVol(msg.body);
          }
          if (réclam === true && msg.ResponseId === 5) {
            setComment(msg.body);
            sendCode(true);
          }
          if (annulerRéclam === true && msg.ResponseId === 2) {
            setInsertId(msg.body);
          }
          if (consulterRéclam === true && msg.ResponseId === 2) {
            setInsertIdConsult(msg.body);
          }
        });

        setChatMessages(formattedMessages);
      }
    };

    const fetchPredefMessages = async () => {
      let Context = "";
      if (faireRéclam === true) {
        Context = "faire réclamation";
      } else if (
        annulerRéclam === true &&
        faireRéclam === false &&
        consulterRéclam === false
      ) {
        Context = "annuler réclamation";
      } else if (
        consulterRéclam === true &&
        faireRéclam === false &&
        annulerRéclam === false
      ) {
        Context = "consulter réclamation";
      } else if (
        consulterRéclam === false &&
        faireRéclam === false &&
        annulerRéclam === false &&
        question === true
      ) {
        Context = "poser question";
      }
      const { data: messages, error } = await supabase
        .from("MessageBot")
        .select("*")
        .eq("OptionContext", Context);
      if (messages) {
        const predefMessages: predefMessage[] = messages.map((msg: any) => ({
          Context: msg.Context,
          id: msg.id,
          OptionContext: msg.OptionContext,
          QuestionId: msg.QuestionId,
          message:
            reclamData !== undefined &&
            msg.QuestionId === 1 &&
            !annulerRéclam &&
            !faireRéclam
              ? `${msg.message} ${reclamData}`
              : msg.message,
        }));

        setPredefs(predefMessages);
      }
    };
    fetchChatMessages();
    fetchPredefMessages();

    const realtimeSubscription = supabase
      .channel("Messages")
      .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
        console.log("Change received!", payload);
      })
      .subscribe();

    return () => {
      realtimeSubscription.unsubscribe();
    };
  }, [increment, réclam, chatMessages]); //chatMessages

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
      console.error("Erreur lors de l'insertion des villes :", error);
    }
  };

  useEffect(() => {
    if (departureCity && arrivalCity && !insertedData) {
      handleSaveCitiesToDatabase();
    }
  }, [departureCity, arrivalCity, insertedData]);

  const ConsultFlights = async () => {
    const dateArray = dateArr ? [dateDep, dateArr] : [dateDep];

    try {
      const { data, error } = await supabase
        .from("ScheduleFlights")
        .select("*")
        .or(
          `and(CityDep.eq.${departureCity},CityArr.eq.${arrivalCity}),and(CityDep.eq.${arrivalCity},CityArr.eq.${departureCity})`
        )

        .in("SchedateDep", dateArray);

      if (error) {
        console.error(
          "Erreur lors de la récupération des vols:",
          error.message
        );
      } else {
        console.log("Données récupérées avec succès:", data);
        setFlights(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des vols:", error);
    }
  };

  {
    /**Réccupérer les données du vol recherché dans consultation-vol*/
  }
  useEffect(() => {
    ConsultFlights();
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

  const handleButtonClick = async (index: number, value: string) => {
    setReclamButtons((prevButtons: any) => ({
      ...prevButtons,
      [index]: value,
    }));

    if (messageBot === false && increment !== 0) {
      setIncrement(increment + 1);
    }
  };
  /**Réccupérer les données du vol recherché dans consultation-vol*/
  {
    /**Construction du message contenant le nom des boutons cliqués*/
  }
  useEffect(() => {
    const reclamString = `Donc je vois que vous souhaitez faire une ${
      reclamButtons[0] ?? ""
    } - ${reclamButtons[1] ?? ""} de type ${reclamButtons[2] ?? ""} ?`;

    setClickedButtons(true);

    const timeout = setTimeout(() => {
      setClickedButtons(false);
    }, 5000);
    if (réclam === true) {
      setMessageReclm(reclamString);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [reclamButtons]);
  {
    /**Construction du message contenant le nom des boutons cliqués*/
  }
  {
    /**réccupération de la réservaation */
  }
  useEffect(() => {
    const searchReservation = async () => {
      if (!numBillet) return;

      try {
        const { data: reservation, error } = await supabase
          .from("Reservations")
          .select("*")
          .eq("NumBillet", numBillet);

        if (error) {
          console.error(
            "Erreur lors de la récupération de réservation:",
            error.message
          );
        } else {
          console.log("Données récupérées avec succès:", reservation);
          findReserv(reservation);
          setEmail(reservation[0].Email);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des vols:", error);
      }
    };

    searchReservation();
  }, [numBillet]);

  useEffect(() => {
    if (reserv && numBillet && numVol && commentaire) {
      const insertReclamation = async () => {
        try {
          const { error } = await supabase.from("Reclamations").insert({
            NumeroVol: numVol,
            NumBillet: reserv[0]?.NumBillet,
            Email: reserv[0]?.Email,
            Comment: commentaire,
            ConvName: convName,
            Context: question ? 2 : faireRéclam || consulterRéclam ? 1 : null,
            IdReclam: IdReclam,
            state: "En cours de traitement",
            Type: `${reclamButtons[0] ?? "-"} ${reclamButtons[1] ?? "-"} ${
              reclamButtons[2] ?? ""
            }`,
          });
          console.log("Votre réclamation est bien enregistrée.");
        } catch (error) {
          console.log("Impossible d'enregistrer votre réclamation:", error);
        }
      };

      insertReclamation();
    }
  }, [commentaire]);
  setIdReclamation(IdReclam);
  useEffect(() => {
    if (IdReclam) {
      localStorage.setItem("IdReclam", IdReclam);
    }
  }, [IdReclam]);
  useEffect(() => {
    localStorage.setItem("Context", `${Context}`);
  }, [Context]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleSendCode = async () => {
    try {
      const response = await axios.post("http://localhost:4007/Mail", {
        code: IdReclam,
        to: "maryemsmadhi@gmail.com",
      });
      console.log(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    if (envoiMail) {
      handleSendCode();

      const timer = setTimeout(() => {
        setEnvoiMail(false);
      }, 2000); // Set envoiMail to false after 2 seconds

      return () => clearTimeout(timer); // Clean up the timeout if the component unmounts
    }
  }, [envoiMail]);
  useEffect(() => {});
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
              <button
                onClick={() => {
                  setQuestion(!question);
                  setContext(2);
                }}
                className="btn btn-outline btn-error"
              >
                Posez une Question !
              </button>{" "}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={() => {
                    setRéclamation(!réclamation);

                    handleButtonClick(0, "Réclamation");
                  }}
                  className="btn btn-outline btn-error"
                >
                  Réclamation
                </button>
                {réclamation && (
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
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div style={{ display: "flex", gap: "2rem" }}>
                          {" "}
                          <button
                            onClick={() => {
                              setConsulterRéclam(!consulterRéclam);
                              setContext(1);
                            }}
                            className="btn btn-outline btn-error"
                          >
                            Consulter ma réclamation
                          </button>
                          <button
                            onClick={() => {
                              setAnnulerRéclam(!annulerRéclam);
                            }}
                            className="btn btn-outline btn-error"
                          >
                            Annuler ma réclamation
                          </button>
                          <button
                            onClick={() => {
                              setRéclam(!réclam);
                              setFaireRéclam(!faireRéclam);
                              setContext(1);
                            }}
                            className="btn btn-outline btn-error"
                          >
                            Faire une réclamation
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
                              &
                            </div>
                            <button
                              onClick={() => {
                                clickBien(!bien);
                                handleButtonClick(2, " Bien-être");
                              }}
                              className="btn btn-outline btn-error"
                            >
                              Bien-être
                            </button>
                            <button
                              onClick={() => {
                                clickRestau(!Restau);
                                handleButtonClick(2, " Restauration");
                              }}
                              className="btn btn-outline btn-error"
                            >
                              Restauration
                            </button>
                            <button
                              onClick={() => {
                                clickDistraction(!Distraction);
                                handleButtonClick(2, "Distraction");
                              }}
                              className="btn btn-outline btn-error"
                            >
                              Distraction
                            </button>
                            <button
                              onClick={() => {
                                clickAchat(!Achat);
                                handleButtonClick(2, "Achat");
                              }}
                              className="btn btn-outline btn-error"
                            >
                              Achat
                            </button>
                          </div>
                        )}
                      </div>
                      <button
                        className="btn btn-outline btn-error"
                        onClick={() => {
                          ClickSol(!sol);
                          handleButtonClick(1, "Sol");
                        }}
                      >
                        Sol
                      </button>
                      {sol && (
                        <div
                          style={{
                            marginTop: "2rem",
                            marginBottom: "0.5rem",
                            gap: "1rem",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "1rem",
                            }}
                          >
                            {" "}
                            <div
                              style={{
                                display: "flex",
                                gap: "2rem",
                                marginTop: "2rem",
                              }}
                            >
                              {" "}
                              <button
                                onClick={() => {
                                  setEnregist(!Enregist);
                                  handleButtonClick(2, "Enregistrement");
                                }}
                                className="btn btn-outline btn-error"
                              >
                                Enregistrement
                              </button>
                              <button
                                onClick={() => {
                                  ClickFidelys(!Fidelys);
                                  handleButtonClick(2, "Fidelys");
                                }}
                                className="btn btn-outline btn-error"
                              >
                                Fidelys
                              </button>
                            </div>
                            <div style={{ display: "flex", gap: "2rem" }}>
                              {" "}
                              <button
                                onClick={() => {
                                  ClickEmbarq(!Embarq);
                                  handleButtonClick(2, "Embarquement");
                                }}
                                className="btn btn-outline btn-error"
                              >
                                Embarquement
                              </button>
                              <button
                                onClick={() => {
                                  ClickSalon(!Salon);
                                  handleButtonClick(2, "Salon privilège");
                                }}
                                className="btn btn-outline btn-error"
                              >
                                Salon privilège
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      <button
                        onClick={() => {
                          ClickBaggage(!baggage);
                          handleButtonClick(1, "Baggage");
                        }}
                        className="btn btn-outline btn-error"
                      >
                        Baggage
                      </button>
                      {baggage && (
                        <div
                          style={{
                            marginTop: "4rem",
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
                            <div></div>
                            <button
                              onClick={() => {
                                clickRetardé(!Retardé);
                                handleButtonClick(2, "Retardé");
                              }}
                              className="btn btn-outline btn-error"
                            >
                              Retardé
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              clickEndommagé(!Endommagé);
                              handleButtonClick(2, "Endommagé");
                            }}
                            className="btn btn-outline btn-error"
                          >
                            Endommagé
                          </button>
                          <button
                            onClick={() => {
                              clickPerdu(!Perdu);
                              handleButtonClick(2, "Perdu");
                            }}
                            className="btn btn-outline btn-error"
                          >
                            Perdu
                          </button>
                          <button
                            onClick={() => {
                              clickManquant(!Manquant);
                              handleButtonClick(2, "Objet Manquant");
                            }}
                            className="btn btn-outline btn-error"
                          >
                            Objet Manquant
                          </button>
                          <button
                            onClick={() => {
                              clickExcés(!Excés);
                              handleButtonClick(2, "Excédent de baggage");
                            }}
                            className="btn btn-outline btn-error"
                          >
                            Excédent de Baggage
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => {
                          ClickBillet(!billet);
                          handleButtonClick(1, "Litige Billet");
                        }}
                        className="btn btn-outline btn-error"
                      >
                        Billet
                      </button>
                      {billet && (
                        <div
                          style={{
                            marginTop: "4rem",
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
                            <div></div>
                            <button
                              onClick={() => {
                                ClickAchatBillet(!Achatbillet);
                                handleButtonClick(
                                  2,
                                  "Réservation et Achat de Billet"
                                );
                              }}
                              className="btn btn-outline btn-error"
                            >
                              Achat Billet
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              clickPaiement(!Paiement);
                              handleButtonClick(2, "Paiement");
                            }}
                            className="btn btn-outline btn-error"
                          >
                            Paiement
                          </button>
                          <button
                            onClick={() => {
                              ClickAutre(!Autre);
                              handleButtonClick(2, "Autres");
                            }}
                            className="btn btn-outline btn-error"
                          >
                            Autre
                          </button>
                        </div>
                      )}
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
                    marginTop: "0.5rem",
                  }}
                >
                  <button className="btn btn-outline btn-error">
                    Je veux consulter ma réservation
                  </button>
                  <button
                    onClick={() => {
                      setListofflights(!listofflights);
                      setClickedOption("Consultation vols");
                      console.log(clickedOption);
                    }}
                    className="btn btn-outline btn-error"
                  >
                    Puis-je voir les vols disponibles?
                  </button>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1.5rem",
                    marginTop: "1rem",
                  }}
                >
                  <button
                    onClick={() => {
                      setAnnulerVol(!annulervol);
                    }}
                    className="btn btn-outline btn-error"
                  >
                    Je veux annuler une réservation
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
                {flights
                  .filter((flight) => {
                    if (type1Flight) {
                      return (
                        flight.CityDep === departureCity &&
                        flight.CityArr === arrivalCity
                      );
                    }
                    return true; // Affiche tous les vols si ce n'est pas "Aller-simple"
                  })
                  .map((flight, index) => (
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
                            {flight.id} - ({flight.ScheTimeDep}-
                            {flight.ScheTimeArr})
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
          {(hospitalié ||
            Enregist ||
            bien ||
            Restau ||
            Distraction ||
            Achat ||
            Retardé ||
            Endommagé ||
            Perdu ||
            Manquant ||
            Excés ||
            Autre ||
            Paiement ||
            Achatbillet) && (
            <div
              style={{
                marginTop: "2rem",
                marginBottom: "0.5rem",
              }}
            >
              <LeftMessage
                message={monDictionnaire["Récalamation-Question1"]}
                ImageUrl={image}
              />
            </div>
          )}
          {annulerRéclam && (
            <div
              style={{
                marginTop: "2rem",
                marginBottom: "0.5rem",
              }}
            >
              <LeftMessage
                message={monDictionnaire["Annulation-Réclamation-Question1"]}
                ImageUrl={image}
              />
            </div>
          )}
          {faireRéserv && (
            <div
              style={{
                marginTop: "2rem",
                marginBottom: "0.5rem",
              }}
            >
              <LeftMessage
                message={monDictionnaire["Faire-Réservation-Question1"]}
                ImageUrl={image}
              />
            </div>
          )}
          {consulterRéclam && (
            <div
              style={{
                marginTop: "2rem",
                marginBottom: "0.5rem",
              }}
            >
              <LeftMessage
                message={monDictionnaire["Consultation-Réclamation-Question1"]}
                ImageUrl={image}
              />
            </div>
          )}
          {question && (
            <div
              style={{
                marginTop: "2rem",
                marginBottom: "0.5rem",
              }}
            >
              <LeftMessage
                message={monDictionnaire["poser Question"]}
                ImageUrl={image}
              />
            </div>
          )}
          <div>
            {chatMessages.map((message, index) => {
              const matchingPredef = predefs.find(
                (predef) => predef.QuestionId === message.ResponseId - 1
              );

              let leftMessageContent = matchingPredef
                ? matchingPredef.message
                : "";

              if (matchingPredef && matchingPredef.QuestionId === 4) {
                leftMessageContent = `Bien reçu ,vous receverez un mail contenant l'ID pour suivre votre réclamation ,veuillez saisir cet ID à la demande : ${IdReclam}`;
                if (!envoiMail) {
                  // Ensure we only set envoiMail to true if it's not already true
                  setEnvoiMail(true); // Set envoiMail to true
                }
              }

              if (
                matchingPredef &&
                (réclam || annulerRéclam || consulterRéclam || question) &&
                message?.ConversationName === convName
              ) {
                return (
                  <Fragment key={index}>
                    <RightChatBubble
                      message={message.body}
                      ImageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNVi9cbmMkUabLiF_3kfI94qngwPIM4gnrztEUv6Hopw&s"
                    />
                    <LeftMessage
                      message={leftMessageContent}
                      ImageUrl={image}
                    />
                  </Fragment>
                );
              } else if (
                !clickedButtons &&
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
              } else if (
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
              }
              return null;
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
