import { buildSkyscannerUrl, scrapeSkyscanner } from "../scraping";

export const searchFlights = async (
  source: string,
  destination: string,
  fromDate: string,
  toDate: string
) => {
  console.log("source", source);
  console.log("destination", destination);
  console.log("fromDate", fromDate);
  console.log("toDate", toDate);
  const url = buildSkyscannerUrl(source, destination, fromDate, toDate, 2, 0);
  const result = await scrapeSkyscanner(url);
  return result;
};

export const lookupFlight = async (flightNumber: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    id: 1,
    flightNumber: flightNumber,
    departureTime: "10:00 AM",
    arrivalTime: "12:00 PM",
    availableSeats: 100,
  };
};
