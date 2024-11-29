import { useEffect, useState } from "react";
import { SocketService } from "../socket-client/socket.service";

export const useSocket = () => {
  const [socketService, setSocketService] = useState<SocketService | null>(null);

  useEffect(() => {
    // Initialize socket service
    const service = new SocketService();
    setSocketService(service);

    return () => {
      service.disconnect(); // Cleanup when component unmounts
    };
  }, []);

  return socketService;
};
