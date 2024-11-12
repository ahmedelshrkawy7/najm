// // src/usePusher.js

// import { useEffect } from "react";
// import { subscribeToChannel } from "./pusherService";

// // Custom hook to use Laravel Echo (via Pusher)
// const usePusher = (channelName, eventName, callback) => {
//   useEffect(() => {
//     // Subscribe to the channel and event
//     const unsubscribe = subscribeToChannel(channelName, eventName, (data) => {
//       console.log("Received event data:", data); // Log data to check if it's correct
//       callback(data); // Pass data to the callback function
//     });

//     // Cleanup: Unsubscribe from the channel when component is unmounted
//     return () => {
//       console.log("Cleaning up Pusher subscription");
//       unsubscribe();
//     };
//   }, [channelName, eventName, callback]);

//   // No need to return anything unless needed in the component
// };

// export default usePusher;

import { useState, useEffect } from "react";
import Pusher from "pusher-js";

// Custom Hook for Pusher
const usePusher = (channelName, eventName) => {
  const [data, setData] = useState(null);
  //   let token = JSON.parse(localStorage.getItem("token"));
  //   console.log("🚀 ~ usePusher ~ token:", token);
  useEffect(() => {
    // if (!token) {
    //   console.log("no token!");
    //   return; // Exit early if no token
    // }

    console.log(
      `Subscribing to Pusher channel: ${channelName} and event: ${eventName}`
    );

    // Initialize Pusher with your credentials
    const pusher = new Pusher("5903e71db7e642fb35a6", {
      cluster: "ap2",
      forceTLS: true,
      wssPort: 443,
      encrypted: true,
      debug: true,
      //   authEndpoint: "https://backend.najm-dev.alexondev.net/broadcasting/auth",
      //   auth: {
      //     headers: {
      //       Authorization: `Bearer ${token.token}`, // Pass the token in the Authorization header
      //     },
      //   },
    });

    console.log("🚀 ~ useEffect ~ pusher:", pusher);

    // Subscribe to the channel
    const channel = pusher.subscribe(channelName);
    console.log("🚀 ~ useEffect ~ channel:", channel);

    // Log success or failure of subscription

    // Bind to the event
    // const eventHandler = (receivedData) => {
    //   console.log("Received data from Pusher:", receivedData);
    //   setData(receivedData); // Set the data state when an event is received
    // };

    channel.bind("pusher:subscription_succeeded", () => {
      console.log(`Successfully subscribed to channel: ${channelName}`);
    });

    channel.bind("pusher:subscription_error", (error) => {
      console.error(`Failed to subscribe to channel: ${channelName}`, error);
    });

    const eventHandler = (receivedData) => {
      console.log("Received data from Pusher:", receivedData);

      // If the received data is a string, try to parse it
      if (typeof receivedData === "string") {
        try {
          const parsedData = JSON.parse(receivedData);
          setData(parsedData); // Update state with parsed data
          console.log("Parsed data:", parsedData);
        } catch (error) {
          console.error("Error parsing string data:", error);
        }
      } else if (typeof receivedData === "object") {
        // If it's already an object, just set it directly
        setData(receivedData);
        console.log("Received object data:", receivedData);
      } else {
        console.error("Received data is not in a valid format.");
      }
    };

    channel.bind(eventName, eventHandler);

    pusher.connection.bind("error", (error) => {
      console.log(error);
    });

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      console.log(`Unsubscribing from channel: ${channelName}`);
      channel.unbind(eventName, eventHandler);
      pusher.unsubscribe(channelName);
    };
  }, [channelName, eventName]); // Re-run if channelName or eventName changes

  return data;
};

export default usePusher;

/* with echoooooooooooooooo */
// import { useState, useEffect } from "react";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// // Custom Hook for Pusher (with Laravel Echo)
// const usePusher = (channelName, eventName) => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     console.log(
//       `Subscribing to Echo channel: ${channelName} and event: ${eventName}`
//     );

//     // Initialize Echo with Pusher
//     window.Pusher = Pusher; // Make sure Pusher is globally available for Echo
//     const echo = new Echo({
//       broadcaster: "pusher",
//       key: "5903e71db7e642fb35a6", // Your Pusher key
//       cluster: "ap2", // Your Pusher cluster
//       forceTLS: true,
//       encrypted: true,
//       // Optionally, use authentication if necessary:
//       // authEndpoint: "/broadcasting/auth",
//       // auth: {
//       //   headers: {
//       //     Authorization: `Bearer ${yourToken}`,
//       //   },
//       // },
//     });

//     console.log("🚀 ~ useEffect ~ echo:", echo);

//     // Subscribe to the channel using Echo
//     const channel = echo.channel(channelName);
//     console.log("🚀 ~ useEffect ~ subscribed to channel:", channel);

//     // Handle successful subscription
//     channel.listen("pusher:subscription_succeeded", () => {
//       console.log(`Successfully subscribed to channel: ${channelName}`);
//     });

//     // Handle subscription error
//     channel.listen("pusher:subscription_error", (error) => {
//       console.error(`Failed to subscribe to channel: ${channelName}`, error);
//     });

//     // Event handler for receiving data
//     const eventHandler = (receivedData) => {
//       console.log("Received data from Echo event:", receivedData);

//       // If the received data is a string, try to parse it
//       if (typeof receivedData === "string") {
//         try {
//           const parsedData = JSON.parse(receivedData);
//           setData(parsedData); // Update state with parsed data
//           console.log("Parsed data:", parsedData);
//         } catch (error) {
//           console.error("Error parsing string data:", error);
//         }
//       } else if (typeof receivedData === "object") {
//         // If it's already an object, just set it directly
//         setData(receivedData);
//         console.log("Received object data:", receivedData);
//       } else {
//         console.error("Received data is not in a valid format.");
//       }
//     };

//     // Bind the event handler to the specific event
//     channel.listen(eventName, eventHandler);

//     // Handle connection error
//     echo.connector.pusher.connection.bind("error", (error) => {
//       console.log("Pusher connection error:", error);
//     });

//     // Cleanup function to unsubscribe when component unmounts
//     return () => {
//       console.log(`Unsubscribing from channel: ${channelName}`);
//       channel.stopListening(eventName); // Unsubscribe from specific event
//       echo.leave(channelName); // Leave the channel when component unmounts
//     };
//   }, [channelName, eventName]); // Re-run if channelName or eventName changes

//   return data;
// };

// export default usePusher;
