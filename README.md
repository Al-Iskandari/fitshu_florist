## 💐 Florist Online Store 💐

![flower-shop](https://github.com/user-attachments/assets/70c267db-b2f5-43d7-9245-4c39e2b040f2)

This project is a web application for a florist online store, built with React, Vite, Tailwind CSS and using Google Sheets and WhatsApp for features such as product management and customer communication.

## 💻 Technologies Used

- React
- Vite
- Tailwind CSS
- Google Sheets API
- WhatsApp API
- JavaScript
- PostCSS
- ESLint

## 📂 Project Architecture

### 📁 public/

Static resources that will be served directly.

- `favicon.png`, `vite.svg`, etc.: Standard icons and images.

- `fitshuflorist*.png`: Images related to the florist's brand (logo, etc.).

### 📁 src/

Main source code of the application.

- `App.jsx`, `App.css`: Main component and its styles.
- `main.jsx`: Entry point of the application.
- `index.css`: Global styles.
- `assets/`: Other resources, such as images.
- `components/`: Reusable React components.
- `Layout/`: Page layout components.
- `Navbar.jsx`: Navigation bar component.
- `Footer.jsx`: Footer component.
- `context/`: Defines contexts for global state management.
- `ShopContext.jsx`: Context for store data (cart, products, etc.).
- `pages/`: Components that represent the different pages of the application.
- `Home.jsx`, `ProductList.jsx`, `ProductDetail.jsx`, `Cart.jsx`, `Checkout.jsx`, `Wishlist.jsx`, `TransactionHistory.jsx`: Pages for product listing, details, shopping cart, checkout, wishlist and transaction history.
- `services/`: Logic for communicating with external services.
- `googleSheetsService.js`: Interaction with the Google Sheets API (probably for managing products).
- `whatsappService.js`: Integration with the WhatsApp API (possibly for communicating with customers).


This structure suggests a complete and well-organized web application for an online flower shop. Integration with Google Sheets and WhatsApp is an interesting differential for product management and customer communication.
