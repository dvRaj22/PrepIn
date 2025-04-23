import { Inngest } from "inngest";

export const inngest = new Inngest({id:"saarthi", name: "Saarthi",credentials:{
    gemini: {
        apiKey: process.env.GEMINI_API_KEY,
    },
}});