import { h, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './chatnav.css';
const Navbar = ({ username }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        let names = username.replace(/\s/g, '');
        setName(names);
    }, [username]);

    return (
        <div class="chatnav">
            <a class="chatnav-logo" href="/">Jalimind</a>
            <div class="chatnav-profile">
                <div style={{ backgroundImage: `url("https://api.dicebear.com/6.x/thumbs/svg?backgroundColor=161F30&seed=${name}")` }} alt="profile" class="chatnav-profile-image"></div>
                <div class="chatnav-username">{username}</div>
            </div>
        </div>
    );
};

export default Navbar;