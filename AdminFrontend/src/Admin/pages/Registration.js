import React, { useState } from 'react'
import { Grid, FormGroup, FormControl, Input, InputLabel, Button } from '@mui/material'
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ...




const useStyle = makeStyles({
    formStyle: {
        width: "85%",
        margin: "auto",
        padding: 30,
        // border: "1px solid black",
        boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.5)", // Add this boxShadow property
        marginTop: 40,
    },
    fieldStyle: {
        marginTop: 10,
    }
});

export default function AddTenant(props) {
    const classes = useStyle();

    const [formValue, setFormValue] = useState({ firstname: '', lastname: '', phone: '', email: '', service: '', address: '',username: '',
    password: '', });

    const [message, setMessage] = useState();

    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const submitAdmin = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/api/addadminupdated', formValue)
        // axios.post('http://api.dopes.online/api/addadminupdated', formValue)
            .then((res) => {
                console.log(res);
                // Handle success
                if (res.data && res.data.Status === "Success") {
                setMessage("Registration done Succesfully!");
                setTimeout(() => {
                    props.closeDialog();
                   // navigate(-1);
                }, 2000);
                } else {
                    setMessage("Some Error Occured!");
                    // Handle other success cases or display an error message
                }
            })
            .catch((err) => {
                console.error(err);
                console.log("Error registering user");
                // Handle error cases or display an error message
            });
    };
    
    return (
        <div>
            <h2 style={{ marginLeft: '10px' }} >
                <p style={{ fontSize: '15px', marginLeft: '0px' }}>Fill in the below form to Sign Up</p>
            </h2>
            <p>{message}</p>
            <form onSubmit={submitAdmin}>

                <FormGroup className={classes.formStyle} >
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl className={classes.fieldStyle}>
                                <InputLabel style={{ fontSize: '12px' }}>First Name</InputLabel>
                                <Input name="firstname" value={formValue.firstname} onChange={handleInput} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl className={classes.fieldStyle}>
                                <InputLabel style={{ fontSize: '12px' }}>Last Name</InputLabel>
                                <Input name="lastname" value={formValue.lastname} onChange={handleInput} />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <FormControl className={classes.fieldStyle}>
                        <InputLabel style={{ fontSize: '12px' }}> Phone </InputLabel>
                        <Input name="phone" value={formValue.phone} onChange={handleInput} />
                    </FormControl>
                    <FormControl className={classes.fieldStyle}>
                        <InputLabel style={{ fontSize: '12px' }}> Email </InputLabel>
                        <Input name="email" value={formValue.email} onChange={handleInput} />
                    </FormControl>
                    <FormControl className={classes.fieldStyle}>
                        <InputLabel style={{ fontSize: '12px' }}> Address </InputLabel>
                        <Input name="address" value={formValue.address} onChange={handleInput} />
                    </FormControl>
                    <FormControl className={classes.fieldStyle}>
                        <InputLabel style={{ fontSize: '12px' }}> Username </InputLabel>
                        <Input name="username" value={formValue.username} onChange={handleInput} />
                    </FormControl>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl className={classes.fieldStyle}>
                                <InputLabel style={{ fontSize: '12px' }}> Password </InputLabel>
                                <Input
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formValue.password}
                                    onChange={handleInput}
                                />
                                <IconButton
                                    onClick={toggleShowPassword}
                                    size="small"
                                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                        <FormControl className={classes.fieldStyle}>
                                <InputLabel style={{ fontSize: '12px' }}> Reenter Password </InputLabel>
                                <Input
                                    name="reenterpassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formValue.reenterpassword}
                                    onChange={handleInput}
                                />
                                <IconButton
                                    onClick={toggleShowPassword}
                                    size="small"
                                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Button type="submit" variant='contained' color='primary'  className='bg-blue-500 mt-10' >
                        Sign Up
                    </Button>
                </FormGroup>
            </form>


        </div>
    )
}
