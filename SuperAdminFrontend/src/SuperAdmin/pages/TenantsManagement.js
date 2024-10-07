import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
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
  TableContainer,
  TextField,
  InputAdornment,
  Button,
  TableHead,
  TablePagination,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from 'react-redux';
import { loadtenantsstart, deletetenantsStart } from '../../redux/action';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock

import TenantData from '../_mock/TenantData'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'firstname', label: 'firstname', alignRight: false },
  { id: 'phone', label: 'phone', alignRight: false },
  { id: 'email', label: 'email', alignLeft: true },
  { id: 'service', label: 'service', alignRight: false },
  { id: 'address', label: 'address', alignRight: false },
  { id: 'status', label: 'status', alignRight: false },
  { id: 'Edit', label: 'Edit', alignRight: true },
  { id: 'Delete', label: 'Delete', alignRight: true },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [Order, SetOrder] = useState("ASC");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [Data, setData] = useState([]);


  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = TenantData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - TenantData.length) : 0;

 // const filteredUsers = applySortFilter(TenantData, getComparator(order, orderBy), filterName);

 // const isNotFound = !filteredUsers.length && !!filterName;

  const navigate = useNavigate();

  const [userData, setUserdata] = useState([]);

   const [ setMessage] = useState('');
  // useEffect(() => {

  //   const getUserdata = async () => {
  //     const reqData = await fetch("http://localhost:5000/api/user");
  //     const resData = await reqData.json();
  //     setUserdata(resData);
      
  //   }
  //   getUserdata();
  // }, []);


  const dispatch = useDispatch();

  const { tenants } = useSelector(state => state.tenants);

  useEffect(() => {
    dispatch(loadtenantsstart());

  }, []);


  const handleDelete = async (phone) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      try {
        dispatch(deletetenantsStart(phone))
        
        setTimeout(() => {
          setMessage('');
        }, 2000);
        // Simulate a successful delete and display an alert message
        toast.success("Tenant deleted successfully!");
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the user.");
      }
    }
  };



  const handleEdit = async (phone) => {
    navigate(`/dashboard/EditTenant/${phone}`);
  };

  const openaddtenant = () => {
    navigate(`/dashboard/AddTenant`);
  };

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

  const filterProduct = (event) => {
    setData(tenants.filter(f => f.productname.toLowerCase().includes(event.target.value)))

  }

  return (
    <>

<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginLeft: '60px', marginRight: '60px' }}>
        <button className='text-left' onClick={goback} >
          <ArrowBackIosIcon />
        </button>
        <Typography variant="h4" gutterBottom>
          Tenants
        </Typography>
        <button className='text-right' onClick={goforward}>
          <ArrowForwardIosIcon />
        </button>

      </div>
    
      <Helmet>
        <title>Tenants Management</title>
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
        onClick={openaddtenant}
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
                    <TableCell onClick={() => sorting("productid")}>First Name</TableCell>
                    <TableCell onClick={() => sorting("productname")}>Phone</TableCell>
                    <TableCell onClick={() => sorting("brand")}>Email</TableCell>
                    <TableCell onClick={() => sorting("price")}>Service</TableCell>
                    <TableCell >Address</TableCell>
                    <TableCell >Status</TableCell>
                    <TableCell >Edit</TableCell>
                    <TableCell >Delete</TableCell>
                   
                  </TableRow>
                </TableHead>


                <TableBody>
                  {tenants.map((row, index) => {
                    const { firstname, phone, email, service, address, status } = row;
                    const selectedUser = selected.indexOf(index) !== -1; // Assuming index or another unique identifier is used

                    const handleDeleteClick = () => {
                      handleDelete(phone); // Pass the firstname to the handleDelete function
                    };

                    const handleEditClick = () => {
                      // Add your code to handle the edit action, e.g., navigating to the edit page.
                      handleEdit(phone);
                    };

                    return (
                      <TableRow hover key={index} tabIndex={-1} selected={selectedUser}>
                        {/* <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, index)} />
                        </TableCell> */}

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* You can add an avatar here if available in your data */}
                            <Typography variant="subtitle2" noWrap >
                              {firstname}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{phone}</TableCell>

                        <TableCell align="left">{service}</TableCell>

                        <TableCell align="left">{address}</TableCell>

                        <TableCell align="left">{status}</TableCell>




                        {/* <TableCell align="right">
            <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
              <Iconify icon={'eva:more-vertical-fill'} />
            </IconButton>
          </TableCell> */}

                        <TableCell align="right">
                          <IconButton size="large" color="primary" onClick={handleEditClick}>
                            <Iconify icon={'eva:edit-2-fill'} /> {/* Blue edit icon */}
                          </IconButton>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="error" onClick={handleDeleteClick}>
                            <Iconify icon={'eva:trash-2-outline'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

{/* 
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )} */}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={TenantData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      {/* <Popover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              p: 1,
              width: 140,
              '& .MuiMenuItem-root': {  
                px: 1,
                typography: 'body2',
                borderRadius: 0.75,
              },
            },
          }}
        >
          <MenuItem>
            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
            Edit
          </MenuItem>
          <MenuItem sx={{ color: 'error.main' }}>
    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} onClick={() => handleDelete(userData.firstname)} />
    Delete
  </MenuItem>


        </Popover> */}
    </>
  );
}