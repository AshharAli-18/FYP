import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  TableHead,
  TextField,
  InputAdornment,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useDispatch, useSelector } from 'react-redux';
import { loadReviewsStart } from '../../redux/action';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import TenantData from '../_mock/TenantData';


export default function CustomerReviews() {
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  const { reviews } = useSelector(state => state.reviews);
  const [orderByProductId, setOrderByProductId] = useState("ASC");
  const [orderByName, setOrderByName] = useState("ASC");
  const [orderByCustomerID, setOrderByCustomerID] = useState("ASC");
  const [orderByRating, setOrderByRating] = useState("ASC");
  const [orderByText, setOrderByText] = useState("ASC");
  const [orderByDate, setOrderByDate] = useState("ASC");
  
  const [hoveredproductid, setHoveredproductid] = useState(false);
  const [hoveredname, setHoveredname] = useState(false);
  const [hoveredcustomerid, setHoveredcustomerid] = useState(false);
  const [hoveredrating, setHoveredrating] = useState(false);
  const [hoveredtext, setHoveredtext] = useState(false);
  const [hovereddate, setHovereddate] = useState(false);
  
  const [sortedproductid, setSortedproductid] = useState(false);
  const [permanentSortedproductid, setPermanentSortedproductid] = useState(false);
  const [sortedname, setSortedname] = useState(false);
  const [permanentSortedname, setPermanentSortedname] = useState(false);
  const [sortedcustomerid, setSortedcustomerid] = useState(false);
  const [permanentSortedcustomerid, setPermanentSortedcustomerid] = useState(false);
  const [sortedrating, setSortedrating] = useState(false);
  const [permanentSortedrating, setPermanentSortedrating] = useState(false);
  const [sortedtext, setSortedtext] = useState(false);
  const [permanentSortedtext, setPermanentSortedtext] = useState(false);
  const [sorteddate, setSorteddate] = useState(false);
  const [permanentSorteddate, setPermanentSorteddate] = useState(false);
  useEffect(() => {
    dispatch(loadReviewsStart());

  }, []);

  const gobacknav = () => {
    navigate(-1);
  };

  const goforwardnav = () => {
    navigate(+1);
  };

  useEffect(() => {
    setData(reviews);
    console.log("Data:", reviews);
  }, [reviews]);

  
  const filterProduct = (event) => {
    const query = event.target.value.toLowerCase();
    setData(reviews.filter(review => 
      review.productid.toString().includes(query) ||
      review.customerid.toString().includes(query) ||
      review.customerfname.toLowerCase().includes(query) ||
      review.rating.toString().includes(query) ||
      review.text.toLowerCase().includes(query) ||
      review.date.toLowerCase().includes(query) 
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

  const sorting = (col) => {
    let order;
    switch (col) {
      case "productid":
        order = orderByProductId;
        setOrderByProductId(order === "ASC" ? "DESC" : "ASC");
        setSortedproductid(true);
        setPermanentSortedproductid(true);
        break;
      case "customerid":
        order = orderByCustomerID;
        setOrderByCustomerID(order === "ASC" ? "DESC" : "ASC");
        setSortedcustomerid(true);
        setPermanentSortedcustomerid(true);
        break;
      case "customerfname":
        order = orderByName;
        setOrderByName(order === "ASC" ? "DESC" : "ASC");
        setSortedname(true);
        setPermanentSortedname(true);
        break;
      case "rating":
        order = orderByRating;
        setOrderByRating(order === "ASC" ? "DESC" : "ASC");
        setSortedrating(true);
        setPermanentSortedrating(true);
        break;
      case "text":
        order = orderByText;
        setOrderByText(order === "ASC" ? "DESC" : "ASC");
        setSortedtext(true);
        setPermanentSortedtext(true);
        break;
      case "date":
        order = orderByDate;
        setOrderByDate(order === "ASC" ? "DESC" : "ASC");
        setSorteddate(true);
        setPermanentSorteddate(true);
        break;
      default:
        break;
    }
  
    const sorted = [...Data].sort((a, b) => {
      if (col === "productid" || col === "customerid" || col === "rating" || col === "date") {
        return order === "ASC" ? a[col] - b[col] : b[col] - a[col];
      }
      // For other string columns like firstname, lastname, etc.
      return order === "ASC" ? a[col].localeCompare(b[col]) : b[col].localeCompare(a[col]);
    });
  
    setData(sorted);
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
          Reviews
        </Typography>
        <button className='text-right' onClick={goforwardnav}>
          <ArrowForwardIosIcon />
        </button>
      </div>
      <Helmet>
        <title>Customer Reviews</title>
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
              label={`Search from ${Data.length} reviews here...`}
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
  onMouseEnter={() => setHoveredproductid(true)}
  onMouseLeave={() => setHoveredproductid(false)}
  onClick={() => sorting("productid")}
>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    Product ID{' '}
    {sortedproductid || hoveredproductid ? (
      orderByProductId === "ASC" ? (
        <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedproductid ? 'blue' : 'inherit' }} />
      ) : (
        <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedproductid ? 'blue' : 'inherit' }} />
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
      orderByCustomerID === "ASC" ? (
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
  onClick={() => sorting("customerfname")}
>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    Customer{' '}
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
  onMouseEnter={() => setHoveredrating(true)}
  onMouseLeave={() => setHoveredrating(false)}
  onClick={() => sorting("rating")}
>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    Rating{' '}
    {sortedrating || hoveredrating ? (
      orderByRating === "ASC" ? (
        <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedrating ? 'blue' : 'inherit' }} />
      ) : (
        <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedrating ? 'blue' : 'inherit' }} />
      )
    ) : null}
  </div>
</TableCell>

<TableCell
  onMouseEnter={() => setHoveredtext(true)}
  onMouseLeave={() => setHoveredtext(false)}
  onClick={() => sorting("text")}
>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    Text{' '}
    {sortedtext || hoveredtext ? (
      orderByText === "ASC" ? (
        <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedtext ? 'blue' : 'inherit' }} />
      ) : (
        <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedtext ? 'blue' : 'inherit' }} />
      )
    ) : null}
  </div>
</TableCell>

<TableCell
  onMouseEnter={() => setHovereddate(true)}
  onMouseLeave={() => setHovereddate(false)}
  onClick={() => sorting("date")}
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
                  </TableRow>
                </TableHead>


                <TableBody>
                  {records.map((row, index) => {
                    const { productid, customerid, customerfname, rating, text, date } = row;
                    const selectedUser = selected.indexOf(index) !== -1; // Assuming index or another unique identifier is used



                    return (
                      <TableRow hover key={index} tabIndex={-1} selected={selectedUser}>

                        <TableCell align="left">{productid}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* You can add an avatar here if available in your data */}
                            <Typography variant="subtitle2" noWrap>
                              {customerid}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{customerfname}</TableCell>

                        <TableCell align="left">{rating}</TableCell>

                        <TableCell align="left">{text}</TableCell>

                        <TableCell align="left">{date}</TableCell>
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