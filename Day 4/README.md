# Salesforce Interview Readiness Bootcamp - Day 4
## Gym Management System - First Lightning Web Component (LWC)

## 📌 Overview

On Day 4, I developed my first **Lightning Web Component (LWC)** as part of the Gym Management System project.

The objective was to understand how Salesforce builds the **user interface (UI)** using modern web technologies and how LWC acts as the presentation layer of a Salesforce application.

This component is currently designed to display Gym Member information. In the upcoming modules, it will be connected with Apex classes and the Salesforce database.

---

## 🎯 Learning Objectives

- Understand what Lightning Web Components (LWC) are.
- Learn the structure of an LWC.
- Create and deploy a Lightning Web Component.
- Understand the role of HTML, JavaScript, CSS, and Metadata.
- Learn how data flows from the UI to Apex.
- Build the first UI screen for the Gym Management System.

---

## 🏗️ Salesforce Architecture

```text
User
   │
   ▼
Lightning Web Component (UI)
   │
   ▼
Apex Controller
   │
   ▼
Service Layer
   │
   ▼
Repository Layer
   │
   ▼
Salesforce Database
```

---

## 📂 LWC Structure

### memberList.html

Responsible for:

- Page Layout
- Displaying Gym Members
- Lightning Card
- Lightning Data Table

---

### memberList.js

Responsible for:

- Business logic for the UI
- Calling Apex using @wire
- Storing records
- Handling errors
- Defining table columns

---

### memberList.js-meta.xml

Responsible for:

- Making the component available in Lightning App Builder
- Defining API Version
- Allowing deployment on:
  - App Page
  - Home Page
  - Record Page

---

## 📋 Component Developed

### Component Name

memberList

### Purpose

Displays the list of Gym Members using a Lightning Data Table.

Current Fields Displayed:

- Member ID
- Member Name
- Email
- Phone
- Status

---

## 🔄 Data Flow

```text
User
   │
   ▼
memberList (LWC)
   │
   ▼
MemberController
   │
   ▼
MemberService
   │
   ▼
MemberRepository
   │
   ▼
Gym_Member__c
```

---

## 💻 Technologies Used

- Salesforce Lightning Web Components
- HTML
- JavaScript
- CSS
- Apex
- SOQL
- Lightning App Builder

---

## 📖 What I Learned

- Introduction to Lightning Web Components.
- Structure of an LWC.
- Importance of HTML, JavaScript, CSS, and Metadata files.
- How to deploy an LWC using Lightning App Builder.
- How to retrieve Salesforce data using Apex and @wire.
- How enterprise applications separate responsibilities using Controller, Service, and Repository layers.

---

## 🚀 Future Enhancements

- Add Gym Member
- Update Gym Member
- Delete Gym Member
- Search Members
- Membership Management
- Trainer Management
- Payment Management
- Dashboard Analytics

---



## 📁 Project Structure

```text
force-app
│
├── classes
│   ├── MemberController.cls
│   ├── MemberService.cls
│   └── MemberRepository.cls
│
├── lwc
│   └── memberList
│       ├── memberList.html
│       ├── memberList.js
│       ├── memberList.css
│       └── memberList.js-meta.xml
│
└── objects
    └── Gym_Member__c
```

---

## 🎤 Interview Questions Covered

- What is Lightning Web Components (LWC)?
- Why did Salesforce introduce LWC?
- Difference between Aura Components and LWC.
- What are the files inside an LWC?
- What is the purpose of JavaScript in LWC?
- What is data binding?
- Can LWC directly execute SOQL?
- Why does LWC need Apex?
- What is the purpose of the metadata file?
- Explain the architecture of your Gym Management System.

---

## 👩‍💻 Author

**Kotha Syamala**

B.Tech - Information Technology

Vishnu Institute of Technology

Salesforce Developer | Java | Lightning Web Components
