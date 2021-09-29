import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './components/todo/todo';
import SettingProvider from './context/settings';
import LoginProvider from "./context/auth";

export default class App extends React.Component {
    render() {
        return (
            <LoginProvider>
                <SettingProvider>
                    <ToDo />
                </SettingProvider>
            </LoginProvider>
        );
    }
}