import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './productList.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from '../../actions/product';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import { Edit, Delete } from '@material-ui/icons';
import Sidebar from './Sidebar';
import { DELETE_PRODUCT_RESET } from '../../constants/product';

const ProductList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, products } = useSelector(state => state.products);
  const { error: deleteError, isDeleted } = useSelector(state => state.product);
  const deleteProductHandler = id => {
    dispatch(deleteProduct(id));
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
      alert.success('Product Deleted Successfully');
      history.push('/admin/dashboard');
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);
  const columns = [
    { field: 'id', headerName: 'Product ID', minWidth: 200, flex: 0.5 },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 350,
      flex: 1,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: 'price',
      headerName: 'Price',
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
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}>
              <Edit />
            </Link>
            <Button
              onClick={deleteProductHandler(params.getValue(params.id, 'id'))}
            >
              <Delete />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const rows = [];

  products &&
    products.forEach(product => {
      rows.push({
        id: product._id,
        stock: product.Stock,
        price: product.price,
        name: product.name,
      });
    });
  return (
    <Fragment>
      <MetaData title={'ALL PRODUCTS - Admin'} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
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

export default ProductList;
