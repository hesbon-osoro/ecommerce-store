import React, { Fragment, useRef, useState, useEffect } from 'react';
import './loginSignup.css';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import { MailOutline, LockOpen, Face } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from '../../actions/user';
import { useAlert } from 'react-alert';

const LoginSignup = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, isAuthenticated } = useSelector(state => state.user);
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState('/Profile.png');
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');
  const loginSubmit = e => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const registerSubmit = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('password', password);
    myForm.set('avatar', avatar);
    dispatch(register(myForm));
  };
  const registerDataChange = e => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const redirect = location.search ? location.search.split('=')[1] : '/account';
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === 'login') {
      switcherTab.current.classList.add('shiftToNeutral');
      switcherTab.current.classList.remove('shiftToRight');
      registerTab.current.classList.remove('shiftToNeutralForm');
      loginTab.current.classList.remove('shiftToLeft');
    }
    if (tab === 'register') {
      switcherTab.current.classList.add('shiftToRight');
      switcherTab.current.classList.remove('shiftToNeutral');

      registerTab.current.classList.add('shiftToNeutralForm');
      loginTab.current.classList.add('shiftToLeft');
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="loginSignupContainer">
            <div className="loginSignupBox">
              <div>
                <div className="login_signup_toggle">
                  <p onClick={e => switchTabs(e, 'login')}>LOGIN</p>
                  <p onClick={e => switchTabs(e, 'register')}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signupForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signupName">
                  <Face />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signupEmail">
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signupPassword">
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signupBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignup;
