/**
 * Created by kellanzhang on 2016/7/1.
 */
var types = require('../constants/ActionTypes');
var assign = require('object-assign');

module.exports = function (state, action) {
    state = state || types.VisibilityFilters.SHOW_ALL;
    switch (action.type) {
        case types.SET_VISIBILITY_FILTER:
            return action.filter;

        default:
            return state;
    }
}