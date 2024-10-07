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
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from 'react-redux';
import { loadCustomersStart } from '../../redux/action';
import Scrollbar from '../components/scrollbar';


export default function CustomersManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  const { customers } = useSelector(state => state.customers);

  useEffect(() => {
    dispatch(loadCustomersStart());

  }, []);

  useEffect(() => {
    setData(customers);
    console.log("Data:", customers);
  }, [customers]);



  const goback = () => {
    navigate(-1);
};

const goforward = () => {
  navigate(+1);
};

const filterProduct = (event) => {
  setData(customers.filter(f => f.fname.toLowerCase().includes(event.target.value)))

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
 
 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginLeft:'60px',  marginRight:'60px'}}>
 <button className='text-left' onClick={goback} >
          <ArrowBackIosIcon />
        </button>
        <Typography variant="h4" gutterBottom>
          Customemrs
        </Typography>
        <button className='text-right' onClick={goforward}>
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
              label="Search Customers here ..."
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
                    <TableCell >Customer ID</TableCell>
                    <TableCell >First Name</TableCell>
                    <TableCell >Last Name</TableCell>
                    <TableCell >Email</TableCell>
                    <TableCell >Contact</TableCell>
                    <TableCell >City</TableCell>
                    <TableCell >Registration Date</TableCell>
                  

                  </TableRow>
                </TableHead>


                <TableBody>
                  {records.map((row, index) => {
                    const { customerid, fname, lname, email, contact, city, regdate } = row;
                    // const selectedUser = selected.indexOf(index) !== -1; // Assuming index or another unique identifier is used



                    return (
                      <TableRow >
                        <TableCell align="left">{customerid}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* You can add an avatar here if available in your data */}
                            <Typography variant="subtitle2" noWrap>
                              {fname}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{fname}</TableCell>

                        <TableCell align="left">{lname}</TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{city}</TableCell>

                        <TableCell align="left">{regdate}</TableCell>

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