// validator that will parse the message
import { z } from 'zod';

export const messageValidator = z.object({
    id: z.string(),
    senderId: z.string(),
    text: z.string(),
    timestamp: z.number(),
})

export const messageArrayValidator = z.array(messageValidator); // validates the whole message array according to the messageValidator

export type Message =  z.infer<typeof messageValidator>;