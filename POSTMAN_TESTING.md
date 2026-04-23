# Postman Testing Guide

## Important when using VS Code Postman
- Choose the HTTP method from the dropdown on the left.
- In the URL box, type only the URL.
- Do not type `GET http://...` or `POST http://...` in the URL box.

Correct example:
- Method: `GET`
- URL: `http://localhost:3000/health`

## 1) Health check
- Method: `GET`
- URL: `http://localhost:3000/health`
- Body: `none`

Expected response:
```json
{
  "success": true,
  "message": [
    { "result": "Server is healthy." }
  ]
}
```

## 2) Check XAMPP database connection
- Method: `GET`
- URL: `http://localhost:3000/db-check`
- Body: `none`

If this works, your app is connected to MySQL/XAMPP.

## 3) Insert a user using Postman
- Method: `POST`
- URL: `http://localhost:3000/user/register`
- Body -> `raw` -> `JSON`
- Header: `Content-Type: application/json`

Body:
```json
{
  "name": "Juan Dela Cruz",
  "email": "juan@example.com",
  "password": "12345678",
  "birthdate": "2004-05-20",
  "address": "Manila",
  "program": "BSIT",
  "studentStatus": "Regular"
}
```

Expected response:
```json
{
  "success": true,
  "message": [
    { "result": "A new account has been created!" }
  ]
}
```

## 4) Login in Postman
- Method: `POST`
- URL: `http://localhost:3000/user/login`
- Body -> `raw` -> `JSON`
- Header: `Content-Type: application/json`

Body:
```json
{
  "email": "juan@example.com",
  "password": "12345678"
}
```

## 5) If Postman says "Could not send request"
Check these first:
- The server is running in the terminal
- You used only the URL in the URL box
- For GET requests, Body is `none`
- For POST requests, Body is `raw` -> `JSON`
- XAMPP MySQL is running
