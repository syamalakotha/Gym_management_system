# 🏋️ Gym Management System Using Salesforce

## 📌 Project Overview

The Gym Management System is a Salesforce-based application developed to
manage and automate day-to-day gym operations.

The system provides a centralized platform for managing gym members,
trainers, membership plans, and payment information.

The project demonstrates how Salesforce can be used to build a
custom business application using custom objects, Apex programming,
SOQL, DML operations, and Apex Triggers.

---

## 🎯 Problem Statement

Managing gym operations manually can make it difficult to maintain
member information, track memberships, manage trainers, and monitor
payments.

The Gym Management System addresses these challenges by storing
gym-related information in Salesforce and automating important
business processes.

The system helps to:

- Maintain gym member information
- Maintain trainer information
- Manage membership details
- Store payment information
- Automate membership-related updates
- Retrieve records efficiently using SOQL
- Implement custom business logic using Apex

---

## 💡 Objectives

The main objectives of this project are:

1. To develop a centralized gym management application using Salesforce.
2. To manage gym member information efficiently.
3. To maintain trainer details.
4. To manage different membership records.
5. To maintain payment information.
6. To automate membership updates using Apex.
7. To demonstrate Salesforce Apex programming.
8. To use SOQL for retrieving Salesforce records.
9. To implement Apex Triggers for automatic business logic execution.

---

# 🏗️ Salesforce Data Model

The application uses four main custom objects:

1. Trainer
2. Gym Member
3. Membership
4. Payment

These objects represent the major entities required for managing
gym operations.

### Trainer Object

The Trainer object stores information related to gym trainers.

Example information includes:

- Trainer Name
- Trainer ID
- Email
- Phone
- Experience
- Specialization

---

### Gym Member Object

The Gym Member object stores information about registered gym members.

Example information includes:

- Member Name
- Member ID
- Phone
- Email
- Gender
- Date of Birth
- Join Date
- Address
- Membership information
- Payment-related information

---

### Membership Object

The Membership object is used to maintain membership information
associated with gym members.

It can contain information such as:

- Membership Type
- Start Date
- End Date
- Fee
- Status
- Gym Member
- Trainer

---

### Payment Object

The Payment object maintains payment-related information.

Example information includes:

- Payment ID
- Gym Member
- Membership
- Amount
- Payment Date
- Payment Method
- Payment Status

---

# ⚙️ Technologies Used

### Salesforce

Salesforce is used as the main cloud platform for developing and
managing the application.

### Apex

Apex is used to implement custom business logic and automation.

### SOQL

SOQL is used to retrieve records from Salesforce objects.

### DML

DML operations are used to create and update Salesforce records.

### Apex Triggers

Triggers are used to automatically execute business logic when
specific database events occur.

---

# 💻 Apex Programming

Apex is a strongly typed, object-oriented programming language
provided by Salesforce.

It is used to implement custom business logic and automate processes
that cannot be achieved using only standard Salesforce configuration.

---

## 📝 Creating a Gym Member Using Anonymous Apex

Anonymous Apex can be used to execute Apex code directly without
creating a permanent Apex class.

The following code creates a Gym Member record:

```apex
Gym_Member__c member = new Gym_Member__c();

member.Name = 'Rahul Kumar';
member.Phone__c = '9876543210';
member.Email__c = 'rahul@gmail.com';
member.Gender__c = 'Male';

insert member;

System.debug('Gym Member Created: ' + member.Id);
