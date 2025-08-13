import React, { useEffect, useState } from "react";

const BackendStatus: React.FC = () => {
  const [status, setStatus] = useState<"connecting" | "connected" | "error">("connecting");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/");
        if (res.ok) {
          setStatus("connected");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };

    checkBackend();

    // optional: check every 30s
    const interval = setInterval(checkBackend, 30000);
    return () => clearInterval(interval);
  }, []);

  const getColor = () => {
    if (status === "connected") return "bg-green-500";
    if (status === "error") return "bg-red-500";
    return "bg-yellow-500";
  };

  return (
    <div className="fixed bottom-4 left-4 flex items-center space-x-2 text-white px-3 py-1 rounded shadow-lg"
         style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
      <span className={`w-3 h-3 rounded-full ${getColor()}`} />
      <span className="text-sm">
        {status === "connected" && "Backend Connected"}
        {status === "error" && "Backend Disconnected"}
        {status === "connecting" && "Connecting..."}
      </span>
    </div>
  );
};

export default BackendStatus;
