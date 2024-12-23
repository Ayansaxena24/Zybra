# User Management Table

A simple web application built using **Next.js**, **Shadcn**, **TanStack Query**, and **TanStack Table**. This application demonstrates fetching, displaying, and managing data from a public API with features like search, sorting, filtering, and pagination.

---

## **Features**

### 1. Data Fetching
- Fetches user data from the **[JSONPlaceholder API](https://jsonplaceholder.typicode.com/users)**.
- Utilizes **TanStack Query** for efficient data fetching and caching.

### 2. Table Features
- **Sorting**: Sort data by columns `Name` and `Email` columns.
  
  ![Home](https://github.com/user-attachments/assets/983afabf-7696-4a2c-8c26-69c2315de4a7)
  
- **Filtering**: Column-specific filtering (e.g., filter users by name or email).

  ![filter + sort](https://github.com/user-attachments/assets/f225a246-22fc-4856-bb3d-d73be622d586)
  
- **Search**: Global search input to filter data across all columns.
- **Pagination**: Paginated data display with dynamic routing support (e.g., `/users?page=1&limit=5`).

  ![Select](https://github.com/user-attachments/assets/40b33c06-1b17-45eb-94de-adb83cfb62d0)


### 3. UI/UX
- Built with **Shadcn** for a clean, responsive, and user-friendly interface.
- Includes loading states and error handling for better user experience.

---

## **Tech Stack**

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Shadcn](https://shadcn.dev/) and [TailwindCSS](https://tailwindcss.com/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/v4)
- **Table Management**: [TanStack Table](https://tanstack.com/table/v8)
- **Animation**: [Framer Motion](https://motion.dev/)

---

## **Installation**

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Ayansaxena24/Zybra.git
   cd user-management-table
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open the application in your browser:
   ```bash
   http://localhost:3000
   ```

## **Usage**

### **Table Features:**
- Use the **global search input** to search across all columns.
- Click on column headers to **sort data**.
- Use the filter fields under each column header to **filter by specific columns**.
- Navigate through pages using the **pagination controls**.

---

## **Deployment**

This application is hosted on **Vercel**. You can view the live demo here:  
[Live Demo](https://zybra-peach.vercel.app/)

---

## **Approach**

### 1. **Fetching Data**
- Used `useQuery` from **TanStack Query** to efficiently fetch and cache data from the API.

### 2. **Table Setup**
- Configured table columns with **sorting**, **filtering**, and **pagination** using **TanStack Table**.

### 3. **Styling**
- Styled the application using **Shadcn** components to ensure consistency and responsiveness.

### 4. **Dynamic Routing**
- Integrated **Next.js dynamic routes** for pagination support.

---

## **Challenges Faced**

### 1. **API Pagination**
- The JSONPlaceholder API does not support native pagination, so mock pagination was implemented on the client side.

### 2. **UI Consistency**
- Ensured that all components adhered to a uniform design system using **Shadcn**.

### 3. **Performance Optimization**
- Minimized re-renders and optimized data fetching using **TanStack Query** for caching and efficient state management.

   
