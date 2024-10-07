import React, { useState, useEffect } from 'react';
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
import LinearProgress from '@mui/material/LinearProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createproductstart } from '../../redux/action';

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
  inputsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const categories = ['Men', 'Women', 'Kids'];
const inventories = [1, 2, 3];
const conditions = ['Premium', 'Excellent', 'Very Good', 'Good'];


function AddProductForm() {

  const classes = useStyle();

  const [formData, setFormData] = useState({
    productname: '',
    brand: '',
    price: '',
    size: '',
    shoecondition: '',
    inventory: '',
    category: '',
    description: '',
    images: [],
    effect: null, // Added a state for the effect file
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [effectProgress, seteffectProgress] = useState(0);
  const [filesUploaded, setFilesUploaded] = useState(false);
  const [effectfilesUploaded, seteffectFilesUploaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {

          clearInterval(timer); // Stop the timer when progress reaches 100%
          return 100; // Return the current progress (100)
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      seteffectProgress((oldProgress) => {
        if (oldProgress === 100) {

          clearInterval(timer); // Stop the timer when progress reaches 100%
          return 100; // Return the current progress (100)
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleChange = event => {
    if (event.target.name === 'image') {
      setFormData({ ...formData, images: event.target.files });
      setFilesUploaded(true);
    } else if (event.target.name === 'effect') {
      setFormData({ ...formData, effect: event.target.files[0] });
      seteffectFilesUploaded(true);
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };


  const handleSubmit = event => {
    event.preventDefault();

    const postData = new FormData();
    postData.append('productname', formData.productname);
    postData.append('brand', formData.brand);
    postData.append('price', formData.price);
    postData.append('size', formData.size);
    postData.append('shoecondition', formData.shoecondition);
    postData.append('inventory', formData.inventory);
    postData.append('category', formData.category);
    postData.append('description', formData.description);
    for (let i = 0; i < formData.images.length; i += 1) {
      postData.append('image', formData.images[i]);
    }
    postData.append('effect', formData.effect);

    dispatch(createproductstart(postData));
    toast.success('Product added successfully!');
    setTimeout(() => {
      navigate(-1);
    }, 10000);
  };

  const goback = () => {
    navigate(-1);
  };

  const goforward = () => {
    navigate(+1);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginLeft: '90px', marginRight: '90px' }}>
        <button className='text-left' onClick={goback} >
          <ArrowBackIosIcon />
        </button>
        <h3 style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '24px' }}>Add New Products</h3>
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
                  label="Product Name"
                  variant="outlined"
                  name="productname"
                  // value={formValue.productname}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl className={classes.fieldStyle}>
                <TextField
                  id="outlined-basic"
                  label="Brand"
                  variant="outlined"
                  name="brand"
                  // value={formValue.brand}
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </div>

            <div className={classes.fieldStyle1}>
              <FormControl className={classes.fieldStyle}>
                <TextField
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  name="price"
                  // value={formValue.price}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">PKR</InputAdornment>,
                    inputProps: {
                      pattern: "[0-9]*", // Regular expression pattern to allow only numbers
                    },
                  }}
                  required />

              </FormControl>
              <FormControl className={classes.fieldStyle}>
                <TextField
                  id="outlined-basic"
                  label="Size"
                  variant="outlined"
                  name="size"
                  // value={formValue.size}
                  onChange={handleChange}
                  required
                  InputProps={{
                    endAdornment: <InputAdornment position="end">EUR</InputAdornment>,
                    inputProps: {
                      pattern: "[0-9]*", // Regular expression pattern to allow only numbers
                    },
                  }} />
              </FormControl>
            </div>
            <FormControl className={classes.selectStyle}>

              <TextField
                select
                label="Condition"
                name="shoecondition"
                // value={formValue.shoecondition}
                onChange={handleChange}
                helperText="Please select the condition of shoe"

              >
                {conditions.map((shoecondition) => (
                  <MenuItem key={shoecondition} value={shoecondition}>
                    {shoecondition}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <FormControl className={classes.selectStyle}>
              <TextField
                select
                label="Inventory"
                name="inventory"
                // value={formValue.inventory}
                onChange={handleChange}
                helperText="Please select the inventory id"
              >
                {inventories.map((inventory) => (
                  <MenuItem key={inventory} value={inventory}>
                    {inventory}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <FormControl className={classes.selectStyle}>
              <TextField
                select
                label="Category"
                name="category"
                // value={formValue.category}
                onChange={handleChange}
                helperText="Please select the category"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

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

            <div className={classes.inputsContainer}> {/* Container for both inputs */}
              <FormControl className={classes.fieldStyle}>
                <InputLabel className={classes.uploadlabestyle}> Upload 4 images </InputLabel>
                <Paper
                  style={{
                    border: '2px dashed #000',
                    padding: 20,
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: '#eee',
                  }}
                >
                  <label htmlFor="raised-button-file">
                    <input
                      style={{ display: 'none' }}
                      id="raised-button-file"
                      type="file"
                      onChange={handleChange}
                      multiple
                      name='image'
                    />
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        {filesUploaded ? <CheckCircleIcon style={{ fontSize: 60, color: '#4cbb17' }} /> : <CloudUploadIcon style={{ fontSize: 60 }} />}
                      </IconButton>
                      <Typography>
                        {filesUploaded ? "Images Uploaded!" : "Click to select images"}
                      </Typography>
                    </Box>
                  </label>
                </Paper>
                <Box sx={{ width: '100%', marginBottom: 2, marginTop: 2 }}>
              {formData.images.length > 0 && (
                <LinearProgress variant="determinate" value={progress} />
              )}
            </Box>
              </FormControl>
              

              <FormControl className={classes.fieldStyle}>
                <InputLabel className={classes.uploadlabestyle}>Upload 3D model</InputLabel>
                <Paper
                  style={{
                    border: '2px dashed #000',
                    padding: 20,
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: '#eee',
                  }}
                >
                  <label htmlFor="effect-file">
                    <input
                      style={{ display: 'none' }}
                      id="effect-file"
                      type="file"
                      onChange={handleChange}
                      name='effect'
                    />
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <IconButton color="primary" aria-label="upload file" component="span">
                        {formData.effect ? <CheckCircleIcon style={{ fontSize: 60, color: '#4cbb17' }} /> : <CloudUploadIcon style={{ fontSize: 60 }} />}
                      </IconButton>
                      <Typography>
                        {formData.effect ? "3D Model Uploaded!" : "Click to select 3D Model"}
                      </Typography>
                    </Box>
                  </label>
                </Paper>
                <Box sx={{ width: '100%', marginBottom: 0, marginTop: 2 }}>
              {formData.effect && (
                <LinearProgress variant="determinate" value={progress} />
              )}
            </Box>

              </FormControl>
            </div>

            


            <Button type="submit" variant="contained" color="primary" className='bg-blue-600 '>
              Add Product
            </Button>
          </FormGroup>
        </form>
      </div>
    </>
  );
}

export default AddProductForm;
