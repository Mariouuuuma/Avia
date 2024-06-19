import React, { useEffect, useState } from "react";
import supabase from "../../Utils/api";
import { TimeLike } from "fs";

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

export default function Return() {
  const [selectedFlight, setSelectedFlight] = useState<FlightData | null>(null);
  const [ResultFlights, setRsultFlights] = useState<any>(null);

  useEffect(() => {
    const storedFlight = localStorage.getItem("selectedFlight");
    if (storedFlight) {
      setSelectedFlight(JSON.parse(storedFlight));
    }
  }, []);

  useEffect(() => {
    const fetchReturnFlights = async () => {
      if (selectedFlight) {
        const { data, error } = await supabase
          .from("ScheduleFlights")
          .select("*")
          .eq("CityDep", selectedFlight.CityArr)
          .eq("CityArr", selectedFlight.CityDep);

        if (error) {
          console.error("Error fetching return flights:", error);
        } else {
          setRsultFlights(data);
        }
      }
    };

    fetchReturnFlights();
  }, [selectedFlight]);
  console.log("point départ", selectedFlight?.CityDep);
  console.log("point arrivée", selectedFlight?.CityArr);

  return (
    <div>
      {ResultFlights.length > 0 ? (
        ResultFlights.map((flight: FlightData, index: number) => (
          <div
            key={index}
            tabIndex={0}
            className="collapse collapse-arrow border border-base-300 bg-base-100"
            style={{ width: "55rem" }}
          >
            <div className="collapse-title text-xl font-medium">
              <div style={{ display: "flex", gap: "3rem" }}>
                <div>
                  {flight.CityDep} {"\u2192"} {flight.CityArr}
                </div>
                <div> {flight.SchedateDep}</div>
                <div>
                  {" "}
                  {flight.ScheTimeDep} - {flight.ScheTimeArr}{" "}
                </div>
              </div>
            </div>
            <div className="collapse-content">
              <p>Departure: {flight.ScheTimeDep}</p>
              <p>Arrival:</p>
              <p>Price: €</p>
              {/* Ajoutez d'autres détails de vol ici */}
            </div>
          </div>
        ))
      ) : (
        <p>No return flights available.</p>
      )}
    </div>
  );
}
