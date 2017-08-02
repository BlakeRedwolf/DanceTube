import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = (props) => {
    const videoItems = props.videos.map((video) => {
        return (
        <VideoListItem 
        onVideoSelect={props.onVideoSelect}
        key={video.etag} 
        video={video} />
        );
    });

    return (
        <ul className="col-md-4 list-group">
            {videoItems}
        </ul>
    );
};

export default VideoList;
// It is best practice to add a unique key id to your components, in the case of <VideoListItem />, we added a key property,
// then checked our network tab under our console in the browser, and found under search that all of these videos already
// have a unique identifier! Built in you could say, really its just api data from youtube, but we can utilize this 
// by adding ={video.etag}, notice its the same syntax as if we were parsing the data.