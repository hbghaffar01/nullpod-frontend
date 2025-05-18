# Next.js 15 ChatApp

## Getting Started

### Task requirement

Using NextJS/React:
A flexible group chat UI that can be moved anywhere in the browser area
The window can be resized, minimised
A list of users must be viewable similar to slack, discord or early irc chats
A chat can be initiated with any of the users in the list
The chat UI must be aesthetically pleasing
The UX must be intuitive

You will be judged on the use of colors, fonts and ability of the component to work in different screen sizes

### Installation

1. **Clone this repository:**
   ```sh
   git clone git@github.com:hbghaffar01/nullpod-frontend.git
   cd Nullpod-Frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the Next.js app:**
   ```sh
   npm run dev
   ```
4. **Start the WebSocket server:**
   ```sh
   cd server
   node websocket-server.js
   ```
5. **Open the app in your browser:**
   - Navigate to: [http://localhost:3000](http://localhost:3000)

## Project Structure

```
Nullpod-Frontend/
app/                  # Next.js routes
│── components/          # React components used in the app
│── global/types.ts      # Types
│── server/              # Node.js WebSocket server
│── package.json         # Project dependencies and scripts
│── next.config.js       # Next.js configuration
│── README.md            # Project documentation
```

## Features

✅ **Real-time Chat:** Uses WebSockets for instant messaging.
✅ **dragable:** chat box is dragable in dom.
✅ **post:** media aand post are visible when user is clicked.
✅ **Next.js 15:** Optimized performance with the latest Next.js features.
✅ **React.js 19:** Build in react 19 version.
✅ **Modular Codebase:** Well-structured for scalability and maintainability.
✅ **Simple UI:** Clean and minimal design for a better user experience.
✅ **Node.js WebSocket Server:** Lightweight and efficient for handling multiple connections.

## Technologies Used

- **Frontend:** Next.js 15 (React), Tailwind CSS
- **Backend:** Node.js, WebSocket (Socket.io)

## Usage

- Open multiple tabs or devices and navigate to `/chat` to test real-time messaging.
- Modify `server/websocket-server.js` if needed to add more features.
- Customize the UI in `components/`.

## Contributing

Feel free to submit issues and pull requests to improve this project!

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
