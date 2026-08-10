
import { LightningElement, track, wire } from 'lwc';

import getMembers from '@salesforce/apex/GymManagementController.getMembers';
import getMemberships from '@salesforce/apex/GymManagementController.getMemberships';
import getPayments from '@salesforce/apex/GymManagementController.getPayments';

import { refreshApex } from '@salesforce/apex';


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
    // SEARCH / FILTER
    // =========================================================

    searchKey = '';
    selectedStatus = 'All';


    // =========================================================
    // LOADING
    // =========================================================

    isLoadingDetails = false;


    // =========================================================
    // WIRED MEMBERS RESULT
    // =========================================================

    wiredMembersResult;


    // =========================================================
    // LOAD MEMBERS
    // =========================================================

    @wire(getMembers)
    wiredMembers(result) {

        this.wiredMembersResult = result;

        const { data, error } = result;

        if (data) {

            this.members = data.map(member => {

                return {
                    ...member,

                    initial: this.getInitial(member.Name),

                    statusClass: this.getStatusClass(
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
    // GET INITIALS
    // =========================================================

    getInitial(name) {

        if (!name) {
            return '?';
        }

        const words = name.trim().split(/\s+/);

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

        const value = status.toLowerCase();

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
                member.Status__c.toLowerCase() === 'active'
        ).length;
    }


    // =========================================================
    // EXPIRED MEMBERS
    // =========================================================

    get expiredMembers() {

        return this.members.filter(
            member =>
                member.Status__c &&
                member.Status__c.toLowerCase() === 'expired'
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
                label: 'Cancelled',
                value: 'Cancelled'
            }
        ];
    }


    // =========================================================
    // FILTERED MEMBERS
    // =========================================================

    get filteredMembers() {

        let result = [...this.members];


        // -----------------------------------------------------
        // SEARCH
        // -----------------------------------------------------

        if (this.searchKey) {

            const search =
                this.searchKey.toLowerCase().trim();

            result = result.filter(member => {

                const name =
                    member.Name
                        ? String(member.Name).toLowerCase()
                        : '';

                const phone =
                    member.Phone__c
                        ? String(member.Phone__c).toLowerCase()
                        : '';

                const email =
                    member.Email__c
                        ? String(member.Email__c).toLowerCase()
                        : '';

                const memberId =
                    member.Member_ID__c
                        ? String(member.Member_ID__c).toLowerCase()
                        : '';

                return (
                    name.includes(search) ||
                    phone.includes(search) ||
                    email.includes(search) ||
                    memberId.includes(search)
                );

            });
        }


        // -----------------------------------------------------
        // STATUS FILTER
        // -----------------------------------------------------

        if (this.selectedStatus !== 'All') {

            result = result.filter(
                member =>
                    member.Status__c ===
                    this.selectedStatus
            );

        }


        return result;
    }


    // =========================================================
    // SEARCH HANDLER
    // =========================================================

    handleSearch(event) {

        this.searchKey =
            event.target.value;
    }


    // =========================================================
    // STATUS FILTER HANDLER
    // =========================================================

    handleStatusChange(event) {

        this.selectedStatus =
            event.detail.value;
    }


    // =========================================================
    // ADD MEMBER
    // =========================================================

    handleAddMember() {

        console.log('Add Member clicked');

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
            'Member created successfully:',
            event.detail.id
        );

        this.showAddMember = false;


        // Refresh member list
        if (this.wiredMembersResult) {

            try {

                await refreshApex(
                    this.wiredMembersResult
                );

            } catch (error) {

                console.error(
                    'Error refreshing members:',
                    error
                );

            }

        }
    }


    // =========================================================
    // VIEW MEMBER
    // =========================================================

    async handleViewMember(event) {

        const memberId =
            event.currentTarget.dataset.id;


        // Find selected member
        this.selectedMember =
            this.members.find(
                member =>
                    member.Id === memberId
            );


        if (!this.selectedMember) {

            console.error(
                'Selected member not found:',
                memberId
            );

            return;
        }


        // -----------------------------------------------------
        // SWITCH FROM LIST TO PROFILE
        // -----------------------------------------------------

        this.showMemberList = false;
        this.showMemberDetails = true;


        // -----------------------------------------------------
        // RESET OLD DATA
        // -----------------------------------------------------

        this.memberships = [];
        this.payments = [];

        this.isLoadingDetails = true;


        try {

            // -------------------------------------------------
            // GET MEMBERSHIPS AND PAYMENTS
            // -------------------------------------------------

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


            // -------------------------------------------------
            // MEMBERSHIPS
            // -------------------------------------------------

            this.memberships =
                (membershipData || []).map(
                    membership => {

                        return {

                            ...membership,

                            // IMPORTANT:
                            // Trainer__r.Name is returned by Apex
                            trainerName:
                                membership.Trainer__r
                                    ? membership.Trainer__r.Name
                                    : 'Not Assigned',

                            statusClass:
                                this.getStatusClass(
                                    membership.Status__c
                                )
                        };

                    }
                );


            // -------------------------------------------------
            // PAYMENTS
            // -------------------------------------------------

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


        } catch (error) {

            console.error(
                'Error loading member details:',
                error
            );

        } finally {

            this.isLoadingDetails = false;
        }
    }


    // =========================================================
    // PAYMENT STATUS CLASS
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
    // BACK TO MEMBERS
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
    // CHECK MEMBERSHIP
    // =========================================================

    get hasMembership() {

        return (
            this.memberships &&
            this.memberships.length > 0
        );
    }


    // =========================================================
    // CHECK PAYMENTS
    // =========================================================

    get hasPayments() {

        return (
            this.payments &&
            this.payments.length > 0
        );
    }


    // =========================================================
    // GET ACTIVE MEMBERSHIP
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
                    membership.Status__c === 'Active'
            );


        return active ||
            this.memberships[0];
    }

}

