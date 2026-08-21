# 🏋️ Gym Management System Using Salesforce

## 📌 Project Overview

The Gym Management System is a Salesforce-based application designed to manage gym operations efficiently.

The system helps maintain information about:

- Gym Members
- Trainers
- Membership Plans
- Payments

The application is developed using Salesforce custom objects and automation features.

---

## 🛠️ Salesforce Objects

The main custom objects created in the project are:

1. **Trainer**
2. **Gym Member**
3. **Membership**
4. **Payment**

---

## ⚙️ Technologies Used

- Salesforce
- Apex
- SOQL
- Salesforce Custom Objects
- Apex Triggers
- Anonymous Apex
- DML Operations

---

## 💻 Apex Programming

Apex is used to implement custom business logic and automate processes that cannot be achieved using standard Salesforce configuration tools.

### Creating Gym Member Using Anonymous Apex

```apex
Gym_Member__c member = new Gym_Member__c();

member.Name = 'Rahul Kumar';
member.Phone__c = '9876543210';
member.Email__c = 'rahul@gmail.com';
member.Gender__c = 'Male';

insert member;

System.debug('Gym Member Created: ' + member.Id);
