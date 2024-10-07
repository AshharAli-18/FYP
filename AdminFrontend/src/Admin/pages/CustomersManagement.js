import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
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
  TableHead,
  TableContainer,
  TextField,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from 'react-redux';
import { loadCustomersStart } from '../../redux/action';
import Scrollbar from '../components/scrollbar';


export default function CustomersManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  const { customers } = useSelector(state => state.customers);
  const [orderByCustomerId, setOrderByCustomerId] = useState("ASC");
  const [orderByFirstName, setOrderByFirstName] = useState("ASC");
  const [orderByLastName, setOrderByLastName] = useState("ASC");
  const [orderByEmail, setOrderByEmail] = useState("ASC");
  const [orderByContact, setOrderByContact] = useState("ASC");
  const [orderByCity, setOrderByCity] = useState("ASC");
  const [orderByRegdate, setOrderByRegdate] = useState("ASC");

  const [hoveredcustomerid, setHoveredcustomerid] = useState(false);
  const [hoveredfirstname, setHoveredfirstname] = useState(false);
  const [hoveredlastname, setHoveredlastname] = useState(false);
  const [hoveredemail, setHoveredemail] = useState(false);
  const [hoveredcontact, setHoveredcontact] = useState(false);
  const [hoveredcity, setHoveredcity] = useState(false);
  const [hoveredregdate, setHoveredregdate] = useState(false);

  const [sortedcustomerid, setSortedcustomerid] = useState(false);
  const [permanentSortedcustomerid, setPermanentSortedcustomerid] = useState(false);
  const [sortedfirstname, setSortedfirstname] = useState(false);
  const [permanentSortedfirstname, setPermanentSortedfirstname] = useState(false);
  const [sortedlastname, setSortedlastname] = useState(false);
  const [permanentSortedlastname, setPermanentSortedlastname] = useState(false);
  const [sortedemail, setSortedemail] = useState(false);
  const [permanentSortedemail, setPermanentSortedemail] = useState(false);
  const [sortedcontact, setSortedcontact] = useState(false);
  const [permanentSortedcontact, setPermanentSortedcontact] = useState(false);
  const [sortedcity, setSortedcity] = useState(false);
  const [permanentSortedcity, setPermanentSortedcity] = useState(false);
  const [sortedregdate, setSortedregdate] = useState(false);
  const [permanentSortedregdate, setPermanentSortedregdate] = useState(false);


  useEffect(() => {
    dispatch(loadCustomersStart());

  }, []);

  useEffect(() => {
    setData(customers);
    console.log("Data:", Data.length);
  }, [customers]);



  const gobacknav = () => {
    navigate(-1);
  };

  const goforwardnav = () => {
    navigate(+1);
  };
  
  

  const filterProduct = (event) => {
    const query = event.target.value.toLowerCase();
    setData(customers.filter(customer => 
      customer.userid.toString().includes(query) ||
      customer.fname.toLowerCase().includes(query) ||
      customer.lname.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.contact.toLowerCase().includes(query) ||
      customer.regdate.toLowerCase().includes(query)
    ));
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
  const sorting = (col) => {
    let order;
    switch (col) {
      case "customerid":
        order = orderByCustomerId;
        setOrderByCustomerId(order === "ASC" ? "DESC" : "ASC");
        setSortedcustomerid(true);
        setPermanentSortedcustomerid(true);
        break;
      case "fname":
        order = orderByFirstName;
        setOrderByFirstName(order === "ASC" ? "DESC" : "ASC");
        setSortedfirstname(true);
        setPermanentSortedfirstname(true);
        break;
      case "lname":
        order = orderByLastName;
        setOrderByLastName(order === "ASC" ? "DESC" : "ASC");
        setSortedlastname(true);
        setPermanentSortedlastname(true);
        break;
      case "email":
        order = orderByEmail;
        setOrderByEmail(order === "ASC" ? "DESC" : "ASC");
        setSortedemail(true);
        setPermanentSortedemail(true);
        break;
      case "contact":
        order = orderByContact;
        setOrderByContact(order === "ASC" ? "DESC" : "ASC");
        setSortedcontact(true);
        setPermanentSortedcontact(true);
        break;
      case "city":
        order = orderByCity;
        setOrderByCity(order === "ASC" ? "DESC" : "ASC");
        setSortedcity(true);
        setPermanentSortedcity(true);
        break;
      case "regdate":
        order = orderByRegdate;
        setOrderByRegdate(order === "ASC" ? "DESC" : "ASC");
        setSortedregdate(true);
        setPermanentSortedregdate(true);
        break;
      default:
        break;
    }

    const sorted = [...Data].sort((a, b) => {
      if (col === "customerid" || col === "orderid" || col === "price") {
        return order === "ASC" ? a.userid - b.userid : b.userid - a.userid;
      }
      // For other string columns like firstname, lastname, etc.
      return order === "ASC" ? a[col].localeCompare(b[col]) : b[col].localeCompare(a[col]);
    });

    setData(sorted);
  };



  return (
    <>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginTop: '-25px', marginLeft: '60px', marginRight: '60px' }}>
        <button className='text-left' onClick={gobacknav} >
          <ArrowBackIosIcon />
        </button>
        <Typography variant="h4" gutterBottom>
          Customers
        </Typography>
        <button className='text-right' onClick={goforwardnav}>
          <ArrowForwardIosIcon />
        </button>
      </div>
      <Helmet>
        <title>Customers Management</title>
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
              label={`Search from ${Data.length} customers here...`}
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
                      onMouseEnter={() => setHoveredcustomerid(true)}
                      onMouseLeave={() => setHoveredcustomerid(false)}
                      onClick={() => sorting("customerid")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        ID{' '}
                        {sortedcustomerid || hoveredcustomerid ? (
                          orderByCustomerId === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedcustomerid ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedcustomerid ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredfirstname(true)}
                      onMouseLeave={() => setHoveredfirstname(false)}
                      onClick={() => sorting("fname")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        First Name{' '}
                        {sortedfirstname || hoveredfirstname ? (
                          orderByFirstName === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedfirstname ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedfirstname ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredlastname(true)}
                      onMouseLeave={() => setHoveredlastname(false)}
                      onClick={() => sorting("lname")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Last Name{' '}
                        {sortedlastname || hoveredlastname ? (
                          orderByLastName === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedlastname ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedlastname ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredemail(true)}
                      onMouseLeave={() => setHoveredemail(false)}
                      onClick={() => sorting("email")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Email{' '}
                        {sortedemail || hoveredemail ? (
                          orderByEmail === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedemail ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedemail ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredcontact(true)}
                      onMouseLeave={() => setHoveredcontact(false)}
                      onClick={() => sorting("contact")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Contact{' '}
                        {sortedcontact || hoveredcontact ? (
                          orderByContact === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedcontact ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedcontact ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredcity(true)}
                      onMouseLeave={() => setHoveredcity(false)}
                      onClick={() => sorting("city")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        City{' '}
                        {sortedcity || hoveredcity ? (
                          orderByCity === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedcity ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedcity ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredregdate(true)}
                      onMouseLeave={() => setHoveredregdate(false)}
                      onClick={() => sorting("regdate")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Registration Date{' '}
                        {sortedregdate || hoveredregdate ? (
                          orderByRegdate === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedregdate ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedregdate ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>



                  </TableRow>
                </TableHead>


                <TableBody>
                  {records.map((row, index) => {
                    const { userid, fname, lname, email, contact, city, regdate } = row;
                    // const selectedUser = selected.indexOf(index) !== -1; // Assuming index or another unique identifier is used



                    return (
                      <TableRow >
                        <TableCell align="left">{userid}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* You can add an avatar here if available in your data */}
                            {/* <Typography variant="subtitle2" noWrap>
                              {fname}
                            </Typography> */}
                            <TableCell align="left">{fname}</TableCell>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{lname}</TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{contact}</TableCell>

                        <TableCell align="left">{city}</TableCell>

                        <TableCell align="left">{regdate}</TableCell>

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