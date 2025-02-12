import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

class WebSocketService {
  constructor() {
    this.stompClient = null;
    this.isConnected = false; // Properly track connection state
    this.subscriptions = []; // Keep track of all active subscriptions
  }

  connect(userId, onNotificationReceived) {
    if (this.isConnected) {
      console.log("WebSocket already connected.");
      return; // Prevent duplicate connections
    }

    console.log("Attempting WebSocket connection...");
    const token = localStorage.getItem("token"); // Fetch the JWT token

    // Initialize the STOMP client with SockJS
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS("https://fitnessapp-backend-mft9.onrender.com/ws"), // Use SockJS
      connectHeaders: {
        Authorization: `Bearer ${token}`, // Attach the JWT token
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.stompClient.onConnect = () => {
      console.log("WebSocket connected successfully!");
      this.isConnected = true; // Update connection state

      // Subscribe to notifications for the specific user
      const subscription = this.stompClient.subscribe(
        `/topic/notifications/${userId}`,
        (message) => {
          if (message.body) {
            const notification = JSON.parse(message.body);
            onNotificationReceived(notification); // Call the callback function
          }
        }
      );

      // Store the subscription
      this.subscriptions.push(subscription);
    };

    this.stompClient.onDisconnect = () => {
      console.log("WebSocket disconnected.");
      this.isConnected = false; // Update connection state
    };

    this.stompClient.onWebSocketError = (error) => {
      console.error("WebSocket error:", error);
    };

    this.stompClient.onStompError = (frame) => {
      console.error("STOMP error:", frame);
    };

    this.stompClient.activate(); // Activate the WebSocket connection
  }

  unsubscribeAll() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
    console.log("Unsubscribed from all topics.");
  }

  disconnect() {
    if (this.stompClient && this.isConnected) {
      this.unsubscribeAll(); // Ensure all subscriptions are removed
      this.stompClient.deactivate(); // Deactivate the connection
      console.log("WebSocket disconnected");
      this.isConnected = false; // Update connection state
    }
  }

  sendWorkoutDone(workoutPlanId, workoutId, userId) {
    if (this.stompClient && this.isConnected) {
      this.stompClient.publish({
        destination: "/app/mark-workout-done",
        body: JSON.stringify({ workoutPlanId, workoutId, userId }),
      });
      console.log("Workout marked as done.");
    } else {
      console.error("WebSocket is not connected. Cannot send message.");
    }
  }

  sendNotification(destination, message) {
    if (this.stompClient && this.isConnected) {
      this.stompClient.publish({
        destination: destination,
        body: JSON.stringify(message),
      });
      console.log("WebSocket notification sent:", message);
    } else {
      console.error("WebSocket is not connected.");
    }
  }
}

const websocketService = new WebSocketService();
export default websocketService;
