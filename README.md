# 📚 Bookhub - Book Renting Platform (Practice Project)

A simple book renting platform built as a **practice project** to improve my skills in **Node.js and backend development**.  
This project focuses on authentication, REST APIs, MongoDB relations, and real-world backend logic.

---

## 🚀 Why I Created This Project

I created this project **purely for practice and learning purposes** while working with:

- Node.js & Express
- MongoDB & Mongoose
- JWT Authentication
- RESTful API design

The goal was to understand how a real application handles:
- Users
- Books
- Ownership and renting logic
- Authentication & authorization

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT (JSON Web Token)  
- **Security:** bcrypt (password hashing)  
- **Other Tools:** dotenv, cors, http-status-codes  

---

## 📦 Features

- User registration & login
- JWT-based authentication
- Upload books with owner reference
- Rent books from other users
- View:
  - Owned books
  - Lent books
  - Rented books
- Sort books by price
- Filter books by rent price range

---

## ⚙️ Usage

### 1️⃣ Clone the repository
```bash
git clone https://github.com/mahatabul/Bookhub.git
cd Bookhub
```
### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Create .env file
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_LIFETIME=1d
```

### 4️⃣ Start the server
```bash
npm start
```

Server will run at:
```bash
http://localhost:5000
```
### 📌 API Overview
Auth Routes
```bash
POST /api/auth/register

POST /api/auth/login

GET /api/auth/user (protected)

Book Routes

GET /api/books

POST /api/books (upload book – protected)

GET /api/books/sort/:order

GET /api/books/price/:lowprice/:highprice

POST /api/books/rent/:id

GET /api/books/owned

GET /api/books/lent

GET /api/books/rented
```
Most routes require authentication via Bearer Token

### ⚠️ Disclaimer

This project is not production-ready.
It was built only for learning and practice, and may not follow all best security or optimization practices.

### 📬 Contact

If you want to give feedback or suggestions:

Email: rozinislam2002@gmail.com

### ⭐ Notes

Feel free to fork this repository or use it as a reference while learning Node.js.

