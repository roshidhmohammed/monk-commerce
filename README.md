# Monk Commerce - Frontend
This readme file provides details such as the Deployment URL, project overview, technologies used, approach taken to implement features and solve problems, amnd the application architecture.

## Deployment URL
 - Live Link - https://695fc481f76af1b540be7c43--monk-commerce-1.netlify.app/

## Project Overview
  This application aims to:
  - Display a product list with **infinite scrolling**
  - Add products and their variants to a **selected products list**
  - Apply **discount types** and **discount percentages**
  - Reorder the selected product list using **drag-and-drop functionality**
  - Replace products or variants from the fetched product list

 ## Technologies Used
 - **React** – Frontend library for building the user interface.
 - **TailwindCSS** – Utility-first CSS framework for styling.
 - **React Router DOM** – For handling application routing.
 - **@hello-pangea/dnd** - For implementing the drag and drop feature.
 - **@reduxjs/toolkit** - For state management and sharing state across components.

 ## Approach used to implement features
 - In this project, the product selected by the user from the fetched product list are stored in the **Redux store** to make the data accesible across multiple components.
 - But if the user refreshes the page, then all the datas/state is lost (not persisting).
 - Alternatives consideration for persisting data outside Redux include:
    - **Local Storage** - Limited to 5MB, synchronous in nature, and not suitable for large datasets
    - **Index DB** - Suitable for large data sets
 - Image sizes were optimized to improve application performance, especially on smaller devices.
 - **Function recursion** was utilized to maintain code reusability for both product-level and variant-level tables.
 - Custom utility classes and variables were created in the `index.css` file using Tailwind CSS features to ensure **reusability, extensibility, and maintainability**.


## Application Architecture
The application architecture and codebase are organized into pages, components, common components, helpers, hooks, assets, and utils to ensure the project is  **extensible, maintainable, and readable**.
 
 - **Pages** – The entire application UI is categorized into pages, making it easy to extend the application by adding new pages/components/features.
 - **components/** – Each page is divided into different sections/components and the codebase for each section is defined here, excluding commonly used components such as Button, Header, and others.
 - **common/** – Contains all reusable UI component such as buttons, header, etc...
 - **utils/slices/** – Contains Redux slice files, each responsible for handling a specific state or operation within the Redux store.
 - **hooks/** - Contains the custom hook used across the application.
 - **assets** - Contains the logos and icon svg assets.
 - **Index.css** - Contains all custom CSS properties and Tailwind utility extensions.
 
