import React, { Component } from 'react'; // w/o { component } we would have to use React.Component in the render return
// define a new class called SearcgBar and give it added functionality that react component has
class SearchBar  extends Component {
    constructor(props) {
        super(props); // 

        this.state = { term: ' '};
    }

    render() {
        return (
            <div className="search-bar">
                <input 
                value={this.state.term}
                onChange={event => this.onInputChange(event.target.value)} />
            </div>
        );
    }
    // Break down of onChange event listener above^:
    // When content of input changes(event), call onInputchange(this.onInputChange), w/ the new input value(event.target.value)
    onInputChange(term) { // we want to do 2 things with this, set the state with the term, and also want to call 
        //the call we got from index.js {1a} onSearchTermChange(term)
        this.setState({term}); // first sets the state of the component
        this.props.onSearchTermChange(term); // then fires the callback function onSearchTermChange()
    }
}
// Adding value={this.state.term} here turns this component into a 'controlled component', so when EH runs to update, and the value is set to the new state
export default SearchBar;