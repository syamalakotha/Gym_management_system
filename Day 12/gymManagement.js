import {
    LightningElement,
    track,
    wire
} from 'lwc';

import getMembers
    from '@salesforce/apex/GymManagementController.getMembers';

import getMemberships
    from '@salesforce/apex/GymManagementController.getMemberships';

import getPayments
    from '@salesforce/apex/GymManagementController.getPayments';

import renewMembership
    from '@salesforce/apex/MembershipRenewalService.renewMembership';

import {
    refreshApex
} from '@salesforce/apex';

import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';


export default class GymManagement extends LightningElement {

    // =========================================================
    // MAIN VIEW
    // =========================================================

    @track showMemberList = true;
    @track showMemberDetails = false;
    @track showAddMember = false;

    // =========================================================
    // DATA
    // =========================================================

    @track members = [];
    @track memberships = [];
    @track payments = [];

    @track selectedMember = null;

    // =========================================================
    // RENEWAL
    // =========================================================

    @track showRenewModal = false;

    @track renewalMembershipId = null;

    @track renewalMembershipType = '';

    @track renewalTrainerId = '';

    @track renewalFee = '';

    @track renewalStartDate = '';

    @track trainers = [];

    isRenewing = false;

    // =========================================================
    // SEARCH
    // =========================================================

    searchKey = '';

    selectedStatus = 'All';

    // =========================================================
    // LOADING
    // =========================================================

    isLoadingDetails = false;

    // =========================================================
    // WIRED MEMBERS
    // =========================================================

    wiredMembersResult;


    // =========================================================
    // LOAD MEMBERS
    // =========================================================

    @wire(getMembers)
    wiredMembers(result) {

        this.wiredMembersResult = result;

        const {
            data,
            error
        } = result;

        if (data) {

            this.members = data.map(member => {

                return {
                    ...member,

                    initial:
                        this.getInitial(member.Name),

                    statusClass:
                        this.getStatusClass(
                            member.Status__c
                        )
                };
            });

        } else if (error) {

            console.error(
                'Error loading members:',
                error
            );
        }
    }


    // =========================================================
    // INITIAL
    // =========================================================

    getInitial(name) {

        if (!name) {
            return '?';
        }

        const words =
            name.trim().split(/\s+/);

        if (words.length === 1) {

            return words[0]
                .substring(0, 2)
                .toUpperCase();
        }

        return (
            words[0].charAt(0) +
            words[words.length - 1].charAt(0)
        ).toUpperCase();
    }


    // =========================================================
    // STATUS CLASS
    // =========================================================

    getStatusClass(status) {

        if (!status) {
            return 'status-badge';
        }

        const value =
            status.toLowerCase();

        if (value === 'active') {
            return 'status-badge status-active';
        }

        if (value === 'expired') {
            return 'status-badge status-expired';
        }

        if (
            value === 'cancelled' ||
            value === 'canceled'
        ) {
            return 'status-badge status-cancelled';
        }

        if (value === 'inactive') {
            return 'status-badge status-expired';
        }

        return 'status-badge';
    }


    // =========================================================
    // PAYMENT STATUS
    // =========================================================

    getPaymentStatusClass(status) {

        if (!status) {
            return 'status-badge';
        }

        const value =
            status.toLowerCase();

        if (value === 'paid') {
            return 'status-badge status-active';
        }

        if (value === 'pending') {
            return 'status-badge status-expired';
        }

        if (value === 'failed') {
            return 'status-badge status-cancelled';
        }

        return 'status-badge';
    }


    // =========================================================
    // TOTAL MEMBERS
    // =========================================================

    get totalMembers() {

        return this.members.length;
    }


    // =========================================================
    // ACTIVE MEMBERS
    // =========================================================

    get activeMembers() {

        return this.members.filter(
            member =>
                member.Status__c &&
                member.Status__c.toLowerCase() ===
                'active'
        ).length;
    }


    // =========================================================
    // EXPIRED MEMBERS
    // =========================================================

    get expiredMembers() {

        return this.members.filter(
            member =>
                member.Status__c &&
                (
                    member.Status__c.toLowerCase() ===
                    'expired' ||

                    member.Status__c.toLowerCase() ===
                    'inactive'
                )
        ).length;
    }


    // =========================================================
    // STATUS OPTIONS
    // =========================================================

    get statusOptions() {

        return [

            {
                label: 'All Members',
                value: 'All'
            },

            {
                label: 'Active',
                value: 'Active'
            },

            {
                label: 'Expired',
                value: 'Expired'
            },

            {
                label: 'Inactive',
                value: 'Inactive'
            },

            {
                label: 'Cancelled',
                value: 'Cancelled'
            }
        ];
    }


    // =========================================================
    // MEMBERSHIP OPTIONS
    // =========================================================

    get membershipTypeOptions() {

        return [

            {
                label: 'Monthly',
                value: 'Monthly'
            },

            {
                label: 'Quarterly',
                value: 'Quarterly'
            },

            {
                label: 'Half-Yearly',
                value: 'Half-Yearly'
            },

            {
                label: 'Annual',
                value: 'Annual'
            }
        ];
    }


    // =========================================================
    // FILTERED MEMBERS
    // =========================================================

    get filteredMembers() {

        let result =
            [...this.members];

        if (this.searchKey) {

            const search =
                this.searchKey
                    .toLowerCase()
                    .trim();

            result =
                result.filter(member => {

                    const name =
                        member.Name
                            ? String(
                                member.Name
                            ).toLowerCase()
                            : '';

                    const phone =
                        member.Phone__c
                            ? String(
                                member.Phone__c
                            ).toLowerCase()
                            : '';

                    const email =
                        member.Email__c
                            ? String(
                                member.Email__c
                            ).toLowerCase()
                            : '';

                    const memberId =
                        member.Member_ID__c
                            ? String(
                                member.Member_ID__c
                            ).toLowerCase()
                            : '';

                    return (
                        name.includes(search) ||
                        phone.includes(search) ||
                        email.includes(search) ||
                        memberId.includes(search)
                    );
                });
        }

        if (this.selectedStatus !== 'All') {

            result =
                result.filter(
                    member =>
                        member.Status__c ===
                        this.selectedStatus
                );
        }

        return result;
    }


    // =========================================================
    // SEARCH
    // =========================================================

    handleSearch(event) {

        this.searchKey =
            event.target.value;
    }


    // =========================================================
    // STATUS
    // =========================================================

    handleStatusChange(event) {

        this.selectedStatus =
            event.detail.value;
    }


    // =========================================================
    // ADD MEMBER
    // =========================================================

    handleAddMember() {

        this.showAddMember = true;
    }


    // =========================================================
    // CLOSE ADD MEMBER
    // =========================================================

    handleCloseAddMember() {

        this.showAddMember = false;
    }


    // =========================================================
    // MEMBER CREATED
    // =========================================================

    async handleMemberCreated(event) {

        console.log(
            'Member created:',
            event.detail.id
        );

        this.showAddMember = false;

        if (this.wiredMembersResult) {

            try {

                await refreshApex(
                    this.wiredMembersResult
                );

            } catch (error) {

                console.error(
                    'Refresh error:',
                    error
                );
            }
        }

        this.showToast(
            'Success',
            'Member created successfully.',
            'success'
        );
    }


    // =========================================================
    // MEMBER ERROR
    // =========================================================

    handleMemberError(event) {

        console.error(
            'Member creation error:',
            event.detail
        );

        let message =
            'Unable to create member.';

        if (
            event.detail &&
            event.detail.detail
        ) {
            message =
                event.detail.detail;
        }

        this.showToast(
            'Error',
            message,
            'error'
        );
    }


    // =========================================================
    // VIEW MEMBER
    // =========================================================

    async handleViewMember(event) {

        const memberId =
            event.currentTarget.dataset.id;

        this.selectedMember =
            this.members.find(
                member =>
                    member.Id === memberId
            );

        if (!this.selectedMember) {

            console.error(
                'Member not found:',
                memberId
            );

            return;
        }

        this.showMemberList = false;
        this.showMemberDetails = true;

        this.memberships = [];
        this.payments = [];

        this.isLoadingDetails = true;

        try {

            const [
                membershipData,
                paymentData
            ] = await Promise.all([

                getMemberships({
                    memberId: memberId
                }),

                getPayments({
                    memberId: memberId
                })
            ]);


            this.memberships =
                (membershipData || []).map(
                    membership => {

                        return {

                            ...membership,

                            trainerName:
                                membership.Trainer__r
                                    ? membership.Trainer__r.Name
                                    : 'Not Assigned',

                            statusClass:
                                this.getStatusClass(
                                    membership.Status__c
                                ),

                            canRenew:
                                membership.Status__c !==
                                'Active'
                        };
                    }
                );


            this.payments =
                (paymentData || []).map(
                    payment => {

                        return {

                            ...payment,

                            statusClass:
                                this.getPaymentStatusClass(
                                    payment.Payment_Status__c
                                )
                        };
                    }
                );


            this.loadTrainerOptions();

        } catch (error) {

            console.error(
                'Error loading details:',
                error
            );

            this.showToast(
                'Error',
                'Unable to load member details.',
                'error'
            );

        } finally {

            this.isLoadingDetails = false;
        }
    }


    // =========================================================
    // LOAD TRAINERS
    // =========================================================

    loadTrainerOptions() {

        const trainerMap = new Map();

        this.memberships.forEach(
            membership => {

                if (
                    membership.Trainer__c &&
                    membership.Trainer__r
                ) {

                    trainerMap.set(
                        membership.Trainer__c,
                        membership.Trainer__r.Name
                    );
                }
            }
        );

        this.trainers =
            Array.from(
                trainerMap.entries()
            ).map(
                ([value, label]) => {

                    return {
                        label: label,
                        value: value
                    };
                }
            );
    }


    // =========================================================
    // RENEW BUTTON
    // =========================================================

    handleRenewMembership(event) {

        const membershipId =
            event.currentTarget.dataset.id;

        if (!membershipId) {

            this.showToast(
                'Error',
                'Membership Id is missing.',
                'error'
            );

            return;
        }

        const membership =
            this.memberships.find(
                item =>
                    item.Id === membershipId
            );

        if (!membership) {

            this.showToast(
                'Error',
                'Membership record not found.',
                'error'
            );

            return;
        }

        // -----------------------------------------------------
        // OPEN RENEWAL FORM
        // -----------------------------------------------------

        this.renewalMembershipId =
            membership.Id;

        this.renewalMembershipType =
            membership.Membership_Type__c || '';

        this.renewalTrainerId =
            membership.Trainer__c || '';

        this.renewalFee =
            membership.Fee__c || '';

        // Start with TODAY so validation does not fail.
        this.renewalStartDate =
            this.getTodayDate();

        this.showRenewModal = true;
    }


    // =========================================================
    // TODAY
    // =========================================================

    getTodayDate() {

        const today =
            new Date();

        const year =
            today.getFullYear();

        const month =
            String(
                today.getMonth() + 1
            ).padStart(2, '0');

        const day =
            String(
                today.getDate()
            ).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }


    // =========================================================
    // RENEWAL TYPE CHANGE
    // =========================================================

    handleRenewalTypeChange(event) {

        this.renewalMembershipType =
            event.detail.value;
    }


    // =========================================================
    // RENEWAL TRAINER CHANGE
    // =========================================================

    handleRenewalTrainerChange(event) {

        this.renewalTrainerId =
            event.detail.value;
    }


    // =========================================================
    // RENEWAL FEE CHANGE
    // =========================================================

    handleRenewalFeeChange(event) {

        this.renewalFee =
            event.target.value;
    }


    // =========================================================
    // RENEWAL DATE CHANGE
    // =========================================================

    handleRenewalDateChange(event) {

        this.renewalStartDate =
            event.target.value;
    }


    // =========================================================
    // CLOSE RENEWAL MODAL
    // =========================================================

    handleCloseRenewModal() {

        if (this.isRenewing) {
            return;
        }

        this.resetRenewalForm();

        this.showRenewModal = false;
    }


    // =========================================================
    // RESET RENEWAL FORM
    // =========================================================

    resetRenewalForm() {

        this.renewalMembershipId = null;

        this.renewalMembershipType = '';

        this.renewalTrainerId = '';

        this.renewalFee = '';

        this.renewalStartDate = '';
    }


    // =========================================================
    // SAVE RENEWAL
    // =========================================================

    async handleSaveRenewal() {

        // -----------------------------------------------------
        // VALIDATE TYPE
        // -----------------------------------------------------

        if (!this.renewalMembershipType) {

            this.showToast(
                'Error',
                'Please select a membership type.',
                'error'
            );

            return;
        }


        // -----------------------------------------------------
        // VALIDATE FEE
        // -----------------------------------------------------

        if (
            !this.renewalFee ||
            Number(this.renewalFee) <= 0
        ) {

            this.showToast(
                'Error',
                'Please enter a valid membership fee.',
                'error'
            );

            return;
        }


        // -----------------------------------------------------
        // VALIDATE DATE
        // -----------------------------------------------------

        if (!this.renewalStartDate) {

            this.showToast(
                'Error',
                'Please select a start date.',
                'error'
            );

            return;
        }


        // -----------------------------------------------------
        // DATE VALIDATION
        // -----------------------------------------------------

        if (
            this.renewalStartDate <
            this.getTodayDate()
        ) {

            this.showToast(
                'Error',
                'Start date cannot be in the past.',
                'error'
            );

            return;
        }


        this.isRenewing = true;


        try {

            // -------------------------------------------------
            // CALL APEX
            // -------------------------------------------------

            const newMembershipId =
                await renewMembership({

                    oldMembershipId:
                        this.renewalMembershipId,

                    membershipType:
                        this.renewalMembershipType,

                    trainerId:
                        this.renewalTrainerId || null,

                    fee:
                        Number(this.renewalFee),

                    startDate:
                        this.renewalStartDate
                });


            console.log(
                'New membership:',
                newMembershipId
            );


            // -------------------------------------------------
            // CLOSE MODAL
            // -------------------------------------------------

            this.showRenewModal = false;

            this.resetRenewalForm();


            // -------------------------------------------------
            // REFRESH MEMBERS
            // -------------------------------------------------

            if (this.wiredMembersResult) {

                await refreshApex(
                    this.wiredMembersResult
                );
            }


            // -------------------------------------------------
            // RELOAD MEMBER DETAILS
            // -------------------------------------------------

            if (this.selectedMember) {

                const [
                    membershipData,
                    paymentData
                ] = await Promise.all([

                    getMemberships({
                        memberId:
                            this.selectedMember.Id
                    }),

                    getPayments({
                        memberId:
                            this.selectedMember.Id
                    })
                ]);


                this.memberships =
                    (membershipData || []).map(
                        membership => {

                            return {

                                ...membership,

                                trainerName:
                                    membership.Trainer__r
                                        ? membership.Trainer__r.Name
                                        : 'Not Assigned',

                                statusClass:
                                    this.getStatusClass(
                                        membership.Status__c
                                    ),

                                canRenew:
                                    membership.Status__c !==
                                    'Active'
                            };
                        }
                    );


                this.payments =
                    (paymentData || []).map(
                        payment => {

                            return {

                                ...payment,

                                statusClass:
                                    this.getPaymentStatusClass(
                                        payment.Payment_Status__c
                                    )
                            };
                        }
                    );


                // -------------------------------------------------
                // UPDATE SELECTED MEMBER
                // -------------------------------------------------

                const updatedMember =
                    this.members.find(
                        member =>
                            member.Id ===
                            this.selectedMember.Id
                    );

                if (updatedMember) {

                    this.selectedMember = {
                        ...updatedMember
                    };
                }

                this.loadTrainerOptions();
            }


            this.showToast(
                'Success',
                'Membership renewed successfully.',
                'success'
            );


        } catch (error) {

            console.error(
                'Renewal error:',
                error
            );

            let message =
                'Unable to renew membership.';

            if (
                error &&
                error.body &&
                error.body.message
            ) {

                message =
                    error.body.message;
            }

            this.showToast(
                'Renewal Failed',
                message,
                'error'
            );

        } finally {

            this.isRenewing = false;
        }
    }


    // =========================================================
    // BACK
    // =========================================================

    handleBackToMembers() {

        this.showMemberDetails = false;

        this.showMemberList = true;

        this.selectedMember = null;

        this.memberships = [];

        this.payments = [];

        this.isLoadingDetails = false;
    }


    // =========================================================
    // HAS MEMBERSHIP
    // =========================================================

    get hasMembership() {

        return (
            this.memberships &&
            this.memberships.length > 0
        );
    }


    // =========================================================
    // HAS PAYMENTS
    // =========================================================

    get hasPayments() {

        return (
            this.payments &&
            this.payments.length > 0
        );
    }


    // =========================================================
    // ACTIVE MEMBERSHIP
    // =========================================================

    get activeMembership() {

        if (
            !this.memberships ||
            this.memberships.length === 0
        ) {

            return null;
        }

        const active =
            this.memberships.find(
                membership =>
                    membership.Status__c ===
                    'Active'
            );

        return active ||
            this.memberships[0];
    }


    // =========================================================
    // TOAST
    // =========================================================

    showToast(
        title,
        message,
        variant
    ) {

        this.dispatchEvent(
            new ShowToastEvent({

                title: title,

                message: message,

                variant: variant
            })
        );
    }
}