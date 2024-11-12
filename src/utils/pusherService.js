// // src/pusherService.js

// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// const pusher = new Pusher("5903e71db7e642fb35a6", {
//   cluster: "ap2",
//   forceTLS: true,
//   wssPort: 443,
//   encrypted: true,
//   debug: true,
// });

// const echo = new Echo({
//   broadcaster: "pusher",
//   key: "5903e71db7e642fb35a6",
//   cluster: "ap2",
//   encrypted: true,
//   pusher: pusher,
// });

// echo.connector.pusher.connection.bind("connected", () => {
//   console.log("Echo connected to Pusher");
// });

// echo.connector.pusher.connection.bind("disconnected", () => {
//   console.log("Echo disconnected from Pusher");
// });

// echo.connector.pusher.connection.bind("error", (error) => {
//   console.error("Pusher connection error:", error);
// });

// export const subscribeToChannel = (channelName, eventName, callback) => {
//   console.log(`Subscribing to channel: ${channelName} for event: ${eventName}`);

//   const channel = echo.channel(channelName); // Subscribe to the channel using Laravel Echo

//   // Log the subscription
//   console.log(`Successfully subscribed to channel: ${channelName}`);

//   // Listen for the event and call the provided callback function when the event is received
//   channel.listen(eventName, (data) => {
//     console.log(`Received event: ${eventName}`, data);
//     callback(data); // Trigger the callback with the event data
//   });

//   // Return the unsubscribe function to clean up when needed
//   return () => {
//     console.log(`Unsubscribing from channel: ${channelName}`);
//     echo.leave(channelName); // Unsubscribe from the channel
//   };
// };
