import React, { Fragment, useState } from 'react';
import './header.css';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { Backdrop } from '@material-ui/core';
import {
  Dashboard,
  Person,
  ExitToApp,
  ListAlt,
  ShoppingCart,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../../actions/user';
import { useDispatch, useSelector } from 'react-redux';

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector(state => state.cart);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const options = [
    { icon: <ListAlt />, name: 'Orders', func: orders },
    { icon: <Person />, name: 'Profile', func: account },
    {
      icon: (
        <ShoppingCart
          style={{ color: cartItems.length > 0 ? 'tomato' : 'unset' }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToApp />, name: 'Logout', func: logoutUser },
  ];
  if (user.role === 'admin') {
    options.unshift({
      icon: <Dashboard />,
      name: 'Dashboard',
      func: dashboard,
    });
  }
  function dashboard() {
    history.push('/admin/dashboard');
  }
  function orders() {
    history.push('/orders');
  }
  function account() {
    history.push('/account');
  }
  function cart() {
    history.push('/cart');
  }
  function logoutUser() {
    dispatch(logout());
    alert.success('Logged out successfully');
  }
  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: '10' }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: '11' }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDial"
            src={user.avatar.url ? user.avatar.url : '/Profile.png'}
            alt="Profile"
          />
        }
      >
        {options.map(option => (
          <SpeedDialAction
            key={option.name}
            icon={option.icon}
            tooltipTitle={option.name}
            onClick={option.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
