#  Task Manager – MERN + AI Powered Task App

##  Overview

Task Manager is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with AI integration.

Users can create, update, view, and delete tasks, while also interacting with an AI assistant that provides insights based on their tasks.

The AI feature is designed to respond **only to task-related queries**, making it a focused productivity assistant.

This project demonstrates full-stack development along with real-world AI API integration.

<img width="1908" height="875" alt="task_manager" src="https://github.com/user-attachments/assets/19d4fa12-8999-4ba8-b4d5-14379693868c" />
/>

---

## Tech Stack

* Frontend: React.js, HTML, CSS3
* Backend: Node.js, Express.js
* Database: MongoDB
* API Communication: Axios
* Authentication: JWT (JSON Web Token)
* AI Integration: OpenRouter API

---

## Key Features

* Create, update, and delete tasks
* View all tasks stored in MongoDB
* Secure authentication using JWT
* Protected routes for authorized access
* REST API integration
* AI-powered task assistant 
* AI responds only to task-related queries
* Clean and responsive UI

---

## AI Feature Details

* Integrated AI using OpenRouter API
* AI receives user tasks as context
* Responds only to task-related questions
* Ignores unrelated queries
* Daily request limit (free model restriction)
* Ensures focused and efficient task assistance

---

## Limitations

* AI responses are limited to task-related queries only
* Free model has a daily request limit
* Performance depends on external API availability

---

## How to Run the Project

###  Clone the Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

---

###  Setup Backend (Server)

```bash
cd server
npm install
```

Create a `.env` file inside the **server** folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
JWT_SECRET=your_secret_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

Run the backend:

```bash
npm start
```

---

### Setup Frontend (Client)

Open a new terminal:

```bash
cd client
npm install
npm start
```

---

### Access the App

Open your browser and go to:

```
http://localhost:3000
```

---

##  AI Setup Notes

* Get your API key from OpenRouter
* Add it to `.env` as `OPENROUTER_API_KEY`
* Free model has limited daily requests
* AI responds only to task-related queries

---

##  Requirements

* Node.js installed
* MongoDB running locally
* Internet connection (for AI API)

---

##  Project Structure

* client – React frontend
* server – Node.js & Express backend
* models – MongoDB schema

---


##  Conclusion

This project showcases a combination of full-stack development and AI integration, providing a practical task management solution with intelligent assistance.
