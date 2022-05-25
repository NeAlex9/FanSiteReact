import {useState} from "react";
import {UserService} from "../../services/UserService";
import {useNavigate} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";

export default function AuthenticationComponent({render, authFunc, validationScheme, errorMessages}) {

    const [auth, setAuth] = useState({isLogged: false, message: null, user: null});
    const [openError, setError] = useState(false);
    const navigate = useNavigate();

    const formOptions = {resolver: yupResolver(validationScheme)};
    const {register, handleSubmit, formState} = useForm(formOptions);
    const {errors} = formState;

    async function onSubmit(data) {
        const auth = await authenticate(data)
        setAuth(auth);

        if (!auth.isLogged) {
            setError(true);
            return;
        }

        navigate("/works");
    }

    function onErrorMessageAppeared(e, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setError(false);
    }

    async function authenticate(data) {
        const response = await authFunc(data);
        try {
            if (response.status !== 200) {
                return {isLogged: false, message: errorMessages.failedMessage, user: null};
            }

            const userService = new UserService();
            const user = await userService.GetUserByEmail(data.email);
            return {isLogged: true, message: "Success", user: user};
        } catch (e) {
            return {isLogged: false, message: errorMessages.unexpectedMessage, user: null};
        }
    }

    return render(handleSubmit(onSubmit), errors, openError, onErrorMessageAppeared, auth, register);
}