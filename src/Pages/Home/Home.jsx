import React, { useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { categories } from '../../utils/categories';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { localhost } from '../../utils/localHost';
import { logoutUser } from '../../services/logout';
import { auth } from '../../services/auth.js';
import { useDispatch } from "react-redux";
import { setUser, logoutUserSlice } from '../../state/slices/userSlice';
import axios from "axios";
import './Home.css';
// Components
import MainShopComponent from '../../Components/MainShopComponent/MainShopComponent';
import ManagementArea from '../../Components/ManagementArea/ManagementArea';
import Cart from '../../Components/Cart/Cart';
// MUI
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 260;

const Home = ( { notificationMsg } ) => {

  const user = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart.data);

  const { register, handleSubmit} = useForm();
  const Dispatch = useDispatch();
  let navigate = useNavigate()

  const [categoryFilter, setCategoryFilter] = useState("")
  const [mainView, setMainView] = useState("shop")
  const [itemsFromSearchToDisplay, setItemsFromSearchToDisplay] = useState([])
  const [countItemsInCart, setCountItemsInCart] = useState(0)

  useEffect(() => {
    authUser()
  }, []);

  async function authUser() {
    const newUser = await auth()
    Dispatch(setUser({ newUser }));
  }

  function categoryClicked(category) {
    setCategoryFilter(category)
  }

  function changeView(view) {
    setMainView(view)
  }

  const onSubmit = async (data) => {
      
    console.log("data: ", data.search)
    if(data.search === undefined) {
      console.log("search = undefined");
    } else {
      try {
        console.log("axios");
        const res = await axios.get(`${localhost}/product/getProductsFromSearch/${data.search}`);
        console.log("res", res);
  
        if(res.status === 200) {
        setItemsFromSearchToDisplay(res.data.productsFromSearch)
        }
      } catch(err) {
        console.log(err);
      }
    }
  };

  let total = 0
  function updateItemCounter() {
    const totalItemsInCart = cart.map((item) => {
      total = total + item.quantity
    })
    setCountItemsInCart(total)
  }

  useEffect(() => {
    updateItemCounter()
  }, [cart]);

  function logout() {
    logoutUser();
    Dispatch(logoutUserSlice());
  }

  function login() {
    navigate("/login")
  }

  return (
    <div className="homeWrapper">
      
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <Toolbar className="toolbarWrapper">
          <Typography variant="h6" noWrap component="div">
          Vintage Football Shirts
          </Typography>

          {user.username ?
          <div >
          <Button onClick={logout}>
            <ListItemIcon className="userBTN" >
                <LogoutIcon fontSize="large" />
                <div className="username">Logout</div>
              </ListItemIcon>
            </Button>
          </div>
          : 
          <Button onClick={login}>
            <ListItemIcon className="userBTN">
              <LoginIcon fontSize="large"/>
              <div className="username">Login</div>
            </ListItemIcon>
          </Button>}

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {user.username && 
            <ListItem disablePadding >
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={user.username} />
                </ListItemButton>
              </ListItem>
            }
            {user.username && 
              <ListItem onClick={() => changeView("cart")} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Cart" />
                  {cart.length > 0 && 
                    <div className="cartItemsCounter">{countItemsInCart}</div>
                  }
                </ListItemButton>
              </ListItem>
            }
              {user.manager &&
                <ListItem onClick={() => changeView("management")} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <ManageAccountsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Management Area" />
                  </ListItemButton>
                </ListItem>
              }
          </List>
          <Divider className="Divider" />
          <Divider className="Divider" />
          <List>
            <form onSubmit={handleSubmit(onSubmit)} className="searchTextFieldWrapper">
                <TextField
                id="search"
                label="Search"
                variant="outlined"
                {...register("search", { required: true })}
                />
                <Button onClick={onSubmit} type="submit" className="searchBTN" variant="outlined">Search</Button>

                <h3 className="categoryTitle">Category</h3>
            </form>
            {categories.map((category, index) => (
              <ListItem onClick={() => { categoryClicked(category.id); changeView("shop")}} key={category.name} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SportsSoccerIcon />
                  </ListItemIcon>
                  <ListItemText primary={category.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        { mainView === "shop" && <MainShopComponent notificationMsg={notificationMsg} categoryFilter={categoryFilter} itemsFromSearch={itemsFromSearchToDisplay}/> }
        { mainView === "cart" && <Cart notificationMsg={notificationMsg}/> }
        { mainView === "management" && <ManagementArea /> } 
      </Box>
    </Box>
    </div>
  )
}

export default Home