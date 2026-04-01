# Express.js Beginner Guide

This project is now set up as a small Express learning playground.

## What Express Is

Express is a web framework for Node.js. It helps you build:

- websites
- APIs
- backend servers

In this project:

- `index.js` creates the server
- routes decide what happens for each URL
- middleware runs before routes or between them

## How To Run

```bash
npm start
```

Open `http://localhost:3000` in your browser.

## Core Concepts In This Project

### 1. Create an Express app

```js
const express = require('express');
const app = express();
```

This creates your Express application.

### 2. Start the server

```js
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

This tells the app to listen for requests on a port.

### 3. Routes

Routes are URLs your server responds to.

- `GET /` shows the homepage
- `GET /about` returns JSON
- `GET /hello/:name` uses a route parameter
- `GET /search?q=express` uses a query parameter
- `POST /users` reads JSON from the request body

### 4. Middleware

Middleware is a function that runs before your route finishes.

In this project:

- `express.json()` reads JSON request bodies
- the logger middleware prints every request in the terminal

### 5. Request data

Express gives you request data in a few common places:

- `req.params` for values like `/hello/burhan`
- `req.query` for values like `/search?q=node`
- `req.body` for JSON data sent in a POST request

## Routes To Try

In the browser:

- `http://localhost:3000/`
- `http://localhost:3000/about`
- `http://localhost:3000/hello/Burhan`
- `http://localhost:3000/search?q=express`

In Postman or Thunder Client:

- Method: `POST`
- URL: `http://localhost:3000/users`
- Body type: JSON

```json
{
  "name": "Burhan",
  "email": "burhan@example.com"
}
```

## What To Learn Next

After you understand this file, the next good topics are:

1. `app.put()` and `app.delete()`
2. Express Router
3. serving HTML and static files
4. connecting Express to MongoDB or MySQL
5. building a full REST API

## Small Practice Tasks

Try these yourself:

1. Add a `/contact` route
2. Add a `/sum?a=5&b=7` route that returns the total
3. Add validation so `/users` also checks for a password
4. Move routes into a separate file later when you feel comfortable
