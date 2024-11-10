import { useEffect } from "react";
import { subscribeToChannel } from "./pusherService";

// Custom hook to use Pusher
const usePusher = (channelName, eventName, callback) => {
  // Memoize the callback to avoid unnecessary re-renders

  useEffect(() => {
    // Subscribe to the channel and event
    const unsubscribe = subscribeToChannel(channelName, eventName, (data) => {
      console.log("Received event data:", data); // Log data to check if it's correct
      callback(data); // Pass data to the callback function
    });

    // Cleanup: Unsubscribe from the channel when component is unmounted
    return () => {
      console.log("Cleaning up Pusher subscription");
      unsubscribe();
    };
  }, [channelName, eventName, callback]);

  // No need to return anything unless needed in the component
};

export default usePusher;
