import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, FormControl, Input, InputLabel, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { updatetenantsStart } from '../../redux/action';

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
  },
});

export default function EditTenant() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { phone } = useParams();
  const [editUser, setEditUser] = useState({ firstname: '', lastname: '', phone: '', email: '', service: '', address: '' });
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { tenants } = useSelector((state) => state.tenants);

  const handleIput = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (phone) {
      const singletenant = tenants.find(item => item.phone === phone);
      setEditUser(singletenant);
    }
  }, [phone, tenants]);

  const handleInput = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const editInputValue = {
      firstname: editUser.firstname,
      last_name: editUser.last_name,
      email: editUser.email,
      service: editUser.service,
      address: editUser.address,
    };

    dispatch(updatetenantsStart({ phone, tenantinfo: editInputValue }));
    toast.success("Product updated successfully!");
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };



  return (
    <div>
      <h2 style={{ marginLeft: '10px' }}>Edit User</h2>
      <p>{message}</p>
      <form onSubmit={handleUpdate}>
        <FormGroup className={classes.formStyle}>
          <FormControl className={classes.fieldStyle}>
            <InputLabel>First Name</InputLabel>
            <Input name="firstname" value={editUser.firstname} onChange={handleIput} />
          </FormControl>
          <FormControl className={classes.fieldStyle}>
            <InputLabel>Last Name</InputLabel>
            <Input name="lastname" value={editUser.last_name} onChange={handleIput} />
          </FormControl>
          <FormControl className={classes.fieldStyle}>
            <InputLabel>Phone</InputLabel>
            <Input name="phone" value={editUser.phone} onChange={handleIput} />
          </FormControl>
          <FormControl className={classes.fieldStyle}>
            <InputLabel>Email</InputLabel>
            <Input name="email" value={editUser.email} onChange={handleIput} />
          </FormControl>
          <FormControl className={classes.fieldStyle}>
            <InputLabel>Service</InputLabel>
            <Input name="service" value={editUser.service} onChange={handleIput} />
          </FormControl>
          <FormControl className={classes.fieldStyle}>
            <InputLabel>Address</InputLabel>
            <Input name="address" value={editUser.address} onChange={handleIput} />
          </FormControl>
          <Button type="submit" variant='contained' color='primary'>
            Update User
          </Button>
        </FormGroup>
      </form>
    </div>
  );
}
