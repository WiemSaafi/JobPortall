import React, { useState } from 'react';
import { Box, styled, keyframes } from '@mui/material';
import KeyboardArrowIcon from '@mui/icons-material/KeyboardArrowUp';
import freeImage from '../img/wave7.png';
import degitalImage from '../images/digital.png';

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const changeColor = keyframes`
  0% { color: #fff; }
  75% { color: #00c699; }
  50% { color: #91cccc; }
  20% { color: #fff699; }
  100% { color: #fff; }
  70% { color: #bcf099; }
`;

const lineAnimation = keyframes`
  0% { width: 0%; }
  50% { width: 100%; }
  100% { width: 0%; }
`;

const moveUp = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-20px);
  }
`;

const Header = () => {
    const [isScrolledToTop, setIsScrolledToTop] = useState(true);

    const scrollTo = (position) => {
        window.scrollTo({ top: position, behavior: 'smooth' });
    };

    const StyleHeader = styled(Box)(({ theme }) => ({
        position: 'relative',
        minHeight: 700,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        animation: `${fadeIn} 1s ease-in-out`,
    }));

    const ImageContainer = styled('div')(({ theme }) => ({
        position: 'absolute',
        top: 75,
        right: '33px',
        width: '50%', // Adjusted width to fit video alongside
        height: 'auto',
        animation: `${moveUp} 2s infinite alternate`,
    }));

    const Image = styled('img')(({ theme }) => ({
        width: '100%',
        height: 'auto',
    }));

    const WaveImageContainer = styled('div')(({ theme }) => ({
        position: 'absolute',
        top: '-14%',
        left: '-78%',
        width: '562px',
        height: 'auto',
    }));

    const WaveImage = styled('img')(({ theme }) => ({
        width: '100%',
        height: 'auto',
    }));

    const TextContainer = styled('div')(({ theme }) => ({
        position: 'absolute',
        top: '35%',
        left: '1%',
        transform: 'translateY(-54%)',
        textAlign: 'left',
        color: '#F72585',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '18px',
    }));

    const NormalText = styled('div')(({ theme }) => ({
        textAlign: 'left',
        color: '#3A0CA3',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '20px',
    }));

    const ScrollButton = styled('div')(({ theme }) => ({
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '1000',
        cursor: 'pointer',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        borderRadius: '50%',
        padding: '10px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    }));

    const VideoContainer = styled('div')(({ theme }) => ({
        position: 'absolute',
        top: '0px',
        right: '0',
        width: '60%',
        height: 'auto',
        padding: '0px',
    }));

    return (
        <>
            <StyleHeader>
                <TextContainer>
                    <div style={{  fontSize: '28px' }}>
                        Bienvenue dans DIGITAL MARKET
                    </div>
                    <NormalText>
                        <br />
                        DIGITAL MARKET, votre destination incontournable <br />pour
                        la gestion du
                        personnel simple et automatisée
                    </NormalText>
                </TextContainer>
                <img
                    src={freeImage}
                    alt="Free Image"
                    className="moving-image"
                    style={{
                        maxWidth: '102%',
                        objectFit: 'cover',
                        marginTop: '75px' // Ajustez cette valeur pour déplacer l'image plus haut
                    }}
                />
                 
                 <ImageContainer>
      <img
        src={degitalImage}
        alt="Degital Market"
        style={{
            marginTop: '-0px',
          maxWidth: '18%',
          marginLeft:"-90%", 
        }}
      />
    </ImageContainer>
                 
            </StyleHeader>
        </>
    );
};

export default Header;
