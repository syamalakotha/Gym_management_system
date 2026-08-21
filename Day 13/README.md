# 🏋️ Gym Management System – Salesforce

> A complete Salesforce-based Gym Management System designed to manage gym members, trainers, memberships, payments, automation, reporting, dashboards, and secure access.

![Salesforce](https://img.shields.io/badge/Salesforce-CRM-00A1E0?logo=salesforce\&logoColor=white)
![Apex](https://img.shields.io/badge/Apex-Programming-blue)
![LWC](https://img.shields.io/badge/LWC-Lightning%20Web%20Components-00A1E0)
![SOQL](https://img.shields.io/badge/SOQL-Database-orange)
![Flows](https://img.shields.io/badge/Salesforce-Flows-purple)
![Git](https://img.shields.io/badge/Git-Version%20Control-red)

---

# 📌 Project Overview

The **Gym Management System** is a Salesforce application developed to digitize and automate the daily operations of a gym.

The system provides a centralized platform for managing:

* Gym Members
* Trainers
* Memberships
* Payments
* Membership expiry
* Membership renewals
* Automated record creation
* Payment tracking
* Member status
* Reports
* Dashboards
* Lightning Web Components
* Apex automation
* Scheduled processing
* Security and access control

The project demonstrates how Salesforce can be used to build a complete business application using **Declarative Development + Programmatic Development**.

---

# 🎯 Project Objectives

The main objectives of the project are:

* Maintain centralized member information.
* Manage trainers and their specializations.
* Create and track gym memberships.
* Record and monitor payments.
* Automatically update member payment information.
* Automatically expire memberships.
* Automate membership creation.
* Provide membership renewal functionality.
* Build a user-friendly Lightning interface.
* Generate business reports and dashboards.
* Implement Salesforce security and access control.
* Follow Salesforce development and deployment best practices.

---

# 🏗️ System Architecture

```text
                         GYM MANAGEMENT SYSTEM
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
              ▼                   ▼                   ▼
          Gym Members          Trainers          Memberships
              │                                       │
              │                                       │
              └───────────────────┬───────────────────┘
                                  │
                                  ▼
                              Payments
                                  │
                  ┌───────────────┼───────────────┐
                  │               │               │
                  ▼               ▼               ▼
               Apex            Flows            LWC
                  │               │               │
                  └───────────────┼───────────────┘
                                  │
                                  ▼
                         Reports & Dashboard
```

---

# 🗂️ Salesforce Data Model

The application consists of four major custom objects:

```text
Gym Member
    │
    ├────────────── Membership
    │                    │
    │                    └────────── Payment
    │
    └────────────── Payment

Trainer
    │
    └────────────── Membership
```

---

# 👤 1. Gym Member

**Object:** `Gym_Member__c`

This object stores information about gym members.

### Important Fields

| Field             | Purpose                          |
| ----------------- | -------------------------------- |
| Member ID         | Auto-generated member identifier |
| Name              | Member name                      |
| Phone             | Member contact number            |
| Email             | Member email address             |
| Gender            | Member gender                    |
| Date of Birth     | Member DOB                       |
| Age               | Member age                       |
| Join Date         | Date of joining                  |
| Address           | Member address                   |
| Training Goal     | Member's fitness goal            |
| Last Payment Date | Latest successful payment date   |
| Status            | Current member status            |

### Member Status

```text
Active
Expired
Canceled
```

---

# 🏋️ 2. Trainer

**Object:** `Trainer__c`

The Trainer object manages trainer information.

### Important Fields

| Field          | Purpose                           |
| -------------- | --------------------------------- |
| Trainer ID     | Auto-generated trainer identifier |
| Trainer Name   | Trainer name                      |
| Email          | Trainer email                     |
| Phone          | Contact number                    |
| Experience     | Years of experience               |
| Specialization | Trainer specialization            |

### Trainer Specializations

* Weight Training
* Cardio
* Yoga
* CrossFit
* Zumba
* Personal Training

---

# 🎫 3. Membership

**Object:** `Membership__c`

This object manages membership plans assigned to gym members.

### Important Fields

| Field           | Purpose                    |
| --------------- | -------------------------- |
| Membership Name | Membership identifier/name |
| Gym Member      | Lookup to Gym Member       |
| Trainer         | Lookup to Trainer          |
| Membership Type | Type of membership         |
| Fee             | Membership fee             |
| Start Date      | Membership start date      |
| End Date        | Membership expiry date     |
| Status          | Current membership status  |

### Membership Types

```text
Monthly
Quarterly
Half-Yearly
Annual
```

---

# 💳 4. Payment

**Object:** `Payment__c`

The Payment object stores payment transactions made by gym members.

### Important Fields

| Field          | Purpose                           |
| -------------- | --------------------------------- |
| Payment ID     | Auto-generated payment identifier |
| Gym Member     | Related member                    |
| Membership     | Related membership                |
| Amount         | Payment amount                    |
| Payment Date   | Date of payment                   |
| Payment Method | Payment method                    |
| Payment Status | Payment status                    |

### Payment Status

```text
Paid
Pending
```

---

# 🔗 Object Relationships

The main relationships are:

```text
Gym Member
     │
     ├── Membership
     │       │
     │       └── Trainer
     │
     └── Payment
             │
             └── Membership
```

These relationships allow the application to connect:

**Member → Membership → Trainer → Payment**

and provide a complete view of a member's gym activity.

---

# ⚙️ Automation

Automation is implemented using both **Salesforce Flow** and **Apex**.

---

# 🔄 1. Automated Membership Creation

A **Record-Triggered Flow** is used to automate membership creation when a new Gym Member is created.

### Flow

```text
Gym Member Created
        │
        ▼
Record-Triggered Flow
        │
        ▼
Create Membership
        │
        ├── Membership Type → Monthly
        ├── Status → Active
        ├── Start Date → Member Join Date
        ├── Fee → ₹1000
        └── Gym Member → Triggering Member
```

This reduces manual work and ensures that new members receive an initial membership automatically.

---

# 💰 2. Payment Automation

An Apex Trigger is used on `Payment__c`.

### Business Logic

When a payment is created with:

```text
Payment Status = Paid
```

the system updates the related Gym Member's:

```text
Last Payment Date
```

using the Payment Date.

### Flow

```text
Payment Created
      │
      ▼
Payment Status = Paid?
      │
     Yes
      │
      ▼
Update Gym Member
      │
      ▼
Last Payment Date = Payment Date
```

---

# ⏰ 3. Scheduled Membership Expiry

The system uses **Scheduled Apex** to automatically identify expired memberships.

### Apex Class

```text
MembershipExpiryScheduler
```

### Logic

The scheduler identifies memberships where:

```text
End Date < TODAY
AND
Status = Active
```

and changes the membership status to:

```text
Expired
```

### Process

```text
Scheduled Job
      │
      ▼
Find expired memberships
      │
      ▼
End Date < Today?
      │
      ▼
Status = Active?
      │
      ▼
Update Status
      │
      ▼
Expired
```

This eliminates the need for administrators to manually check expired memberships.

---

# 🔁 4. Membership Renewal

Apex is used to implement membership renewal functionality.

### Service Class

```text
MembershipRenewalService
```

The renewal service:

1. Accepts a Membership record ID.
2. Retrieves the membership.
3. Validates the membership.
4. Determines the new start date.
5. Determines the new end date.
6. Calculates the renewal period based on membership type.
7. Updates the membership accordingly.

### Renewal Types

```text
Monthly
Quarterly
Half-Yearly
Annual
```

---

# 💻 Lightning Web Components

The project uses **Lightning Web Components (LWC)** to provide a modern user interface.

## Member Console

A Member Console was designed to provide:

* Member List
* Member Profile
* Member information
* Membership information
* Add Member functionality
* Interactive UI

### Component Structure

```text
Member Console
│
├── Member List
│
├── Member Profile
│
└── Add Member
       │
       ├── Name
       ├── Phone
       ├── Email
       ├── Gender
       ├── Date of Birth
       ├── Join Date
       ├── Address
       └── Training Goal
```

The LWC communicates with Apex to retrieve Salesforce data and perform application operations.

---

# ☁️ Apex Development

Apex is used wherever business logic requires programmatic processing.

### Main Apex Components

```text
GymManagementController
MembershipRenewalService
MembershipExpiryScheduler
Payment Trigger
```

---

# 🎮 GymManagementController

The controller provides server-side methods for the Lightning Web Components.

Typical operations include retrieving:

* Gym Members
* Memberships
* Member-related information

The controller uses **SOQL** to query Salesforce records.

Example architecture:

```text
LWC
 │
 ▼
GymManagementController
 │
 ▼
SOQL
 │
 ▼
Salesforce Database
 │
 ▼
Returned Data
 │
 ▼
LWC
```

---

# ⚡ Apex Trigger

The Payment Trigger performs payment-related automation.

### Trigger Requirement

```text
When Payment Status = Paid
        ↓
Update related Gym Member
        ↓
Set Last Payment Date
```

The logic is designed to process records programmatically rather than relying on manual updates.

---

# ⏳ Asynchronous Apex

The project also demonstrates Salesforce asynchronous processing.

Scheduled Apex is used for membership expiry operations.

### Benefits

* Automates recurring processing.
* Avoids manual checks.
* Handles operations outside the immediate user transaction.
* Supports scheduled business processes.

---

# 🛡️ Validation Rules

Validation Rules are used to prevent invalid data from entering the system.

Examples include:

### Phone Validation

Ensures that the member/trainer phone number follows the expected format.

### Date Validation

Membership dates are validated to prevent invalid date combinations.

Example:

```text
End Date < Start Date
        ↓
Invalid
```

Validation rules ensure data quality at the Salesforce platform level.

---

# 🔐 Salesforce Security

Security is implemented using Salesforce's layered security model.

The main security concepts considered include:

* Profiles
* Permission Sets
* Permission Set Groups
* Roles
* Role Hierarchy
* Organization-Wide Defaults
* Sharing Rules
* Object-Level Security
* Field-Level Security
* Record-Level Security
* CRUD
* Apex Sharing
* Server-side validation

---

# 🔒 Security Principle

> **Never rely only on the Lightning Web Component to protect data.**

For example, hiding a button in an LWC does not guarantee that the corresponding Apex operation is secure.

Security should be enforced at the server and Salesforce data layers.

```text
LWC
 ↓
Apex
 ↓
Security Checks
 ↓
Salesforce Data
```

---

# 👥 Gym Management Access Model

A conceptual access model can be defined as:

| Capability           | Gym Staff |     Trainer | Administrator |
| -------------------- | --------: | ----------: | ------------: |
| View Members         |         ✅ |    Relevant |             ✅ |
| Create Members       |         ✅ |           — |             ✅ |
| Manage Trainers      |         — | Own Profile |             ✅ |
| Manage Memberships   |         ✅ |    Relevant |             ✅ |
| View Payments        |         ✅ |           — |             ✅ |
| Manage Payments      |         ✅ |           — |             ✅ |
| View Reports         |         ✅ |    Relevant |             ✅ |
| Manage Configuration |         — |           — |             ✅ |

> The final permissions should be configured according to the actual organization's requirements.

---

# 📊 Reports

The project includes several Salesforce Reports for monitoring gym operations.

### Reports Created

* **Payment History**
* **Monthly Revenue**
* **Pending Payments**
* **Member Payment History**
* **Gym Member Report**

---

# 📈 Dashboard

A **Gym Management Dashboard** was created to provide an overview of the gym's business data.

### Dashboard Components

```text
                 GYM MANAGEMENT DASHBOARD
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   Total Members     Active Members     Expired Members
        │
        ├───────────────┐
        │               │
        ▼               ▼
 Monthly Revenue   Payment Status
        │
        ▼
 Trainer Workload
```

---

# 📌 Dashboard KPIs

## Total Members

Displays the total number of gym members.

## Active Members

Shows members whose current status is Active.

## Expired Members

Shows members whose memberships have expired.

## Monthly Revenue

Provides a view of revenue generated through payments.

## Payment Status

Displays the distribution of payment statuses.

## Trainer Workload

Provides insight into trainer assignments and workload.

---

# 📊 Business Insights

The reports and dashboard help gym management answer questions such as:

* How many members are currently active?
* How many memberships have expired?
* How much revenue was generated?
* Which payments are pending?
* What is the payment history of a member?
* Which trainers are handling more members?
* Which members have recently made payments?

---

# 🧪 Testing

Testing was performed for different parts of the application.

### Functional Testing

* Member creation
* Trainer creation
* Membership creation
* Payment creation
* Payment status updates
* Membership renewal
* Membership expiry
* Flow execution
* LWC functionality

### Security Testing

* Unauthorized record access
* Object permissions
* Field permissions
* Record-level access
* Apex access
* LWC data exposure

### Automation Testing

* Record-triggered Flow
* Payment Trigger
* Scheduled Apex
* Membership renewal logic

---

# 🚨 Important Issues Encountered & Resolved

During development, several Salesforce-specific issues were encountered.

## Scheduled Apex Job Conflict

A scheduled Apex class could not be modified while a previous scheduled job was pending or in progress.

This highlighted the importance of managing existing `CronTrigger` records and scheduled jobs during development.

---

## Record-Triggered Flow Testing

A record-triggered Flow cannot simply be launched manually from Flow Builder like an autolaunched Flow.

The correct testing approach is to:

```text
Activate Flow
     ↓
Perform configured trigger action
     ↓
Create / Update / Delete Record
     ↓
Flow Executes
```

---

## Membership Date Validation

Membership renewal logic had to account for validation rules that prevent membership start dates from being in the past.

This required the renewal logic and validation rules to work consistently together.

---

## LWC and Apex Field Mapping

During development, differences between the fields queried by Apex and fields expected by the LWC caused data-binding issues.

This demonstrated the importance of maintaining consistency between:

```text
Salesforce Fields
       ↓
SOQL
       ↓
Apex
       ↓
LWC JavaScript
       ↓
LWC HTML
```

---

# 🧩 Technology Stack

| Technology               | Usage                      |
| ------------------------ | -------------------------- |
| Salesforce               | Application Platform       |
| Apex                     | Server-side Business Logic |
| SOQL                     | Data Querying              |
| Salesforce Flow          | Declarative Automation     |
| Apex Trigger             | Event-driven Automation    |
| Scheduled Apex           | Recurring Processing       |
| Lightning Web Components | User Interface             |
| Reports                  | Data Analysis              |
| Dashboards               | Business Visualization     |
| Git                      | Version Control            |
| GitHub                   | Source Code Management     |
| Salesforce CLI           | Development & Deployment   |

---

# 📁 Project Structure

A Salesforce DX project can be organized as:

```text
gym-management-system/
│
├── force-app/
│   └── main/
│       └── default/
│           │
│           ├── classes/
│           │   ├── GymManagementController.cls
│           │   ├── MembershipRenewalService.cls
│           │   └── MembershipExpiryScheduler.cls
│           │
│           ├── triggers/
│           │   └── PaymentTrigger.trigger
│           │
│           ├── lwc/
│           │   └── memberConsole/
│           │       ├── memberConsole.html
│           │       ├── memberConsole.js
│           │       └── memberConsole.js-meta.xml
│           │
│           ├── objects/
│           │   ├── Gym_Member__c/
│           │   ├── Trainer__c/
│           │   ├── Membership__c/
│           │   └── Payment__c/
│           │
│           ├── flows/
│           │
│           ├── reports/
│           │
│           └── dashboards/
│
├── manifest/
│   └── package.xml
│
├── sfdx-project.json
│
└── README.md
```

---

# 🔄 Development Workflow

The project follows a Salesforce development workflow:

```text
Requirement
    ↓
Data Model
    ↓
Custom Objects & Fields
    ↓
Validation Rules
    ↓
Flows
    ↓
Apex
    ↓
Triggers
    ↓
Scheduled Apex
    ↓
LWC
    ↓
Reports & Dashboards
    ↓
Security Review
    ↓
Testing
    ↓
Git
    ↓
Deployment
```

---

# 🌿 Git & GitHub

Git is used for version control of the Salesforce project.

### Typical Workflow

```bash
git init

git add .

git commit -m "Initial Gym Management System"

git branch -M main

git remote add origin <repository-url>

git push -u origin main
```

Development changes can then be tracked using:

```bash
git status
git add .
git commit -m "Add membership automation"
git push
```

---

# 🚀 Salesforce Deployment

Salesforce CLI can be used to deploy metadata between Salesforce environments.

Typical workflow:

```text
Developer Org
      ↓
Source Control
      ↓
GitHub
      ↓
Target Org / Sandbox
      ↓
Production
```

Metadata such as:

* Objects
* Fields
* Apex Classes
* Triggers
* Flows
* LWC
* Reports
* Dashboards

can be version-controlled and deployed using Salesforce development tools.

---

# 📋 Project Features

| Feature               | Implementation        |
| --------------------- | --------------------- |
| Member Management     | Custom Object         |
| Trainer Management    | Custom Object         |
| Membership Management | Custom Object         |
| Payment Management    | Custom Object         |
| Member Validation     | Validation Rules      |
| Payment Automation    | Apex Trigger          |
| Membership Expiry     | Scheduled Apex        |
| Membership Creation   | Record-Triggered Flow |
| Membership Renewal    | Apex Service          |
| Member Console        | LWC                   |
| Payment Reports       | Salesforce Reports    |
| Revenue Analysis      | Reports               |
| Business Dashboard    | Salesforce Dashboard  |
| Access Control        | Salesforce Security   |
| Version Control       | Git & GitHub          |
| Deployment            | Salesforce CLI        |

---

# 🌟 Key Learning Outcomes

Through this project, I gained practical experience in:

### Salesforce Development

* Custom Objects
* Custom Fields
* Relationships
* Validation Rules
* Apex Classes
* Apex Triggers
* Scheduled Apex
* Salesforce Flow
* Lightning Web Components

### Salesforce Data

* SOQL
* Record relationships
* Data validation
* Data automation

### Salesforce Security

* Profiles
* Permission Sets
* Roles
* OWD
* Sharing Rules
* CRUD
* FLS
* Record-Level Security

### Salesforce DevOps

* Git
* GitHub
* Salesforce CLI
* Metadata
* Sandboxes
* Deployment

### Business Intelligence

* Salesforce Reports
* Dashboard
* KPIs
* Revenue analysis
* Payment analysis

---



# 🏁 Conclusion

The **Gym Management System** demonstrates how Salesforce can be used to build a real-world business application from the ground up.

The project combines:

> **Data Modeling + Automation + Apex + LWC + Security + Reports + Dashboards + Git + Deployment**

The application reduces manual gym-management operations by automating membership creation, payment tracking, membership expiry, and renewal processes while providing management with useful reports and dashboards.

Most importantly, the project demonstrates an understanding of how Salesforce components work together to create a scalable and maintainable business application.

---

