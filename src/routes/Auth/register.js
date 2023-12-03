import { h, Component } from 'preact';
import { useState } from 'preact/hooks';
const Register = ({ setType }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [buttonText, setButtonText] = useState('CREATE ACCOUNT');

    const createAccount = () => { 
        setButtonText('CREATING ACCOUNT...');
        if(username.length < 3) {
            alert('Username must be at least 3 characters!');
            setButtonText('CREATE ACCOUNT');
            return;
        }
        else if (password.length < 6) {
            alert('Password must be at least 6 characters!');
            setButtonText('CREATE ACCOUNT');
            return;
        }
        else if (password !== confirm) {
            alert('Passwords do not match!');
            setButtonText('CREATE ACCOUNT');
            return;
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(username + '@jalimind.com', password).then((user) => {
                alert('Account created!');
                location.href = '/chat';
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
            });
        }
    }

    return (
        <>
            <div class="auth-form">
                <input
                    class="auth-form-input"
                    type="text"
                    placeholder="Username"
                    onInput={(e) => setUsername(e.target.value)}
                />
                <div class="auth-form-row">
                    <input
                        class="auth-form-input auth-form-row-item"
                        type="password"
                        placeholder="Password"
                        onInput={(e) => setPassword(e.target.value)}
                    />
                    <input
                        class="auth-form-input auth-form-row-item"
                        type="password"
                        placeholder="Confirm Password"
                        onInput={(e) => setConfirm(e.target.value)}

                    />
                </div>


                <button class="auth-form-button" onclick={createAccount}>{buttonText}</button>
            </div>
            <p class="auth-form-signup">Already have an account? <a onclick={() => setType('login')} class="auth-link">Login</a></p>
        </>
    );
};

export default Register;