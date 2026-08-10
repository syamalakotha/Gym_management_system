public class TrainerAssignmentService {

    public static void assignTrainers(List<Membership__c> memberships) {

        if (memberships == null || memberships.isEmpty()) {
            return;
        }

        // Get Gym Member IDs
        Set<Id> gymMemberIds = new Set<Id>();

        for (Membership__c membership : memberships) {
            if (membership.Gym_Member__c != null) {
                gymMemberIds.add(membership.Gym_Member__c);
            }
        }

        if (gymMemberIds.isEmpty()) {
            return;
        }

        // Get Training Goals of Gym Members
        Map<Id, Gym_Member__c> membersMap = new Map<Id, Gym_Member__c>(
            [
                SELECT Id, TRAINING_GOAL_C__C
                FROM Gym_Member__c
                WHERE Id IN :gymMemberIds
            ]
        );

        // Get all trainers
        List<Trainer__c> trainers = [
            SELECT Id, Specialization__c
            FROM Trainer__c
            WHERE Specialization__c != null
        ];

        if (trainers.isEmpty()) {
            return;
        }

        // Count active memberships for each trainer
        Map<Id, Integer> trainerWorkload = new Map<Id, Integer>();

        for (Trainer__c trainer : trainers) {
            trainerWorkload.put(trainer.Id, 0);
        }

        for (AggregateResult result : [
            SELECT Trainer__c trainerId, COUNT(Id) membershipCount
            FROM Membership__c
            WHERE Status__c = 'Active'
            AND Trainer__c != null
            GROUP BY Trainer__c
        ]) {
            Id trainerId = (Id) result.get('trainerId');
            Integer count = Integer.valueOf(String.valueOf(result.get('membershipCount')));

            if (trainerWorkload.containsKey(trainerId)) {
                trainerWorkload.put(trainerId, count);
            }
        }

        // Assign trainer
        for (Membership__c membership : memberships) {

            if (membership.Trainer__c != null) {
                continue;
            }

            Gym_Member__c member = membersMap.get(membership.Gym_Member__c);

            if (member == null || String.isBlank(member.TRAINING_GOAL_C__C)) {
                continue;
            }

            String trainingGoal = member.TRAINING_GOAL_C__C;

            Trainer__c selectedTrainer;
            Integer lowestWorkload;

            for (Trainer__c trainer : trainers) {

                // Match Training Goal with Trainer Specialization
                if (trainer.Specialization__c == trainingGoal) {

                    Integer workload = trainerWorkload.get(trainer.Id);

                    if (selectedTrainer == null || workload < lowestWorkload) {

                        selectedTrainer = trainer;
                        lowestWorkload = workload;
                    }
                }
            }

            // Assign the trainer with the lowest workload
            if (selectedTrainer != null) {

                membership.Trainer__c = selectedTrainer.Id;

                trainerWorkload.put(
                    selectedTrainer.Id,
                    trainerWorkload.get(selectedTrainer.Id) + 1
                );
            }
        }
    }
}