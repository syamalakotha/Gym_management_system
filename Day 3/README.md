# Gym Management System - Salesforce Project

## Project Overview

The Gym Management System is a Salesforce-based application developed to automate gym operations using Salesforce declarative tools.

The application helps manage gym members, memberships, trainers, payments, and automates business processes using Flows and Validation Rules.

---

## Features

- Manage Gym Members
- Manage Memberships
- Manage Trainers
- Membership Status Tracking
- Record-Triggered Flow Automation
- Validation Rules
- Email Notification
- Automatic Membership Creation

---

## Technologies Used

- Salesforce Developer Edition
- Lightning App Builder
- Custom Objects
- Record-Triggered Flow
- Validation Rules
- Flow Builder

---

## Objects Created

- Gym Member
- Membership
- Trainer

---

## Flow Implementations

### 1. Auto Create Membership

Type:
Record Triggered Flow

Description:

Whenever a new Gym Member is created, the system automatically creates a Membership record with:

- Membership Name
- Membership Type
- Status
- Start Date
- End Date
- Fee

---

### 2. Membership Expiry Reminder

Type:
Record Triggered Flow with Scheduled Path

Description:

The system automatically sends an email reminder to the Gym Member 5 days before the Membership End Date.

---

## Validation Rules

### Validation Rule 1

Rule Name:

End_Date_Cannot_Be_Before_Start_Date

Purpose:

Prevents users from entering an End Date earlier than the Start Date.

Formula:

End_Date__c < Start_Date__c

---

### Validation Rule 2

Rule Name:

Membership_Start_Date_Cannot_Be_Past

Purpose:

Prevents users from selecting a Membership Start Date in the past.

Formula:

Start_Date__c < TODAY()

---

## Why Flow Instead of Apex?

The project requirements were straightforward and could be implemented using Salesforce's declarative tools.

Flow was chosen because it:

- Requires no coding
- Is easy to maintain
- Is easy to debug
- Provides faster development
- Follows Salesforce best practices

Apex would only be required for advanced business logic or external integrations.

---


## Future Enhancements

- Payment Automation
- Attendance Tracking
- Dashboard Reports
- SMS Notifications
- Trainer Scheduling
- Payment Gateway Integration

---

## Author

Kotha Syamala

B.Tech Information Technology

Vishnu Institute of Technology
