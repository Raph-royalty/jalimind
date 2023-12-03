import { h, Component } from 'preact';
import './home.css';
import HomeNav from '../../components/HomeNav';
import Hero from './Hero';
const Home = () => {
    return (
        <div class="home">
            <HomeNav/>
            <Hero/>
        </div>
    );
};

export default Home;