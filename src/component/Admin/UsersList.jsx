import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './productList.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';

import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import { Edit, Delete } from '@material-ui/icons';
import Sidebar from './Sidebar';
import { getAllUsers, clearErrors, deleteUser } from '../../actions/user';
import { DELETE_USER_RESET } from '../../constants/user';

const UsersList = ({ history }) => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { error, users } = useSelector(state => state.allUsers);
	const {
		error: deleteError,
		isDeleted,
		message,
	} = useSelector(state => state.profile);
	const deleteUserHandler = id => {
		dispatch(deleteUser(id));
	};
	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		if (deleteError) {
			alert.error(deleteError);
			dispatch(clearErrors());
		}
		if (isDeleted) {
			alert.success(message);
			history.push('/admin/users');
			dispatch({ type: DELETE_USER_RESET });
		}
		dispatch(getAllUsers());
	}, [dispatch, alert, error, deleteError, history, isDeleted, message]);
	const columns = [
		{ field: 'id', headerName: 'User ID', minWidth: 180, flex: 0.8 },
		{
			field: 'email',
			headerName: 'Email',
			minWidth: 200,
			flex: 1,
		},
		{
			field: 'name',
			headerName: 'Name',
			minWidth: 150,
			flex: 0.5,
		},
		{
			field: 'role',
			headerName: 'Role',
			type: 'number',
			minWidth: 150,
			flex: 0.3,
			cellClassName: params => {
				return params.getValue(params.id, 'role') === 'admin'
					? 'greenColor'
					: 'redColor';
			},
		},
		{
			field: 'actions',
			flex: 0.3,
			headerName: 'Actions',
			minWidth: 150,
			type: 'number',
			sortable: false,
			renderCell: params => {
				return (
					<Fragment>
						<Link to={`/admin/user/${params.getValue(params.id, 'id')}`}>
							<Edit />
						</Link>
						<Button
							onClick={() =>
								deleteUserHandler(params.getValue(params.id, 'id'))
							}
						>
							<Delete />
						</Button>
					</Fragment>
				);
			},
		},
	];
	const rows = [];
	users &&
		users.forEach(user => {
			rows.push({
				id: user._id,
				role: user.role,
				email: user.email,
				name: user.name,
			});
		});
	return (
		<Fragment>
			<MetaData title={'ALL USERS - Admin'} />
			<div className="dashboard">
				<Sidebar />
				<div className="productListContainer">
					<h1 id="productListHeading">ALL USERS</h1>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						disableSelectionOnClick
						className="productListTable"
						autoHeight
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default UsersList;
