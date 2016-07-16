/**
 * Created by kellanzhang on 2016/7/1.
 */
var types = require('../constants/ActionTypes');
var assign = require('object-assign');
var immutableList = require('immutable').List;
var _ = require('lodash');

module.exports = function(state, action) {
    state = state || [];
    switch (action.type) {
        case types.ADD_TODO:
            return immutableList(state).push(action.item).toArray();

        case types.DELETE_TODO:
            return state.filter(function(todo) {
                return todo.id !== action.id
            });

        case types.EDIT_TODO:
            return state.map(function(todo) {
                return todo.id === action.id ?
                    assign({}, todo, { text: action.text }) :
                    todo
            });

        case types.MARK_TODO:
            return state.map(function(todo) {
                return todo.id === action.id ?
                    assign({}, todo, { marked: !todo.marked }) :
                    todo
            });

        case types.MARK_ALL:
            var areAllMarked = state.every(function(todo) { return todo.marked });
            return state.map(function(todo) {
                return assign({}, todo, { marked: !areAllMarked })
            });

        case types.CLEAR_MARKED:
            return state.filter(function(todo) { return todo.marked === false });
        
        case types.INIT_TODOS:
            return action.items || [];

        default:
            return state;
    }
}