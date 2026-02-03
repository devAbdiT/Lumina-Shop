# Lumina-Shop

Lumina Shop is a dynamic React e-commerce application featuring a robust product catalog with advanced filtering, real-time search, and dual-mode pagination (standard &amp; infinite scroll). Built with Redux Toolkit, TypeScript, and Tailwind CSS, it demonstrates complex client-side state management and includes a fully persistent shopping cart.

# Lumina E-Commerce: Technical Design Document

**Project Name:** Lumina Shop  
**Tech Stack:** React, Redux Toolkit, TypeScript, Tailwind CSS

---

## 1. Executive Summary

**Lumina Shop** is a modern, single-page e-commerce application designed to simulate a real-world shopping experience. The primary goal of this project is to build a robust, scalable frontend architecture that handles complex state management (filtering, sorting, pagination) and persistent user data (shopping cart) without relying on a dedicated backend team.

The application leverages **FakeStoreAPI** for raw data but implements an "Expanded Dataset Strategy" on the client side to simulate high-volume inventory, allowing us to test performance-heavy features like Infinite Scrolling and complex Redux logic.

---

## 2. System Architecture

### 2.1 High-Level Overview

The application follows a **Component-Based Architecture** managed by a global **Redux Store**. Data flows unidirectionally:

### 2.2 Tech Stack Justification

- **React 18**: For efficient DOM updates and component reusability.
- **TypeScript**: To ensure data integrity across the app (preventing "undefined" errors in the cart logic).
- **Redux Toolkit**: Chosen over Context API because of the complex state requirements (simultaneous filtering + sorting + pagination requires a centralized, traceable state container).
- **Tailwind CSS**: For rapid, utility-first styling that ensures mobile responsiveness by default.
- **Vite (ES Modules)**: For lightning-fast development and optimized production builds.

---

## 3. core Feature Specifications

### 3.1 The Product Catalog (The "Brain")

The core challenge is managing how products are displayed based on user input.

- **Data Source**: `services/productApi.ts` fetches 20 items and multiplies them by 5x (Total 100 items) to enable stress testing.
- **Filtering Logic**:
  - _Search_: Real-time string matching against product titles.
  - _Category_: Exact match filtering.
  - _Price_: Range-based filtering (Min/Max).
- **Sorting Logic**:
  - Ascending/Descending Price.
  - Rating Weight (simulating popularity).

### 3.2 Dual-Mode Pagination

To demonstrate frontend versatility, the application must support two distinct viewing modes, toggleable by the user:

1.  **Standard Pagination**: Traditional "Page 1 of 10" navigation. Better for specific item finding.
2.  **Infinite Scroll**: Modern feed-style navigation.
    - _Implementation_: Uses the **Intersection Observer API** via a custom hook (`useIntersectionObserver`). When the user scrolls to the bottom "sentinel" element, the app automatically dispatches a `loadMore` action.

### 3.3 Shopping Cart (Persistence)

- **Requirement**: Users must not lose their cart if they refresh the page.
- **Solution**: The Redux `cartSlice` subscribes to the `localStorage` API.
  - _On Init_: Hydrates state from `localStorage.getItem('lumina_cart')`.
  - _On Update_: Serializes and saves state to `localStorage`.
- **Math**: Calculations for Subtotal, Tax (estimated at 8%), and Grand Total happen in real-time within the `CartPage` component.

---

## 4. Directory Structure & File Responsibility

This structure is designed for scalability. If we were to add Auth or User Profiles later, they would slot in easily as new "slices" and "components".

```
/
├── components/           # The Building Blocks (View Layer)
│   ├── Header.tsx        # Navigation, Search Bar, Global Cart Indicator
│   ├── FilterSidebar.tsx # Controls for Redux Filtering Logic
│   ├── ProductList.tsx   # The Grid + Infinite Scroll Trigger
│   ├── ProductCard.tsx   # Individual Item UI
│   ├── ProductDetail.tsx # Full page view with Gallery & Reviews
│   └── CartPage.tsx      # Cart Management & Summary Calculation
│
├── services/             # The Bridge to the Outside World
│   └── productApi.ts     # Fetches & Normalizes data from FakeStoreAPI
│
├── store/                # The Brain (State Layer)
│   ├── index.ts          # Store Configuration
│   └── slices/
│       ├── productSlice.ts # Complex logic: Filters, Sorts, Pagination
│       └── cartSlice.ts    # CRUD logic: Add, Remove, Update Qty, LocalStorage
│
├── hooks/                # Custom Tools
│   └── useIntersectionObserver.ts # Abstracted logic for detecting scroll position
│
└── types.ts              # The Dictionary (Type Definitions)
```

---

## 5. Setup & Development

To spin up this project locally:

1.  **Prerequisites**: Node.js v16+
2.  **Installation**:
    ```bash
    npm install
    ```
3.  **Execution**:
    ```bash
    npm start
    ```

---

## 7. Future Roadmap (Post-MVP)

1.  **Authentication**: Integrate Firebase or Auth0 to allow users to save carts across devices.
2.  **Checkout Integration**: Connect the "Checkout" button to Stripe API.
3.  **Favorites/Wishlist**: A separate list in Redux for "Saved for Later" items.
