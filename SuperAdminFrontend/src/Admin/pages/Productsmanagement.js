
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TextField,
  InputAdornment,
  TableHead,
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from "@mui/icons-material/Search";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// redux actions
import { deleteProductStart, loadproductsstart } from '../../redux/action';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

export default function UserPage() {

  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [Order, SetOrder] = useState("ASC");
  const dispatch = useDispatch();
  const [Data, setData] = useState([]);
  const { products } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(loadproductsstart());
  }, []);

  useEffect(() => {
    setData(products);
    console.log("Data:", products);
  }, [products]);

  const handleDelete = async (productid) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      try {
        dispatch(deleteProductStart(productid))

        toast.success("Product deleted successfully!");
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the user.");
      }
    }
  };

  const handleEdit = async (productid) => {
    navigate(`/dashboard/EditProduct/${productid}`);
  };

  const handleDetail = async (productid) => {
    navigate(`/dashboard/DetailProduct/${productid}`);
  };

  const openaddproduct = () => {
    navigate(`/dashboard/AddProduct`);
  };

  const filterProduct = (event) => {
    setData(products.filter(f => f.productname.toLowerCase().includes(event.target.value)))

  }

  const sorting = (col) => {
    if (Order === "ASC") {
      const sorted = [...Data].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      );
      setData(sorted);
      SetOrder("DSC");
    }
    if (Order === "DSC") {
      const sorted = [...Data].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      );
      setData(sorted);
      SetOrder("ASC");
    }
    console.log("Sorting data is:", Data);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  function postPage() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1)
    }
  }
  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1)
    }
  }
  function changeCurrentPage(id) {
    setCurrentPage(id)
  }

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
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>
        <button className='text-right' onClick={goforward}>
          <ArrowForwardIosIcon />
        </button>

      </div>

      <Container>


        <Card>
          <Container
            maxWidth="lg"
            sx={{
              mt: 2,
              ml: 0,
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between', // Aligns items to the beginning and end of the container
              alignItems: 'center', // Aligns items vertically
            }}
          >
            <TextField
              id="search"
              type="search"
              label="Search Products here ..."
              onChange={filterProduct}
              sx={{ flexGrow: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <AddBoxIcon
              className='text-blue-500'
              onClick={openaddproduct}
              sx={{
                fontSize: '24px', // Increase font size for larger icon
                // color: '#068FFF', // Set color to a lighter blue shade
                width: '55px', // Set width of the icon
                height: '55px', // Set height of the icon
                marginLeft: 3, // Add some space to the left of the button
                transition: 'transform 0.2s ease-in-out', // Add transition for smooth effect
                '&:hover': {
                  transform: 'scale(1.5)', // Scale the icon on hover
                  cursor: 'pointer', // Change cursor to pointer on hover
                },
              }}
            />

          </Container>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>

                <TableHead>
                  <TableRow>
                    <TableCell onClick={() => sorting("productid")}>Product ID</TableCell>
                    <TableCell onClick={() => sorting("productname")}>Product Name</TableCell>
                    <TableCell onClick={() => sorting("brand")}>Brand</TableCell>
                    <TableCell onClick={() => sorting("price")}>Price</TableCell>
                    <TableCell >Size</TableCell>
                    <TableCell >Shoe Condition</TableCell>
                    <TableCell >Inventory ID</TableCell>
                    <TableCell >Category</TableCell>
                    <TableCell >Status</TableCell>
                    <TableCell >Edit</TableCell>
                    <TableCell >Delete</TableCell>
                    <TableCell >Detail</TableCell>
                  </TableRow>
                </TableHead>


                <TableBody>
                  {records.map((row, index) => {
                    const { productid, productname, brand, price, size, shoecondition, inventoryid, category, status } = row;
                    const selectedUser = selected.indexOf(index) !== -1;
                    console.log("type of price:", typeof price)
                    const handleDeleteClick = () => {
                      handleDelete(productid);
                      console.log(productid);
                    };

                    const handleEditClick = () => {
                      handleEdit(productid);
                    };

                    const handleDetailClick = () => {
                      handleDetail(productid);
                    }

                    return (
                      <TableRow hover key={index} tabIndex={-1} selected={selectedUser}>

                        <TableCell align="left">{productid}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {productname}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{brand}</TableCell>

                        <TableCell align="left">{price}</TableCell>

                        <TableCell align="left">{size}</TableCell>

                        <TableCell align="left">{shoecondition}</TableCell>

                        <TableCell align="left">{inventoryid}</TableCell>

                        <TableCell align="left">{category}</TableCell>

                        <TableCell align="left">{status}</TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="primary" onClick={handleEditClick} >
                            <Iconify icon={'eva:edit-2-fill'} />
                          </IconButton>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="large" color="error"
                            onClick={handleDeleteClick}>
                            <Iconify icon={'eva:trash-2-outline'} />
                          </IconButton>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="large" color="info"
                            onClick={handleDetailClick}>
                            <ArrowCircleRightIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                </TableBody>



              </Table>
            </TableContainer>
            <nav className="flex items-center justify-center mt-8">
              <ul className="flex space-x-4">
                <li>
                  <a href='a' className="text-gray-500 hover:text-gray-700" onClick={prePage}>
                    <RemoveIcon />
                  </a>
                </li>
                {numbers.map((n, i) => (
                  <li key={i}>
                    <a href='#' className={`px-4 py-2 rounded-md ${currentPage === n ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-200'}`} onClick={() => changeCurrentPage(n)}>{n}</a>
                  </li>
                ))}
                <li>
                  <a href="a" onClick={postPage} className="text-gray-500 hover:text-gray-700">
                    <AddIcon />
                  </a>
                </li>
              </ul>
            </nav>



          </Scrollbar>


        </Card>
      </Container>


    </>
  );
}