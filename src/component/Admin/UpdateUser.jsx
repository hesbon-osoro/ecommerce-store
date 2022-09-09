import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import { MailOutline, Person, VerifiedUser } from '@material-ui/icons';
import Sidebar from './Sidebar';
import { UPDATE_USER_RESET } from '../../constants/user';
import { getUserDetails, updateUser, clearErrors } from '../../actions/user';
import Loader from '../layout/Loader/Loader';

const UpdateUser = ({ history, match }) => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { loading, error, user } = useSelector(state => state.userDetails);
	const {
		loading: updateLoading,
		error: updateError,
		isUpdated,
	} = useSelector(state => state.profile);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('');
	const userId = match.params.id;
	useEffect(() => {
		if (user && user._id !== userId) {
			dispatch(getUserDetails(userId));
		} else {
			setName(user.name);
			setEmail(user.email);
			setRole(user.role);
		}
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		if (updateError) {
			alert.error(updateError);
			dispatch(clearErrors());
		}
		if (isUpdated) {
			alert.success('User updated successfully');
			history.push('/admin/users');
			dispatch({ type: UPDATE_USER_RESET });
		}
	}, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);
	const updateUserSubmitHandler = e => {
		e.preventDefault();
		const myForm = new FormData();

		myForm.set('name', name);
		myForm.set('email', email);
		myForm.set('role', role);
		dispatch(updateUser(userId, myForm));
	};
	return (
		<Fragment>
			<MetaData title={'Update User'} />
			<div className="dashboard">
				<Sidebar />
				<div className="newProductContainer">
					{loading ? (
						<Loader />
					) : (
						<form
							className="createProductForm"
							onSubmit={updateUserSubmitHandler}
						>
							<h1>Update User</h1>
							<div>
								<Person />
								<input
									type="text"
									placeholder="Name"
									required
									value={name}
									onChange={e => setName(e.target.value)}
								/>
							</div>
							<div>
								<MailOutline />
								<input
									type="email"
									placeholder="Email"
									required
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<VerifiedUser />
								<select value={role} onChange={e => setRole(e.target.value)}>
									<option value="">Choose Role</option>
									<option value="admin">Admin</option>
									<option value="user">User</option>
								</select>
							</div>
							<Button
								id="createProductBtn"
								type="submit"
								disabled={
									updateLoading ? true : false || role === '' ? true : false
								}
							>
								Update
							</Button>
						</form>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default UpdateUser;
