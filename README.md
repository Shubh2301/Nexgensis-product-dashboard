# Product Admin Dashboard

A responsive Product Admin Dashboard built with **React.js, Vite, Tailwind CSS, Axios, React Router, and DummyJSON API**.

The project demonstrates authentication, protected routes, product management, search, filtering, sorting, pagination, CRUD operations, URL query parameters, request cancellation, validation, and responsive UI.

## Features

* Login with DummyJSON authentication
* Protected product routes
* Logout functionality
* Product listing with thumbnails
* Search with debounce
* Category filtering
* Sorting by price, rating, and title
* Ascending and descending sorting
* Pagination with page-size selection
* Product details
* Add, edit, and delete products
* Delete confirmation
* URL query parameters
* Request cancellation with `AbortController`
* Loading, error, and empty states
* Responsive desktop table and mobile cards
* Custom 404 page

## Tech Stack

| Technology   | Purpose                       |
| ------------ | ----------------------------- |
| React.js     | UI development                |
| Vite         | Development and build tooling |
| Tailwind CSS | Styling and responsive design |
| Axios        | API requests                  |
| React Router | Routing and protected routes  |
| DummyJSON    | Demo REST API                 |
| JavaScript   | Application logic             |

## Project Structure

```text
src/
├── api/
│   ├── axios.js
│   ├── authApi.js
│   └── productApi.js
│
├── components/
│   ├── ProtectedRoute.jsx
│   ├── Loading.jsx
│   ├── ErrorMessage.jsx
│   └── EmptyState.jsx
│
├── hooks/
│   ├── useProducts.js
│   └── useDebounce.js
│
├── pages/
│   ├── Login.jsx
│   ├── Products.jsx
│   ├── ProductDetails.jsx
│   ├── AddProduct.jsx
│   ├── EditProduct.jsx
│   └── NotFound.jsx
│
├── utlis/
│   ├── auth.js
│   └── validation.js
│
├── App.jsx
├── main.jsx
└── index.css
```

> The project currently uses `utlis` as the utility folder name.

## API

Base URL:

```text
https://dummyjson.com
```

Main endpoints:

```text
POST   /auth/login

GET    /products
GET    /products/search
GET    /products/category/{category}
GET    /products/{id}
GET    /products/categories

POST   /products/add
PUT    /products/{id}
DELETE /products/{id}
```

## Authentication

After successful login, the access token is stored in `localStorage`.

Protected routes:

```text
/products
/products/add
/products/:id
/products/:id/edit
```

Axios adds the token to requests through a request interceptor.

## Product Dashboard

The dashboard supports:

* Search
* Debounced search
* Category filtering
* Sorting
* Pagination
* Page size: 10, 20, or 30

Dashboard state is reflected in URL query parameters.

Example:

```text
/products?page=1&limit=10&search=phone&sortBy=price&order=asc
```

## Product Management

### Product Details

```text
/products/:id
```

Displays product information such as title, price, category, rating, stock, brand, SKU, and image.

### Add Product

```text
/products/add
```

Validates required fields before sending the request.

### Edit Product

```text
/products/:id/edit
```

Loads the existing product, allows editing, and sends an update request.

### Delete Product

Deletes the selected product after confirmation and updates the current UI.

## Application Flow

```text
Login
  ↓
Token stored
  ↓
Protected Routes
  ↓
Products Dashboard
  ↓
Search / Filter / Sort / Pagination
  ↓
Product Details / Add / Edit / Delete
```

## Responsive Design

Desktop:

* Product table
* Full filtering controls
* Action buttons

Mobile:

* Product cards
* Responsive controls
* Compact product thumbnails

## Error & Loading Handling

Reusable components are used for:

* Loading states
* API errors
* Empty results
* Protected route handling
* Invalid product IDs
* 404 pages

Product requests use `AbortController` to cancel outdated requests when necessary.

## Installation

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Demo Credentials

```text
Username: emilys
Password: emilyspass
```

## Routes

```text
/                       → Redirect to login
/login                  → Login
/products               → Product dashboard
/products/add           → Add product
/products/:id           → Product details
/products/:id/edit      → Edit product
*                       → 404 page
```

## Notes

DummyJSON is a demo API, so create, update, and delete operations should not be treated as permanent database persistence.

## Submission Checklist

Before submitting:

```text
[ ] npm install works
[ ] npm run build succeeds
[ ] Login works
[ ] Protected routes work
[ ] Search and debounce work
[ ] Category filter works
[ ] Sorting works
[ ] Pagination works
[ ] Product details work
[ ] Add product works
[ ] Edit product works
[ ] Delete product works
[ ] Responsive layout checked
[ ] No unexpected console errors
```
