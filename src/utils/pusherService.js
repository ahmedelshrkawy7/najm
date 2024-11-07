// src/pusherService.js

import Pusher from "pusher-js";

// Initialize Pusher with your app credentials
const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true, // Use a secure connection
  // Additional configuration options
  wsHost: import.meta.env.VITE_PUSHER_HOST, // Optional: Define the host
  wsPort: import.meta.env.VITE_PUSHER_PORT, // Optional: Define the port
  wssPort: 443, // Port for WSS
  encrypted: true, // Ensure the connection is secure
});

// Function to subscribe to a channel and event
export const subscribeToChannel = (channelName, eventName, callback) => {
  const channel = pusher.subscribe(channelName); // Subscribe to the channel

  // Bind the event to trigger the callback when the event is received
  channel.bind(eventName, (data) => {
    callback(data); // Trigger the callback with the event data
  });

  // Return the unsubscribe function to clean up when needed
  return () => {
    pusher.unsubscribe(channelName); // Unsubscribe from the channel
  };
};
