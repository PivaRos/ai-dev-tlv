export const searchFlights = async (source: string, destination: string, date: string,) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return [
    {
      id: '1',
      flightNumber: 'AA123',
      source,
      destination,
      date: date,
    },
    {
      id: '2',
      flightNumber: 'AA456',
      source,
      destination,
      date: date,
    },
  ];
};

export const lookupFlight = async (flightNumber: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    id: 1,
    flightNumber: flightNumber,
    departureTime: '10:00 AM',
    arrivalTime: '12:00 PM',
    availableSeats: 100,
  };
};
