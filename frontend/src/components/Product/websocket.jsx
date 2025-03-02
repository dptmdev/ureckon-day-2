import { useEffect, useRef } from "react";

const WebcamStream = () => {
  const videoRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Access the webcam
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        // Initialize WebSocket connection
        socketRef.current = new WebSocket("ws://localhost:5000");

        socketRef.current.onopen = () => {
          console.log("WebSocket connection established");
        };

        socketRef.current.onclose = () => {
          console.log("WebSocket connection closed");
        };

        // Stream video data to the backend
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "video/webm",
        });
        mediaRecorder.ondataavailable = (event) => {
          if (
            event.data.size > 0 &&
            socketRef.current.readyState === WebSocket.OPEN
          ) {
            socketRef.current.send(event.data);
          }
        };
        mediaRecorder.start(100); // Send data every 100ms
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }}></video>
    </div>
  );
};

export default WebcamStream;
