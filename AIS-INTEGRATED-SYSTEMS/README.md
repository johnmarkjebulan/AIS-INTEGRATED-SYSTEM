# AIS Integrated Systems - Adapter Layer Activity

This version completes the flow written on the board:

```txt
Student Portal
→ Auth System
→ Adapter Layer
→ Legacy System
→ Adapter Layer converts the legacy data back
→ Student Portal displays the Student Profile
```

## What was added

1. **Fetch Student Profile** endpoint.
2. **Adapter Layer reverse conversion** from legacy format to portal format.
3. **Student Portal demo page** at `http://localhost:3000/portal`.
4. **MySQL schema** with `legacyStudentId`, so the logged-in student can fetch their own linked legacy profile.
5. **Tests** for adapter conversion and legacy fetching logic.

## Install and run

```bash
npm install
```

Create the database by importing `schema.sql` in phpMyAdmin or MySQL.

Run the Auth System + Student Portal:

```bash
npm start
```

Open:

```txt
http://localhost:3000/portal
```

Optional: run the adapter layer as a separate server:

```bash
npm run adapter
```

Adapter server URL:

```txt
http://localhost:5000/user/profile/:legacyStudentId
```

## Main endpoints

### Register student and sync to legacy

```txt
POST http://localhost:3000/user/register
```

Body:

```json
{
  "email": "juan@example.com",
  "password": "12345678",
  "firstName": "Juan",
  "lastName": "Dela Cruz",
  "dob": "2004-05-20",
  "course": "BSIT",
  "major": "Business Analytics",
  "address": "Manila",
  "status": "Regular"
}
```

### Login

```txt
POST http://localhost:3000/user/login
```

### Fetch logged-in student's profile

```txt
GET http://localhost:3000/user/profile
Authorization: Bearer YOUR_TOKEN_HERE
```

### Fetch profile by legacy student id

```txt
GET http://localhost:3000/user/profile/:legacyStudentId
```

## Adapter conversion

Your Auth System / Student Portal format:

```json
{
  "firstName": "Juan",
  "lastName": "Dela Cruz",
  "dob": "2004-05-20",
  "course": "BSIT",
  "major": "Business Analytics",
  "address": "Manila",
  "status": "Regular"
}
```

Legacy System format:

```json
{
  "name": "Juan Dela Cruz",
  "birthdate": "2004-05-20",
  "program": "BSIT Business Analytics",
  "address": "Manila",
  "studentStatus": "Regular"
}
```

The adapter translates between those two formats.

## Test

```bash
npm test
```
