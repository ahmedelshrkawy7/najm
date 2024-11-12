// src/hooks/useDynamicPusher.js
import { useMemo } from "react";
import usePusher from "./usePusher"; // Assuming your original usePusher hook is in this file

// Custom hook to handle dynamic channel subscription based on role
const useDynamicNotf = (role) => {
  const pusherCred = useMemo(() => {
    let credentials = {};

    if (role === "responsible") {
      credentials = {
        channel: "responsible-notification",
        event: "App\\Events\\ResponsibleNotificationEvent",
      };
    } else if (role === "accreditor") {
      credentials = {
        channel: "accreditor-notification",
        event: "App\\Events\\AccreditorNotificationEvent",
      };
    } else if (role === "department") {
      credentials = {
        channel: "department-notification",
        event: "App\\Events\\DepartmentNotificationEvent",
      };
    } else {
      console.log("Unknown role, not subscribing to notifications.");
      credentials = {
        channel: "",
        event: "",
      };
    }

    return credentials;
  }, [role]);

  //   const pusherCred = handleNotf();

  const notification = usePusher(pusherCred.channel, pusherCred.event);

  return notification;
};

export default useDynamicNotf;
