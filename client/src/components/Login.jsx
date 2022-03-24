import React, { useContext }  from 'react';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { AuthoContext } from '../context/AuthContext';

const Login = () => {
    // Use AuthoContext for Admin User authentication
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthoContext);

    // Handle login submit
    const handleSubmit = (e) => {
        var errorBox = document.getElementById("error-message");

        // If the user is not logged in already, prompt for password to log in
        if (!isLoggedIn) {
        // Confirm the right password is generated, and log in the admin user
        // This is basic, but doesn't have to be any more advanced - this is only a monitoring app
        if (document.getElementById("login-password").value == 'TriggerWarning') {
            errorBox.classList.add('transparent');
            setIsLoggedIn(!isLoggedIn);
        } else {
            // If the user doesn't put in the right password
            errorBox.classList.remove('transparent');
            document.getElementById("login-password").value = '';
        }
        } else {
            // If the user is logged in, allow the user to logout
            setIsLoggedIn(!isLoggedIn);
        }
    };

    return (
            <OverlayTrigger
                trigger="click"
                placement='bottom'
                overlay={
                    <Popover id='login-popover' className='popover'>
                    <Popover.Header as="h3">{isLoggedIn ? "Logout TechOps Admin" : "Login TechOps Admin"}</Popover.Header>
                    <Popover.Body>
                        {isLoggedIn ? <h6>Confirm logout:</h6> : <input type="text" className='pop-search' id='login-password' placeholder='password' spellCheck={false} />}
                        <div id='error-message' className="text-danger transparent"><small>Wrong Password</small></div>
                        {/* <Button type='submit' onClick={(e) => handleSubmit(e)} className="login center">{isLoggedIn ? "Confirm" : "Submit"}</Button> */}
                        <Button type='submit' onClick={(e) => handleSubmit(e)} className="login center">{isLoggedIn ? "Confirm" : "Submit"}</Button>
                    </Popover.Body>
                    </Popover>
                }
                rootClose>
                <Button className="login">{isLoggedIn ? "LOGOUT" : "LOGIN"}</Button>
            </OverlayTrigger>
    );
};

export default Login;