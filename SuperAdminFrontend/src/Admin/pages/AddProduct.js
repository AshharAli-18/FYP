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

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
    images: []
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);


  //   const handleChange = event => {
  //     if (event.target.type === 'file') {
  //       setFormData({ ...formData, images: event.target.files });
  //     } else {
  //       setFormData({ ...formData, [event.target.name]: event.target.value });
  //     }
  //   };

  //   const handleSubmit = event => {
  //     event.preventDefault();
  // console.log("handle submit start");
  //     const postData = new FormData();
  //     postData.append('productname', formData.productname);
  //     postData.append('brand', formData.brand);
  //     postData.append('price', formData.price);
  //     postData.append('size', formData.size);
  //     postData.append('shoecondition', formData.shoecondition);
  //     postData.append('inventory', formData.inventory);
  //     postData.append('category', formData.category);
  //     postData.append('description', formData.description);
  //     for (let i = 0; i < formData.images.length; i+=1) {
  //       postData.append('image', formData.images[i]);
  //     }

  //     dispatch(createproductstart(postData));
  //     toast.success('Product added successfully!');
  //     setTimeout(() => {
  //       navigate(-1);
  //     }, 2000);
  //   };

  const handleChange = event => {
    if (event.target.name === 'image') {
      setFormData({ ...formData, images: event.target.files });
    } else if (event.target.name === 'effect') {
      setFormData({ ...formData, effect: event.target.files[0] });
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
    }, 2000);
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

            <FormControl className={classes.fieldStyle}>
              <InputLabel className={classes.uploadlabestyle}> Upload image </InputLabel>

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
                      <CloudUploadIcon style={{ fontSize: 60 }} />
                    </IconButton>
                    <Typography> Click to select files</Typography>
                  </Box>
                </label>
              </Paper>
            </FormControl>

            {/* Image Preview */}
            {imagePreview && (
              <Box marginTop={2}>
                <Typography variant="h6">Image Preview:</Typography>
                <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
              </Box>
            )}
            <input

              id="effect-file"
              type="file"
              onChange={handleChange}
              name='effect'
            />


            <Button type="submit" variant="contained" color="primary" className='bg-blue-600 mt-2'>
              Add Product
            </Button>
          </FormGroup>
        </form>
      </div>

    </>
  );
}

export default AddProductForm;
