import './app.css';
import Router from 'preact-router';
import Home from './routes/Home';
import Chat from './routes/Chat';
import Auth from './routes/Auth';
import { useState, useEffect } from 'preact/hooks';

export function App() {

  const [username, setUsername] = useState('');
  const [uid, setUid] = useState('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user);
        setUid(user.uid);
        let name = user.email.split('@');
        setUsername(name[0]);
        //console.log(user.displayName);
      } else {
        setUid('none');
      }
    });
  }, []);


  return (
    <div>
      <Router>
        <Home path="/" />
        <Chat path="/chat" username={username} />
        <Auth path="/login" />

        {/* <Home path="/"  uid={uid} name={name} userUpdate={userUpdates}/> */}
      </Router>
    </div>

  );
}
