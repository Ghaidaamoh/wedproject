import { useContext, useState } from "react";
import { When } from "react-if";
import { LoginContext } from "../../context/auth";
import { Button } from "react-bootstrap";
import "./login.scss"
import { Card, Elevation, H2, InputGroup } from '@blueprintjs/core';

export default function Login(props) {
    const context = useContext(LoginContext);

    //login
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //signup
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [role, setRole] = useState('');

    //state to show the signup form or login form
    const [singupDisplay, setSingupDisplay] = useState(true);


    const handleSubmit = (event) => {
        event.preventDefault();

        context.login(username, password);


    };

    const handleSignupSubmit = (event) => {
        event.preventDefault();
        context.signup(userName, passWord, role)
    };

    return (

        <div className="logInForm">
            {singupDisplay ?
                <>
                    <When condition={!context.loggedIn}>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="username"
                                placeholder="User Name"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit">Login</Button>
                            <label>
                                <Button type="button" onClick={() => setSingupDisplay(false)}>Signup</Button>
                            </label>
                        </form>
                    </When>
                    <When condition={context.loggedIn}>
                        <Button variant="danger" type="button" onClick={context.logout}>
                            {console.log(context.user)}
                            Logout
                        </Button>
                        <span>{context.user.id}</span>
                    </When>
                </>
                :
                <Card className="cardLogin" interactive elevation={Elevation.FOUR}>
                    <H2>Signup</H2>
                    <form onSubmit={handleSignupSubmit}>
                        <label>
                            <span>Username</span>
                            <InputGroup onChange={(e) => setUserName(e.target.value)} placeholder="username" type="text" name="username" />
                        </label>
                        <br />
                        <label>
                            <span>Password</span>
                            <InputGroup onChange={(e) => setPassWord(e.target.value)} placeholder="password" type="password" name="password" />
                        </label>
                        <br />
                        <label>
                            <span>role</span>
                            <InputGroup onChange={(e) => setRole(e.target.value)} placeholder="role = [admin,user,vendor]" type="text" name="username" />
                        </label>
                        <br />
                        <label>
                            <Button type="submit">Signup</Button>
                        </label>

                        <label>
                            <Button type="button" onClick={() => setSingupDisplay(true)}>Signin</Button>
                        </label>
                    </form>
                </Card>
            }
        </div>
    );
}