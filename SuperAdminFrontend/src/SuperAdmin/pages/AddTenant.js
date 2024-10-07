import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, FormControl, Input, InputLabel, Button, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { createtenantsstart } from '../../redux/action';


const useStyle = makeStyles({
  formStyle: {
    width: "85%",
    margin: "auto",
    padding: 20,
    // border: "1px solid black",
    boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.5)", // Add this boxShadow property
    marginTop: 40,
  },
  fieldStyle: {
    marginTop: 10,
    flex: 1,
    marginLeft: 10,
  },
  twocolums:{
display: "flex",
  },
  buttons:{
    marginTop: 20,
    marginLeft: 10,
  }
});

export default function AddTenant() {
  const classes = useStyle();

  const [formValue, setFormValue] = useState({ firstname: '', lastname: '', phone: '', email: '', service: '', address: '' });

  const [message, setMessage] = useState();

  const navigate = useNavigate();

  const dispatch= useDispatch();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  
  // const submitTenant = async (e) => {
  //   e.preventDefault();

  //   const allInputvalue = {
  //     firstname: formValue.firstname,
  //     lastname: formValue.lastname,
  //     phone: formValue.phone,
  //     email: formValue.email,
  //     service: formValue.service,
  //     address: formValue.address,
  //     status: formValue.status,
  //   };

  //   try {
  //     const res = await fetch("http://localhost:5000/api/addtenant", {
  //       method: "POST",
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(allInputvalue),
  //     });

  //     const resjson = await res.json();

  //     if (res.status === 200) {
  //       setMessage(resjson.success);
  //       setTimeout(() => {
  //         navigate(-1);
  //       }, 2000);
  //     } else {
  //       setMessage("Some error occurred!");
  //     }

  //     const allInputvalue1 = {
  //       tenantname: formValue.firstname,
  //       phone: formValue.phone,
  //       service: formValue.service,
  //       startdate: formValue.startdate,
  //       enddate: formValue.enddate,
  //       monthlyamount: formValue.monthlyamount,
  //     };

  //     const res1 = await fetch("http://localhost:5000/api/addsubscription", {
  //       method: "POST",
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(allInputvalue1),
  //     });

  //     const resjson1 = await res1.json();

  //     if (res1.status === 200) {
  //       setMessage(resjson1.success);
  //       setTimeout(() => {
  //         // navigate(-1); // Assuming navigate function exists and can be used to navigate to the previous page.
  //       }, 2000);
  //     } else {
  //       setMessage("Some error occurred!");
  //     }



  //     const allInputvalue2 = {
  //       tenantname: formValue.firstname,
  //       monthlyamount: formValue.monthlyamount,
  //       serviceprovider: formValue.serviceprovider,
  //     };

  //     try {
  //       const res2 = await fetch("http://localhost:5000/api/addpayment", {
  //         method: "POST",
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(allInputvalue2),
  //       });

  //       const resjson2 = await res2.json();

  //       if (res2.status === 200) {
  //         setMessage(resjson2.success);
  //         console.log('Payment API request successful:', resjson2);
  //         setTimeout(() => {
  //           // navigate(-1); // Assuming navigate function exists and can be used to navigate to the previous page.
  //         }, 2000);
  //       } else {
  //         console.error('Payment API request failed:', res2.status, resjson2);
  //         setMessage("Some error occurred!");
  //       }
  //     } catch (error) {
  //       console.error('Payment API request error:', error);
  //     }




  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };


  const submitTenant = async (e) => {
    e.preventDefault();

    const allInputvalue = {
      firstname: formValue.firstname,
      lastname: formValue.lastname,
      phone: formValue.phone,
      email: formValue.email,
      service: formValue.service,
      address: formValue.address,
      status: formValue.status,
    };

    try {
      dispatch(createtenantsstart(allInputvalue))
    toast.success("Tenant added successfully!");
    setTimeout(() => {
             navigate(-1);
         }, 2000);

      const allInputvalue1 = {
        tenantname: formValue.firstname,
        phone: formValue.phone,
        service: formValue.service,
        startdate: formValue.startdate,
        enddate: formValue.enddate,
        monthlyamount: formValue.monthlyamount,
      };

      const res1 = await fetch("http://localhost:5000/api/addsubscription", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allInputvalue1),
      });

      const resjson1 = await res1.json();

      if (res1.status === 200) {
        setMessage(resjson1.success);
        setTimeout(() => {
          // navigate(-1); // Assuming navigate function exists and can be used to navigate to the previous page.
        }, 2000);
      } else {
        setMessage("Some error occurred!");
      }



      const allInputvalue2 = {
        tenantname: formValue.firstname,
        monthlyamount: formValue.monthlyamount,
        serviceprovider: formValue.serviceprovider,
      };

      try {
        const res2 = await fetch("http://localhost:5000/api/addpayment", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(allInputvalue2),
        });

        const resjson2 = await res2.json();

        if (res2.status === 200) {
          setMessage(resjson2.success);
          console.log('Payment API request successful:', resjson2);
          setTimeout(() => {
            // navigate(-1); // Assuming navigate function exists and can be used to navigate to the previous page.
          }, 2000);
        } else {
          console.error('Payment API request failed:', res2.status, resjson2);
          setMessage("Some error occurred!");
        }
      } catch (error) {
        console.error('Payment API request error:', error);
      }




    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2 style={{ marginLeft: '10px' }} >
        Add New Tenants
      </h2>
      <p>{message}</p>
      <form onSubmit={submitTenant}>

        <FormGroup className={classes.formStyle} >
          <div className={classes.twocolums}>
          <FormControl className={classes.fieldStyle}>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              name="firstname"
              value={formValue.firstname}
              onChange={handleInput}
              required />
          </FormControl>
          <FormControl className={classes.fieldStyle}>
            <TextField
              id="outlined-basic"
              label="Last name"
              variant="outlined"
              name="lastname"
              value={formValue.lastname}
              onChange={handleInput}
              required />
          </FormControl>
          </div>
          <div className={classes.twocolums}>
          <FormControl className={classes.fieldStyle}>
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              name="phone"
              value={formValue.phone}
              onChange={handleInput}
              required />
          </FormControl>
          <FormControl className={classes.fieldStyle}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
              value={formValue.email}
              onChange={handleInput}
              required />
          </FormControl>
          </div>
          <FormControl className={classes.fieldStyle}>
            <TextField
              required
              id="outlined-basic"
              label="Service"
              variant="outlined"
               name="service"
                value={formValue.service}
               onChange={handleInput} />
          </FormControl>
          <FormControl className={classes.fieldStyle}>
          <TextField
              required
              id="outlined-basic"
              label="Address"
               name="address" 
               value={formValue.address} 
               onChange={handleInput} />
          </FormControl>
          <FormControl className={classes.fieldStyle}>
          <TextField
              required
              id="outlined-basic"
              label="Status"
               name="status"
                value={formValue.status} 
                onChange={handleInput} />
          </FormControl>
          <div className={classes.twocolums}>
          <FormControl className={classes.fieldStyle}>
          <TextField
              required
              id="outlined-basic"
              label="Start Date"
               name="startdate"
                value={formValue.startdate} 
                onChange={handleInput} />
          </FormControl>
          <FormControl className={classes.fieldStyle}>
          <TextField
              required
              id="outlined-basic"
              label="End Date"
               name="enddate" 
               value={formValue.enddate}
                onChange={handleInput} />
          </FormControl>
          </div>
          <div className={classes.twocolums}>
          <FormControl className={classes.fieldStyle}>
          <TextField
              required
              id="outlined-basic"
              label="Monthly Amount"
               name="monthlyamount"
                value={formValue.monthlyamount}
                 onChange={handleInput} />
          </FormControl>
          <FormControl className={classes.fieldStyle}>
          <TextField
              required
              id="outlined-basic"
              label="Service Provider"
               name="serviceprovider" 
               value={formValue.serviceprovider} 
               onChange={handleInput} />
          </FormControl>
          </div>
          <Button type="submit" variant='contained' color='primary' className={classes.buttons}>
            Add Tenant
          </Button>
        </FormGroup>
      </form>


    </div>
  )
}
