var React = require('react');
var TodoApp = require('./TodoApp');
var Provider=require("react-redux").Provider;
var createAppStore = require('../../logic/stores/todos');
var initialState = window.__INITIAL_STATE__;
var store = createAppStore(initialState)

var App = React.createClass({
    render: function() {
        return (
            <Provider store={store}>
                {function() { return <TodoApp />; }}
            </Provider>
        );
    }
});

module.exports = App;
