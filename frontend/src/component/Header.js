import React, { useState } from 'react';
import { Box, styled, keyframes } from '@mui/material';
import KeyboardArrowIcon from '@mui/icons-material/KeyboardArrowUp';
import oo from '../img/oo.jpg';
import waveImage from '../img/wave.png';

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

    const moveUp = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-20px);
  }
`;

    const ImageContainer = styled('div')(({ theme }) => ({
        position: 'absolute',
        top: 75,
        right: "33px",
        width: '871px', // Ajustez la largeur de l'image selon vos besoins
        height: 'auto',
        animation: `${moveUp} 2s infinite alternate`, 
       
    }));

    const Image = styled('img')(({ theme }) => ({
        width: '100%',
        height: 'auto',
        
       // animation: `${moveUp} 2s infinite alternate`,
    }));


    const WaveImageContainer = styled('div')(({ theme }) => ({
        position: 'absolute',
        top: '-14%',
        left: '-78%',
        width: '562px', // Ajustez la largeur de l'image selon vos besoins
        height: 'auto',
        
    }));

    const WaveImage = styled('img')(({ theme }) => ({
        width: '100%',
        height: 'auto',
    }));

    
    const TextContainer = styled('div')(({ theme }) => ({
        position: 'absolute',
        top: '75%',
        left: '1%',
        transform: 'translateY(-50%)',
        textAlign: 'left',
        color: 'black',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '18px',
    
        
    }));

    const NormalText = styled('div')(({ theme }) => ({
        textAlign: 'left',
        color: 'black',
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

    return (
        <>
            <StyleHeader>
            <ImageContainer>
                    <Image src={oo} alt="Tenje7" />
                    <WaveImageContainer>
                    <WaveImage src={waveImage} alt="Wave" />
                </WaveImageContainer>
                </ImageContainer>
                <TextContainer>
                    <div style={{ fontWeight: 'bold', fontSize: '28px' }}>
                        La gestion du 
                        personnel  <br />simple et  automatisée 
                    </div>
                    <NormalText>
                        <br/>Gagnez du temps au quotidien en utilisant<br/> notre plateforme avec  <span >Digital Market</span>
                    </NormalText>
                </TextContainer>
               
            </StyleHeader>
            
        </>
    );
}
// Entrez dans l'univers de la gestion du temps avec Digital Market !
export default Header;
