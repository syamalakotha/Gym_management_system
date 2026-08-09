# ⚡ Lightning Web Component – Gym Management Member Console

## 📅 Development Day – Lightning Web Components

The **Gym Management Member Console** was developed as the frontend interface of the Gym Management System using **Lightning Web Components (LWC)**.

The objective was to move beyond the standard Salesforce record pages and create a more professional, application-style interface that gym staff can use to manage members, memberships, and payments from a single screen.

---

# 🎯 Objective

The main objective of this LWC was to create a centralized gym management interface where users can:

* View all gym members
* Search members
* Filter members by status
* View member statistics
* Open an individual member profile
* View personal information
* View membership details
* View payment history
* Add a new gym member
* Navigate between the member directory and profile
* Display important information in a clean and professional UI

The component was designed to behave more like a real-world gym management application rather than a basic Salesforce table.

---

# 🏗️ LWC Architecture

The component follows the standard Salesforce Lightning Web Component structure.

```text
gymManagement/
│
├── gymManagement.html
├── gymManagement.js
├── gymManagement.css
└── gymManagement.js-meta.xml
```

### File Responsibilities

| File                        | Purpose                                                        |
| --------------------------- | -------------------------------------------------------------- |
| `gymManagement.html`        | Defines the UI structure                                       |
| `gymManagement.js`          | Contains component logic and event handling                    |
| `gymManagement.css`         | Provides custom styling and responsive design                  |
| `gymManagement.js-meta.xml` | Defines component metadata and where the component can be used |

---

# 🖥️ Component Overview

The LWC is divided into two major views:

```text
Gym Management LWC
│
├── Member Console
│   ├── Header
│   ├── Add Member
│   ├── KPI Cards
│   ├── Search
│   ├── Status Filter
│   └── Member Directory
│
└── Member Profile
    ├── Profile Header
    ├── Personal Information
    ├── Membership Overview
    └── Payment History
```

The component dynamically switches between these views based on user interaction.

---

# 1️⃣ Member Console

The first screen is the **Member Console**.

It acts as the main landing page of the LWC.

The console contains:

* Application header
* Gym branding
* Add Member button
* Member statistics
* Search functionality
* Status filtering
* Member directory
* View action

---

# 🏷️ Application Header

The header contains the gym application identity.

Example structure:

```text
GYM MANAGEMENT

Member Console

Manage members and monitor membership activity.
```

A Lightning icon is used to provide visual identity to the application.

The header also contains the:

```text
+ Add Member
```

button.

---

# 2️⃣ KPI Cards

The Member Console displays important statistics at the top.

### Total Members

Displays the total number of gym members.

```text
Total Members
25
Registered members
```

### Active Members

Displays members whose status is currently Active.

```text
Active Members
20
Currently active
```

### Expired Members

Displays members whose membership has expired.

```text
Expired Members
5
Requires attention
```

These cards allow gym staff to understand the current membership situation immediately.

---

# 📊 KPI Design

The KPI section follows a card-based design:

```text
┌──────────────────┐
│ 👥 Total Members │
│                  │
│       25         │
│ Registered       │
└──────────────────┘

┌──────────────────┐
│ ✓ Active Members │
│                  │
│       20         │
│ Currently active │
└──────────────────┘

┌──────────────────┐
│ ⚠ Expired       │
│                  │
│        5         │
│ Requires action  │
└──────────────────┘
```

This provides a dashboard-like experience inside the LWC.

---

# 3️⃣ Member Directory

The Member Directory displays the gym's member records.

The table contains:

| Column    | Information                  |
| --------- | ---------------------------- |
| Member    | Name and email               |
| Member ID | Salesforce member ID         |
| Phone     | Member phone number          |
| Join Date | Date the member joined       |
| Status    | Active / Expired / Cancelled |
| Action    | View button                  |

---

# 👤 Member Display

Each member is displayed with an avatar-style initial.

For example:

```text
┌────┐
│ KS │  K. Syamala
└────┘  syamala@example.com
```

The JavaScript prepares the member's initial so that the UI does not need to calculate it manually.

---

# 🟢 Status Badges

Member status is displayed using styled status badges.

Example:

```text
● Active
● Expired
● Cancelled
```

The status class is dynamically generated based on the member's status.

This makes the interface easier to understand visually.

---

# 🔎 4️⃣ Member Search

The LWC provides a search box.

Users can search using information such as:

* Member Name
* Phone
* Email
* Member ID

Example:

```text
Search by name, phone, email or member ID...
```

When the search value changes, the JavaScript filters the member list.

---

# 🔽 5️⃣ Status Filter

A status dropdown allows gym staff to filter members.

Example:

```text
Status
──────────────
All
Active
Expired
Cancelled
```

This is useful when gym staff wants to quickly find expired members or view only active members.

---

# 👁️ 6️⃣ View Member

Every member row contains a:

```text
View >
```

button.

When the user clicks View:

```text
Member Directory
       │
       ▼
Selected Member
       │
       ▼
Member Profile
```

The selected member is stored in the JavaScript state and displayed in the profile screen.

---

# 👤 7️⃣ Member Profile

The Member Profile provides detailed information about the selected member.

The profile header contains:

* Member avatar
* Member name
* Member ID
* Current status
* Back to Members button

Example:

```text
← Back to Members

MEMBER PROFILE

K. Syamala

MEM-0001                         ● Active
```

---

# 📋 8️⃣ Personal Information

The profile displays important member information.

The fields include:

```text
Phone
Email
Gender
Date of Birth
Age
Training Goal
Join Date
Address
```

Example:

```text
Personal Information

Phone             9876543210
Email             member@example.com
Gender            Female
Date of Birth     25/03/2004
Age               22
Training Goal     Muscle Gain
Join Date         09/08/2026
```

This makes the LWC useful as an actual member management console.

---

# 🏋️ 9️⃣ Membership Overview

The profile contains a dedicated **Membership Overview** section.

The component displays membership records related to the selected gym member.

The table contains:

| Field   | Description                                |
| ------- | ------------------------------------------ |
| Type    | Monthly / Quarterly / Half-Yearly / Annual |
| Fee     | Membership fee                             |
| Start   | Membership start date                      |
| End     | Membership end date                        |
| Trainer | Assigned trainer                           |
| Status  | Active / Expired / Cancelled               |

Example:

```text
Membership Overview

Type          Fee       Start       End         Trainer     Status
Monthly       ₹1000     09/08/2026  08/09/2026  Rahul       Active
```

---

# 💳 🔟 Payment History

The Payment History section displays payment transactions belonging to the selected member.

The table contains:

| Field      | Description               |
| ---------- | ------------------------- |
| Payment ID | Unique payment identifier |
| Date       | Payment date              |
| Amount     | Amount paid               |
| Method     | Cash / UPI / Card etc.    |
| Status     | Paid / Pending / Failed   |

Example:

```text
Payment History

Payment ID     Date          Amount      Method       Status
PAY-0001       09/08/2026    ₹1000       UPI          Paid
PAY-0002       09/09/2026    ₹1000       Card         Paid
```

This gives gym staff a complete payment history without navigating to a separate Payment object.

---

# ➕ 1️⃣1️⃣ Add Member

One of the major features added to the LWC is the **Add Member** functionality.

The user clicks:

```text
+ Add Member
```

A modal form opens.

---

# 📝 Add Member Form

The form uses Salesforce's:

```text
lightning-record-edit-form
```

This allows the LWC to create a `Gym_Member__c` record using Salesforce's standard record-editing capabilities.

The form contains:

```text
Member Name
Phone
Email
Gender
Date of Birth
Age
Join Date
Membership Type
Training Goal
Status
Address
```

---

# 🔄 Add Member Workflow

```text
User clicks "Add Member"
             │
             ▼
       Modal Opens
             │
             ▼
      Enter Member Data
             │
             ▼
      Click Create Member
             │
             ▼
  lightning-record-edit-form
             │
             ▼
      Salesforce creates
      Gym_Member__c
             │
             ▼
      Success Handler
             │
             ▼
      Refresh Member List
```

This allows staff to register a new member without leaving the custom LWC.

---


# 🔙 1️⃣2️⃣ Navigation

The LWC supports navigation between the two major views.

### Member List → Profile

```text
Click View
     ↓
Member Profile
```

### Profile → Member List

```text
Click Back to Members
     ↓
Member Console
```

### Member List → Add Member

```text
Click Add Member
     ↓
Add Member Modal
```

### Add Member → Member List

```text
Click Create Member
     ↓
Member Created
     ↓
Member List Refreshed
```

---


# 🔗 Salesforce Data Used by the LWC

The LWC works with the following Salesforce objects:

```text
Gym_Member__c
Membership__c
Payment__c
Trainer__c
```

### Gym Member

Used for:

```text
Name
Member ID
Phone
Email
Gender
Date of Birth
Age
Join Date
Status
Training Goal
Last Payment Date
```

### Membership

Used for:

```text
Membership Type
Fee
Start Date
End Date
Trainer
Status
```

### Payment

Used for:

```text
Payment ID
Payment Date
Amount
Payment Method
Payment Status
```

### Trainer

Used to display the trainer associated with a membership.

---





---



# 🏆 Final LWC Result

The final LWC provides a centralized interface for gym staff.

Instead of navigating through multiple Salesforce objects:

```text
Gym Member
      ↓
Membership
      ↓
Payment
      ↓
Trainer
```

the user can manage the information through a single application-style interface.



---

# 📌 Development Outcome

The LWC development successfully transformed the Gym Management System from a collection of Salesforce records into a more user-friendly application interface.

The implementation demonstrates practical knowledge of:

* Lightning Web Components
* HTML templates
* JavaScript event handling
* CSS-based UI design
* Salesforce custom objects
* Salesforce relationships
* Record creation using Lightning Data Service
* Conditional rendering
* Dynamic data rendering
* Search and filtering
* Component state management
* Professional UI/UX design

The resulting component serves as the **frontend/member-management layer of the Gym Management System** and can be further extended with attendance tracking, membership renewal, notifications, online payments, trainer dashboards, and AI-powered gym insights.
