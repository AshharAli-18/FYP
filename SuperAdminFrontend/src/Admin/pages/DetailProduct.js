import React, { useEffect, useState } from 'react';
import { FormGroup, FormControl, Input, InputLabel, Button, Select, MenuItem, Grid, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductStart } from '../../redux/action';
import styles from "../../index.css"

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

export default function ProductDetail() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.data);
  const { productid } = useParams();
  const [editUser, setEditUser] = useState({ productname: '', brand: '', price: '', size: '', shoecondition: '', inventory: '', category: '', description: '' });
  const [message, setMessage] = useState('');
  const handleEdit = async (productid) => {
    navigate(`/dashboard/EditProduct/${productid}`);
  };

  const handleEditClick = () => {
    // Add your code to handle the edit action, e.g., navigating to the edit page.
    handleEdit(productid);
  };

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

  const firstImage = editUser.image ? editUser.image.split(',')[0].trim() : '';
  const secondImage = editUser.image ? editUser.image.split(',')[1].trim() : '';
  const thirdImage = editUser.image ? editUser.image.split(',')[2].trim() : '';
  const forthImage = editUser.image ? editUser.image.split(',')[3].trim() : '';

  const  imageURL = "http://localhost:5000/";
      
  //  const str = "image1706686887350.PNG"
  // imageURL +=str
 
  const image1URL = imageURL+firstImage;
  const image2URL = imageURL+secondImage;
  const image3URL = imageURL+thirdImage;
  const image4URL = imageURL+forthImage;


  const images ={
    img1: imageURL,
    img2: image2URL,
    img3: image3URL,
    img4: image4URL,
  }

  console.log("image1 url:",image1URL)
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (firstImage) {
      setActiveImage(image1URL);
    }
  }, [firstImage, image1URL]);

  console.log("active image is:", activeImage);

  const goback = () => {
    navigate(-1);
};

const goforward = () => {
  navigate(+1);
};
  
  return (
    <>
     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginLeft:'60px',  marginRight:'60px'}}>
 <button className='text-left' onClick={goback} >
    <ArrowBackIosIcon />
</button>
<button className='text-right' onClick={goforward}>
    <ArrowForwardIosIcon />
</button>
</div>
    

    <div className='max-w-7xl mx-auto p-8'>
      <div className='flex flex-col justify-between lg:flex-row gap-16'>
        <div className='flex flex-col gap-6'>
          <img src={activeImage} alt="" className='w-full h-full aspect-square object-cover rounded-xl' />
          <div className='flex flex-row justify-between h-24'>
            <button onClick={() => setActiveImage(images.img1)}>
              <img src={image1URL} alt="" className='w-24 h-24 rounded-md' />
            </button>
            <button onClick={() => setActiveImage(images.img2)}>
              <img src={image2URL} alt="" className='w-24 h-24 rounded-md' />
            </button>
            <button onClick={() => setActiveImage(images.img3)}>
              <img src={image3URL} alt="" className='w-24 h-24 rounded-md' />
            </button>
            <button onClick={() => setActiveImage(images.img4)}>
              <img src={image4URL} alt="" className='w-24 h-24 rounded-md' />
            </button>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div>

            <div className='flex items-center h-5'>
              <h1 className='text-gray-500 text-l mr-2'>Brand: </h1>
              <h1 className='text-black-800 text-l '>{editUser.brand}</h1>
            </div>

            <div className='flex items-center h-5 mt-3'>
              <h1 className='text-gray-500 text-l mr-2'>Product Name:</h1>
              <h1 className='text-black-800 text-l'>{editUser.productname}</h1>
            </div>

            <div className='flex items-center h-5 mt-3'>
              <h1 className='text-gray-500 text-l mr-2'>Inventory ID:</h1>
              <h1 className='text-black-800 text-l'>{editUser.inventoryid}</h1>
            </div>

            <div className='flex items-center h-5 mt-3'>
              <h1 className='text-gray-500 text-l mr-2'>Category: </h1>
              <h1 className='text-black-800 text-l'>{editUser.category} </h1>
            </div>

            <div className='flex items-center h-5 mt-3'>
              <h1 className='text-gray-500 text-l mr-2'>Size: </h1>
              <h1 className='text-black-800 text-l'>{editUser.size} </h1>
            </div>

            <div className='flex items-center h-5 mt-3'>
              <h1 className='text-gray-500 text-l mr-2'>Condition: </h1>
              <h1 className='text-black-800 text-l'>{editUser.shoecondition} </h1>
            </div>
          </div>

          <div className='h-40 w-81 '>
            <h1 className='text-gray-500 text-l mr-2'>Description: </h1>
            <p className='text-black-800 text-l'>{editUser.description} </p>
          </div>

          <div className='flex items-center'>
            <h1 className='text-gray-500 text-l mr-2'>Status: </h1>
            <h1 className='text-black-800 text-l'>{editUser.status} </h1>
          </div>

          <div className='flex items-center'>
            <h1 className='text-gray-500 text-l mr-2'>Price: </h1>
            <h1 className='text-black-800 text-l'>{editUser.price} </h1>
          </div>

          <Button
            className='bg-blue-600'
            onClick={handleEditClick}
            variant="contained"
            sx={{
              fontSize: '12px',
            }}>

            Edit this Product
          </Button>




        </div>
      </div>
    </div>
     </>
  );

}
