# Ynov Web services Hacking challenge

## 🤝 - Our teams

- Anthony Lalba
- Ilias Ouandouri
- Frédéric Macabiau

## 🚀 - Quick start

```sh
cd ynov-webservices-hacking

# Copy dotenv file
cp .env.example .env

# Install dependencies and start the development server
npm i ; npm run dev
```

## 🫡 - Usage

Workings URLs:
- GET `http://localhost:3000/v1/books`
- POST `http://localhost:3000/v1/books` (requires JWT token with write access)
- GET `http://localhost:3000/v1/books/:id`
- PUT `http://localhost:3000/v1/books/:id` (requires JWT token with write access)
- DELETE `http://localhost:3000/v1/books/:id` (requires JWT token with write access)
- GET `http://localhost:3000/v1/movies`
- POST `http://localhost:3000/v1/movies` (requires JWT token with write access)
- GET `http://localhost:3000/v1/movies/:id`
- PUT `http://localhost:3000/v1/movies/:id` (requires JWT token with write access)
- DELETE `http://localhost:3000/v1/movies/:id` (requires JWT token with write access)

## 📚 - Documentation

Generate a JWT token for testing:
```sh
node generateToken.js
```

Using the API to create a new book:

```js
async function addBook() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IndyaXRlciIsImlhdCI6MTc2MTY2Mzc2NCwiZXhwIjoxNzYxNjY3MzY0fQ.0vva8cwxA2ogXRSD26oTxsIxOkzF2BRr5JW9d8-6R3w";

  const response = await fetch("http://localhost:3000/api/books", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: "La Horde du Contrevent",
      author: "Alain Damasio"
    })
  });

  const data = await response.json();
  console.log("Réponse API:", data);
}

addBook();
```
