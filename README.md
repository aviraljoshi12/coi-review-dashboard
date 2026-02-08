# COI Review Dashboard

A modern, responsive **COI (Certificate of Insurance) Review Dashboard** built with React.  
The application helps manage, review, and track insurance certificates for properties and tenants with a clean and intuitive user interface.

---

## 🔗 Live Demo

👉 **Live URL:** _(add your deployed link here)_

---

## 🛠 Tech Stack

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Routing:** React Router
- **Icons:** Lucide React
- **Storage:** Browser LocalStorage

---

## ✨ Key Features

### 📊 Dashboard Overview

- Summary cards displaying:
  - Total COIs processed
  - Accepted COIs
  - Rejected COIs
  - COIs expiring within 30 days
- Fully responsive layout

---

### 📋 COI Management Table

- View all COIs in a structured table
- Inline editing for:
  - Status
  - Expiry date
- Status color indicators:
  - Active (Blue)
  - Expired (Red)
  - Rejected (Red)
  - Expiring Soon (Orange)
  - Not Processed (Light Blue)

---

### 🔍 Search & Filters

- Search by:
  - Tenant name
  - Property
  - Unit
- Filters:
  - Properties (multi-select)
  - Status
  - Expiry date (ascending / descending)
- Debounced search for improved performance

---

### ➕ CRUD Operations

- Add new COIs using a modal form
- Edit existing COIs
- Delete COIs
- View COI details on a separate page using routing
- Form validation for required fields and email format

---

### 🔔 Bulk Actions

- Select multiple COIs using checkboxes
- Send bulk reminders with confirmation
- Reminder status tracking

---

### 📑 Pagination

- Rows per page selection
- Page navigation
- **Go to page** functionality

---

### ⚙️ Table Customization

- Toggle table columns using settings menu
- Table updates dynamically based on selected columns

---

### 💾 Data Persistence

- All data is stored in browser **LocalStorage**
- No backend dependency
- Data remains persistent across page reloads

---

## 🧩 Architecture Highlights

- Modular and scalable component structure
- Reusable UI components
- Centralized state handling using Context API
- Clean separation of UI, logic, and data layers

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the project

```bash
npm run dev
```

The application will be available at:
http://localhost:5173

---

### 👤 Author

**Aviral Joshi**  
Front-End Developer
