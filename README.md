# Express.js Backend with Azure B2C Authentication

A robust Node.js/Express backend designed to support static sites with Azure B2C authentication integration. This project provides a secure and scalable backend foundation with proper routing, authentication, and middleware support.

## Features

- **Azure B2C Authentication** - Secure user authentication and authorization
- **TypeScript Support** - Fully typed codebase for improved developer experience
- **RESTful API Architecture** - Well-structured API endpoints
- **JWT Token Authentication** - Secure token-based authentication after B2C login
- **Modular Design** - Follows single responsibility principle for maintainability
- **Static File Serving** - Efficiently serves static files with intelligent routing
- **Custom Error Handling** - Comprehensive error handling middleware

## Project Structure

```
nodejs-backend-for-static-site
├── src/
│   ├── app.ts                 # Express application setup and middleware pipeline
│   ├── constants.ts           # Application constants
│   ├── server.ts              # Server initialization
│   ├── config/                # Configuration files
│   │   ├── azure-b2c.config.ts      # Azure B2C settings
│   │   └── passport-strategies.config.ts  # Passport authentication strategies
│   ├── controllers/           # Request handlers
│   │   └── auth.controller.ts # Authentication controller
│   ├── middleware/            # Express middleware
│   │   ├── auth-handlers.middleware.ts    # Authentication flow handlers
│   │   ├── auth.middleware.ts     # Auth verification middleware
│   │   ├── azureB2C.middleware.ts # Azure B2C initialization
│   │   ├── blacklist.middleware.ts        # Security middleware
│   │   ├── directoryFallback.middleware.ts # URL normalization
│   │   ├── trailingSlash.middleware.ts    # URL normalization
│   │   └── errorHandlers/          # Error handling middleware
│   │       ├── customErrorHandler.middleware.ts    # 404 handler
│   │       └── genericErrorHandler.middleware.ts   # 500 handler
│   ├── routes/                # API routes
│   │   ├── auth.routes.ts     # Authentication routes
│   │   ├── index.ts           # Main router setup
│   │   └── redirect.routes.ts # URL redirection rules
│   └── utils/                 # Utility functions
│       ├── response.utils.ts  # HTTP response utilities
│       └── token.utils.ts     # JWT token utilities
├── public/                    # Static files (HTML, CSS, JS)
├── .env                       # Environment variables (not in repo)
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn
- An Azure B2C tenant (for authentication features)

### Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/skurekjakub/b2c-express-backend.git
   cd b2c-express-backend
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory with the following variables:
   ```
   # Azure B2C Configuration
   B2C_CLIENT_ID=your_client_id
   B2C_CLIENT_SECRET=your_client_secret
   B2C_TENANT_NAME=your_tenant_name
   B2C_POLICY_NAME=B2C_1_SignUpSignIn
   B2C_METADATA_ENDPOINT=https://${B2C_TENANT_NAME}.b2clogin.com/${B2C_TENANT_NAME}.onmicrosoft.com/${B2C_POLICY_NAME}/v2.0/.well-known/openid-configuration
   B2C_REDIRECT_URI=http://localhost:3000/auth/callback
   B2C_SCOPE=openid profile offline_access
   B2C_RESPONSE_TYPE=code

   # JWT Secret for session tokens
   JWT_SECRET=your_jwt_secret_key
   
   # Server settings
   PORT=3000
   NODE_ENV=development
   ```

4. **Build the project:**
   ```
   npm run build
   ```

5. **Start the server:**
   ```
   npm start
   ```

   For development with auto-reload:
   ```
   npm run dev
   ```

## Authentication Flow

1. **User Login:**
   - User navigates to `/auth/login`
   - Redirected to Azure B2C login page
   - After successful authentication, B2C redirects back to `/auth/callback`
   - Server creates a JWT session token and sets a cookie

2. **Protected Routes:**
   - Secured with `verifySession` middleware
   - JWT token is verified for each request
   - User profile information available in `req.user`

3. **API Authentication:**
   - REST API endpoints can be secured with `authenticateAPI` middleware
   - Supports Bearer token authentication

4. **Logout:**
   - User navigates to `/auth/logout`
   - Session cookie is cleared
   - Redirected to Azure B2C logout endpoint

## API Endpoints

### Authentication Routes

- `GET /auth/login` - Initiates Azure B2C login
- `POST /auth/callback` - Handles B2C authentication response
- `GET /auth/logout` - Logs out the user and clears session
- `GET /auth/profile` - Returns user profile information (protected)
- `GET /auth/status` - Returns authentication status

## Azure B2C Setup

To configure your Azure B2C tenant:

1. Create a B2C tenant in the Azure portal
2. Register an application in the tenant
3. Configure user flows (policies) for sign-up/sign-in
4. Set the redirect URI to match your application (`http://localhost:3000/auth/callback`)
5. Copy the client ID and secret to your environment variables

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.