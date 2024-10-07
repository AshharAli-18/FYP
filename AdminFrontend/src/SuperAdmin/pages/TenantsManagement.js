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
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from 'react-redux';
import { loadtenantsstart, deletetenantsStart } from '../../redux/action';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';


export default function UserPage() {

  const [selected, setSelected] = useState([]);
  const [Data, setData] = useState([]);
  const navigate = useNavigate();
  const [setMessage] = useState('');
  const dispatch = useDispatch();
  const { tenants } = useSelector(state => state.tenants);


  const [orderById, setOrderById] = useState("ASC");
  const [orderByFirstName, setOrderByFirstName] = useState("ASC");
  const [orderByEmail, setOrderByEmail] = useState("ASC");
  const [orderByPhone, setOrderByPhone] = useState("ASC");
  const [orderByAddress, setOrderByAddress] = useState("ASC");
  const [orderByService, setOrderByService] = useState("ASC");
  const [orderByStatus, setOrderByStatus] = useState("ASC");

  const [hoveredId, setHoveredId] = useState(false);
  const [hoveredFirstName, setHoveredFirstName] = useState(false);
  const [hoveredEmail, setHoveredEmail] = useState(false);
  const [hoveredPhone, setHoveredPhone] = useState(false);
  const [hoveredAddress, setHoveredAddress] = useState(false);
  const [hoveredService, setHoveredService] = useState(false);
  const [hoveredStatus, setHoveredStatus] = useState(false);

  const [sortedId, setSortedId] = useState(false);
  const [permanentSortedId, setPermanentSortedId] = useState(false);
  const [sortedFirstName, setSortedFirstName] = useState(false);
  const [permanentSortedFirstName, setPermanentSortedFirstName] = useState(false);
  const [sortedEmail, setSortedEmail] = useState(false);
  const [permanentSortedEmail, setPermanentSortedEmail] = useState(false);
  const [sortedPhone, setSortedPhone] = useState(false);
  const [permanentSortedPhone, setPermanentSortedPhone] = useState(false);
  const [sortedAddress, setSortedAddress] = useState(false);
  const [permanentSortedAddress, setPermanentSortedAddress] = useState(false);
  const [sortedService, setSortedService] = useState(false);
  const [permanentSortedService, setPermanentSortedService] = useState(false);
  const [sortedStatus, setSortedStatus] = useState(false);
  const [permanentSortedStatus, setPermanentSortedStatus] = useState(false);

  useEffect(() => {
    dispatch(loadtenantsstart());

  }, []);

  useEffect(() => {
    setData(tenants);
    console.log("tenant data:", Data);

  }, [tenants]);

  const handleDelete = async (phone) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      try {
        dispatch(deletetenantsStart(phone))

        setTimeout(() => {
          setMessage('');
        }, 2000);

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



  const gobacknav = () => {
    navigate(-1);
  };

  const goforwardnav = () => {
    navigate(+1);
  };

  const filterProduct = (event) => {
    setData(tenants.filter(f => f.firstname.toLowerCase().includes(event.target.value)))

  }

  const sorting = (col) => {
    let order;
    switch (col) {
      case "tenantid":
        order = orderById;
        setOrderById(order === "ASC" ? "DESC" : "ASC");
        setSortedId(true);
        setPermanentSortedId(true);
        break;
      case "firstname":
        order = orderByFirstName;
        setOrderByFirstName(order === "ASC" ? "DESC" : "ASC");
        setSortedFirstName(true);
        setPermanentSortedFirstName(true);
        break;
      case "email":
        order = orderByEmail;
        setOrderByEmail(order === "ASC" ? "DESC" : "ASC");
        setSortedEmail(true);
        setPermanentSortedEmail(true);
        break;
      case "phone":
        order = orderByPhone;
        setOrderByPhone(order === "ASC" ? "DESC" : "ASC");
        setSortedPhone(true);
        setPermanentSortedPhone(true);
        break;
      case "address":
        order = orderByAddress;
        setOrderByAddress(order === "ASC" ? "DESC" : "ASC");
        setSortedAddress(true);
        setPermanentSortedAddress(true);
        break;
      case "service":
        order = orderByService;
        setOrderByService(order === "ASC" ? "DESC" : "ASC");
        setSortedService(true);
        setPermanentSortedService(true);
        break;
      case "status":
        order = orderByStatus;
        setOrderByStatus(order === "ASC" ? "DESC" : "ASC");
        setSortedStatus(true);
        setPermanentSortedStatus(true);
        break;
      default:
        break;
    }

    const sorted = [...Data].sort((a, b) => {
      if (col === "tenantid" || col === "orderid" || col === "price") {
        return order === "ASC" ? a.tenantid - b.tenantid : b.tenantid - a.tenantid;
      }
      // For other string columns like firstname, lastname, etc.
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
          Tenants
        </Typography>
        <button className='text-right' onClick={goforwardnav}>
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
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TextField
              id="search"
              type="search"
              label={`Search from ${Data.length} tenants here...`}
              onChange={filterProduct}
              sx={{
                flexGrow: 1,
                '& label': { fontSize: '0.8rem' },
                '& input': { height: '18px' },
              }}
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
                fontSize: '24px',
                width: '55px',
                height: '55px',
                marginLeft: 1,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.5)',
                  cursor: 'pointer',
                },
              }}
            />
          </Container>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>

                <TableHead>
                  <TableRow>
                    <TableCell
                      onMouseEnter={() => setHoveredId(true)}
                      onMouseLeave={() => setHoveredId(false)}
                      onClick={() => sorting("tenantid")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        ID{' '}
                        {sortedId || hoveredId ? (
                          orderById === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedId ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedId ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredFirstName(true)}
                      onMouseLeave={() => setHoveredFirstName(false)}
                      onClick={() => sorting("firstname")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        First Name{' '}
                        {sortedFirstName || hoveredFirstName ? (
                          orderByFirstName === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedFirstName ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedFirstName ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredEmail(true)}
                      onMouseLeave={() => setHoveredEmail(false)}
                      onClick={() => sorting("email")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Email{' '}
                        {sortedEmail || hoveredEmail ? (
                          orderByEmail === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedEmail ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedEmail ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredPhone(true)}
                      onMouseLeave={() => setHoveredPhone(false)}
                      onClick={() => sorting("phone")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Contact{' '}
                        {sortedPhone || hoveredPhone ? (
                          orderByPhone === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedPhone ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedPhone ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredService(true)}
                      onMouseLeave={() => setHoveredService(false)}
                      onClick={() => sorting("service")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Service{' '}
                        {sortedService || hoveredService ? (
                          orderByService === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedService ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedService ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredAddress(true)}
                      onMouseLeave={() => setHoveredAddress(false)}
                      onClick={() => sorting("address")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        City{' '}
                        {sortedAddress || hoveredAddress ? (
                          orderByAddress === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedAddress ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedAddress ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>



                    <TableCell
                      onMouseEnter={() => setHoveredStatus(true)}
                      onMouseLeave={() => setHoveredStatus(false)}
                      onClick={() => sorting("status")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Status{' '}
                        {sortedStatus || hoveredStatus ? (
                          orderByStatus === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedStatus ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedStatus ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell >Edit</TableCell>
                    <TableCell >Delete</TableCell>

                  </TableRow>
                </TableHead>


                <TableBody>
                  {records.map((row, index) => {
                    const { tenantid, firstname, phone, email, service, address, status } = row;
                    const selectedUser = selected.indexOf(index) !== -1;

                    const handleDeleteClick = () => {
                      handleDelete(phone);
                    };

                    const handleEditClick = () => {

                      handleEdit(phone);
                    };

                    return (
                      <TableRow hover key={index} tabIndex={-1} selected={selectedUser}>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <TableCell align="left">{tenantid}</TableCell>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{firstname}</TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{phone}</TableCell>

                        <TableCell align="left">{service}</TableCell>

                        <TableCell align="left">{address}</TableCell>

                        <TableCell align="left">{status}</TableCell>

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