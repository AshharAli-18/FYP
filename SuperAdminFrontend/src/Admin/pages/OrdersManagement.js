import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableHead,
  TableContainer,
  TablePagination,
  Button,
  TextField,
  InputAdornment
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from "@mui/icons-material/Search";
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import TenantData from '../_mock/TenantData';
import { loadOrdersStart, deleteOrderStart } from '../../redux/action';


export default function OrdersManagement() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [userData, setUserdata] = useState([]);

  const [Data, setData] = useState([]);

  const [message, setMessage] = useState('');

  const { orders } = useSelector(state => state.orders);

  const [Order, SetOrder] = useState("ASC");

  useEffect(() => {
    dispatch(loadOrdersStart());

  }, []);

  useEffect(() => {
    setData(orders);
    console.log("Data:", orders);
  }, [orders]);

  const handleDelete = async (orderid) => {
    const confirmDelete = window.confirm("Are you sure you want to cancel this order?");
    if (confirmDelete) {
      try {
        dispatch(deleteOrderStart(orderid))

        setTimeout(() => {
          setMessage('');
        }, 2000);
        // Simulate a successful delete and display an alert message
        toast.success("Order cancelled successfully!");
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the order.");
      }
    }
  };


  const handleDetail = async (orderid) => {
    navigate(`/dashboard/DetailOrder/${orderid}`);

  };
  const goback = () => {
    navigate(-1);
  };

  const goforward = () => {
    navigate(+1);
  };
  const filterProduct = (event) => {
    setData(orders.filter(f => f.customerfirstname.toLowerCase().includes(event.target.value)))

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

  return (
    <>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginLeft: '60px', marginRight: '60px' }}>
        <button className='text-left' onClick={goback} >
          <ArrowBackIosIcon />
        </button>
        <Typography variant="h4" gutterBottom>
          Orders
        </Typography>
        <button className='text-right' onClick={goforward}>
          <ArrowForwardIosIcon />
        </button>

      </div>
      <Helmet>
        <title>Orders Management</title>
      </Helmet>

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
              label="Search Orders here ..."
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

          </Container>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell >Order ID</TableCell>
                    <TableCell >Customer ID</TableCell>
                    <TableCell >Customer Name</TableCell>
                    <TableCell >Order Date</TableCell>
                    <TableCell >Status</TableCell>
                    <TableCell >Sub Total</TableCell>
                    <TableCell onClick={() => sorting("grandtotal")}>Grand Total</TableCell>
                    <TableCell >Cancel</TableCell>
                    <TableCell >Detail</TableCell>

                  </TableRow>
                </TableHead>


                <TableBody>
                  {records.map((row, index) => {
                    const { orderid, customerid, customerfirstname, orderdate, status, subtotal, grandtotal } = row;
                    const selectedUser = selected.indexOf(index) !== -1; // Assuming index or another unique identifier is used

                    const handleDeleteClick = () => {
                      handleDelete(orderid);
                      console.log(orderid);
                    };

                    const handleDetailClick = () => {
                      handleDetail(orderid);
                    }

                    return (
                      <TableRow hover key={index} tabIndex={-1} selected={selectedUser}>

                        <TableCell align="left">{orderid}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* You can add an avatar here if available in your data */}
                            <Typography variant="subtitle2" noWrap>
                              {customerid}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{customerfirstname}</TableCell>


                        <TableCell align="left">{orderdate}</TableCell>

                        <TableCell align="left">{status}</TableCell>

                        <TableCell align="left">{subtotal}</TableCell>

                        <TableCell align="left">{grandtotal}</TableCell>

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
                  <a href='a' className="text-gray-500 hover:text-gray-700" onClick={postPage}>
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