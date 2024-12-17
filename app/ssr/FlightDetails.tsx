'use client';

import {ChangeEvent, ReactNode, useState} from "react";
import {useActions, useUIState} from "ai/rsc";

type FlightDetailsProps = {
  flight: {
    id: number,
    flightNumber: string,
    departureTime: string,
    arrivalTime: string,
    availableSeats: number,
  }
}

export function FlightDetails({ flight }: FlightDetailsProps) {
  const { submitUserMessage } = useActions();
  const [_, setMessages] = useUIState();
  const [ticketCount, setTicketCount] = useState(1);

  const handleTicketCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTicketCount(Number(e.target.value));
  };

  const handleBookNow = async () => {
    const display = await submitUserMessage(
        `Book ${ticketCount} for ${flight.flightNumber}`,
    );

    setMessages((messages: ReactNode[]) => [...messages, display]);
  };

  return (
      <div className="bg-white shadow-md rounded-lg p-6 my-4 w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">✈️ Flight Details</h1>
        <div className="text-gray-700">
          <div className="mb-2">
            <span className="font-semibold">Flight Number:</span> {flight.flightNumber}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Departure Time:</span> {flight.departureTime}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Arrival Time:</span> {flight.arrivalTime}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Available Seats:</span> {flight.availableSeats}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Tickets
            </label>
            <input
                type="number"
                value={ticketCount}
                onChange={handleTicketCountChange}
                min="1"
                max={flight.availableSeats}
                className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
              onClick={handleBookNow}
              className="mt-4 w-full p-2 bg-blue-600 text-white rounded"
          >
            Book Now
          </button>
        </div>
      </div>
  );
}

export function FlightDetailsSkeleton() {
  return (
      <div className="bg-white shadow-md rounded-lg p-6 my-4 w-full max-w-md mx-auto animate-pulse">
        <div className="h-6 bg-gray-300 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
  );
}




