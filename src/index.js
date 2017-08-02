import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar'; 
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyBTlGg1rOWJnUAAAIADUlLrzyV30H5upKI';

class App extends Component {
    constructor(props) { // when video is first rendered to the DOM, and will trigger videoSearch()
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
    };

    this.videoSearch('surfboards');
    }

    videoSearch(term) { // Because we have out YTsearch inside this method we can pass it down {1a}
        YTSearch({key: API_KEY, term: 'EDC'}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }
    // {1a} to here in <SearchBar />, so add onSearchTermChange function, so all searchBar has to do is call 
    //props.onSearchTermChange = with a new search term => & that will call our search term function! ^ here
    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) } , 300); // to throttle videoSearch, so it can only
        // be called every 300 milli-seconds

        return (
            <div>
                <SearchBar onSearchTermChange={term => this.videoSearch(term)} />
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                    videos={this.state.videos} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container')); 

// passing just (App) to render, we are passing a class, but here we 
    //want to pass in the component and ',' where it should be rendered ('.container')
// To make an Instance, wrap code in " "
// Best practice: 1 component per file

// left off @ video 29 8:11pm 7/11/17

// Index.js: Everything starts here, as in all the components are rendered from here. And is also the highest parent component.

// Creating a new component:
    // 1. import react & other needed packages
    // 2. create arrow function expression(functional component), or class(class based component), for your new component
    // 3. export your component
    // 4. import your component to index.js(main component rendering file)
    // 5. be sure to add a file/folder path reference to your component to prevent any duplicate name conflicts
    // 6. finally add you component <Component /> to the App function in index.js to be rendered to the page

// Components
    // A component that is used in a function is called a 'Functional component' aka Dumb component
    // A component that is defined in a class is a 'Class based component'
        // A functional component can contain a class based component

// API
    // Lets consider where the api data should fetch from, from what component? and from where? it needs to be available 
    //all over our application, so how do we do this? React has something to address this issue called 'Downward Data Flow'.
    // So, It makes sense to use the main rendering area in our application responsible
    // for this, index.js. because our components are children of it.

// Event handlers
    // Generally written as on(handle)Input(name of element watching for event)Change(the name of the event itself)
    // & is read like "whenever the input changes, run the code {}"
    // After declaring event handler, add it to element with {this.eventHere}

// State
    // State is used with class based components
    // Any class based component in react has its own state object, that is used to record event, whenever there is a change,
    // the component will re-render, and also forces all of its children to update to.
    // whenever we use state, we initialize it by creating a new state object, this.state = {} and assign it to this.state. 
    // the object we pass will include properties that we want to record on  state. ex.term: ^
    // we ALWAYS manipulate state with .setState!!

// class SearchBar extends Component {
//     constructor(props) { // initializing state by defining the contructor method
//         super(props);

//         this.state = { term: ' ' }; // This is the property we want to record change on, we can use any property name.
//     } // inside this constructor is the ONLY place you will ever see this.state, everywhere else will use this.setState
// // this.state Sets state! this.setState is for Updating state! Confusing yes...
//     // Whenever the state of input changes, our event handler runs, and cause our updated state to update term:
//     // anytime we are updating something, we are updating state! Again we only update our state with this.setState
//     render() {
//         return (
//             <div>
//                 <input onChange={event => this.setState({ term: event.target.value})} />;
//                 Value of the input: {this.state.term}
//             </div>
//         );
//      }
// }

// export default SearchBar;

// The Treasure hunt
    // Trying to retrace the steps of props and state being passed through the components is like a treasure hunt,
    //looking for the function that is being called through the long line of files from index.js is a good place to start.
    // 