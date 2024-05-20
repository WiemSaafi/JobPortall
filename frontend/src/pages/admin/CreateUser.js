import React, { useState } from 'react';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { userSignUpAction } from '../../redux/actions/userAction';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import freeImage from '../../img/hu.jpg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LockIcon from '@mui/icons-material/Lock';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EventIcon from '@mui/icons-material/Event';


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








  return (
<Box sx={{ height: '86vh', backgroundColor: '#f0f2f5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '1050%',
          maxWidth: 1150,
          borderRadius: '15px',
          overflow: 'hidden',
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
          border: `2px solid ${isHovered ? "#39999f" : 'transparent'}`,
          transition: 'border-color 0.1s ease',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

















<CardContent>
  <Typography variant="h6" component="h2" sx={{ pb: 1 }}>
    Create a User
  </Typography>
  <form onSubmit={formik.handleSubmit}>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
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
            startAdornment: <AccountCircleIcon sx={{ color: "#39999f", marginRight: '10px' }} />
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
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
            startAdornment: <AccountCircleIcon sx={{ color: "#39999f", marginRight: '10px' }} />
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
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
            startAdornment: <EmailIcon sx={{ color: "#39999f", marginRight: '10px' }} />
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
            startAdornment: <PhoneIcon sx={{ color: "#39999f", marginRight: '10px' }} />
          }}
        />
      </Grid>
      <Grid item xs={15}>
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
            startAdornment: <LocationOnIcon sx={{ color:"#39999f", marginRight: '10px' }} />
          }}
        />
      </Grid>
      <Grid item xs={15}>
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
            startAdornment: <LockIcon sx={{ color: "#39999f", marginRight: '10px' }} />
          }}
        />
      </Grid>
      <Grid item xs={15}>
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
            startAdornment: <SupervisorAccountIcon sx={{ color:"#39999f", marginRight: '10px' }} />
          }}
        />
      </Grid>
      <Grid item xs={15}>
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
            startAdornment: <EventIcon sx={{ color: "#39999f", marginRight: '10px' }} />
          }}
        />
      </Grid>
    





















              <Grid item xs={12}>
              <Button fullWidth variant="contained" type="submit" sx={{ backgroundColor: "#39999f", color: 'white', '&:hover': { backgroundColor: '#388e3c' } }}>
  CREATE USER
</Button>

              </Grid>
            </Grid>
          </form>
        </CardContent>
        {/* <img src={freeImage} alt="Free Image" className="moving-image" style={{ maxWidth: '49%', objectFit: 'cover', transform: 'translateX(-50px)' }} />
        <style>
          {`
            .moving-image {
              animation: moveUpDown 2.5s infinite alternate;
            }

            @keyframes moveUpDown {
              0% {
                transform: translateX(-80px) translateY(0);
              }
              100% {
                transform: translateX(-80px) translateY(20px);
              }
            }
          `}
        </style> */}
      </Card>
    </Box>












  );
};

export default DashCreateUser;
