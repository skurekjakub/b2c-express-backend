# Node.js Backend for Static Site

This project is a simple Node.js backend designed to support a static site. It includes routing and basic authentication endpoints.

## Project Structure

```
nodejs-backend-for-static-site
├── src
│   ├── app.js               # Initializes the Express application and sets up middleware
│   ├── server.js            # Starts the server and listens on a specified port
│   ├── routes
│   │   ├── index.js         # Defines the main application routes
│   │   └── auth.routes.js    # Defines authentication-related routes
│   ├── controllers
│   │   └── auth.controller.js # Handles user registration and login
│   └── middleware
│       └── auth.middleware.js # Contains authentication middleware functions
├── package.json              # Configuration file for npm
└── README.md                 # Documentation for the project
```

## Getting Started

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd nodejs-backend-for-static-site
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the server:**
   ```
   npm start
   ```

## API Endpoints

- **Authentication Routes**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login an existing user

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.