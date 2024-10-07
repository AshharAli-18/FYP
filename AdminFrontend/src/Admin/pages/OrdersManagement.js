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
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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
  const [orderByOrderId, setOrderByOrderId] = useState("ASC");
  const [orderByCustomerrId, setOrderByCustomerId] = useState("ASC");
  const [orderByCustomerName, setOrderByCustomerName] = useState("ASC");
  const [orderByDate, setOrderByDate] = useState("ASC");
  const [orderBySubtotal, setOrderBySubtotal] = useState("ASC");
  const [orderByGrandtotal, setOrderByGrandtotal] = useState("ASC");
  const [orderByStatus, setOrderByStatus] = useState("ASC");

  const [hoveredorderid, setHoveredorderid] = useState(false);
  const [hoveredcustomerid, setHoveredcustomerid] = useState(false);
  const [hoveredname, setHoveredname] = useState(false);
  const [hovereddate, setHovereddate] = useState(false);
  const [hoveredsubtotal, setHoveredsubtotal] = useState(false);
  const [hoveredgrandtotal, setHoveredgrandtotal] = useState(false);
  const [hoveredstatus, setHoveredstatus] = useState(false);

  const [sortedorderid, setSortedorderid] = useState(false);
  const [permanentSortedorderid, setPermanentSortedorderid] = useState(false);
  const [sortedcustomerid, setSortedcustomerid] = useState(false);
  const [permanentSortedcustomerid, setPermanentSortedcustomerid] = useState(false);
  const [sortedname, setSortedname] = useState(false);
  const [permanentSortedname, setPermanentSortedname] = useState(false);
  const [sorteddate, setSorteddate] = useState(false);
  const [permanentSorteddate, setPermanentSorteddate] = useState(false);
  const [sortedstatus, setSortedstatus] = useState(false);
  const [permanentSortedstatus, setPermanentSortedstatus] = useState(false);
  const [sortedsubtotal, setSortedsubtotal] = useState(false);
  const [permanentSortedsubtotal, setPermanentSortedsubtotal] = useState(false);
  const [sortedgrandtotal, setSortedgrandtotal] = useState(false);
  const [permanentSortedgrandtotal, setPermanentSortedgrandtotal] = useState(false);
  const  authToken = useSelector(state => state.user.user.token);
  useEffect(() => {
    // dispatch(loadOrdersStart(authToken));
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
    navigate(`/Admindashboard/DetailOrder/${orderid}`);

  };
  const gobacknav = () => {
    navigate(-1);
  };

  const goforwardnav = () => {
    navigate(+1);
  };
 
 
  const filterProduct = (event) => {
    const query = event.target.value.toLowerCase();
    setData(orders.filter(order => 
      order.orderid.toString().includes(query) ||
      order.customerid.toString().includes(query) ||
      order.fname.toLowerCase().includes(query) ||
      order.orderdate.toLowerCase().includes(query) ||
      order.status.toLowerCase().includes(query) ||
      order.subtotal.toString().includes(query) || // Fixed typo here
      order.grandtotal.toString().includes(query)
    ));
  };
  
  // const sorting = (col) => {
  //   if (Order === "ASC") {
  //     const sorted = [...Data].sort((a, b) =>
  //       a[col] > b[col] ? 1 : -1
  //     );
  //     setData(sorted);
  //     SetOrder("DSC");
  //   }
  //   if (Order === "DSC") {
  //     const sorted = [...Data].sort((a, b) =>
  //       a[col] < b[col] ? 1 : -1
  //     );
  //     setData(sorted);
  //     SetOrder("ASC");
  //   }
  //   console.log("Sorting data is:", Data);
  // }
  const sorting = (col) => {
    let order;
    switch (col) {
      case "orderid":
        order = orderByOrderId;
        setOrderByOrderId(order === "ASC" ? "DESC" : "ASC");
        setSortedorderid(true);
        setPermanentSortedorderid(true);
        break;
      case "customerid":
        order = orderByCustomerrId;
        setOrderByCustomerId(order === "ASC" ? "DESC" : "ASC");
        setSortedcustomerid(true);
        setPermanentSortedcustomerid(true);
        break;
      case "fname":
        order = orderByCustomerName;
        setOrderByCustomerName(order === "ASC" ? "DESC" : "ASC");
        setSortedname(true);
        setPermanentSortedname(true);
        break;
      case "orderdate":
        order = orderByDate;
        setOrderByDate(order === "ASC" ? "DESC" : "ASC");
        setSorteddate(true);
        setPermanentSorteddate(true);
        break;
      case "status":
        order = orderByStatus;
        setOrderByStatus(order === "ASC" ? "DESC" : "ASC");
        setSortedstatus(true);
        setPermanentSortedstatus(true);
        break;
      case "subtotal":
        order = orderBySubtotal;
        setOrderBySubtotal(order === "ASC" ? "DESC" : "ASC");
        setSortedsubtotal(true);
        setPermanentSortedsubtotal(true);
        break;
      case "grandtotal":
        order = orderByGrandtotal;
        setOrderByGrandtotal(order === "ASC" ? "DESC" : "ASC");
        setSortedgrandtotal(true);
        setPermanentSortedgrandtotal(true);
        break;
      // Add cases for other columns if needed
      default:
        break;
    }

    const sorted = [...Data].sort((a, b) => {
      if (col === "orderid") {
        return order === "ASC" ? a[col] - b[col] : b[col] - a[col];
      }
      if (col === "price") {
        // Convert prices to numbers before comparison
        const priceA = parseFloat(a[col]);
        const priceB = parseFloat(b[col]);
        return order === "ASC" ? priceA - priceB : priceB - priceA;
      }
      // Convert "Size" and "Inventory ID" to strings before comparison
      if (col === "customerid" || col === "subtotal" || col === "grandtotal") {
        const valueA = String(a[col]);
        const valueB = String(b[col]);
        return order === "ASC" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
      return order === "ASC" ? a[col].localeCompare(b[col]) : b[col].localeCompare(a[col]);
    });

    setData(sorted);
  };


  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Data.slice(firstIndex, lastIndex);

  const generatePageNumbers = () => {
    const totalPages = Math.ceil(Data.length / recordsPerPage);
    const currentPageIndex = currentPage - 1;
    const displayedPages = [];

    if (totalPages <= 8) {
      for (let i = 1; i <= totalPages; i += 1) {
        displayedPages.push(i);
      }
    } else if (currentPage <= 4) {
      displayedPages.push(1, 2, 3, 4, 5);
      displayedPages.push('...');
      displayedPages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      displayedPages.push(1);
      displayedPages.push('...');
      for (let i = totalPages - 4; i <= totalPages; i += 1) {
        displayedPages.push(i);
      }
    } else {
      displayedPages.push(1);
      displayedPages.push('...');
      for (let i = currentPageIndex - 1; i <= currentPageIndex + 1; i += 1) {
        displayedPages.push(i + 1);
      }
      displayedPages.push('...');
      displayedPages.push(totalPages);
    }

    return displayedPages;
  };


  const numbers = generatePageNumbers();

  const goback = () => {
    setCurrentPage(currentPage - 1);
  };

  const goforward = () => {
    setCurrentPage(currentPage + 1);
  };

  const postPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prePage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

  return (
    <>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginTop: '-25px', marginLeft: '60px', marginRight: '60px' }}>
        <button className='text-left' onClick={gobacknav} >
          <ArrowBackIosIcon />
        </button>
        <Typography variant="h4" gutterBottom>
          Orders
        </Typography>
        <button className='text-right' onClick={goforwardnav}>
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
              label={`Search from ${Data.length} orders here...`}
              onChange={filterProduct}
              sx={{
                flexGrow: 1,
                '& label': { fontSize: '0.8rem' }, // Adjust the fontSize value as needed
                '& input': { height: '18px' }, // Adjust the height of the input field
              }}
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

                    <TableCell
                      onMouseEnter={() => setHoveredorderid(true)}
                      onMouseLeave={() => setHoveredorderid(false)}
                      onClick={() => sorting("orderid")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Order ID{' '}
                        {sortedorderid || hoveredorderid ? (
                          orderByOrderId === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedorderid ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedorderid ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredcustomerid(true)}
                      onMouseLeave={() => setHoveredcustomerid(false)}
                      onClick={() => sorting("customerid")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Customer ID{' '}
                        {sortedcustomerid || hoveredcustomerid ? (
                          orderByCustomerrId === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedcustomerid ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedcustomerid ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredname(true)}
                      onMouseLeave={() => setHoveredname(false)}
                      onClick={() => sorting("fname")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Customer Name{' '}
                        {sortedname || hoveredname ? (
                          orderByCustomerName === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedname ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedname ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHovereddate(true)}
                      onMouseLeave={() => setHovereddate(false)}
                      onClick={() => sorting("orderdate")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Date{' '}
                        {sorteddate || hovereddate ? (
                          orderByDate === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSorteddate ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSorteddate ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredstatus(true)}
                      onMouseLeave={() => setHoveredstatus(false)}
                      onClick={() => sorting("status")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Status{' '}
                        {sortedstatus || hoveredstatus ? (
                          orderByStatus === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedstatus ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedstatus ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredsubtotal(true)}
                      onMouseLeave={() => setHoveredsubtotal(false)}
                      onClick={() => sorting("subtotal")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Sub Total{' '}
                        {sortedsubtotal || hoveredsubtotal ? (
                          orderBySubtotal === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedsubtotal ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedsubtotal ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredgrandtotal(true)}
                      onMouseLeave={() => setHoveredgrandtotal(false)}
                      onClick={() => sorting("grandtotal")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Grand Total{' '}
                        {sortedgrandtotal || hoveredgrandtotal ? (
                          orderByGrandtotal === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedgrandtotal ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedgrandtotal ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell >Cancel</TableCell>
                    <TableCell >Detail</TableCell>

                  </TableRow>
                </TableHead>


                <TableBody>
                  {records.map((row, index) => {
                    const { orderid, userid, fname, orderdate, status, subtotal, grandtotal } = row;
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
                              {userid}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{fname}</TableCell>


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
            <nav className="flex items-start justify-center mt-4 mb-4">
              <ul className="flex items-center space-x-4">
                <li>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={prePage}
                    disabled={currentPage === 1} // Disable if on first page
                  >
                    <RemoveIcon />
                  </button>
                </li>
                {numbers.map((n, i) => (
                  <li key={i}>
                    {typeof n === 'number' ? ( // Check if n is a number
                      <button
                        className={`px-4 py-2 rounded-md ${currentPage === n ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-blue-200'}`}
                        onClick={() => changeCurrentPage(n)}
                      >
                        {n}
                      </button>
                    ) : (
                      <span className="px-4 py-2">...</span> // Render dots
                    )}
                  </li>
                ))}
                <li>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={postPage}
                    disabled={currentPage === Math.ceil(Data.length / recordsPerPage)} // Disable if on last page
                  >
                    <AddIcon />
                  </button>
                </li>
              </ul>
            </nav>

          </Scrollbar>


        </Card>
      </Container>


    </>
  );
}