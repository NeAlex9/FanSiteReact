import {Grid} from "@mui/material";
import ColoredAvatar from "../../ColoredAvatar";
import {useState} from "react";

export function CommentComponent({comment}) {

    const index = comment.publicationDate.indexOf("T");
    if (index > 0) {
        const data = comment.publicationDate.substring(0, index - 3);
        const time = comment.publicationDate.substring(index + 1, index + 6);
        comment.publicationDate = `${data} ${time}`;
    }

    function getCommentText(text) {
        return text.split(/\r\n|\n|\r/gm).map((line) => {
            return (<>{line}< br/></>)
        })
    }

    return (<>
        <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                <ColoredAvatar name={comment.user.name}/>
            </Grid>
            <Grid item xs zeroMinWidth>
                <h5 style={{marginBottom: "1rem", textAlign: "left", margin: "0"}}>{comment.user.name}</h5>
                <p style={{textAlign: "left", margin: "0"}}>
                    {getCommentText(comment.text)}
                </p>
                <p style={{textAlign: "right", color: "gray", margin: "0"}}>
                    {comment.publicationDate}
                </p>
            </Grid>
        </Grid>
    </>)
}