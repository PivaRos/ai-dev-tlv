import {streamUI} from 'ai/rsc';
import {openai} from '@ai-sdk/openai';
import {z} from 'zod';
import {lookupFlight, searchFlights} from "@/flights/flight-utils";
import {FlightList, FlightListSkeleton} from "@/app/ssr/FlightList";
import {FlightDetails, FlightDetailsSkeleton} from "@/app/ssr/FlightDetails";

export async function submitUserMessage(input: string) {
  'use server';

  const ui = await streamUI({
    model: openai('gpt-4o'),
    system: 'you are a flight booking assistant',
    prompt: input,
    text: async ({content}) => <div>{content}</div>,
    tools: {
      searchFlights: {
        description: 'search for flights',
        parameters: z.object({
          source: z.string().describe('The origin of the flight'),
          destination: z.string().describe('The destination of the flight'),
          date: z.string().describe('The date of the flight'),
        }),
        generate: async function* ({source, destination, date}) {
          yield <FlightListSkeleton />;
          const results = await searchFlights(source, destination, date);
          return <FlightList flights={results} />
        },
      },
      lookupFlight: {
        description: 'lookup details for a flight',
        parameters: z.object({
          flightNumber: z.string().describe('The flight number'),
          source: z.string().describe('The origin of the flight'),
          destination: z.string().describe('The destination of the flight'),
        }),
        generate: async function* ({flightNumber}) {
          yield <FlightDetailsSkeleton />;
          const details = await lookupFlight(flightNumber);
          return <FlightDetails flight={details} />
        },
      },
    },
  });

  return ui.value;
}
