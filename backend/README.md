<h1><strong>Notify - Backend👨‍💻</strong></h1>
  <p>This repository contains the backend code for the <strong>Notify App</strong>. The backend is built with Node.js, Express, MongoDB, and JWT authentication to handle user accounts and note management. Users can register, log in, and perform CRUD operations on notes.</p>

  <h2>Features</h2>
  <ul>
    <li><strong>User Authentication:</strong> Secure login and sign-up with JWT authentication.</li>
    <li><strong>Note Management:</strong> Users can create, edit, display, pin, delete, and search notes.</li>
    <li><strong>Real-time Notifications:</strong> (Optional feature to be added in the future)</li>
    <li><strong>API Endpoints:</strong> 
      <ul>
        <li>Create account</li>
        <li>User login</li>
        <li>CRUD operations for notes (add, edit, delete, display, etc.)</li>
      </ul>
    </li>
  </ul>

  <h2>Tech Stack</h2>
  <ul>
    <li><strong>Node.js:</strong> JavaScript runtime for building scalable backend applications.</li>
    <li><strong>Express.js:</strong> Web framework for Node.js to handle routing and server-side logic.</li>
    <li><strong>MongoDB:</strong> NoSQL database to store user and note data.</li>
    <li><strong>JWT (JSON Web Tokens):</strong> For secure token-based user authentication.</li>
    <li><strong>dotenv:</strong> For loading environment variables from a .env file.</li>
    <li><strong>CORS:</strong> To enable cross-origin requests between the backend and frontend.</li>
    <li><strong>Mongoose:</strong> For MongoDB object modeling.</li>
  </ul>

  <h2>Installation</h2>
  <h3>Prerequisites</h3>
  <p>Ensure you have the following tools installed:</p>
  <ul>
    <li><a href="https://nodejs.org/">Node.js</a></li>
    <li><a href="https://www.mongodb.com/try/download/community">MongoDB</a> (or use MongoDB Atlas)</li>
  </ul>

  <h3>Setting Up</h3>
  <ol>
    <li>Clone the repository:
      <pre><code>git clone https://github.com/yourusername/notify-app-backend.git</code></pre>
    </li>
    <li>Navigate to the project directory:
      <pre><code>cd notify-app-backend</code></pre>
    </li>
    <li>Install dependencies:
      <pre><code>npm install</code></pre>
    </li>
    <li>Create a .env file in the root of the project and add the following variables:
      <pre><code>MongoDB_URL=mongodb://localhost:27017/notifyapp
ACCESS_TOKEN_SECRET=youraccesstokensecret
Application_URL=http://localhost:3000</code></pre>
    </li>
    <li>Start the server:
      <pre><code>npm start</code></pre>
    </li>
    <li>The backend will be running on <code>http://localhost:8000</code>.</li>
  </ol>

  <h2>API Endpoints</h2>

  <h3>1. POST /create-account</h3>
  <p><strong>Description:</strong> Registers a new user.</p>
  <p><strong>Body:</strong> <code>{ "fullName": "John Doe", "email": "john.doe@example.com", "password": "password123" }</code></p>
  <p><strong>Response:</strong> Returns user data and access token.</p>

  <h3>2. POST /login</h3>
  <p><strong>Description:</strong> Logs in an existing user.</p>
  <p><strong>Body:</strong> <code>{ "email": "john.doe@example.com", "password": "password123" }</code></p>
  <p><strong>Response:</strong> Returns a message, email, and access token.</p>

  <h3>3. GET /get-user</h3>
  <p><strong>Description:</strong> Fetches the logged-in user's details.</p>
  <p><strong>Auth:</strong> Requires a valid JWT token.</p>
  <p><strong>Response:</strong> Returns the user's full name, email, and other details.</p>

  <h3>4. POST /add-note</h3>
  <p><strong>Description:</strong> Adds a new note.</p>
  <p><strong>Auth:</strong> Requires a valid JWT token.</p>
  <p><strong>Body:</strong> <code>{ "title": "Note Title", "content": "Note content" }</code></p>
  <p><strong>Response:</strong> Returns the created note.</p>

  <h3>5. PUT /edit-note/:noteId</h3>
  <p><strong>Description:</strong> Edits an existing note.</p>
  <p><strong>Auth:</strong> Requires a valid JWT token.</p>
  <p><strong>Body:</strong> <code>{ "title": "Updated Title", "content": "Updated content" }</code></p>
  <p><strong>Response:</strong> Returns the updated note.</p>

  <h3>6. GET /display-note/:noteId</h3>
  <p><strong>Description:</strong> Retrieves a specific note.</p>
  <p><strong>Auth:</strong> Requires a valid JWT token.</p>
  <p><strong>Response:</strong> Returns the note's details.</p>

  <h3>7. GET /get-all-notes</h3>
  <p><strong>Description:</strong> Retrieves all notes for the logged-in user.</p>
  <p><strong>Auth:</strong> Requires a valid JWT token.</p>
  <p><strong>Response:</strong> Returns an array of notes.</p>

  <h3>8. DELETE /delete-note/:noteId</h3>
  <p><strong>Description:</strong> Deletes a specific note.</p>
  <p><strong>Auth:</strong> Requires a valid JWT token.</p>
  <p><strong>Response:</strong> Returns a success message.</p>

  <h3>9. PUT /update-note-pinned/:noteId</h3>
  <p><strong>Description:</strong> Updates the pinned status of a note.</p>
  <p><strong>Auth:</strong> Requires a valid JWT token.</p>
  <p><strong>Body:</strong> <code>{ "isPinned": true }</code></p>
  <p><strong>Response:</strong> Returns the updated note.</p>

  <h3>10. GET /search-notes</h3>
  <p><strong>Description:</strong> Searches for notes by title or content.</p>
  <p><strong>Auth:</strong> Requires a valid JWT token.</p>
  <p><strong>Query Params:</strong> <code>query=searchTerm</code></p>
  <p><strong>Response:</strong> Returns matching notes.</p>

  <h2>Folder Structure</h2>
  <ul>
    <li><strong>models/</strong>
      <ul>
        <li><code>user.model.js</code>: Mongoose schema for user data.</li>
        <li><code>notes.model.js</code>: Mongoose schema for note data.</li>
      </ul>
    </li>
    <li><strong>utilities/</strong>
      <ul>
        <li><code>authenticateToken.js</code>: Middleware to verify JWT tokens.</li>
      </ul>
    </li>
    <li><strong>routes/</strong>
      <ul>
        <li><code>index.js</code>: All API routes for the application.</li>
      </ul>
    </li>
    <li><code>app.js</code>: Main application file where the server is set up.</li>
    <li><code>.env</code>: Environment variables for MongoDB URL, JWT secret, etc.</li>
  </ul>

  <h2>Contributing</h2>
  <p>Contributions are welcome! Please follow these steps to contribute:</p>
  <ol>
    <li>Fork the repository.</li>
    <li>Create a new branch for your feature or bugfix.</li>
    <li>Make your changes and commit them.</li>
    <li>Push your changes to your fork.</li>
    <li>Open a pull request to the <code>main</code> branch.</li>
  </ol>
