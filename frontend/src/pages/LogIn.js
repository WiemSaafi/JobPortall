import React, { useEffect, useRef } from 'react';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { userSignInAction } from '../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import bgImage from '../img/bg.svg';
import avatarImage from '../img/avatar.svg';
import waveImage from '../img/wave.png';
 import './Login.css';

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, userInfo } = useSelector(state => state.signIn);

    useEffect(() => {
        if (isAuthenticated) {
            if (userInfo.role === 1) {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        }
    }, [isAuthenticated, userInfo, navigate]);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleFocus = (event) => {
        const parent = event.target.parentNode.parentNode;
        parent.classList.add("focus");
    };

    const handleBlur = (event) => {
        const parent = event.target.parentNode.parentNode;
        if (event.target.value === "") {
            parent.classList.remove("focus");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        dispatch(userSignInAction({ email, password }));
    };

    return (
        <>
            <Navbar /> <img className="wave" src={waveImage} alt="wave" />
            <div className="container">
                <div className="img">
                    <img src={bgImage} alt="background" />
                </div>
                <div className="login-content">
                    <form onSubmit={handleSubmit}>
                        <img src={avatarImage} alt="avatar" />
                        <h2 className="title">Welcome</h2>
                        <div className="input-div one">
                            <div className="i">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="div">
                                <h5>Username</h5>
                                <input
                                    type="text"
                                    className="input"
                                    ref={emailRef}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                        <div className="input-div pass">
                            <div className="i">
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className="div">
                                <h5>Password</h5>
                                <input
                                    type="password"
                                    className="input"
                                    ref={passwordRef}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                        <input type="submit" className="btn" value="Login" />
                    </form>
                </div>
            </div>
            <Footer ></Footer>
        </>
    );
}

export default LogIn;
