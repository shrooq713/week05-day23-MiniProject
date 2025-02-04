import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setVideo } from "../reducers/video/action";
import { setList } from "../reducers/watchLater/action";

function VideoDetails() {
    const history = useHistory();
    const dispatch = useDispatch();
    const state = useSelector((state) => {
      return {
        video: state.video.video,
      };
    });

    const { id } = useParams();
    let srcVid =`https://www.youtube.com/embed/${state.video[0].id}`

    // get element by id
    useEffect(() => {
        axios
          .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyCM1fcmPMlBSytN_fpgaRG9e9ChWWBlM9g`)
          .then((response) => {
              console.log("details");
            console.log(response.data.items);
            const action = setVideo(response.data.items);
            dispatch(action);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
      const watchLaterClick = ()=>{
        // state.video[0]
        console.log("warchlater clicked");
        console.log(state.video[0]);
        const action = setList(state.video[0]);
        dispatch(action);
        console.log("state.video");
        console.log(state.video[0]);
        history.push("/watchlater")
      }
    return (
      <div className="videoDetails">
        {/* display video details */}
        <iframe width="420" height="315"
                src={srcVid}>
        </iframe>
        <button onClick={watchLaterClick}>Watch later</button>
        <h1 className="HeaderDesign">{state.video[0].snippet.title}</h1>
        {/* <p></p> */}
        {/* <h1 className="HeaderDesign"></h1> */}
        <p>published At {state.video[0].snippet.publishedAt}</p>
        <h1 className="HeaderDesign">Channel: {state.video[0].snippet.channelTitle}</h1>
        <h1 className="HeaderDesign">Description:</h1>
        <p className="description">{state.video[0].snippet.description}</p>
      </div>
    );
}

export default VideoDetails;