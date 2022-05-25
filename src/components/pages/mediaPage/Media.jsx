import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import MediaService from "../../../services/MediaService";

export default function Media() {
    const params = useParams();
    const [state, setState] = useState(
        {
            id: params.id,
            media: null,
            isLoaded: false,
        }
    );

   // const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchMedia(state.id)
            .then(media => {
                let index = media.publicationDate.indexOf(":");
                media.publicationDate = media.publicationDate.substring(0, index - 3);
                setState(state =>
                    ({...state, isLoaded: true, media: media}))
            })
            .catch(error => {
                console.log(error);
            });

        //fetchComments(state.id);
    }, [])

    function fetchMedia(id) {
        let fetcher = new MediaService();
        return fetcher.GetMediaById(id);
    }

    // function fetchComments(mediaId) {
    //     let fetcher = new CommentService();
    //     fetcher.fetchCommentsByMediaId(mediaId)
    //         .then(comments => {
    //             setComments(comments);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }

    return  !state.isLoaded ?
        (
            <div/>
        ) :
        (
            <div className="m-auto mt-5" style={{width: "90%"}}>
                <div className="d-flex flex-row mb-5">
                    <div className="col-4">
                        <img className="img-fluid" width="80%" height="80%"
                             src={"data:image/png;base64," + state.media.photo}/>
                    </div>
                    <div className="col-5">
                        <div style={{fontWeight: "normal"}} className="d-flex flex-column mb-3">
                            <div style={{textTransform: "uppercase", fontSize: "2.5rem"}} className="m-2 text-center">
                                {state.media.title}
                            </div>
                            <div className="container-fluid m-4">
                                <div className="row row-cols-2 mb-2">
                                    <div className="mb-2 fst-italic">
                                        Published
                                    </div>
                                    <div className="mb-2">
                                        {state.media.publicationDate}
                                    </div>

                                    <div className="mb-2 fst-italic">
                                        Type
                                    </div>
                                    <div className="mb-2">
                                        {state.media.type.name}
                                    </div>

                                    <div className="mb-2 fst-italic">
                                        Rating
                                    </div>
                                    <div className="mb-2">
                                        {state.media.rating}
                                    </div>

                                    <div className="mb-2 fst-italic">
                                        Series
                                    </div>
                                    <div className="mb-2">
                                        {state.media.series.title}
                                    </div>

                                </div>
                                <div className="mb-2">
                                    {state.media.description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}