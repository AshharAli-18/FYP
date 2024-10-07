import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FormGroup, FormControl, Input, InputLabel, Button, Select, MenuItem, Grid, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductStart } from '../../redux/action';

const useStyles = makeStyles({
  formStyle: {
    width: "85%",
    margin: "auto",
    padding: 20,
    boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.5)",
    marginTop: 40,
  },
  fieldStyle: {
    marginTop: 10,
    flex: 1,
    marginRight: 8,
  },
  flexclass: {
    display: 'flex',
  },
  buttonstyle: {
    marginTop: 10,
  }
});

const categories = ['Men', 'Women', 'Kids'];

const inventories = [1, 2, 3];

const conditions = ['Premium', 'Excellent', 'Very Good', 'Good'];

export default function EditProduct() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.data);
  const { productid } = useParams();
  const [editUser, setEditUser] = useState({ productname: '', brand: '', price: '', size: '', shoecondition: '', inventory: '', category: '', description: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (productid) {
      const numericProductId = +productid; // Convert to number
      const singleproduct = products.find(item => item.productid === numericProductId);
      setEditUser(singleproduct);
    }
  }, [productid, products]);

  const handleInput = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const editInputValue = {
      productname: editUser.productname,
      brand: editUser.brand,
      price: editUser.price,
      size: editUser.size,
      shoecondition: editUser.shoecondition,
      inventory: editUser.inventory,
      category: editUser.category,
      description: editUser.description,
    };

    dispatch(updateProductStart({ productid, productinfo: editInputValue }));
    toast.success("Product updated successfully!");
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

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginLeft: '60px', marginRight: '60px' }}>
        <button className='text-left' onClick={goback} >
          <ArrowBackIosIcon />
        </button>
        <button className='text-right' onClick={goforward}>
          <ArrowForwardIosIcon />
        </button>

      </div>
    <div>
      <h2 style={{ marginLeft: '10px' }}>Edit Product</h2>
      <p>{message}</p>
      <form onSubmit={handleUpdate}>
        <FormGroup className={classes.formStyle} >
          <div className={classes.flexclass}>
            <FormControl className={classes.fieldStyle}>
              <TextField
                id="outlined-basic"
                label="Product Name"
                variant="outlined"
                name="productname"
                value={editUser.productname}
                onChange={handleInput} />
            </FormControl>
            <FormControl className={classes.fieldStyle}>
              <TextField
                id="outlined-basic"
                label="Brand"
                variant="outlined" name="brand"
                value={editUser.brand}
                onChange={handleInput} />
            </FormControl>
          </div>
          <div className={classes.flexclass}>
            <FormControl className={classes.fieldStyle}>
              <TextField
                id="outlined-basic"
                label="Price"
                variant="outlined" name="price"
                value={editUser.price}
                onChange={handleInput} />
            </FormControl>
            <FormControl className={classes.fieldStyle}>
              <TextField
                id="outlined-basic"
                label="Size"
                variant="outlined" name="size"
                value={editUser.size}
                onChange={handleInput} />
            </FormControl>
          </div>
          <FormControl className={classes.fieldStyle}>
            <TextField
              id="outlined-basic"
              label="Condition"
              variant="outlined"
              name="shoecondition"
              value={editUser.shoecondition}
              onChange={handleInput}
              select
              helperText="Select the updated condition"
            >
              {conditions.map((shoecondition) => (
                <MenuItem key={shoecondition} value={shoecondition}>
                  {shoecondition}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <FormControl className={classes.fieldStyle}>
            <TextField
              id="outlined-basic"
              label="Inventory"
              variant="outlined"
              name="inventory"
              value={editUser.inventoryid}
              onChange={handleInput}
              select
              helperText="Select the updated inventory id"
            >
              {inventories.map((inventoryid) => (
                <MenuItem key={inventoryid} value={inventoryid}>
                  {inventoryid}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          <FormControl className={classes.fieldStyle}>
            <TextField
              id="outlined-basic"
              label="Category"
              variant="outlined"
              name="category"
              value={editUser.category}
              onChange={handleInput}
              select
              helperText="Select the updated category"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField >
          </FormControl>

          <FormControl className={classes.fieldStyle}>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined" name="description"
              value={editUser.description}
              onChange={handleInput}
              multiline
              rows={4} />
          </FormControl>


          <Button type="submit" variant='contained' color='primary' className={classes.buttonstyle} className='bg-blue-600 mt-4'>
            Edit Product
          </Button>
        </FormGroup>
      </form>
    </div>
    </>
  );
}
