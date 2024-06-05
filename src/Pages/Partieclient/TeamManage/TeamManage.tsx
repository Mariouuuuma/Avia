import React, { useState, useRef, useEffect } from "react";
import supabase from "../../../Utils/api";
import "./index.css";
import Calendar from "../Calendar/Calendar";
import { Moment } from "moment";

const TeamManage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);
  const [agents, setAgents] = useState<any[]>([]);
  const [allAgents, setAllAgents] = useState<any[]>([]); // État pour stocker la liste complète des agents
  const [search, setSearch] = useState<boolean>(false);
  const [due, setDue] = useState<any>();
  const [changes, saveChanges] = useState<string>("");
  const [agentSelections, setAgentSelections] = useState<{
    [key: number]: string;
  }>({});
  const [assignments, setAssignments] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [calendar, setCalendar] = useState<boolean[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // State to hold the selected date

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!searchTerm.trim()) {
      setErr(true);
      return;
    }

    const [firstName, lastName] = searchTerm.split(" ");
    setErr(false);

    try {
      const { data: searched, error } = await supabase
        .from("Agents")
        .select()
        .eq("firstName", firstName)
        .eq("lastName", lastName);

      if (searched && searched.length > 0) {
        setAgents(searched);
        setSearch(true); // Activer le mode recherche
      } else {
        setAgents([]);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche :", (error as Error).message);
      setErr(true);
    }
  };

  useEffect(() => {
    const retrieveAgent = async () => {
      try {
        const user = await supabase.auth.getUser();
        const { data: currentUser, error: userError } = user;

        if (userError) {
          throw userError;
        }

        const { data: agentsData, error } = await supabase
          .from("Agents")
          .select("*")
          .neq("Email", currentUser?.user.email);

        if (error) {
          throw error;
        }

        setAgents(agentsData || []);
        setAllAgents(agentsData || []); // Stocker la liste complète des agents
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des agents",
          error
        );
      }
    };

    retrieveAgent();
  }, []);

  useEffect(() => {
    if (!search) {
      setAgents(allAgents);
    }
  }, [search, allAgents]);

  const toggleAssign = (index: number) => {
    setAssignments((prevAssignments) => ({
      ...prevAssignments,
      [index]: !prevAssignments[index],
    }));
  };

  const handleDateSelectPeriod = (selectedDate: Moment, index: number) => {
    console.log(
      "Date Retour sélectionnée :",
      selectedDate.format("YYYY-MM-DD")
    );
    setDue(selectedDate.format("YYYY-MM-DD"));

    // Set the selected date
    setSelectedDate(selectedDate.format("YYYY-MM-DD"));

    // Désactiver le calendrier lorsque l'assignation est annulée
    if (!assignments[index]) {
      const newCalendar = [...calendar];
      newCalendar[index] = false;
      setCalendar(newCalendar);
    }
  };

  const handleSelectTaskChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const selectedOption = event.target.value;
    setAgentSelections((prevSelections) => ({
      ...prevSelections,
      [index]: selectedOption,
    }));
  };

  const handleSave = (index: number) => {
    setAgentSelections((prevSelections) => ({
      ...prevSelections,
      [index]: agentSelections[index],
    }));

    setAssignments((prevAssignments) => ({
      ...prevAssignments,
      [index]: false,
    }));

    console.log("Saved:", agentSelections[index]);
  };

  const updateChanges = async (agent: any) => {
    try {
      const agentIndex = agents.indexOf(agent);

      if (agentIndex === -1) {
        throw new Error("Agent not found in the agents list");
      }

      const selectedRole = agentSelections[agentIndex];

      if (!selectedRole) {
        throw new Error("Selected role is undefined");
      }

      const { error } = await supabase
        .from("Agents")
        .update({ Role: selectedRole, lastDayOperation: selectedDate })
        .eq("Email", agent.Email);

      if (error) {
        throw error;
      }

      console.log("Changes saved successfully for:", agent.Email);
    } catch (error) {
      console.error("Impossible de mettre à jour l'agent :", error);
    }
  };

  console.log("selected date is", selectedDate);
  return (
    <div style={{ width: "100rem", height: "100%" }}>
      <div className="search-bar-container">
        <div style={{ display: "flex", gap: "-1rem" }}></div>
        <div className="divInput">
          <input
            className="inputSearchTeam"
            type="text"
            placeholder="Rechercher un agent..."
            value={searchTerm}
            onChange={handleSearchChange}
            ref={inputRef}
          />
          <button
            onClick={handleSearchSubmit}
            className="btn btn-primary"
            style={{ marginRight: "40rem" }}
          >
            Rechercher
          </button>
        </div>
        <div
          className="inbox-container"
          style={{
            overflowY: "auto",
            height: "75vh",
            display: "flex",
            border: "1px solid #ddd",
            marginLeft: "1rem",
            padding: "1rem",
            marginTop: "2rem",
          }}
        >
          {(allAgents || search) &&
            agents.map((agent: any, index: number) => (
              <div
                key={index}
                className="agent-card"
                style={{ marginBottom: "4rem" }}
              >
                <div
                  style={{
                    marginTop: "2rem",
                    marginLeft: "2rem",
                    width: "17rem",
                    height: "15rem",
                    backgroundColor: "white",
                    borderColor: "#f3f4f6",
                    padding: "1rem",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "0.5rem",
                    border: "1px solid black",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "-2rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.8rem",
                          color: "grey",
                          marginTop: "0.5rem",
                        }}
                      ></p>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.25rem",
                          marginLeft: "3.25rem",
                        }}
                      >
                        <img
                          style={{
                            width: "4.5rem",
                            height: "4rem",
                            borderRadius: "50%",
                            marginTop: "0.2rem",
                          }}
                          src={agent.PhotoUrl}
                          alt={`Avatar de ${agent.FirstName} ${agent.LastName}`}
                        />
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "grey",
                            marginTop: "0.5rem",
                            marginRight: "3rem",
                          }}
                        >
                          {` ${agent.firstName} ${agent.lastName} `}
                        </p>
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "grey",
                            marginTop: "0.5rem",
                            marginRight: "3rem",
                          }}
                        >
                          {`${agent.Role}`}
                        </p>
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <img
                          style={{
                            width: "1.3rem",
                            height: "1.3rem",
                            borderRadius: "50%",
                            marginTop: "0.2rem",
                          }}
                          src="https://thumbs.dreamstime.com/b/email-envelope-icon-vector-mail-message-symbol-isolated-transparent-background-email-envelope-icon-vector-black-mail-message-126372737.jpg"
                          alt={`Icône d'email de ${agent.FirstName} ${agent.LastName}`}
                        />
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "grey",
                            marginTop: "0.5rem",
                          }}
                        >
                          {agent.Email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleAssign(index)}
                    style={{ marginLeft: "3rem", marginTop: "1rem" }}
                    className="btn btn-primary"
                  >
                    Assign Operation
                  </button>
                  {assignments[index] && (
                    <div
                      className="card lg:card-side bg-base-100 shadow-xl"
                      style={{
                        position: "relative",
                        top: "-95%",
                        left: "10%",
                        width: "30rem",
                        height: "21rem",
                      }}
                    >
                      <div className="card-body">
                        <h2 className="card-title">Operation Assignment</h2>
                        <div style={{ display: "flex", gap: "-2rem" }}>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <p
                                style={{
                                  marginRight: "14rem",
                                  marginBottom: "-3rem",
                                  fontWeight: "bold",
                                }}
                              >
                                Choose the operation:
                              </p>
                              <p
                                style={{
                                  color: "red",
                                  marginLeft: "0.2rem",
                                  marginTop: "1rem",
                                }}
                              >
                                {" "}
                                {agents[index].Role
                                  ? agents[index].Role
                                  : agentSelections[index]}{" "}
                              </p>
                              <div style={{ marginTop: "3rem" }}>
                                <select
                                  style={{
                                    border: "1px solid #ccc",
                                    height: "2rem",
                                    width: "50%",
                                    borderRadius: "5%",
                                  }}
                                  value={agentSelections[index] || ""}
                                  onChange={(event) =>
                                    handleSelectTaskChange(event, index)
                                  }
                                >
                                  <option disabled selected hidden>
                                    Type of Operation
                                  </option>
                                  <option>Reclamation A bord</option>
                                  <option>Reclamation Sol</option>
                                  <option>Reclamation Baggage</option>
                                  <option>Reclamation Litige Billet</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginTop: "-0.5rem",
                            }}
                          >
                            <p
                              style={{
                                marginRight: "14rem",
                                marginBottom: "-3rem",
                                fontWeight: "bold",
                              }}
                            >
                              Choose the last date:
                            </p>
                            <div
                              style={{
                                display: "flex",
                                gap: "-2rem",
                                color: "red",
                              }}
                            >
                              <p
                                style={{
                                  marginRight: "10rem",
                                  marginTop: "3rem",
                                  marginBottom: "1rem",
                                }}
                              >
                                {agents[index].lastDayOperation
                                  ? agents[index].lastDayOperation
                                  : selectedDate}
                              </p>
                            </div>
                            <button
                              className="btn btn-primary"
                              style={{ width: "8rem" }}
                              onClick={() => {
                                const newCalendar = [...calendar];
                                newCalendar[index] = !newCalendar[index];
                                setCalendar(newCalendar);
                              }}
                            >
                              Calendar
                            </button>
                          </div>
                        </div>
                        {calendar[index] && assignments[index] && (
                          <div
                            style={{
                              position: "relative",
                              top: "-70%",
                              right: "40%",
                            }}
                          >
                            <Calendar
                              onDateSelect={(selectedDate: Moment) =>
                                handleDateSelectPeriod(selectedDate, index)
                              }
                              calendarName="Period"
                            />
                          </div>
                        )}

                        <div
                          className="card-actions "
                          style={{
                            alignItems: "center",
                            marginLeft: "9rem",
                            marginTop: "2rem",
                            display: "flex",
                            gap: "2rem",
                          }}
                        >
                          <button
                            onClick={() => {
                              handleSave(index);
                              updateChanges(agents[index]);
                            }}
                            className="btn btn-primary"
                            style={{
                              width: "5rem",
                              marginTop: calendar[index] ? "-42rem" : "auto",
                            }}
                          >
                            Save
                          </button>
                          <button
                            onClick={() => toggleAssign(index)}
                            className="btn btn-primary"
                            style={{
                              marginTop: calendar[index] ? "-42rem" : "auto",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TeamManage;
