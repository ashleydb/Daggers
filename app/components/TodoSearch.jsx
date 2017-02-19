var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var TodoSearch = React.createClass({
  handleSearch: function() {
    var searchText = this.refs.searchText.value;
    var showCompleted = this.refs.showCompleted.checked;
    this.props.onSearch(searchText, showCompleted);
  },
  render: function() {
    // All of these props come from the Redux state, setup in connect()
    var {dispatch, showCompleted, searchText} = this.props;
    return (
      <div className="container__header">
        <div>
          <input type="search" placeholder="Enter search filter" ref="searchText" value={searchText}
              onChange={() => {
                    var searchText = this.refs.searchText.value;
                    dispatch(actions.setSearchText(searchText));
                }}/>
        </div>
        <div>
          <label>
            <input type="checkbox" ref="showCompleted" checked={showCompleted}
                onChange={() => {
                      dispatch(actions.toggleShowCompleted());
                  }}/> Show Completed To Dos
          </label>
        </div>
      </div>
    );
  }
});

export default connect(
  (state) => {
    return {
      showCompleted: state.showCompleted,
      searchText: state.searchText
    };
  })(TodoSearch);
