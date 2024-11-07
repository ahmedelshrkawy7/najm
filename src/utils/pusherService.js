// // src/pusherService.js

import Pusher from "pusher-js";

// Log the Pusher key to make sure it is being correctly loaded
console.log(import.meta.env.VITE_PUSHER_APP_KEY, "Pusher Key Loaded");

// Initialize Pusher with your app credentials
const pusher = new Pusher("5903e71db7e642fb35a6", {
  cluster: "ap2", // Use environment variables for cluster
  forceTLS: true, // Ensure a secure connection
  wssPort: 443, // Use the secure WebSocket port
  encrypted: true, // Ensure the connection is secure
});

// Function to subscribe to a channel and event
export const subscribeToChannel = (channelName, eventName, callback) => {
  console.log(`Subscribing to channel: ${channelName} for event: ${eventName}`);

  const channel = pusher.subscribe(channelName); // Subscribe to the channel

  // Log the subscription
  console.log(`Successfully subscribed to channel: ${channelName}`);

  // Bind the event to trigger the callback when the event is received
  channel.bind(eventName, (data) => {
    console.log(`Received event: ${eventName}`, data);
    callback(data); // Trigger the callback with the event data
  });

  // Return the unsubscribe function to clean up when needed
  return () => {
    console.log(`Unsubscribing from channel: ${channelName}`);
    pusher.unsubscribe(channelName); // Unsubscribe from the channel
  };
};

// VITE_PUSHER_APP_ID=1883078
// VITE_PUSHER_APP_KEY=5903e71db7e642fb35a6
// VITE_PUSHER_APP_SECRET=281292bf9ddf295e2b54  # This is only used on the backend, never in the frontend.
// VITE_PUSHER_APP_CLUSTER=ap2
// VITE_PUSHER_HOST=api-ap2.pusher.com
// VITE_PUSHER_PORT=443
// VITE_PUSHER_SCHEME=https
