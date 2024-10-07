import React, { useState } from 'react';
import {
  FormGroup,
  FormControl,
  TextField,
  InputAdornment,
  InputLabel,
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  MenuItem,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns'; // Import format function
import { creatediscountsstart } from '../../redux/action';
import 'react-datepicker/dist/react-datepicker.css';



const useStyle = makeStyles({
  formStyle: {
    width: '85%',
    margin: 'auto',
    padding: 20,
    boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.5)',
    marginTop: 40,
  },
  fieldStyle: {
    marginTop: 10,
    flex: 1,
    marginRight: 10,
  },
  fieldStyle1: {
    display: 'flex',
  },
  labestyle: {
    paddingTop: '8px',
  },
  uploadlabestyle: {
    paddingBottom: '20px',
  },
  selectStyle: {
    marginTop: 12,
  },
  uploadinputBox: {
    border: '1px solid #ccc',
    borderRadius: 4,
    paddingTop: '20px',
    width: '100%',
  },
  buttonstyle: {
    marginTop: 20,
  },
});

const categories = ['Men', 'Women', 'Kids'];
const inventories = [1, 2, 3];
const conditions = ['Premium', 'Excellent', 'Very Good', 'Good'];
const types = ['Percentage'];

function AddDiscountForm() {

  const classes = useStyle();

  const [formData, setFormData] = useState({
    discountname: '',
    type: '',
    amount: '',
    description: '',
    startdate: '',
    enddate: '',
  });

  const dispatch=useDispatch();
  const navigate=useNavigate();
 const [startDate, setStartDate] = useState(new Date());
 const [selectedStartDate, setSelectedStartDate] = useState(null);
 const [selectedEndDate, setSelectedEndDate] = useState(null);


const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
};

const handleSubmit = async (event) => {
  event.preventDefault();
  
  try {
    // Make API call to insert data into the database
    console.log(formData);
    const response = await axios.post('http://localhost:5000/api/adddiscount', formData);
    
    // Check if the request was successful
    if (response.status === 200) {
      // Optionally, you can display a success message using toast
      toast.success('Discount added successfully');
      
      // Optionally, you can reset the form after successful submission
      setFormData({
        discountname: '',
        type: '',
        amount: '',
        description: '',
        startdate: '',
        enddate: '',
      });
    } else {
      // Display an error message if the request was not successful
      toast.error('Failed to add discount');
    }
  } catch (error) {
    // Display an error message if there's an error with the API call
    console.error('Error adding discount:', error);
    toast.error('An error occurred while adding discount');
  }
};


  const goback = () => {
    navigate(-1);
  };

  const goforward = () => {
    navigate(+1);
  };


  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
  return (
    <>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginLeft: '90px', marginRight: '90px' }}>
        <button className='text-left' onClick={goback} >
          <ArrowBackIosIcon />
        </button>
        <h3 style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '24px' }}>Add New Discounts</h3>
        <button className='text-right' onClick={goforward}>
          <ArrowForwardIosIcon />
        </button>

      </div>
    <div>
   
    <form onSubmit={handleSubmit}>
      <FormGroup className={classes.formStyle}>
        <div className={classes.fieldStyle1}>
          <FormControl className={classes.fieldStyle}>
            <TextField
              id="outlined-basic"
              label="Discount Name"
              variant="outlined"
              name="discountname"
             // value={formValue.productname}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl className={classes.fieldStyle}>
            <TextField
            select
              id="outlined-basic"
              label="Type"
              variant="outlined"
              name="type"
             // value={formValue.brand}
              onChange={handleChange}
              required>
                {types.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
              </TextField>
            
          </FormControl>
        </div>

        <div className={classes.fieldStyle1}>
          <FormControl className={classes.fieldStyle}>
            <TextField
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              name="amount"
             // value={formValue.price}
              onChange={handleChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              required />

          </FormControl>
        </div>
      
        <FormControl className={classes.fieldStyle}>
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            name="description"
           // value={formValue.description}
            onChange={handleChange}
            multiline
            rows={4} />
        </FormControl>

        <div className={classes.fieldStyle1}>
        <FormControl className={classes.fieldStyle}>
      <TextField
        className={classes.fieldStyle}
        id="outlined-basic"
        label="Start Date"
        variant="outlined"
        name="startdate"
        value={selectedStartDate ? format(selectedStartDate, 'MM/dd/yyyy') : ''} // Format selected date
        onChange={handleChange}
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
          <FormControl className={classes.fieldStyle}>
          <TextField
        className={classes.fieldStyle}
        id="outlined-basic"
        label="End Date"
        variant="outlined"
        name="enddate"
        value={selectedEndDate ? format(selectedEndDate, 'MM/dd/yyyy') : ''}
        onChange={handleChange}
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

      


        <Button type="submit" variant="contained" color="primary"  className='bg-blue-600 mt-2'>
          Add Discount
        </Button>
      </FormGroup>
    </form>
  </div>

    </>
  );
}

export default AddDiscountForm;
