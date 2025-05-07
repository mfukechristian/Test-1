### ✅ Here's a **clean and professional `README.md`** file you can use for your project submission:

---

# 📝 Test 1: HTML Form with MongoDB Data Capture

This is a **full-stack JavaScript application** built to meet the requirements of **Test 1**, which involves capturing user data via an HTML form and storing it in a MongoDB database.

---

## 🧾 Project Overview

The app allows users to submit personal information including:

- Name
- Surname
- ID Number (must be exactly 13 digits)
- Date of Birth (in `dd/mm/yyyy` format)

Data is stored in a MongoDB database using Mongoose, and both **client-side** and **server-side validation** are implemented to ensure data integrity.

---

## 🔐 Key Features

- ✅ **Unique ID Number constraint**: Prevents duplicate entries in the database.
- ✅ **ID Validation**: Must be numeric and exactly 13 characters long.
- ✅ **Date of Birth Format**: Captured as `dd/mm/yyyy` using separate fields to enforce correct input.
- ✅ **Name & Surname Validation**: Only letters, spaces, hyphens (`-`), and apostrophes (`'`) are allowed.
- ✅ **User Feedback**: Informative alerts for errors like invalid ID or duplicate entry.
- ✅ **Form Repopulation**: Input remains when validation fails (standard browser behavior).

---

## 🛠️ Tech Stack

| Layer      | Technology                                |
| ---------- | ----------------------------------------- |
| Frontend   | HTML, CSS, Vanilla JavaScript             |
| Backend    | Node.js HTTP module                       |
| Database   | MongoDB + Mongoose                        |
| Validation | Regex and logic on both client and server |

---

## 📁 File Structure

```
project-folder/
│
├── index.html              # HTML form UI
├── styles.css              # Styling for the form
├── index.js                # Client-side JS handling form submission
│
├── server.js               # Node.js HTTP server
├── config.js               # DB connection setup
├── formModel.js            # Mongoose model for form data
├── formController.js       # Controller for POST route
│
└── README.md               # This file
```

---

## ▶️ How to Run

1. **Install dependencies**

   ```bash
   npm install mongoose
   ```

2. **Set up environment variables**
   Create a `.env` file at the root:

   ```
   MONGO_URI=mongodb://localhost:27017/formDB
   PORT=5000
   ```

3. **Start the server**

   ```bash
   node server.js
   ```

4. **Open the form**

   - Visit `http://localhost:5000` in your browser (you’ll need to serve the HTML file via a local server or open directly)

5. **Submit form data**
   - Fill out the form and click **POST** to save data to MongoDB

---

## 📌 Notes

- **Duplicate ID Numbers** will be rejected by the database, and the user will be alerted.
- The **form does not reset** on validation failure, preserving user input.
- Both **frontend and backend** validate all fields independently for robustness.

---
