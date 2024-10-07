import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormGroup,
  FormControl,
  TextField,
  InputAdornment,
  Button,
  MenuItem,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { makeStyles } from '@mui/styles';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns'; // Import format function
import { useNavigate } from 'react-router-dom';
import { createtenantsstart } from '../../redux/action';


const useStyle = makeStyles({
  formStyle: {
    width: "95%",
    margin: "auto",
    padding: 20,
    // border: "1px solid black",
    boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.5)", // Add this boxShadow property
    marginTop: 40,
  },
  fieldStyle: {
    marginTop: 9,
    flex: 1,
    marginLeft: 6,
    marginRight: 8,
  },
  // buttons: {
  //   marginTop: 20,
  //   marginLeft: 10,
  // },
  fieldStyle1: {
    display: 'flex',
  },
  fieldStyle2: {
    marginTop: 3,
    flex: 1,
    marginLeft: 0,
  },
});

export default function AddTenant() {
  const classes = useStyle();

  const [formValue, setFormValue] = useState({ firstname: '', lastname: '', phone: '', email: '', service: '', address: '' });


  const services = ['Premium', 'Standard'];
  const serviceproviders = ['Visa', 'Mastercard'];
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    setFormValue({ ...formValue, startdate: format(date, 'yyyy-MM-dd') });
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    setFormValue({ ...formValue, enddate: format(date, 'yyyy-MM-dd') });
  };



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

      const res1 = await fetch("http://api.dopes.online/api/addsubscription", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(allInputvalue1),
      });

      const resjson1 = await res1.json();

      if (res1.status === 200) {

        setTimeout(() => {
          // navigate(-1); // Assuming navigate function exists and can be used to navigate to the previous page.
        }, 2000);
      }


      const allInputvalue2 = {
        tenantname: formValue.firstname,
        monthlyamount: formValue.monthlyamount,
        serviceprovider: formValue.serviceprovider,
      };

      try {
        const res2 = await fetch("http://api.dopes.online/api/addpayment", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(allInputvalue2),
        });

        const resjson2 = await res2.json();

        if (res2.status === 200) {

          console.log('Payment API request successful:', resjson2);
          setTimeout(() => {
            // navigate(-1); // Assuming navigate function exists and can be used to navigate to the previous page.
          }, 2000);
        } else {
          console.error('Payment API request failed:', res2.status, resjson2);

        }
      } catch (error) {
        console.error('Payment API request error:', error);
      }




    } catch (error) {
      console.error("Error:", error);
    }
  };

  const goback = () => {
    navigate(-1);
  };

  const goforward = () => {
    navigate(+1);
  };


  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginLeft: '90px', marginRight: '90px' }}>
        <button className='text-left' onClick={goback} >
          <ArrowBackIosIcon />
        </button>
        <h3 style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '24px' }}>Add New Tenants</h3>
        <button className='text-right' onClick={goforward}>
          <ArrowForwardIosIcon />
        </button>
      </div>

      <form onSubmit={submitTenant}>

        <FormGroup className={classes.formStyle} >
          <div className={classes.fieldStyle1}>
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
          <div className={classes.fieldStyle1}>
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
              helperText="Please select the Service type"
              select
              label="Service"
              name="service"
              // value={formValue.shoecondition}
              onChange={handleInput}


            >
              {services.map((service) => (
                <MenuItem key={service} value={service}>
                  {service}
                </MenuItem>
              ))}
            </TextField>
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

          <div className={classes.fieldStyle1}>
            <FormControl className={classes.fieldStyle2}>
              <TextField
                className={classes.fieldStyle}
                id="outlined-basic"
                label="Start Date"
                variant="outlined"
                name="startdate"
                value={selectedStartDate ? format(selectedStartDate, 'yyyy/MM/dd') : ''} // Format selected date
                onChange={handleInput}
                required
                InputProps={{
                  inputComponent: DatePicker,
                  inputProps: {
                    selected: selectedStartDate,
                    onChange: handleStartDateChange,
                    minDate: new Date(),

                  }
                }}
              />
            </FormControl>
            <FormControl className={classes.fieldStyle2}>
              <TextField
                className={classes.fieldStyle}
                id="outlined-basic"
                label="End Date"
                variant="outlined"
                name="enddate"
                value={selectedEndDate ? format(selectedEndDate, 'yyyy/MM/dd') : ''}
                onChange={handleInput}
                required
                InputProps={{
                  inputComponent: DatePicker,
                  inputProps: {
                    selected: selectedEndDate,
                    onChange: handleEndDateChange,
                    minDate: new Date(),


                  }
                }}
              />
            </FormControl>
          </div>
          <div className={classes.fieldStyle1}>
            <FormControl className={classes.fieldStyle}>
              <TextField
                required
                id="outlined-basic"
                label="Monthly Amount"
                name="monthlyamount"
                value={formValue.monthlyamount}
                onChange={handleInput}
                InputProps={{
                  endAdornment: <InputAdornment position="end">PKR</InputAdornment>,
                }} />

            </FormControl>
            <FormControl className={classes.fieldStyle}>

              <TextField

                select
                label="Service Provider"
                name="serviceprovider"
                // value={formValue.shoecondition}
                onChange={handleInput}


              >
                {serviceproviders.map((serviceprovider) => (
                  <MenuItem key={serviceprovider} value={serviceprovider}>
                    {serviceprovider}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </div>
          <Button type="submit" variant='contained' color='primary' className='bg-blue-600 mt-4 ml-1'  style={{ width: '1090px' }}>
            Add Tenant
          </Button>
        </FormGroup>
      </form>


    </div>
  )
}
