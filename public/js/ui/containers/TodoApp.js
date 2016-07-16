var React = require('react');
var bindActionCreators = require('redux').bindActionCreators;
var connect = require("react-redux").connect;
var Header = require('../components/Header');
var MainSection = require('../components/MainSection');
var Footer = require('../components/Footer');
var TodoActions = require('../../logic/actions/TodoActions');
var FilterActions = require('../../logic/actions/FilterActions');

var TodoApp = React.createClass({
    render: function () {
        var dispatch = this.props.dispatch;
        var todos = this.props.todos;
        var filter = this.props.filter;
        var todoActions = bindActionCreators(TodoActions, dispatch);
        var filterActions = bindActionCreators(FilterActions,dispatch);
        return (
            <div>
                <Header postTodo={todoActions.postTodo}/>
                <MainSection todos={todos} filter={filter} actions={todoActions}/>
                <Footer setFilter={filterActions.setFilter} filter={filter}/>
            </div>
        );
    },
});

function mapStateToProps(state) {
    return state;
}

module.exports = connect(mapStateToProps)(TodoApp);
