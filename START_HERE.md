# AIS Integrated Systems - Start Here

## 1) Start XAMPP
Open XAMPP Control Panel, then start:
- Apache
- MySQL

## 2) Create the database in phpMyAdmin
Open:
```text
http://localhost/phpmyadmin
```

Then either:
- import the `schema.sql` file, or
- manually create database `ais-integrated-systems` and table `user`

## 3) Check your `.env`
Use these values for XAMPP:
```env
DB_HOST=localhost
DB_USER=root
DBPASSWORD=
DATABASE=ais-integrated-systems
DB_PORT=3306
PORT=3000
SECRET=ais_dev_secret_2026
ORIGIN=*
```

If your MySQL password is not blank, change `DBPASSWORD`.

## 4) Install packages
```bash
npm install
```

## 5) Start the server
```bash
npm run dev
```

## 6) Test in browser or Postman
Health:
```text
http://localhost:3000/health
```

Database connection check:
```text
http://localhost:3000/db-check
```

## 7) Insert values into the database
You have 2 easy options:
- Use `POST /user/register` in Postman
- Or insert rows manually in phpMyAdmin

Register request body:
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
