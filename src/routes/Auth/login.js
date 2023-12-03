import { h, Component } from 'preact';
import { useState } from 'preact/hooks';
const Login = ({setType}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [buttonText, setButtonText] = useState('LOGIN');

    const login = () => {
        setButtonText('LOGGING IN...');
        if(username.length < 3) {
            alert('Username must be at least 3 characters!');
            setButtonText('LOGIN');
            return;
        }
        else if (password.length < 6) {
            alert('Password must be at least 6 characters!');
            setButtonText('LOGIN');
            return;
        }
        firebase.auth().signInWithEmailAndPassword(username + '@jalimind.com', password).then((user) => {
            alert('Logged in!');
            location.href = '/chat';
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('Incorrect username or password!');
            setButtonText('LOGIN');
        });
    }
    return (
        <>
            <div class="auth-form">
                <input class="auth-form-input" type="text" placeholder="Username"
                onInput={(e) => setUsername(e.target.value)}
                />
                <input class="auth-form-input" type="password" placeholder="Password" 
                onInput={(e) => setPassword(e.target.value)}
                />
                <button class="auth-form-button" onclick={login}>{buttonText}</button>
            </div>
            <p class="auth-form-signup">Don't have an account? <a onclick={()=>setType('register')} class="auth-link">Sign Up</a></p>
        </>
    );
};

export default Login;