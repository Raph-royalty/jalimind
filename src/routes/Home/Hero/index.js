import { h, Component } from 'preact';
import './hero.css';
import lot from "../../../assets/heroLottie.json";
const Hero = () => {
    return (
        <div class="hero">
            <div class="hero-left">
                <p class="hero-tag">Your <span style="color:var(--primary)">A.I</span> Mental Health Companion</p>
                <p class="hero-message">
                    Relax. Breath. We are here to help you.
                </p>

                <div class="hero-buttons">
                    <a class="hero-button" href="/login">Get Started</a>
                    {/* <button class="hero-button hero-button-secondary">About</button> */}
                </div>
            </div>
            <div class="hero-right">
                <lottie-player src={lot} background="transparent" speed="1" class="hero-image" direction="1" mode="normal" loop autoplay></lottie-player>

                {/* <div class="hero-image">

                </div> */}
            </div>
        </div>
    );
};

export default Hero;