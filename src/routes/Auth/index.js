import { h, Component } from 'preact';
import './auth.css';
import { useState } from 'preact/hooks';
import Login from './login';
import Register from './register';

const Auth = () => {
    const [type, setType] = useState('login');
    return (
        <div class="auth">
            <div class="auth-left">

            </div>
            <div class="auth-right">
                <p class="auth-bannerText">Welcome to <span style="color:var(--primary)">JALIMIND</span> your healing Journey starts here.</p>
                {type === 'login' && <Login setType={setType}/> }
                {type === 'register' && <Register setType={setType}/> }
            </div>

        </div>
    );
};

export default Auth;