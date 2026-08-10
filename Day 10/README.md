# 🏋️ Gym Management System

A Salesforce-based Gym Management System developed using **Apex, Lightning Web Components (LWC), SOQL, Flows, Triggers, Scheduled Apex, Reports and Dashboards**.

## 📌 Project Overview

The Gym Management System helps gym administrators manage:

* Gym Members
* Trainers
* Memberships
* Payments
* Membership expiry
* Membership renewal
* Payment history
* Gym dashboard and reports

The application provides a centralized Salesforce solution for managing gym operations and tracking member activities.

---

## 🏗️ Technology Stack

* Salesforce
* Apex
* SOQL
* SOSL
* Lightning Web Components (LWC)
* Lightning Data Service
* Record-Triggered Flows
* Scheduled Apex
* Apex Triggers
* HTML
* JavaScript
* CSS
* Salesforce Reports
* Salesforce Dashboards
* VS Code
* Salesforce CLI
* Git
* GitHub

---

## 📊 Salesforce Data Model

### Gym Member

`Gym_Member__c`

Important fields:

* Member ID
* Name
* Phone
* Email
* Gender
* Date of Birth
* Join Date
* Address
* Age
* Last Payment Date
* Status

### Trainer

`Trainer__c`

Important fields:

* Trainer ID
* Trainer Name
* Email
* Phone
* Experience
* Specialization

### Membership

`Membership__c`

Important fields:

* Membership Name
* Gym Member
* Trainer
* Membership Type
* Fee
* Start Date
* End Date
* Status

Membership types:

* Monthly
* Quarterly
* Half-Yearly
* Annual

### Payment

`Payment__c`

Important fields:

* Payment ID
* Gym Member
* Membership
* Amount
* Payment Date
* Payment Method
* Payment Status

---

## 🧩 LWC Architecture

```text
Gym Dashboard
│
├── Gym Member List
│   └── Status Badge
│
├── Gym Member Form
│
├── Membership List
│   └── Membership Card
│
├── Payment History
│
└── Trainer List
```

Each component has a focused responsibility.

---

## 🔄 Component Communication

### Parent → Child

Public properties using `@api` are used when a parent needs to provide information to a child component.

Example:

```html
<c-status-badge
    status={member.Status__c}>
</c-status-badge>
```

### Child → Parent

Custom events are used when a child needs to notify the parent that an action occurred.

Example:

```javascript
this.dispatchEvent(
    new CustomEvent('renew', {
        detail: {
            membershipId: this.membership.Id
        }
    })
);
```

---

## ⚡ Apex

Apex is used when server-side business logic or custom queries are required.

Main classes include:

* `GymMemberController`
* `PaymentController`
* `MembershipRenewalService`

---

## 🔥 Apex Trigger

### Payment Trigger

When a payment is marked as `Paid`, the related Gym Member's `Last_Payment_Date__c` is updated.

```text
Payment Created
      ↓
Payment Status = Paid
      ↓
Payment Trigger
      ↓
Gym Member Updated
      ↓
Last Payment Date Updated
```

---

## ⏰ Membership Expiry

Scheduled Apex is used to identify memberships whose end date has passed.

```text
Scheduled Job
      ↓
Find expired memberships
      ↓
Update Status
      ↓
Expired
```

---

## 🔄 Membership Renewal

The Membership Renewal Service creates a new membership based on the previous membership.

Supported durations:

```text
Monthly      → 1 Month
Quarterly    → 3 Months
Half-Yearly  → 6 Months
Annual       → 12 Months
```

---

## 🔁 Flow Automation

A Record-Triggered Flow is used for automated membership-related processing.

Example:

```text
Gym Member Created
        ↓
Record-Triggered Flow
        ↓
Create Membership
        ↓
Membership Active
```

---

## 📈 Dashboard

The Salesforce dashboard provides important gym metrics such as:

* Total Members
* Active Members
* Expired Members
* Payment History
* Total Payments

---

## 🛡️ Validation

The application uses both client-side and server-side validation.

### Client-Side

LWC validates user input before sending the request.

### Server-Side

Apex and Salesforce validation rules enforce business integrity.

Client-side validation improves user experience, while server-side validation remains authoritative for business rules.

---

## ♻️ Reusable Components

Reusable components include:

* `statusBadge`
* `membershipCard`
* `emptyState`

Reusable components reduce duplication and allow the same functionality to be used in multiple screens.

---

## 📁 Project Structure

```text
Gym-Management-System/
│
├── README.md
├── force-app/
│   └── main/
│       └── default/
│           ├── classes/
│           ├── triggers/
│           ├── objects/
│           ├── lwc/
│           ├── flows/
│           ├── reports/
│           └── dashboards/
│
├── scripts/
│   └── apex/
│
└── docs/
```

---

## 🚀 Key Features

* Gym member management
* Trainer management
* Membership management
* Payment management
* Membership expiry automation
* Membership renewal
* Payment history
* Dashboard
* Reports
* LWC-based UI
* Parent-child component communication
* Custom LWC events
* Apex server-side logic
* Salesforce Flow automation
* Scheduled Apex
* Reusable components

---

## 🎯 Learning Outcomes

This project demonstrates practical Salesforce development concepts including:

* Salesforce Data Modeling
* Apex
* SOQL
* Triggers
* Governor Limits
* Bulkification
* Asynchronous Apex
* Scheduled Apex
* Flow Builder
* Lightning Web Components
* `@api`
* `@wire`
* Custom Events
* Lightning Data Service
* Client-side Validation
* Server-side Validation
* Component Communication
* Reusable LWC Architecture

---

## 👨‍💻 Project Goal

The goal of this project is to demonstrate how Salesforce technologies can work together to build a complete business application rather than isolated components.

```text
User
 ↓
LWC
 ↓
Apex
 ↓
Service / Business Logic
 ↓
Salesforce Database
 ↓
Trigger / Automation
 ↓
UI Refresh
```
