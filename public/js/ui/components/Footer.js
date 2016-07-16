var React = require('react');
var PropTypes = React.PropTypes;
var classnames = require('classnames');
var Filters = require('../../logic/constants/ActionTypes');

var FILTER_LIST = [
    Filters.VisibilityFilters.SHOW_ALL,
    Filters.VisibilityFilters.SHOW_UNMARKED,
    Filters.VisibilityFilters.SHOW_MARKED
];

var getFilterText = function (filter) {
    switch (filter) {
        case Filters.VisibilityFilters.SHOW_ALL:
            return 'all';
        case Filters.VisibilityFilters.SHOW_UNMARKED:
            return 'pending';
        case Filters.VisibilityFilters.SHOW_MARKED:
            return 'complete';
        default:
            return 'all';
    }
}

var Footer = React.createClass({
    propTypes: {
        filter: PropTypes.string.isRequired,
    },

    handleClick: function (filter) {
        if (filter.length > 0) {
            this.props.setFilter(filter);
        }
    },

    render: function () {
        return (
            <footer className='footer'>
                <ul className='filters'>
                    {
                        FILTER_LIST.map(function (filterItem) {
                            return (
                                <li>
                                    {this.renderFilterLink(filterItem)}
                                </li>
                            );
                        }, this)
                    }
                </ul>
            </footer>
        );
    },


    renderFilterLink: function(filterItem) {
        var title = getFilterText(filterItem);
        var selectedFilter = this.props.filter;

        return (
            <a className={classnames({ selected: filterItem === selectedFilter })}
               style={{ cursor: 'hand' }}
               onClick={this.handleClick.bind(null,filterItem)}>
                {title}
            </a>
        );
    }
});

module.exports = Footer
