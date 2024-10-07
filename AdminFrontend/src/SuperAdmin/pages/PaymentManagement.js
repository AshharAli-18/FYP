import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  TableHead,
  Stack,
  Paper,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TextField,
  InputAdornment,
  TableContainer,
  TablePagination,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// components
import Scrollbar from '../components/scrollbar';



export default function PaymentManagement() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [OriginalData, setOriginalData] = useState([]);
  const [Data, setData] = useState([]);
  const [orderById, setOrderById] = useState("ASC");
  const [orderByName, setOrderByName] = useState("ASC");
  const [orderByStatus, setOrderByStatus] = useState("ASC");
  const [orderByServiceProvider, setOrderByServiceProvider] = useState("ASC");
  const [orderByAmount, setOrderByAmount] = useState("ASC");
  const [orderByDate, setOrderByDate] = useState("ASC");

  const [hoveredId, setHoveredId] = useState(false);
  const [hoveredName, setHoveredName] = useState(false);
  const [hoveredStatus, setHoveredStatus] = useState(false);
  const [hoveredServiceProvider, setHoveredServiceProvider] = useState(false);
  const [hoveredAmount, setHoveredAmount] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(false);

  const [sortedId, setSortedId] = useState(false);
  const [permanentSortedId, setPermanentSortedId] = useState(false);
  const [sortedName, setSortedName] = useState(false);
  const [permanentSortedName, setPermanentSortedName] = useState(false);
  const [sortedServiceProvider, setSortedServiceProvider] = useState(false);
  const [permanentSortedServiceProvider, setPermanentSortedServiceProvider] = useState(false);
  const [sortedAmount, setSortedAmount] = useState(false);
  const [permanentSortedAmount, setPermanentSortedAmount] = useState(false);
  const [sortedDate, setSortedDate] = useState(false);
  const [permanentSortedDate, setPermanentSortedDate] = useState(false);
  const [sortedStatus, setSortedStatus] = useState(false);
  const [permanentSortedStatus, setPermanentSortedStatus] = useState(false);

  const sorting = (col) => {
    let order;
    switch (col) {
      case "id":
        order = orderById;
        setOrderById(order === "ASC" ? "DESC" : "ASC");
        setSortedId(true);
        setPermanentSortedId(true);
        break;
      case "tenantname":
        order = orderByName;
        setOrderByName(order === "ASC" ? "DESC" : "ASC");
        setSortedName(true);
        setPermanentSortedName(true);
        break;
      case "serviceprovider":
        order = orderByServiceProvider;
        setOrderByServiceProvider(order === "ASC" ? "DESC" : "ASC");
        setSortedServiceProvider(true);
        setPermanentSortedServiceProvider(true);
        break;
      case "date":
        order = orderByDate;
        setOrderByDate(order === "ASC" ? "DESC" : "ASC");
        setSortedDate(true);
        setPermanentSortedDate(true);
        break;
      case "status":
        order = orderByStatus;
        setOrderByStatus(order === "ASC" ? "DESC" : "ASC");
        setSortedStatus(true);
        setPermanentSortedStatus(true);
        break;
      case "amount":
        order = orderByAmount;
        setOrderByAmount(order === "ASC" ? "DESC" : "ASC");
        setSortedAmount(true);
        setPermanentSortedAmount(true);
        break;

      default:
        break;
    }

    const sorted = [...Data].sort((a, b) => {
      if (col === "id") {
        return order === "ASC" ? a.id - b.id : b.id - a.id; // Compare by id field
      } if (col === "amount") {
        return order === "ASC" ? a.amount - b.amount : b.amount - a.amount; // Compare by monthlyamount field
      }
      // For other string columns like name, type, etc.
      return order === "ASC" ? a[col].localeCompare(b[col]) : b[col].localeCompare(a[col]);
    });

    setData(sorted);
  };

  const navigate = useNavigate();


  useEffect(() => {

    const getUserdata = async () => {
      const reqData = await fetch("http://api.dopes.online/api/payments");
      const resData = await reqData.json();
      setData(resData);
      setOriginalData(resData);

    }
    getUserdata();
  }, []);

  const gobacknav = () => {
    navigate(-1);
  };

  const goforwardnav = () => {
    navigate(+1);
  };

  const filterProduct = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    if (searchQuery === '') {
      setData(OriginalData); // Reset to original data when search query is empty
    } else {
      setData(OriginalData.filter(f => f.tenantname.toLowerCase().includes(searchQuery)));
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = Math.min(currentPage * recordsPerPage, Data.length);
  const firstIndex = Math.min((currentPage - 1) * recordsPerPage, Data.length);
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
          Payments
        </Typography>
        <button className='text-right' onClick={goforwardnav}>
          <ArrowForwardIosIcon />
        </button>
      </div>
      <Helmet>
        <title>Payment Management</title>
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
              label={`Search Payments here...`}
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


          </Container>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      onMouseEnter={() => setHoveredId(true)}
                      onMouseLeave={() => setHoveredId(false)}
                      onClick={() => sorting("id")}
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
                      onMouseEnter={() => setHoveredName(true)}
                      onMouseLeave={() => setHoveredName(false)}
                      onClick={() => sorting("tenantname")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Name{' '}
                        {sortedName || hoveredName ? (
                          orderByName === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedName ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedName ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredAmount(true)}
                      onMouseLeave={() => setHoveredAmount(false)}
                      onClick={() => sorting("amount")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Amount{' '}
                        {sortedAmount || hoveredAmount ? (
                          orderByAmount === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedAmount ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedAmount ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredServiceProvider(true)}
                      onMouseLeave={() => setHoveredServiceProvider(false)}
                      onClick={() => sorting("serviceprovider")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Service Provider{' '}
                        {sortedServiceProvider || hoveredServiceProvider ? (
                          orderByServiceProvider === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedServiceProvider ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedServiceProvider ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>



                    <TableCell
                      onMouseEnter={() => setHoveredDate(true)}
                      onMouseLeave={() => setHoveredDate(false)}
                      onClick={() => sorting("date")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Date{' '}
                        {sortedDate || hoveredDate ? (
                          orderByDate === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedDate ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedDate ? 'blue' : 'inherit' }} />
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
                            <ArrowUpwardIcon className="text-sm" style={{
                              color: permanentSortedStatus
                                ? 'blue' : 'inherit'
                            }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                  </TableRow>
                </TableHead>

                <TableBody>
                  {records.map((row, index) => {
                    const { id, tenantname, amount, serviceprovider, date, status } = row;
                    const selectedUser = selected.indexOf(index) !== -1; // Assuming index or another unique identifier is used


                    return (
                      <TableRow hover key={index} tabIndex={-1} selected={selectedUser}>


                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* You can add an avatar here if available in your data */}
                            <TableCell align="left">{id}</TableCell>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{tenantname}</TableCell>

                        <TableCell align="left">{amount}</TableCell>

                        <TableCell align="left">{serviceprovider}</TableCell>

                        <TableCell align="left">{date}</TableCell>

                        <TableCell align="left">{status}</TableCell>




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