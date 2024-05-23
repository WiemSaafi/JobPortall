import React, { useState } from 'react';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { userSignUpAction } from '../../redux/actions/userAction';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import freeImage from '../../img/wave12.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LockIcon from '@mui/icons-material/Lock';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'; 
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import freeImage1 from '../../img/gest3.jpg';
import { keyframes } from '@mui/system';




const validationSchema = yup.object({
  firstName: yup.string('Enter a first name').required('First name is required'),
  lastName: yup.string('Enter a last name').required('Last name is required'),
  password: yup.string('Enter a password').required('Password is required'),
  address: yup.string('Enter an address').required('Address is required'),
  email: yup.string('Enter an email').email('Enter a valid email').required('Email is required'),
  phone: yup.string('Enter a phone number').required('Phone number is required'),
  role: yup.string('Enter a role').required('Role is required'),
  dateOfBirth: yup.date('Enter a date').required('Date of birth is required'),
});

 
const DashCreateUser = () => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      role: '',
      firstName: '',
      lastName: '',
      password: '',
      address: '',
      phone: '',
      dateOfBirth: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(userSignUpAction(values));
      actions.resetForm();
    },
  });






  const [buttonColors, setButtonColors] = useState({
    primary: '#F72585, #7209B7',
    secondary: '#7209B7, #3A0CA3'
  });

  // Fonction pour changer la couleur du bouton lors du clic
  const handleButtonClick = () => {
    // Permuter les couleurs primaires et secondaires
    setButtonColors({
      primary: buttonColors.secondary,
      secondary: buttonColors.primary
    });
  }

   

 

  return (
 


      <Card
        sx={{
            
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 1105,
          borderRadius: '10px',
          
           marginTop: '-30px',
          //height:'85vh',
          overflow: 'hidden',
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
          
          transition: 'border-color 0.1s ease',
          margin: '0 auto'  // Aligner la carte à droite
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >


 

    <CardContent>
      <Typography variant="h8" sx={{ color: '#3A0CA3' }}>
        Créer un nouveau employé
      </Typography>
      <div style={{ height: '10px' }}></div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} >
          <Grid item xs={15} sm={6}>
            <TextField
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              InputProps={{
                startAdornment: <AccountCircleIcon sx={{ color: "#F72585", marginRight: '10px' }} />,
                sx: {
                  borderRadius: '10px', 
                  // Ajouter borderRadius ici pour arrondir les bords
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              InputProps={{
                startAdornment: <PersonIcon sx={{ color: "#F72585", marginRight: '10px' }} />,
                sx: {
                  borderRadius: '10px',
                },
              }}
            />
          </Grid>
         
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              InputProps={{
                startAdornment: <PhoneIcon sx={{ color: "#F72585", marginRight: '10px' }} />,
                sx: {
                  borderRadius: '10px',
                },
              }}
            />
          </Grid>








          <Grid item xs={15} sm={6}>
            <TextField
              fullWidth
              id="cin"
              label="Num CIN"
              name="Num Cin"
              value={formik.values.Cin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.Cin && Boolean(formik.errors.Cin)}
              helperText={formik.touched.Cin && formik.errors.Cin}
              InputProps={{
                startAdornment: <AssignmentIndIcon sx={{ color: "#F72585", marginRight: '10px' }} />,
                sx: {
                  borderRadius: '10px', // Ajouter borderRadius ici pour arrondir les bords
                },
              }}
            />
          </Grid>




          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: <EmailIcon sx={{ color: "#F72585", marginRight: '10px' }} />,
                sx: {
                  borderRadius: '10px',
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                startAdornment: <LockIcon sx={{ color: "#F72585", marginRight: '10px' }} />,
                sx: {
                  borderRadius: '10px',
                },
              }}
            />
          </Grid>


          <Grid item xs={6}>
            <TextField
              fullWidth
              id="role"
              label="Role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
              InputProps={{
                startAdornment: <WorkIcon sx={{ color:"#F72585", marginRight: '10px' }} />,
                sx: {
                  borderRadius: '10px',
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="dateOfBirth"
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
              helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
              InputProps={{
                startAdornment: <EventIcon sx={{ color: "#F72585", marginRight: '10px' }} />,
                sx: {
                  borderRadius: '10px',
                },
              }}
            />
          </Grid>





          <Grid item xs={12}>
            <TextField
              fullWidth
              id="address"
              label="Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              InputProps={{
                startAdornment: <LocationOnIcon sx={{ color:"#F72585", marginRight: '10px' }} />,
                sx: {
                  borderRadius: '10px',
                },
              }}
            />
          </Grid>
          
          
          
          <Grid item xs={4.5}>
          <Button
  fullWidth
  variant="contained"
  onClick={handleButtonClick}
  sx={{
    backgroundImage: `linear-gradient(to right, ${buttonColors.primary})`, // Utilisation de la couleur primaire
    color: 'white',
    borderRadius: '10px',
   
    '&:hover': {
      backgroundImage: `linear-gradient(to right, ${buttonColors.primary})`, // Conserver la même couleur au survol
    },
  }}
>
  Créer 
</Button>

          </Grid>
        </Grid>
      </form>
    </CardContent>



    <img
        src={freeImage1}
        alt="Free Image"
        className="moving-image"
        style={{
          maxWidth: '63%',
          objectFit: 'cover',
          margin: '20',
          marginTop: '10px',
          
        }}
      />


         
      </Card>
     


 








  );
};

export default DashCreateUser;
