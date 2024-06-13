import React, { useState } from "react";
import "./SeatArrival.css";

interface Seat {
  id: number;
  number: string;
  isReserved?: boolean;
}

interface SeatPickerProps {
  onSeatSelected: (seat: Seat) => void;
  onSeatDeselected: (seat: Seat) => void;
}

const SeatPickerComponent: React.FC<SeatPickerProps> = ({
  onSeatSelected,
  onSeatDeselected,
}) => {
  const [seats, setSeats] = useState<Seat[][]>([
    [
      { id: 1, number: "1A" },
      { id: 2, number: "1B" },
      { id: 3, number: "1C" },
      { id: 4, number: "1D" },
    ],
    [
      { id: 5, number: "2A" },
      { id: 6, number: "2B" },
      { id: 7, number: "2C" },
      { id: 8, number: "2D" },
    ],
    [
      { id: 9, number: "3A" },
      { id: 10, number: "3B" },
      { id: 11, number: "3C" },
      { id: 12, number: "3D" },
    ],
    [
      { id: 13, number: "4A" },
      { id: 14, number: "4B" },
      { id: 15, number: "4C" },
      { id: 16, number: "4D" },
    ],
    [
      { id: 17, number: "5A" },
      { id: 18, number: "5B" },
      { id: 19, number: "5C" },
      { id: 20, number: "5D" },
    ],
    [
      { id: 21, number: "6A" },
      { id: 22, number: "6B" },
      { id: 23, number: "6C" },
      { id: 24, number: "6D" },
      { id: 25, number: "7D" },
    ],
    [
      { id: 26, number: "7A" },
      { id: 27, number: "7B" },
      { id: 28, number: "7C" },
      { id: 29, number: "7D" },
    ],
    [
      { id: 30, number: "8A" },
      { id: 31, number: "8B" },
      { id: 32, number: "8C" },
      { id: 33, number: "8D" },
    ],
    [
      { id: 34, number: "9A" },
      { id: 35, number: "9B" },
      { id: 36, number: "9C" },
      { id: 37, number: "9D" },
    ],
    [
      { id: 38, number: "10A" },
      { id: 39, number: "10B" },
      { id: 40, number: "10C" },
      { id: 41, number: "10D" },
    ],
  ]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const handleSeatClick = (seat: Seat) => {
    const isAlreadySelected = selectedSeats.some((s) => s.id === seat.id);

    const updatedSeats = seats.map((row) =>
      row.map((s) =>
        s.id === seat.id ? { ...s, isReserved: !s.isReserved } : s
      )
    );
    setSeats(updatedSeats);

    if (isAlreadySelected) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
      onSeatDeselected(seat);
    } else {
      // Select the seat
      setSelectedSeats([...selectedSeats, seat]);
      onSeatSelected(seat);
    }
  };
  console.log("selected seats are:", selectedSeats);
  return (
    <div className="seat2-picker" style={{ width: "20rem", height: "15rem" }}>
      {seats.map((row, rowIndex) => (
        <div key={rowIndex} className="seat2-row">
          {row.map((seat) => (
            <div
              key={seat.id}
              className={`seat2 ${seat.isReserved ? "reserved" : "available"} ${
                selectedSeats.some((s) => s.id === seat.id) ? "selected" : ""
              }`}
              onClick={() => handleSeatClick(seat)}
            >
              {seat.number}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatPickerComponent;
