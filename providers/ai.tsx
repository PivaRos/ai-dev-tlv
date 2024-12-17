import {ReactNode} from "react";
import { createAI } from 'ai/rsc';
import { submitUserMessage } from "@/flights/flight-assitent";

export const AIContext = createAI<any[], ReactNode[]>({
  initialUIState: [],
  initialAIState: [],
  actions: { submitUserMessage },
});
