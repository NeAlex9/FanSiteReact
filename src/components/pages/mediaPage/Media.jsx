import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MediaService from "../../../services/MediaService";
import {CommentComponent} from "./CommentComponent";
import {CommentService} from "../../../services/CommentService";
import {Divider, Paper} from "@mui/material";
import {CommentForm} from "./CommentForm";
import {useSelector} from "react-redux";

export default function Media() {
    const store = useSelector(state => state);
    const params = useParams();
    const [state, setState] = useState(
        {
            id: params.id,
            media: null,
            isLoaded: false,
        }
    );
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetcher = new MediaService();
        fetcher.GetMediaById(state.id)
            .then(media => {
                const index = media.publicationDate.indexOf(":");
                media.publicationDate = media.publicationDate.substring(0, index - 3);
                setState(state => ({...state, isLoaded: true, media: media}));
            })
            .catch(e => {
                console.log(e);
            })

        fetchComments(state.id);
    }, [])

    async function fetchComments(mediaId) {
        const fetcher = new CommentService();
        try {
            const comments = await fetcher.fetchCommentsByMediaId(mediaId);
            setComments(comments);
        } catch (e) {
            console.log(e);
        }
    }

    return !state.isLoaded ?
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

                <div className="h2 mb-5">
                    Comments
                </div>
                <Paper style={{padding: "15px 15px", width: "76%"}}>
                    {comments.map((comment, number) =>
                        <>
                            <CommentComponent comment={comment} key={comment.id}/>
                            {(comments.length - 1) !== number
                                ? <Divider variant="fullWidth" style={{margin: "10px 0"}}/>
                                : ""}
                        </>
                    )}
                </Paper>
                <CommentForm updateComments={fetchComments} userId={store.auth.user?.id ?? 0} mediaId={state.media.id}/>
            </div>
        );
}