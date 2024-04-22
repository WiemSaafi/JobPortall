import React, { useState } from 'react';
import { Box, styled, keyframes } from '@mui/material';
import KeyboardArrowIcon from '@mui/icons-material/KeyboardArrowUp';

// Importez votre vidéo
import Video from '../videos/1.mp4';

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 0;
    transform: translateY();
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

const Header = () => {
    const [isScrolledToTop, setIsScrolledToTop] = useState(true);

    const scrollTo = (position) => {
        window.scrollTo({ top: position, behavior: 'smooth' });
    };

    const StyleHeader = styled(Box)(({ theme }) => (
        {
            position: 'relative',
            minHeight: 700,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden', // Assurez-vous que le contenu ne dépasse pas de l'en-tête
            animation: `${fadeIn} 1s ease-in-out`, // Ajoutez une animation de fondu
        }
    ));

    const VideoContainer = styled('div')(({ theme }) => ({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    }));

    const VideoElement = styled('video')(({ theme }) => ({
        width: '100%',
        height: '100%',
        objectFit: 'cover',
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

    return (
        <>
            <StyleHeader>
                <VideoContainer>
                    <VideoElement autoPlay loop muted src={Video} type='video/mp4' />
                </VideoContainer>
                
            </StyleHeader>
            <ScrollButton onClick={() => { scrollTo(isScrolledToTop ? 0 : document.documentElement.scrollHeight); setIsScrolledToTop(!isScrolledToTop); }}>
                <KeyboardArrowIcon style={{ transform: isScrolledToTop ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 9.s' }} />
            </ScrollButton>
        </>
    );
}
// Entrez dans l'univers de la gestion du temps avec Digital Market !
export default Header;
