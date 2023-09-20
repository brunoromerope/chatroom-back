# Node.js Back-End for Chat App


This is a simple Node.js chat application that uses Express.js, MongoDB, and Socket.io to enable real-time messaging. Users can send and receive messages in real-time using websockets.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js: [Download Node.js](https://nodejs.org/)
- Dist folder compiled from the front-end [Chat App](https://github.com/brunoromerope/chatroom-front)

## Getting Started

Follow these steps to get the application up and running:

##### 1. Clone this repository to your local machine:

```
git clone <repository-url>
cd <repository-directory>
```
##### 2. Install the required npm packages:

```
npm install
```
##### 3. Create a `.env` file in the root directory of the project with the following content:

```
MONGODB_URI=<your-mongodb-connection-string>
PORT=<your-preferred-port>
```

##### 4. Copy the `dist` folder in the root directory.

##### 5. Start the server:

```
npm start
```

The application should now be running. Access it in your web browser at `http://localhost:<your-preferred-port>`

### Usage

- Enter a username to log in.
- Select a chat room.
- Send and receive real-time messages.
- You can exit with the logout button.

### Folder Structure

- **dist** : This folder contains the static HTML and client-side JavaScript files.
- **routes** : This folder contains the server-side API routes.
- **src** : This folder contains the server-side JavaScript code.

### Technologies Used

- Node.js: A JavaScript runtime for server-side development.
- Express.js: A web application framework for Node.js.
- MongoDB: A NoSQL database for storing chat messages.
- Socket.io: A library for enabling real-time, bidirectional communication between clients and the server.

### License

This project is licensed under the MIT License.