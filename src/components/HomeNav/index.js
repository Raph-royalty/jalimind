import { h, Component } from 'preact';
import './homenav.css';
const HomeNav = () => {
    return (
        <div class="homenav">
            <p class="homenav-logo">Jalimind</p>
            {/* <div class="homenav-links">
                <p>About</p>
                <p>Faq</p>
                <p>Pricing</p>
            </div> */}
            <a class="homenav-login" href="/login">Sign In</a>
        </div>
    );3
};

export default HomeNav;