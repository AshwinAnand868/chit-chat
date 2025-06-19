import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const secret = process.env.STREAM_SECRET_KEY;

if(!apiKey || !secret) {
    throw new Error('Stream API Key or Secret is missing');
}

const client = new StreamClient(apiKey, secret);

export default client;