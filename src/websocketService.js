import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

class WebSocketService {
  constructor() {
    this.stompClient = null;
  }

  connect(userId, onNotificationReceived) {
    if (this.stompClient?.connected) return; // Prevent duplicate connections

    console.log("Attempting WebSocket connection...");
    const token = localStorage.getItem("token"); // Fetch the JWT token

    // Initialize the STOMP client with SockJS
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"), // Use SockJS
      connectHeaders: {
        Authorization: `Bearer ${token}`, // Attach the JWT token
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.stompClient.onConnect = () => {
      console.log("WebSocket connected successfully!");

      // Subscribe to notifications for the specific user
      this.stompClient.subscribe(`/topic/notifications/${userId}`, (message) => {
        if (message.body) {
          const notification = JSON.parse(message.body);
          onNotificationReceived(notification);
        }
      });
    };

    this.stompClient.onWebSocketError = (error) => {
      console.error("WebSocket error:", error);
    };

    this.stompClient.onStompError = (frame) => {
      console.error("STOMP error:", frame);
    };

    this.stompClient.activate();
  }

  disconnect() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate();
      console.log("WebSocket disconnected");
    }
  }

  sendWorkoutDone(workoutPlanId, workoutId, userId) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: "/app/mark-workout-done",
        body: JSON.stringify({ workoutPlanId, workoutId, userId }),
      });
      console.log("Workout marked as done.");
    } else {
      console.error("WebSocket is not connected. Cannot send message.");
    }
  }
}

export default new WebSocketService();
