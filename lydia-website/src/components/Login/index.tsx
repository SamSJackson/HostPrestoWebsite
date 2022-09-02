import React, { useEffect, useState } from 'react';
import { login } from '../../api';

import './main.scss';

type InputValues = {
    username: string;
    password : string;
}

type Props = {
    onSuccessfulLogin : (stringId : string) => void;
};

const Login : React.FC<Props> = ({
    onSuccessfulLogin,
}) => {
    const [inputValues, setInputValues] = useState<InputValues>({
        username: "",
        password: "",
    });
    const [loginSuccess, setLoginSuccess] = useState(true);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        inputValues.username !== "" && inputValues.password !== "" 
        ? setDisabled(false) 
        : setDisabled(true);
    }, [inputValues]);

    const handleUsernameChange = (event : React.FormEvent<HTMLInputElement>) => {
        setInputValues({
            username: (event.target as HTMLInputElement).value,
            password: inputValues.password,
        });
    }

    const handlePasswordChange = (event : React.FormEvent<HTMLInputElement>) => {
        setInputValues({
            username: inputValues.username,
            password: (event.target as HTMLInputElement).value,
        });
    }

    const handleSubmit = async (event : React.SyntheticEvent) => {
        event.preventDefault();

        const username = inputValues.username;
        const password = inputValues.password;
        if (username === "" && password === "") { return; }
        login(username, password).then((response) => {
            if (response != "Unsuccessful") {
                onSuccessfulLogin(response);
            } else {
                setLoginSuccess(false);
            }
        });
    }

    return (
        <div className="login-background">
            <div className="login-container">
                <h3>Welcome, login below!</h3>
                <form id="login-authentication-form" onSubmit={handleSubmit}>
                    <div className="login-flex">
                        <input type="text" 
                            className="login-username" 
                            name="username" 
                            placeholder="Username" 
                            onChange={handleUsernameChange}
                        />
                        <input 
                            type="password"
                            className="login-password" 
                            name="password" 
                            placeholder="Password"
                            onChange={handlePasswordChange}
                        />
                        {!loginSuccess && (
                            <div className="login-failure">
                                {"Unsuccessful login"}
                            </div>
                        )}
                        <div className="login-submit">
                            <input id="login-submit-button" type="submit" value="Submit" disabled={disabled}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;