import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import * as Yup from "yup";
import AuthenticationComponent from "./AuthenticationComponent";
import {AuthenticationService} from "../../services/AuthenticationService";

export default function LogIn() {

    const formSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(3, 'Password must be at 3 char long'),
        email: Yup.string()
            .required('Email is required'),
    })
    const authFunc = (new AuthenticationService()).logIn;

    function render(handleSubmit, errors, openError, onErrorMessageAppeared, authObject, register) {
        return (
            <form onSubmit={handleSubmit} style={{paddingTop: "7vw", height: "84.7vh"}} className="w-25 m-auto">
                <h3>Log In</h3>
                <div className="mb-3 mt-3">
                    <label>Email address</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        {...register('email')}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        {...register('password')}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Password"
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
                <Snackbar className="mt-5 p-5"
                          open={openError}
                          autoHideDuration={4000}
                          anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'center',
                          }}
                          onClose={onErrorMessageAppeared}>
                    <Alert severity="error" sx={{width: '100%'}}>
                        {authObject?.message}
                    </Alert>
                </Snackbar>
            </form>
        )
    }

    return <AuthenticationComponent render={render} validationScheme={formSchema} authFunc={authFunc}
                                    errorMessages={{
                                        failedMessage: "Invalid login or password",
                                        unexpectedMessage: "Unexpected error :("
                                    }}/>
}
