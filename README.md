# MERN Chat App with Socket.io

This is a real-time chat application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack and integrated with Socket.io for seamless real-time communication. The application includes a notification system to alert users about new messages.

## Features

- Real-time chat: Instant messaging between users in real-time.
- Notification system: Receive notifications for new messages.
- MERN Stack: Utilizes MongoDB, Express.js, React.js, and Node.js for a full-stack development approach.
- Socket.io: Enables bidirectional communication between the server and clients.

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/Chat-application.git
   cd Chat-application
   ```

2. Install dependencies:

   ```bash
   cd server && npm install
   cd ../client && npm install
   cd ../socket && npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the `server` directory.
   - Add the following variables:

     ```env
     MONGO_URI= mongodb+srv://yourUserName:yourPassword@cluster0.f0injnn.mongodb.net/Chat-app?retryWrites=true&w=majority
     JWT_SECRET = *create jwt secret or just type something that would be difficult to asume*
     JWT_LIFETIME= 30d
     ```

4. Start the server:

   ```bash
   cd ../server && npm start
   ```

5. Start the client:

   ```bash
   cd ../client && npm run dev
   cd ../server && nodemon
   cd ../socket && nodemon
   ```

6. Open your browser and visit `http://localhost:3000` to use the chat application.

## Usage

- Register a new account or log in if you already have one.
- Explore the UI and start real-time conversations.
- Receive notifications for new messages.
- Enjoy seamless communication with other users.

## Technologies Used

- **MongoDB:** NoSQL database for storing user data and chat messages.
- **Express.js:** Backend framework for building the RESTful API.
- **React.js:** Frontend library for building the user interface.
- **Node.js:** JavaScript runtime for server-side development.
- **Socket.io:** Library for real-time web applications, enabling bidirectional communication.

## Contributing

Feel free to contribute to the development of this project. Fork the repository, make your changes, and submit a pull request.

## Acknowledgments

- Special thanks to the creators of MERN stack and Socket.io for providing powerful tools to build real-time applications.

Happy chatting! 🚀
