import React, { useEffect, useRef } from 'react';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { userSignInAction } from '../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
 
import avatarImage from '../images/digitalee.jpeg';
import waveImage from '../img/wave8.png';
 import './Login.css';
 
 import PersonIcon from '@mui/icons-material/Person'; 
 import LockIcon from '@mui/icons-material/Lock'; // Import de l'icône de cadenas

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



    /* lorsque vous cliquez sur un champ, la classe focus sera ajoutée à son parent 
    .input-div et retirée des autres, ce qui arrêtera le mouvement du contour
     coloré lorsque vous passez d'un champ à l'autre. */


    const handleFocus = (event, type) => {
      const parent = event.target.parentNode.parentNode;
      const allInputs = document.querySelectorAll('.input-div');
      allInputs.forEach(input => {
          input.classList.remove("focus");
      });
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
           
          <img 
            className="wave" 
            src={waveImage} 
            alt="wave" 
            style={{ top: '389px', width: '2000px', height: '60vh', right: '0%' }} 
          />


          
          <div className="container">
            <div className="img"></div>
            <div className="login-content">
              <form onSubmit={handleSubmit}>
                <div className="card">
                <img 
  className="digital-image" 
  src={avatarImage} 
  alt="avatar" 
  style={{ position: 'absolute', top: '210px', left: '775px', width: '265px', height: 'auto' }} 
/>

<div className="input-div pass">
            <div className="i">
                <PersonIcon style={{ color: '#F72585' }} /> {/* Icône d'utilisateur */}
            </div>
            <div className="div">
                <h5></h5>
                <input
    type="text"
    className="input"
    ref={emailRef}
    onFocus={(event) => handleFocus(event, "username")}
    onBlur={handleBlur}
    placeholder="Nom d'utilisateur"
    style={{ textAlign: 'center', fontSize: '20px' }}
/>
            </div>
        </div>






        <div className="input-div pass">
            <div className="i">
            <LockIcon style={{ color: '#F72585' }} /> {/* Icône de cadenas */}
            </div>
            <div className="div">
                <h5> </h5>
                <input
    type="password"
    className="input"
    ref={passwordRef}
    onFocus={(event) => handleFocus(event, "password")}
    onBlur={handleBlur}
    placeholder="Mot de passe"
    style={{ textAlign: 'center', fontSize: '24px' }}
/>

            </div>
        </div>

 
        <input type="submit" className="btn" value="Login" style={{ marginTop: '50px' }} />
                </div>
              </form>
            </div>
          </div>
        </>
      );
    }


export default LogIn;