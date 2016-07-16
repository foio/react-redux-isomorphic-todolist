var React = require('react');
var PropTypes = React.PropTypes;
var TodoItem = require('./TodoItem');
var filters = require('../../logic/constants/ActionTypes');

var filterHelper = function (filter) {
    switch (filter) {
        case filters.VisibilityFilters.SHOW_ALL:
            return function () {
                return true
            };
        case filters.VisibilityFilters.SHOW_UNMARKED:
            return function (todo) {
                return !todo.marked
            };
        case filters.VisibilityFilters.SHOW_MARKED:
            return function (todo) {
                return todo.marked
            };
        default:
            return function () {
                return true
            };
    }
}

var MainSection = React.createClass({
    propTypes: {
        todos: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    },

    render: function () {
        var filter = this.props.filter;
        var todos = this.props.todos;
        var actions = this.props.actions;

        var filteredTodos = todos.filter(filterHelper(filter));
        var markedCount = todos.reduce(function (count, todo) {
                return todo.marked ? count + 1 : count;
            },
            0
        );

        return (
            <section className='main'>
                {this.renderToggleAll(markedCount)}
                <ul className='todo-list'>
                    {filteredTodos.map(function (todo) {
                        return <TodoItem key={todo.id} todo={todo} {...actions} />
                    })}
                </ul>
            </section>
        );
    },

    renderToggleAll: function (markedCount) {
        var todos = this.props.todos;
        var actions = this.props.actions;
        if (todos.length > 0) {
            return (
                <input className='toggle-all'
                       type='checkbox'
                       checked={markedCount === todos.length}
                       onChange={actions.putMarkAll}/>
            );
        }
    },

});

module.exports = MainSection;