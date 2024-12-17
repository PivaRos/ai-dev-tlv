'use client';

import {ReactNode} from "react";
import {useActions, useUIState} from "ai/rsc";

type Flight = {
  id: string;
  flightNumber: string;
  source: string;
  destination: string;
  date: string;
}

type FlightListProps = {
  flights: Array<Flight>;
};

export function FlightList({ flights }: FlightListProps) {
  const { submitUserMessage } = useActions();
  const [_, setMessages] = useUIState();

  const getFlightDetails = async (flight: Flight) => {
    const display = await submitUserMessage(
        `lookupFlight ${flight.flightNumber} from ${flight.source} to ${flight.destination}`,
    );

    setMessages((messages: ReactNode[]) => [...messages, display]);
  }

  return (
      <div className="flex flex-wrap justify-center">
        {flights.map((flight) => (
            <div
                key={flight.id}
                className="bg-white shadow-md rounded-lg p-4 my-4 w-full flex flex-col justify-between gap-0.5"
            >
              <div>
                <div className="text-xl font-bold mb-2">✈️ Flight Details</div>
                <div className="text-gray-700">
                  <div className="mb-1">
                    <span className="font-semibold">Source:</span> {flight.source}
                  </div>
                  <div className="mb-1">
                    <span className="font-semibold">Destination:</span> {flight.destination}
                  </div>
                  <div className="mb-1">
                    <span className="font-semibold">Date:</span> {flight.date}
                  </div>
                </div>
              </div>
              <button onClick={() => getFlightDetails(flight)}
                      className="self-end mt-4 bg-blue-500 text-white py-1 px-3 rounded">
                Details
              </button>
            </div>
        ))}
      </div>
  );
}

export function FlightListSkeleton() {
  return (
      <div className="flex flex-wrap justify-center">
        {Array.from({ length: 2 }).map((_, index) => (
            <div
                key={index}
                className="bg-gray-200 animate-pulse shadow-md rounded-lg p-4 my-4 w-full"
            >
              <div className="h-6 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-1"></div>
              <div className="h-4 bg-gray-300 rounded mb-1"></div>
              <div className="h-4 bg-gray-300 rounded mb-1"></div>
            </div>
        ))}
      </div>
  );
}
