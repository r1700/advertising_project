import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { useEffect } from 'react';
import { fetchUpdateUser } from '../redux/userSlice'; // ייבוא פעולת עדכון
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, TextField
} from '@mui/material';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    /**
     * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
     * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
     * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
     * proper interaction with the underlying content.
     */
    position: 'relative',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginRight: 0,
        },
      },
    ],
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function NavSaid() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //לקחת את שם המשתמש
  let user = useSelector((state) => state.userReducer)
  const userName = user?.users?.data?.name || user?.data?.name || "";

  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [editedUser, setEditedUser] = React.useState(user?.data || {});

  const navItems = [
    { text: 'הרכישות שלי', path: '/ActiveRental' },
    { text: 'היסטוריית פרסומים', path: '/realization' },
    { text: 'רכישת חבילה', path: '/Subscriptions' },
    // { text: 'הזמנת פרסום', path: '/newRental' },
  ];
  const navItems2 = [
    { text: 'אודות', path: '/about' },
    // { text: 'אודות', path: '/about22' },
    { text: 'יצירת קשר', path: '/contact' }
  ];

  // דוגמה לסטייט של התחברות
  const isLoggedIn = !!user?.data?.name;

  // תפריט משתמש
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // פונקציה להתנתקות
  const handleLogout = () => {
    localStorage.clear();
    // אם אתה שומר טוקן ב-localStorage
    localStorage.removeItem('token');
    // נקה את המשתמש מה-redux
    dispatch(logout()); // תחליף לאקשן שלך
    // setIsLoggedIn(false);
    user = {}; // נקה את המשתמש מהסטייט
    navigate('/'); // הפניה לעמוד הכניסה
  };

  const handleUserUpdate = () => {
    dispatch(fetchUpdateUser(editedUser)).then((res) => {
    });
    setEditDialogOpen(false);
  };
  return (

    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "white" }}>
        <Toolbar sx={{ minHeight: 105, position: "relative" }} >

          {/* אם לא מחובר - כפתור הרשמה */}
          {!isLoggedIn && (
            <Button
              variant="contained"
              color="primary"
              sx={{
                position: "absolute",
                left: 16,
                top: 16,
                zIndex: 2,
                backgroundColor: "#F0BD52",
                color: "white"
              }}
              onClick={() => navigate('/')}
            >
              הרשמה
            </Button>
          )}
          {/* אם מחובר - שלום א... + תפריט */}
          {isLoggedIn && (
            <Box sx={{ position: "absolute", left: 16, top: 16, zIndex: 2, display: 'flex', alignItems: 'center' }}>
              <Button
                sx={{ color: "#F0BD52", textAlign: "right" }}
                color="inherit"
                onClick={handleMenuOpen}
                startIcon={<Avatar sx={{ bgcolor: "#F0BD52", color: "white" }}>{userName[0]}</Avatar>}
              >
                שלום {userName}
              </Button>
              {/* תפריט משתמש */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => {
                  handleMenuClose(); setEditDialogOpen(true); // פתיחת דיאלוג
                }}>
                  עריכת משתמש
                </MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); navigate('/'); }}>הרשמה חדשה</MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>התנתקות</MenuItem>
              </Menu>

            </Box>
          )}

          <Typography variant="body1" noWrap sx={{ flexGrow: 1, color: "brown" }} component="div">
            <img src="../../images/logo2.jpg" alt="" height={"105"} />     
          </Typography>

          <IconButton
            color="brown"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={[open && { display: 'none' }, { color: "#F0BD52" }]}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: "brown" }}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ backgroundColor: "brown" }} />

        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>
                  <KeyboardDoubleArrowRightIcon sx={{ color: "#F0BD52" }} />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ backgroundColor: "#F0BD52" }} />

        <List>
          {navItems2.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>
                  <KeyboardDoubleArrowRightIcon sx={{ color: "#3682A1" }} />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ backgroundColor: "#3682A1" }} />

      </Drawer>
      
      {/* // דיאלוג עריכת משתמש */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>עריכת משתמש</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="שם"
            fullWidth
            value={editedUser.name || ''}
            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="אימייל"
            fullWidth
            value={editedUser.email || ''}
            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="טלפון"
            fullWidth
            value={editedUser.phone || ''}
            onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
          />
          <TextField
            margin="dense"
            label="תעודת זהות"
            fullWidth
            value={editedUser.tz || ''}
            onChange={(e) => setEditedUser({ ...editedUser, tz: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>ביטול</Button>
          <Button onClick={handleUserUpdate}>שמור</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


