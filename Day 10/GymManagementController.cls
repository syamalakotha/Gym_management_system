
public with sharing class GymManagementController {

    // ============================================================
    // GET ALL GYM MEMBERS
    // ============================================================
    @AuraEnabled(cacheable=true)
    public static List<Gym_Member__c> getMembers() {

        return [
            SELECT
                Id,
                Name,
                Member_ID__c,
                Phone__c,
                Email__c,
                Gender__c,
                Date_of_Birth__c,
                Join_Date__c,
                Age__c,
                Status__c,
                Training_Goal_c__c,
                Last_Payment_Date__c,
                Address__c
            FROM Gym_Member__c
            ORDER BY CreatedDate DESC
        ];
    }


    // ============================================================
    // GET MEMBERSHIPS FOR SELECTED MEMBER
    // ============================================================
    @AuraEnabled(cacheable=true)
    public static List<Membership__c> getMemberships(Id memberId) {

        if (memberId == null) {
            return new List<Membership__c>();
        }

        return [
            SELECT
                Id,
                Name,
                Membership_Type__c,
                Fee__c,
                Start_Date__c,
                End_Date__c,
                Status__c,
                Gym_Member__c,
                Trainer__c,
                Trainer__r.Name
            FROM Membership__c
            WHERE Gym_Member__c = :memberId
            ORDER BY Start_Date__c DESC
        ];
    }


    // ============================================================
    // GET PAYMENTS FOR SELECTED MEMBER
    // ============================================================
    @AuraEnabled(cacheable=true)
    public static List<Payment__c> getPayments(Id memberId) {

        if (memberId == null) {
            return new List<Payment__c>();
        }

        return [
            SELECT
                Id,
                Name,
                Amount__c,
                Payment_Date__c,
                Payment_Method__c,
                Payment_Status__c,
                Gym_Member__c,
                Membership__c,
                Membership__r.Name
            FROM Payment__c
            WHERE Gym_Member__c = :memberId
            ORDER BY Payment_Date__c DESC
        ];
    }
}