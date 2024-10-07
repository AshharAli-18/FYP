import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
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
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import TenantData from '../_mock/TenantData'





export default function Subscription() {
  const navigate = useNavigate();
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
  const [orderByPhone, setOrderByPhone] = useState("ASC");
  const [orderByService, setOrderByService] = useState("ASC");
  const [orderByAmount, setOrderByAmount] = useState("ASC");
  const [orderByStartDate, setOrderByStartDate] = useState("ASC");
  const [orderByEndDate, setOrderByEndDate] = useState("ASC");

  const [hoveredid, setHoveredid] = useState(false);
  const [hoveredname, setHoveredname] = useState(false);
  const [hoveredphone, setHoveredphone] = useState(false);
  const [hoveredservice, setHoveredservice] = useState(false);
  const [hoveredamount, setHoveredamount] = useState(false);
  const [hoveredstartdate, setHoveredstartdate] = useState(false);
  const [hoveredenddate, setHoveredenddate] = useState(false);

  const [sortedid, setSortedid] = useState(false);
  const [permanentSortedid, setPermanentSortedid] = useState(false);
  const [sortedname, setSortedname] = useState(false);
  const [permanentSortedname, setPermanentSortedname] = useState(false);
  const [sortedservice, setSortedservice] = useState(false);
  const [permanentSortedservice, setPermanentSortedservice] = useState(false);
  const [sortedamount, setSortedamount] = useState(false);
  const [permanentSortedamount, setPermanentSortedamount] = useState(false);
  const [sortedstartdate, setSortedstartdate] = useState(false);
  const [permanentSortedstartdate, setPermanentSortedstartdate] = useState(false);
  const [sortedenddate, setSortedenddate] = useState(false);
  const [permanentSortedenddate, setPermanentSortedenddate] = useState(false);
  const [sortedPhone, setSortedPhone] = useState(false);
  const [permanentSortedPhone, setPermanentSortedPhone] = useState(false);


  const filterProduct = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    if (searchQuery === '') {
      setData(OriginalData); // Reset to original data when search query is empty
    } else {
      setData(OriginalData.filter(f => f.tenantname.toLowerCase().includes(searchQuery)));
    }
  };

  const sorting = (col) => {
    let order;
    switch (col) {
      case "subid":
        order = orderById;
        setOrderById(order === "ASC" ? "DESC" : "ASC");
        setSortedid(true);
        setPermanentSortedid(true);
        break;
      case "tenantname":
        order = orderByName;
        setOrderByName(order === "ASC" ? "DESC" : "ASC");
        setSortedname(true);
        setPermanentSortedname(true);
        break;
        case "phone":
          order = orderByPhone;
          setOrderByPhone(order === "ASC" ? "DESC" : "ASC");
          setSortedPhone(true);
          setPermanentSortedPhone(true);
          break;
      case "service":
        order = orderByService;
        setOrderByService(order === "ASC" ? "DESC" : "ASC");
        setSortedservice(true);
        setPermanentSortedservice(true);
        break;
      case "monthlyamount":
        order = orderByAmount;
        setOrderByAmount(order === "ASC" ? "DESC" : "ASC");
        setSortedamount(true);
        setPermanentSortedamount(true);
        break;
      case "startdate":
        order = orderByStartDate;
        setOrderByStartDate(order === "ASC" ? "DESC" : "ASC");
        setSortedstartdate(true);
        setPermanentSortedstartdate(true);
        break;
      case "enddate":
        order = orderByEndDate;
        setOrderByEndDate(order === "ASC" ? "DESC" : "ASC");
        setSortedenddate(true);
        setPermanentSortedenddate(true);
        break;
      default:
        break;
    }

    const sorted = [...Data].sort((a, b) => {
      if (col === "subid") {
        return order === "ASC" ? a.subid - b.subid : b.subid - a.subid; // Compare by id field
      } if (col === "monthlyamount") {
        return order === "ASC" ? a.monthlyamount - b.monthlyamount : b.monthlyamount - a.monthlyamount; // Compare by monthlyamount field
      }
      // For other string columns like name, type, etc.
      return order === "ASC" ? a[col].localeCompare(b[col]) : b[col].localeCompare(a[col]);
    });
    

    setData(sorted);
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
 


  useEffect(() => {

    const getUserdata = async () => {
      const reqData = await fetch("http://api.dopes.online/api/subuser");
      const resData = await reqData.json();
      setOriginalData(resData);
      setData(resData);
      

    }
    getUserdata();
  }, []);



  const gobacknav = () => {
    navigate(-1);
  };

  const goforwardnav = () => {
    navigate(+1);
  };
  return (
    <>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginTop: '-25px', marginLeft: '60px', marginRight: '60px' }}>
        <button className='text-left' onClick={gobacknav} >
          <ArrowBackIosIcon />
        </button>
        <Typography variant="h4" gutterBottom>
          Subscriptions
        </Typography>
        <button className='text-right' onClick={goforwardnav}>
          <ArrowForwardIosIcon />
        </button>
      </div>

      <Helmet>
        <title>Subscription Management</title>
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
              label={`Search Subscriptions here...`}
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
                      onMouseEnter={() => setHoveredid(true)}
                      onMouseLeave={() => setHoveredid(false)}
                      onClick={() => sorting("subid")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        ID{' '}
                        {sortedid || hoveredid ? (
                          orderById === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedid ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedid ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredname(true)}
                      onMouseLeave={() => setHoveredname(false)}
                      onClick={() => sorting("tenantname")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Name{' '}
                        {sortedname || hoveredname ? (
                          orderByName === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedname ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedname ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredphone(true)}
                      onMouseLeave={() => setHoveredphone(false)}
                      onClick={() => sorting("phone")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Phone{' '}
                        {sortedPhone || hoveredphone ? (
                          orderByPhone === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedPhone ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedPhone ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredservice(true)}
                      onMouseLeave={() => setHoveredservice(false)}
                      onClick={() => sorting("service")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Service{' '}
                        {sortedservice || hoveredservice ? (
                          orderByService === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedservice ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedservice ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

               

                    <TableCell
                      onMouseEnter={() => setHoveredstartdate(true)}
                      onMouseLeave={() => setHoveredstartdate(false)}
                      onClick={() => sorting("startdate")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Start Date{' '}
                        {sortedstartdate || hoveredstartdate ? (
                          orderByStartDate === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedstartdate ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedstartdate ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredenddate(true)}
                      onMouseLeave={() => setHoveredenddate(false)}
                      onClick={() => sorting("enddate")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        End Date{' '}
                        {sortedenddate || hoveredenddate ? (
                          orderByEndDate === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedenddate ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedenddate ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell
                      onMouseEnter={() => setHoveredamount(true)}
                      onMouseLeave={() => setHoveredamount(false)}
                      onClick={() => sorting("monthlyamount")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Amount{' '}
                        {sortedamount || hoveredamount ? (
                          orderByAmount === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedamount ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedamount ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    
                  </TableRow>
                </TableHead>

                <TableBody>
                  {records.map((row, index) => {
                    const { subid, tenantname, phone, service, startdate, enddate, monthlyamount } = row;
                    const selectedUser = selected.indexOf(index) !== -1; // Assuming index or another unique identifier is used


                    return (
                      <TableRow hover key={index} tabIndex={-1} selected={selectedUser}>


                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* You can add an avatar here if available in your data */}
                            
                            
                        <TableCell align="left">{subid}</TableCell>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{tenantname}</TableCell>
                        <TableCell align="left">{phone}</TableCell>

                        <TableCell align="left">{service}</TableCell>

                        <TableCell align="left">{startdate}</TableCell>

                        <TableCell align="left">{enddate}</TableCell>


                        <TableCell align="left">{monthlyamount}</TableCell>




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