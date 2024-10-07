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

  useEffect(() => {
    dispatch(loadReviewsStart());

  }, []);

  const goback = () => {
    navigate(-1);
  };

  const goforward = () => {
    navigate(+1);
  };

  useEffect(() => {
    setData(reviews);
    console.log("Data:", reviews);
  }, [reviews]);

  const filterProduct = (event) => {
    setData(reviews.filter(f => f.customerfname.toLowerCase().includes(event.target.value)))

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
          Reviews
        </Typography>
        <button className='text-right' onClick={goforward}>
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
              label="Search Reviews here ..."
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
                    <TableCell >Product ID</TableCell>
                    <TableCell >Customer ID</TableCell>
                    <TableCell >First Name</TableCell>
                    <TableCell >Rating</TableCell>
                    <TableCell >Text</TableCell>
                    <TableCell >Date</TableCell>
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