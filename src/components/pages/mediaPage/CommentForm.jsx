import {useState} from "react";
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {CommentService} from "../../../services/CommentService";
import TextareaAutosize from 'react-textarea-autosize';

export function CommentForm(props) {

    const [state, setState] = useState(
        {
            text: "",
            userId: props.userId === 0 ? "" : props.userId.toString(),
            mediaId: props.mediaId,
            updateComments: props.updateComments,
        }
    );
    const formSchema = Yup.object().shape({
        auth: Yup.string()
            .required("Please log in"),
    })

    const formOptions = {resolver: yupResolver(formSchema)};
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;

    function onCommentCreate() {
        let fetcher = new CommentService();
        fetcher.createComment({userId: state.userId, mediaId: state.mediaId, text: state.text})
            .then(response => {
                console.log(response);
                state.updateComments(state.mediaId);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <form className="w-100 me-3 pb-5 d-flex flex-row align-items-center" onSubmit={handleSubmit(onCommentCreate)}>
            <TextareaAutosize
                className="form-control me-4 mt-4 w-75"
                style={{resize: "none", display:"block"}}
                minRows={1}
                maxRows={6}
                name="comment"
                value={state.text}
                onChange={(e) =>
                    setState(prev => ({...prev, text: e.target.value}))}
            />
            <div style={{flex:"40%"}} className="d-flex flex-row align-items-center me-5 mt-4">
                <input type="submit" style={{height: "80%", display:"block"}} className="position-relative btn btn-secondary" name="comment"/>
                <input
                    {...register('auth')}
                    name="auth"
                    value={state.userId}
                    className={`visually-hidden btn btn-primary form-control ${errors.auth ? 'is-invalid' : ''}`}/>
                <div style={{width:"120%"}} className="invalid-feedback ms-2 ">{errors.auth?.message}</div>

            </div>
        </form>
    )
}