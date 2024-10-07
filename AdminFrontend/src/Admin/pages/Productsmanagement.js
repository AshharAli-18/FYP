import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from "@mui/icons-material/Search";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { toast } from 'react-toastify';
import { deleteProductStart, loadproductsstart } from '../../redux/action';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

export default function UserPage() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [orderByProductId, setOrderByProductId] = useState("ASC");
  const [orderByProductName, setOrderByProductName] = useState("ASC");
  const [orderByBrand, setOrderByBrand] = useState("ASC");
  const [orderByPrice, setOrderByPrice] = useState("ASC");
  const [orderBySize, setOrderBySize] = useState("ASC");
  const [orderByShoeCondition, setOrderByShoeCondition] = useState("ASC");
  const [orderByInventoryId, setOrderByInventoryId] = useState("ASC");
  const [orderByCategory, setOrderByCategory] = useState("ASC");
  const [orderByStatus, setOrderByStatus] = useState("ASC");
  const dispatch = useDispatch();
  const [Data, setData] = useState([]);
  const { products } = useSelector(state => state.data);
  const [hoveredid, setHoveredid] = useState(false);
  const [hoveredname, setHoveredname] = useState(false);
  const [hoveredbrand, setHoveredbrand] = useState(false);
  const [hoveredprice, setHoveredprice] = useState(false);
  const [hoveredsize, setHoveredsize] = useState(false);
  const [hoveredcondition, setHoveredcondition] = useState(false);
  const [hoveredinv, setHoveredinv] = useState(false);
  const [hoveredcategory, setHoveredcategory] = useState(false);
  const [hoveredstatus, setHoveredstatus] = useState(false);
  const [sortedid, setSortedid] = useState(false);
  const [permanentSortedid, setPermanentSortedid] = useState(false);
  const [sortedname, setSortedname] = useState(false);
  const [permanentSortedname, setPermanentSortedname] = useState(false);
  const [sortedbrand, setSortedbrand] = useState(false);
  const [permanentSortedbrand, setPermanentSortedbrand] = useState(false);
  const [sortedprice, setSortedprice] = useState(false);
  const [permanentSortedprice, setPermanentSortedprice] = useState(false);
  const [sortedsize, setSortedsize] = useState(false);
  const [permanentSortedsize, setPermanentSortedsize] = useState(false);
  const [sortedcondition, setSortedcondition] = useState(false);
  const [permanentSortedcondition, setPermanentSortedcondition] = useState(false);
  const [sortedinv, setSortedinv] = useState(false);
  const [permanentSortedinv, setPermanentSortedinv] = useState(false);
  const [sortedcategory, setSortedcategory] = useState(false);
  const [permanentSortedcategory, setPermanentSortedcategory] = useState(false);
  const [sortedstatus, setSortedstatus] = useState(false);
  const [permanentSortedstatus, setPermanentSortedstatus] = useState(false);
  const  authToken = useSelector(state => state.user.user.token);


  useEffect(() => {
    // dispatch(loadproductsstart(authToken));
    dispatch(loadproductsstart());
  }, []);

  useEffect(() => {
    setData(products);
    console.log(Data.length);
  }, [products]);

  const handleDelete = async (productid) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      try {
        dispatch(deleteProductStart(productid));
        toast.success("Product deleted successfully!");
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the product.");
      }
    }
  };

  const handleEdit = async (productid) => {
    navigate(`/Admindashboard/EditProduct/${productid}`);
  };

  const handleDetail = async (productid) => {
    navigate(`/Admindashboard/DetailProduct/${productid}`);
  };

  const openaddproduct = () => {
    navigate(`/Admindashboard/AddProduct`);
  };

  const gobacknav = () => {
    navigate(-1);
  };

  const goforwardnav = () => {
    navigate(+1);
  };

  const filterProduct = (event) => {
    const query = event.target.value.toLowerCase();
    setData(products.filter(product => 
      product.productid.toString().includes(query) ||
      product.productname.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.price.toString().includes(query) ||
      product.size.toString().includes(query) ||
      product.shoecondition.toLowerCase().includes(query) ||
      product.inventoryid.toString().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.status.toLowerCase().includes(query)
    ));
  };

  const sorting = (col) => {
    let order;
    switch (col) {
      case "productid":
        order = orderByProductId;
        setOrderByProductId(order === "ASC" ? "DESC" : "ASC");
        setSortedid(true);
        setPermanentSortedid(true);
        break;
      case "productname":
        order = orderByProductName;
        setOrderByProductName(order === "ASC" ? "DESC" : "ASC");
        setSortedname(true);
        setPermanentSortedname(true);
        break;
      case "brand":
        order = orderByBrand;
        setOrderByBrand(order === "ASC" ? "DESC" : "ASC");
        setSortedbrand(true);
        setPermanentSortedbrand(true);
        break;
      case "price":
        order = orderByPrice;
        setOrderByPrice(order === "ASC" ? "DESC" : "ASC");
        setSortedprice(true);
        setPermanentSortedprice(true);
        break;
      case "size":
        order = orderBySize;
        setOrderBySize(order === "ASC" ? "DESC" : "ASC");
        setSortedsize(true);
        setPermanentSortedsize(true);
        break;
      case "shoecondition":
        order = orderByShoeCondition;
        setOrderByShoeCondition(order === "ASC" ? "DESC" : "ASC");
        setSortedcondition(true);
        setPermanentSortedcondition(true);
        break;
      case "inventoryid":
        order = orderByInventoryId;
        setOrderByInventoryId(order === "ASC" ? "DESC" : "ASC");
        setSortedinv(true);
        setPermanentSortedinv(true);
        break;
      case "category":
        order = orderByCategory;
        setOrderByCategory(order === "ASC" ? "DESC" : "ASC");
        setSortedcategory(true);
        setPermanentSortedcategory(true);
        break;
      case "status":
        order = orderByStatus;
        setOrderByStatus(order === "ASC" ? "DESC" : "ASC");
        setSortedstatus(true);
        setPermanentSortedstatus(true);
        break;
      // Add cases for other columns if needed
      default:
        break;
    }



    const sorted = [...Data].sort((a, b) => {
      if (col === "productid") {
        return order === "ASC" ? a[col] - b[col] : b[col] - a[col];
      }
      if (col === "price") {
        // Convert prices to numbers before comparison
        const priceA = parseFloat(a[col]);
        const priceB = parseFloat(b[col]);
        return order === "ASC" ? priceA - priceB : priceB - priceA;
      }
      // Convert "Size" and "Inventory ID" to strings before comparison
      if (col === "size" || col === "inventoryid") {
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
          Products
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
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TextField
              id="search"
              type="search"
              label={`Search from ${Data.length} products here...`}
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
              onClick={openaddproduct}
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


          {/* <Scrollbar> */}
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>

                <TableHead>
                  <TableRow>
                    <TableCell
                      onMouseEnter={() => setHoveredid(true)}
                      onMouseLeave={() => setHoveredid(false)}
                      onClick={() => sorting("productid")}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        ID{' '}
                        {sortedid || hoveredid ? (
                          orderByProductId === "ASC" ? (
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
                      onClick={() => sorting("productname")}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Name{' '}
                        {sortedname || hoveredname ? (
                          orderByProductName === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedname ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedname ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredbrand(true)}
                      onMouseLeave={() => setHoveredbrand(false)}
                      onClick={() => sorting("brand")}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Brand{' '}
                        {sortedbrand || hoveredbrand ? (
                          orderByBrand === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedbrand ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedbrand ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredprice(true)}
                      onMouseLeave={() => setHoveredprice(false)}
                      onClick={() => sorting("price")}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Price{' '}
                        {sortedprice || hoveredprice ? (
                          orderByPrice === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedprice ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedprice ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell
                      onMouseEnter={() => setHoveredsize(true)}
                      onMouseLeave={() => setHoveredsize(false)}
                      onClick={() => sorting("size")}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Size{' '}
                        {sortedsize || hoveredsize ? (
                          orderBySize === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedsize ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedsize ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredcondition(true)}
                      onMouseLeave={() => setHoveredcondition(false)}
                      onClick={() => sorting("shoecondition")}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Condition{' '}
                        {sortedcondition || hoveredcondition ? (
                          orderByShoeCondition === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedcondition ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedcondition ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredinv(true)}
                      onMouseLeave={() => setHoveredinv(false)}
                      onClick={() => sorting("inventoryid")}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Inv. ID{' '}
                        {sortedinv || hoveredinv ? (
                          orderByInventoryId === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedinv ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedinv ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>

                    <TableCell
                      onMouseEnter={() => setHoveredcategory(true)}
                      onMouseLeave={() => setHoveredcategory(false)}
                      onClick={() => sorting("category")}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        Category{' '}
                        {sortedcategory || hoveredcategory ? (
                          orderByCategory === "ASC" ? (
                            <ArrowDownwardIcon className="text-sm" style={{ color: permanentSortedcategory ? 'blue' : 'inherit' }} />
                          ) : (
                            <ArrowUpwardIcon className="text-sm" style={{ color: permanentSortedcategory ? 'blue' : 'inherit' }} />
                          )
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell
                      onMouseEnter={() => setHoveredstatus(true)}
                      onMouseLeave={() => setHoveredstatus(false)}
                      onClick={() => sorting("status")}>
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
                    <TableCell >Edit</TableCell>
                    <TableCell >Delete</TableCell>
                    <TableCell >Detail</TableCell>
                  </TableRow>
                </TableHead>


                <TableBody>
                  {records.map((row, index) => {
                    const { productid, productname, brand, price, size, shoecondition, inventoryid, category, status } = row;

                    const handleDeleteClick = () => {
                      handleDelete(productid);
                    };

                    const handleEditClick = () => {
                      handleEdit(productid);
                    };

                    const handleDetailClick = () => {
                      handleDetail(productid);
                    }

                    return (
                      <TableRow hover key={index} tabIndex={-1} selected={selected.indexOf(index) !== -1}>

                        <TableCell align="left">{productid}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {productname}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{brand}</TableCell>

                        <TableCell align="left">{price}</TableCell>

                        <TableCell align="left">{size}</TableCell>

                        <TableCell align="left">{shoecondition}</TableCell>

                        <TableCell align="left">{inventoryid}</TableCell>

                        <TableCell align="left">{category}</TableCell>

                        <TableCell align="left">{status}</TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="primary" onClick={handleEditClick} >
                            <Iconify icon={'eva:edit-2-fill'} />
                          </IconButton>
                        </TableCell>
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




          {/* </Scrollbar> */}
        </Card>
      </Container>
    </>
  );
}

