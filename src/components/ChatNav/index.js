import { h, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './chatnav.css';
const Navbar = ({ username }) => {
    const [name, setName] = useState('');
    const [dropdown, setDropdown] = useState(false);

    useEffect(() => {
        let names = username.replace(/\s/g, '');
        setName(names);
    }, [username]);

    const logout = () => {
        firebase.auth().signOut().then(() => {
            location.href = '/';
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div class="chatnav">
            <a class="chatnav-logo" href="/">Jalimind</a>
            <div class="chatnav-profile" onclick={()=>setDropdown(!dropdown)}>
                <div style={{ backgroundImage: `url("https://api.dicebear.com/6.x/thumbs/svg?backgroundColor=161F30&seed=${name}")` }} alt="profile" class="chatnav-profile-image"></div>
                <div class="chatnav-username dropdown">
                    <span>{username}</span>
                    {dropdown && 
                    <div id="myDropdown" class="dropdown-content">
                        <div class="dropdown-items" onclick={logout}>
                            {/* <a href="#home">Clear Chat</a> */}
                            <div class="chatnav-logout">Logout</div>
                        </div>
                    </div>
                    }
                    

                </div>
            </div>
        </div>
    );
};

export default Navbar;