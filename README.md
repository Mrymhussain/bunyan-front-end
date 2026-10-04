# BUNYAN

![BUNYAN Logo](./assets/bunyan-logo.png)

BUNYAN is an engineering and property services platform that brings clients, engineers, specialists, and building-material suppliers together in one place.

A client can use the platform to start a full engineering project involving areas such as architecture, civil engineering, electrical/MEP, and interior design. They can also request a consultation with an engineer, find a specialist for a smaller job, browse building materials, place orders, and follow the progress of their requests.

The aim of BUNYAN is to make the process of building, renovating, or finding the right service easier by having the main services in one platform.

---

## Back-End Application

The FastAPI back-end and API endpoints can be viewed here:

[BUNYAN Back-End](https://github.com/Mrymhussain/bunyan-back-end)

---

## Getting Started

### Deployed App

Deployment link will be added once the project is deployed.

### Wireframes

The wireframes were planned and created using Excalidraw.

[View Excalidraw](https://excalidraw.com/)

### Front-End Repository

[BUNYAN Front-End](https://github.com/Mrymhussain/bunyan-front-end)

### Back-End Repository

[BUNYAN Back-End](https://github.com/Mrymhussain/bunyan-back-end)

---

## Planning

### ERD

The ERD shows the main entities in the system and how they are related.

![BUNYAN ERD](./assets/bunyan-erd.png)

The main entities planned for the system are:

- User
- Project
- ProjectMember
- Consultation
- ServiceRequest
- ServiceCategory
- Material
- Order
- OrderItem
- Review

---

## Component Hierarchy

The component hierarchy shows how the front-end application is planned and how the main pages and components are connected.

![BUNYAN Component Hierarchy](./assets/component-hierarchy.png)

---

## User Stories

### Users

- As a user, I want to create an account so I can use the platform.
- As a user, I want to sign in so I can access my account.
- As a user, I want to sign out when I finish using the application.
- As a user, I want to view and update my profile.

### Projects

- As a client, I want to start a new project.
- As a client, I want to enter the details of my project.
- As a client, I want to choose the engineering services needed for my project.
- As a client, I want to view all of my projects.
- As a client, I want to view the status and progress of a project.
- As a client, I want to edit my own project.
- As a client, I want to see the professionals working on my project.

### Professionals

- As a client, I want to browse engineers and specialists.
- As a client, I want to search for a professional by specialty.
- As a client, I want to view a professional's profile before requesting a service.
- As a client, I want to view ratings and reviews for professionals.

### Consultations

- As a client, I want to request a consultation with an engineer.
- As a client, I want to choose a preferred date and time for the consultation.
- As a client, I want to view the status of my consultation.
- As an engineer, I want to view consultation requests sent to me.
- As an engineer, I want to update the status of a consultation.

### Services

- As a client, I want to browse services for smaller jobs.
- As a client, I want to find a specialist for a specific service.
- As a client, I want to submit a service request.
- As a client, I want to follow the status of my service request.
- As a specialist, I want to view requests assigned to me.
- As a specialist, I want to update the status of a request.

### Materials and Orders

- As a client, I want to browse building materials.
- As a client, I want to view the price and details of a material.
- As a client, I want to place an order for materials.
- As a client, I want to follow the status of my order.
- As a supplier, I want to add and manage materials.
- As a supplier, I want to view and update orders.

### Reviews

- As a client, I want to leave a rating and review.
- As a client, I want to edit my own review.
- As a client, I want to delete my own review.

---

## Front-End Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/sign-up` | Sign Up |
| `/sign-in` | Sign In |
| `/dashboard` | Dashboard |
| `/profile` | Profile |
| `/profile/edit` | Edit Profile |
| `/projects` | Projects |
| `/projects/new` | Create Project |
| `/projects/:projectId` | Project Details |
| `/projects/:projectId/edit` | Edit Project |
| `/professionals` | Engineers and Specialists |
| `/engineers/:engineerId` | Engineer Profile |
| `/engineers/:engineerId/consultation` | Request Consultation |
| `/consultations` | Consultations |
| `/consultations/:consultationId` | Consultation Details |
| `/services` | Services and Materials |
| `/specialists/:specialistId` | Specialist Profile |
| `/specialists/:specialistId/request` | Request Service |
| `/service-requests` | Service Requests |
| `/service-requests/:requestId` | Service Request Details |
| `/materials` | Materials |
| `/materials/:materialId` | Material Details |
| `/materials/new` | Add Material |
| `/materials/:materialId/edit` | Edit Material |
| `/orders` | Orders |
| `/orders/:orderId` | Order Details |
| `/reviews/new/:userId` | Add Review |

---

## Wireframes

The main screens planned for BUNYAN are:

1. Home
2. Sign Up
3. Sign In
4. What Do You Need?
5. Dashboard
6. Projects
7. Create / Edit Project
8. Project Details
9. Professionals
10. Services & Materials

The wireframes were created using Excalidraw.

[Excalidraw](https://excalidraw.com/)

---

## Tools Used

The tools used so far for planning and setting up the project are:

- Git
- GitHub
- Visual Studio Code
- Excalidraw

---

## Attributions

External resources that require attribution will be added here during development.