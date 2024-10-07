
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
  Switch,
  FormControlLabel
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from "@mui/icons-material/Search";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// redux actions
import { deleteProductStart, loadproductsstart } from '../../redux/action';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

export default function DiscountsManagement() {

  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [Order, SetOrder] = useState("ASC");
  const dispatch = useDispatch();
  const [OriginalData, setOriginalData] = useState([]);
  const [Data, setData] = useState([]);
  const { products } = useSelector(state => state.data);
  const [discounts, setDiscounts] = useState([]);
  const [orderById, setOrderById] = useState("ASC");
  const [orderByName, setOrderByName] = useState("ASC");
  const [orderByType, setOrderByType] = useState("ASC");
  const [orderByAmount, setOrderByAmount] = useState("ASC");
  const [orderByStartDate, setOrderByStartDate] = useState("ASC");
  const [orderByEndDate, setOrderByEndDate] = useState("ASC");

  const [hoveredid, setHoveredid] = useState(false);
  const [hoveredname, setHoveredname] = useState(false);
  const [hoveredtype, setHoveredtype] = useState(false);
  const [hoveredamount, setHoveredamount] = useState(false);
  const [hoveredstartdate, setHoveredstartdate] = useState(false);
  const [hoveredenddate, setHoveredenddate] = useState(false);

  const [sortedid, setSortedid] = useState(false);
  const [permanentSortedid, setPermanentSortedid] = useState(false);
  const [sortedname, setSortedname] = useState(false);
  const [permanentSortedname, setPermanentSortedname] = useState(false);
  const [sortedtype, setSortedtype] = useState(false);
  const [permanentSortedtype, setPermanentSortedtype] = useState(false);
  const [sortedamount, setSortedamount] = useState(false);
  const [permanentSortedamount, setPermanentSortedamount] = useState(false);
  const [sortedstartdate, setSortedstartdate] = useState(false);
  const [permanentSortedstartdate, setPermanentSortedstartdate] = useState(false);
  const [sortedenddate, setSortedenddate] = useState(false);
  const [permanentSortedenddate, setPermanentSortedenddate] = useState(false);

  useEffect(() => {
    async function fetchDiscounts() {
      try {
        // const response = await fetch('http://localhost:5000/api/discounts');
        const response = await fetch('http://api.dopes.online/api/discounts');
        if (response.ok) {
          const data = await response.json();
          setOriginalData(data);
          setData(data);
        } else {
          throw new Error('Failed to fetch discounts');
        }
      } catch (error) {
        console.error('Error fetching discounts:', error);
      }
    }

    fetchDiscounts();

    // Cleanup function if needed
    return () => {  
      // Any cleanup code here
    };
  }, []);

  const filterProduct = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    if (searchQuery === '') {
      setData(OriginalData); // Reset to original data when search query is empty
    } else {
      setData(OriginalData.filter(f => f.name.toLowerCase().includes(searchQuery)));
    }
  };


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/api/deletediscount/${id}`, {
        // const response = await fetch(`http://api.dopes.online/api/deletediscount/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          // Delete successful
          // You can handle the success message or update the UI as needed
          toast.success('Discount deleted successfully!');

          // Refetch discounts data to reflect changes
          const updatedResponse = await fetch('http://localhost:5000/api/discounts');
          // const updatedResponse = await fetch('http://api.dopes.online/api/discounts');
          if (updatedResponse.ok) {
            const updatedData = await updatedResponse.json();
            setData(updatedData);
          } else {
            throw new Error('Failed to fetch updated discounts data');
          }
        } else {
          // Handle error
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete discount');
        }
      } catch (error) {
        // Handle error
        console.error('Error deleting discount:', error.message);
        toast.error(error.message);

      }
    }
  };

  const toggleDiscountActivation = async (id, isActive) => {
    try {
      const response = await fetch(`http://localhost:5000/api/toggleDiscount/${id}`, {
      // const response = await fetch(`http://api.dopes.online/api/toggleDiscount/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !isActive }) // Toggle isActive value
      });

      if (response.ok) {
        // Update UI or handle success message
        toast.success('Discount activation status updated successfully!');

        // Refetch discounts data to reflect changes
        const updatedResponse = await fetch('http://localhost:5000/api/discounts');
        // const updatedResponse = await fetch('http://api.dopes.online/api/discounts');
        if (updatedResponse.ok) {
          const updatedData = await updatedResponse.json();
          setData(updatedData);
        } else {
          throw new Error('Failed to fetch updated discounts data');
        }
      } else {
        // Handle error
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update discount activation status');
      }
    } catch (error) {
      // Handle error
      console.error('Error updating discount activation status:', error.message);
      toast.error(error.message);
    }
  };


  const handleEdit = async (productid) => {
    navigate(`/Admindashboard/EditProduct/${productid}`);
  };

  const handleDetail = async (productid) => {
    navigate(`/Admindashboard/DetailProduct/${productid}`);
  };

  const openadddiscount = () => {
    navigate(`/Admindashboard/AddDiscount`);
  };

  // const filterProduct = (event) => {
  //   setData(Data.filter(f => f.name.toLowerCase().includes(event.target.value)))

  // }

  const sorting = (col) => {
    let order;
    switch (col) {
      case "id":
        order = orderById;
        setOrderById(order === "ASC" ? "DESC" : "ASC");
        setSortedid(true);
        setPermanentSortedid(true);
        break;
      case "name":
        order = orderByName;
        setOrderByName(order === "ASC" ? "DESC" : "ASC");
        setSortedname(true);
        setPermanentSortedname(true);
        break;
      case "type":
        order = orderByType;
        setOrderByType(order === "ASC" ? "DESC" : "ASC");
        setSortedtype(true);
        setPermanentSortedtype(true);
        break;
      case "amount":
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
      if (col === "id" || col === "amount" || col === "price") {
        return order === "ASC" ? a.id - b.id : b.id - a.id; // Compare by id field
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
          Discounts
        </Typography>
        <button className='text-right' onClick={goforwardnav}>
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
              label={`Search from discounts here...`}
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

            <AddBoxIcon
              className='text-blue-500'
              onClick={openadddiscount}
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

                    <TableCell
                      onMouseEnter={() => setHoveredid(true)}
                      onMouseLeave={() => setHoveredid(false)}
                      onClick={() => sorting("id")}
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
                      onClick={() => sorting("name")}
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
                      onMouseEnter={() => setHoveredtype(true)}
                      onMouseLeave={() => setHoveredtype(false)}
                      onClick={() => sorting("type")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Type{' '}
                        {sortedtype || hoveredtype ? (
                          orderByType === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedtype ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedtype ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredamount(true)}
                      onMouseLeave={() => setHoveredamount(false)}
                      onClick={() => sorting("amount")}
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
                    <TableCell >Activation</TableCell>
                    {/* <TableCell >Edit</TableCell> */}
                    <TableCell >Delete</TableCell>
                    {/* <TableCell >Detail</TableCell> */}
                  </TableRow>
                </TableHead>


                <TableBody>
                  {records.map((row, index) => {
                    const { id, name, type, amount, startDate, endDate, isActive } = row;
                    const selectedUser = selected.indexOf(index) !== -1;
                    console.log("type of price:", typeof price)
                    const handleDeleteClick = () => {
                      handleDelete(id);

                    };



                    const handleDetailClick = () => {
                      // handleDetail(productid);
                    }

                    return (
                      <TableRow hover key={index} tabIndex={-1} selected={selectedUser}>

                        <TableCell align="left">{id}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{type}</TableCell>

                        <TableCell align="left">{amount}</TableCell>

                        <TableCell align="left">{startDate}</TableCell>

                        <TableCell align="left">{endDate}</TableCell>

                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Switch
                                checked={row.isActive === 1} // Assuming isActive is either 0 or 1
                                onChange={() => toggleDiscountActivation(row.id, row.isActive)}
                                color='success'
                              />
                            }

                          />
                        </TableCell>
                        {/* <TableCell align="right">
                          <IconButton size="large" color="primary" onClick={handleEditClick} >
                            <Iconify icon={'eva:edit-2-fill'} />
                          </IconButton>
                        </TableCell> */}
                        <TableCell align="left">
                          <IconButton size="large" color="error"
                            onClick={handleDeleteClick}>
                            <Iconify icon={'eva:trash-2-outline'} />
                          </IconButton>
                        </TableCell>
                        {/* <TableCell align="left">
                          <IconButton size="large" color="info"
                            onClick={handleDetailClick}>
                            <ArrowCircleRightIcon />
                          </IconButton>
                        </TableCell> */}
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