import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './myOrders.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, myOrders } from '../../actions/order';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Typography } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import { Launch } from '@material-ui/icons';

const MyOrders = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { loading, error, orders } = useSelector(state => state.myOrders);
	const { user } = useSelector(state => state.user);
	const columns = [
		{ field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },
		{
			field: 'status',
			headerName: 'Status',
			flex: 0.5,
			cellClassName: params => {
				return params.getValue(params.id, 'status') === 'Delivered'
					? 'greenColor'
					: 'redColor';
			},
		},
		{
			field: 'itemsQty',
			headerName: 'Items Qty',
			type: 'number',
			minWidth: 150,
			flex: 0.3,
		},
		{
			field: 'amount',
			headerName: 'Amount',
			type: 'number',
			minWidth: 270,
			flex: 0.5,
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
					<Link to={`/order/${params.getValue(params.id, 'id')}`}>
						<Launch />
					</Link>
				);
			},
		},
	];
	const rows = [];
	orders &&
		orders.forEach(order => {
			rows.push({
				itemsQty: order.orderItems.length,
				id: order._id,
				status: order.orderStatus,
				amount: order.totalPrice,
			});
		});
	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		dispatch(myOrders());
	}, [dispatch, alert, error]);
	return (
		<Fragment>
			<MetaData title={`${user.name} - Orders`} />
			{loading ? (
				<Loader />
			) : (
				<div className="myOrdersPage">
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						disableSelectionOnClick
						className="myOrdersTable"
						autoHeight
					/>
					<Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
				</div>
			)}
		</Fragment>
	);
};

export default MyOrders;
