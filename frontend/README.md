  <h1><img src="public/images/icon.png" alt="Notify logo" width="40"/> Notify - Frontend <img src="public/images/bg.jpg" alt="Notify logo" width="40"/></h1>

  <p>This repository contains the frontend code for the <strong>Notify App</strong>. The app allows users to receive real-time notifications and manage them in a user-friendly interface.</p>

  <h2>Features</h2>
  <ul>
    <li><strong>Real-time Notifications:</strong> Get notified instantly about important events and updates.</li>
    <li><strong>Notification Management:</strong> View, delete, and mark notifications as read.</li>
    <li><strong>Responsive UI:</strong> Works seamlessly across devices (Desktop, Tablet, and Mobile).</li>
    <li><strong>User Authentication:</strong> Secure login and sign-up flow.</li>
  </ul>

  <h2>Tech Stack</h2>
  <ul>
    <li><strong>React.js:</strong> For building dynamic user interfaces.</li>
    <li><strong>CSS/SCSS:</strong> For styling the application, with a responsive and modern design.</li>
    <li><strong>Axios:</strong> For making API calls to the backend.</li>
    <li><strong>React Router:</strong> For navigation between different pages of the app.</li>
  </ul>

  <h2>Setup</h2>
  
  <h3>Prerequisites</h3>
  <p>Ensure you have the following tools installed on your machine:</p>
  <ul>
    <li><a href="https://nodejs.org/">Node.js</a> (version 12 or higher)</li>
    <li><a href="https://www.npmjs.com/">npm</a> (Node Package Manager)</li>
  </ul>

  <h3>Installation</h3>
  <ol>
    <li>Clone the repository:
      <pre><code>git clone https://github.com/yourusername/notify-app-frontend.git</code></pre>
    </li>
    <li>Navigate to the project directory:
      <pre><code>cd notify-app-frontend</code></pre>
    </li>
    <li>Install the dependencies:
      <pre><code>npm install</code></pre>
    </li>
    <li>Start the development server:
      <pre><code>npm start</code></pre>
    </li>
    <p>This will run the app locally, and you can open it in your browser at <code>http://localhost:3000</code>.</p>
  </ol>

  <h2>Usage</h2>
  <p>Once the app is running, you can:</p>
  <ul>
    <li><strong>Register an Account:</strong> Sign up with a username and password.</li>
    <li><strong>Login:</strong> Log into the app using your credentials.</li>
    <li><strong>Manage Notifications:</strong> Receive notifications and manage them (mark as read, delete, etc.).</li>
    <li><strong>Navigate Between Pages:</strong> Use the navigation bar for different sections of the app, such as viewing all notifications, profile settings, etc.</li>
  </ul>

  <h3>React Router Setup</h3>
  <p>React Router is used for navigation between different components and pages. The main routes of the app are:</p>
  <ul>
    <li><code>/</code>: Home page where users can view all their notifications.</li>
    <li><code>/login</code>: Login page for authenticated users.</li>
    <li><code>/signup</code>: Registration page for new users.</li>
    <li><code>/profile</code>: User profile page for managing account details.</li>
  </ul>

  <p>Example of the React Router setup:</p>
  <pre><code>
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

function App() {
  return (
    &lt;Router&gt;
      &lt;Switch&gt;
        &lt;Route path="/" exact component={Home} /&gt;
        &lt;Route path="/login" component={Login} /&gt;
        &lt;Route path="/signup" component={SignUp} /&gt;
        &lt;Route path="/dashboard" component={Profile} /&gt;
      &lt;/Switch&gt;
    &lt;/Router&gt;
  );
}

export default App;
  </code></pre>

  <h3>Axios Integration</h3>
  <p>Axios is used to make HTTP requests to the backend for various functionalities such as authentication and notifications management. Here's an example of how to use Axios to fetch notifications:</p>
  <pre><code>
import axios from "axios";

const getNotifications = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/notifications", {
      headers: {
        Authorization: \`Bearer \${localStorage.getItem("authToken")}\`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications", error);
  }
};
  </code></pre>

  <h2>Future Enhancements</h2>
  <ul>
    <li><strong>Push Notifications:</strong> Integrate push notifications to notify users in real-time.</li>
    <li><strong>Dark Mode:</strong> Allow users to toggle between light and dark modes.</li>
    <li><strong>User Preferences:</strong> Save user preferences for better customization of notifications.</li>
  </ul>

  <h2>Contributing</h2>
  <p>Contributions are welcome! Feel free to fork the repository and submit pull requests with improvements or new features.</p>
  <ol>
    <li>Fork the repository.</li>
    <li>Create a new branch (<code>git checkout -b feature-name</code>).</li>
    <li>Commit your changes (<code>git commit -am 'Add new feature'</code>).</li>
    <li>Push to the branch (<code>git push origin feature-name</code>).</li>
    <li>Create a new Pull Request.</li>
  </ol>


