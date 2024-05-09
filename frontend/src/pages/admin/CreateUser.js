import { Box, Typography } from '@mui/material'
import React, {  useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux'
import { allUserAction, userSignUpAction } from '../../redux/actions/userAction';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Password } from '@mui/icons-material';

const validationSchema = yup.object({
firstName: yup
    .string('Enter a  firstName')
    .max(32, 'Description should be of maximum 32 characters length')
    .required(' firstName is required'),
lastName: yup
    .string('Enter a lastName')
    .max(32, 'Description should be of maximum 32 characters length')
    .required('lastName is required'),
Password: yup
    .string('Enter a Password')
    .max(6, 'Description should be of maximum 6 characters length')
    .required('Password is required'),
address: yup
    .string('Enter a address')
    .required('addressis required'),
email: yup
    .string('Enter a email')
    .required('email is required'),
phone: yup
    .number('Enter a email')
    .max(32, 'Description should be of maximum 32 mumber length')
    .required('email is required'),
});


const DashCreateUser = () => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false); 

  
    useEffect(() => {
        dispatch((allUserAction));
    }, [dispatch]);


    const formik = useFormik({
        initialValues: {
           email: '',
           role: '',
           firstName: '',
           lastName:'',
           Password:'',
           address:'',
           phone:'',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(userSignUpAction(values))
            // alert(JSON.stringify(values, null, 2));
            actions.resetForm();
        },
    });
    
    
    return (
        <>

            <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 , border: `2px solid ${isHovered ? '#0b3948' : 'transparent'}`,}}>


                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style'  >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    <Card
                    style={{
                        borderRadius: '15px',
                        overflow: 'hidden',
                        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                        border: `2px solid ${isHovered ? '#0b3948' : 'transparent'}`,
                        transition: 'border-color 0.3s ease'
                    }}
                >
                     <CardContent>
                        <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                            Create a user
                        </Typography>
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name='firstName'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="firstName"
                            value={formik.values.firstName}
                            InputProps={{
                                sx: {
                                    color: isHovered ? '#0b3948' : 'black',
                                    borderRadius: '8px',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isHovered ? '#0b3948' : 'transparent',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#0b3948',
                                    },
                                },
                                disableUnderline: true,
                                focused: {
                                    borderColor: 'blue'
                                }
                            }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="lastName"
                            label="last Name"
                            name='lastName'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="lastName"
                            value={formik.values.lastName}
                            InputProps={{
                                sx: {
                                    color: isHovered ? '#0b3948' : 'black',
                                    borderRadius: '8px',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isHovered ? '#0b3948' : 'transparent',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#0b3948',
                                    },
                                },
                                disableUnderline: true,
                                focused: {
                                    borderColor: 'blue'
                                }
                            }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="email"
                            label="E_mail"
                            name='email'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="E_mail"
                            value={formik.values.email}
                            InputProps={{
                                sx: {
                                    color: isHovered ? '#0b3948' : 'black',
                                    borderRadius: '8px',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isHovered ? '#0b3948' : 'transparent',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#0b3948',
                                    },
                                },
                                disableUnderline: true,
                                focused: {
                                    borderColor: 'blue'
                                }
                            }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />   
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="Password"
                            label="Password"
                            name='Password'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Password"
                            value={formik.values.Password}
                            InputProps={{
                                sx: {
                                    color: isHovered ? '#0b3948' : 'black',
                                    borderRadius: '8px',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isHovered ? '#0b3948' : 'transparent',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#0b3948',
                                    },
                                },
                                disableUnderline: true,
                                focused: {
                                    borderColor: 'blue'
                                }
                            }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.Password && Boolean(formik.errors.Password)}
                            helperText={formik.touched.Password && formik.errors.Password}
                        />
                          <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="address"
                            label="Address"
                            name='address'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="address"
                            value={formik.values.address}
                            InputProps={{
                                sx: {
                                    color: isHovered ? '#0b3948' : 'black',
                                    borderRadius: '8px',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isHovered ? '#0b3948' : 'transparent',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#0b3948',
                                    },
                                },
                                disableUnderline: true,
                                focused: {
                                    borderColor: 'blue'
                                }
                            }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                        />
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="phone"
                            label="Phone"
                            name='phone'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="phone"
                            value={formik.values.phone}
                            InputProps={{
                                sx: {
                                    color: isHovered ? '#0b3948' : 'black',
                                    borderRadius: '8px',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isHovered ? '#0b3948' : 'transparent',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#0b3948',
                                    },
                                },
                                disableUnderline: true,
                                focused: {
                                    borderColor: 'blue'
                                }
                            }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />
                         <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="role"
                            label="role"
                            name='role'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="role"
                            value={formik.values.role}
                            InputProps={{
                                sx: {
                                    color: isHovered ? '#0b3948' : 'black',
                                    borderRadius: '8px',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: isHovered ? '#0b3948' : 'transparent',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#0b3948',
                                    },
                                },
                                disableUnderline: true,
                                focused: {
                                    borderColor: 'blue'
                                }
                            }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.role && Boolean(formik.errors.role)}
                            helperText={formik.touched.role && formik.errors.role}
                        />

                        <Button fullWidth variant="contained" type='submit' >CREATE USER</Button>
                        </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default DashCreateUser;