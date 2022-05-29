export class CommentService {
    url = "https://localhost:7194/api/";

    fetchCommentsByMediaId = async (id) =>{
        try {
            const response = await fetch(`${this.url}Comments?mediaId=${id}`)
            const comments = await response.json();
            console.log(comments);
            return comments;
        }
        catch (e){
            console.log(e);
        }
    }

    createComment = async (comment) => {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(
                comment
            )
        };

        try{
            const response = await fetch(`${this.url}Comments`, options);
            return await response.json();
        }
        catch (e) {
            console.log(e);
        }
    }
}