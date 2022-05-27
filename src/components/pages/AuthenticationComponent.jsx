import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {authThunk} from "../../features/authSlice";


export default function AuthenticationComponent({render, authFunc, validationScheme, errorMessages}) {

    const store = useSelector(state => state);
    const dispatch = useDispatch();
    const [openError, setError] = useState(false);
    const navigate = useNavigate();

    const formOptions = {resolver: yupResolver(validationScheme)};
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;

    async function onSubmit(data) {
        const result = await dispatch(authThunk({authFunc: authFunc, data: data, errorMessages: errorMessages}));
        if (result.payload.isLogged) {
            navigate("/works");
        } else {
            setError(true);
        }
    }

    function onErrorMessageAppeared(e, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setError(false);
    }

    return render(handleSubmit(onSubmit), errors, openError, onErrorMessageAppeared, store.auth, register);
}