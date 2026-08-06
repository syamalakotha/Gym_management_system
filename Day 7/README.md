# Bulk Processing in Apex

## Objective

Demonstrates how to write bulk-safe Apex code capable of processing multiple records efficiently.

## Features

- Processes 200 records at once
- Uses List collections
- Performs a single DML operation
- Follows Salesforce Bulkification Best Practices

## Concepts Covered

- Collections
- Bulk Processing
- DML
- Governor Limits
- Apex Unit Testing

## Best Practices

✔ No DML inside loops

✔ Uses one Update statement

✔ Works for both single and multiple records
# Governor Limits in Salesforce

## Objective

Shows how to inspect Apex Governor Limits using the Limits class.

## Topics Covered

- SOQL Limits
- DML Limits
- CPU Time
- Heap Size
- Transactions

## Salesforce Governor Limits

| Limit | Value |
|--------|-------|
| SOQL Queries | 100 |
| DML Statements | 150 |
| Records Retrieved | 50,000 |
| CPU Time | 10 Seconds |
| Heap Size | 6 MB (Sync) |

## Why Governor Limits Exist

Salesforce is a multi-tenant platform. Governor Limits ensure that no single transaction monopolizes shared resources.

