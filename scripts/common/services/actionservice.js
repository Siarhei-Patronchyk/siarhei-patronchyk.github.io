'use strict';

angular.module('appsngen.portal.common.services')

.factory('actionService', function() {
    var action = {
        PUBLISH: 'PUBLISH',
        DELETE: 'DELETE',
        SUBMIT_FOR_REVIEW: 'SUBMIT_FOR_REVIEW',
        RETIRE: 'RETIRE',
        REJECT: 'REJECT',
        PUT_UNDER_REVIEW: 'PUT_UNDER_REVIEW',
        RECALL_REVIEW: 'RECALL_REVIEW'
    };

    var statusToActions = {
        UPLOADED: [action.DELETE, action.SUBMIT_FOR_REVIEW],
        SUBMITTED: [action.PUT_UNDER_REVIEW, action.RECALL_REVIEW],
        RETIRED: [action.PUBLISH, action.DELETE, action.SUBMIT_FOR_REVIEW],
        PUBLISHED: [action.RETIRE],
        UNDER_REVIEW: [action.PUBLISH, action.REJECT]
    };

    var isActionAllowed = function(action, status) {
        return statusToActions[status] ? statusToActions[status].indexOf(action) >= 0 : false;
    };

    return {
        isDeleteAllowed: function(status) {
            return isActionAllowed(action.DELETE, status);
        },

        isSubmitForReviewAllowed: function(status) {
            return isActionAllowed(action.SUBMIT_FOR_REVIEW, status);
        },

        isRecallReviewAllowed: function(status) {
            return isActionAllowed(action.RECALL_REVIEW, status);
        }
    };
});