import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteSupplier, listsuppliers } from '../actions/supplierActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { SUPPLIER_DELETE_RESET } from '../constants/supplierConstants';
import Pagination from '../components/Pagination';


// import { Container } from './styles';

function SupplierScreen(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const supplierList = useSelector((state) => state.supplierList);
    const { loading, error, suppliers } = supplierList;
    const supplierDelete = useSelector((state) => state.supplierDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = supplierDelete;

    useEffect(() => {
        if (successDelete) {
            dispatch({ type: SUPPLIER_DELETE_RESET });
        }
        dispatch(listsuppliers());
    }, [dispatch, successDelete]);
    // console.log(suppliers);

    const [currentPage, setCurrentPage] = useState(1);
    const [suppliersPerPage] = useState(5);

    const indexOfLastProduct = currentPage * suppliersPerPage;
    const indexOfFirstProduct = indexOfLastProduct - suppliersPerPage;
    const currentSuppliers = suppliers !== undefined ? suppliers.slice(indexOfFirstProduct, indexOfLastProduct) : [];

    // console.log(currentSuppliers);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // console.log(supplierDelete);

    const deleteHandler = (delItem) => {
        if (window.confirm('Are you sure to delete?')) {
            var delList = [];
            delList.push(delItem);
            dispatch(deleteSupplier(delList));
            console.log(delList);
        }
    };

    const editHandler = (editItem) => {
        props.history.push(`/suppliers/${editItem}/edit`)
    };


    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Nhà Cung Cấp</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row" >
                {/* <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="input-group">
                        <input
                            type="text"
                            name="search-bar"
                            className="form-control"
                        />
                        <span className="input-group-btn">
                            <button
                                type="button"
                                className="btn btn-primary"
                            >
                                <i className="fa fa-search mr-3" aria-hidden="true"></i>
                                tìm kiếm
                            </button>
                        </span>
                    </div>
                </div> */}
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-15">
                    {loadingDelete && <LoadingBox></LoadingBox>}
                    {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <>
                                    {suppliers.length === 0 && <MessageBox>No supplier Found</MessageBox>}
                                    <div className="table-list">
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th className="col-xs-1 col-sm-1 col-md-1 col-lg-1">stt</th>
                                                    <th className="col-xs-1 col-sm-1 col-md-1 col-lg-1">id</th>
                                                    <th className="col-xs-2 col-sm-2 col-md-2 col-lg-2">tên</th>
                                                    <th className="col-xs-2 col-sm-2 col-md-2 col-lg-2">email</th>
                                                    <th className="col-xs-2 col-sm-2 col-md-2 col-lg-2">địa chỉ</th>
                                                    <th className="col-xs-1 col-sm-1 col-md-1 col-lg-1">số điện thoại</th>
                                                    <th className="col-xs-1 col-sm-1 col-md-1 col-lg-1">mã số thuế</th>
                                                    <th className="col-xs-2 col-sm-2 col-md-2 col-lg-2">thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentSuppliers.map((supplier, index) => (
                                                    <tr key={supplier.SupID}>
                                                        <td>{index + 1}</td>
                                                        <td>{supplier.SupID}</td>
                                                        <td>{supplier.name}</td>
                                                        <td>{supplier.Email}</td>
                                                        <td>{supplier.Address}</td>
                                                        <td>{supplier.telephoneNumber}</td>
                                                        <td>{supplier.Tax_ID}</td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="btn btn-warning m-10"
                                                                onClick={() => editHandler(supplier.SupID)}
                                                            >
                                                                <i className="fa fa-pencil" aria-hidden="true"></i> sửa
                                                        </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger m-10"
                                                                onClick={() => deleteHandler(supplier.SupID)}
                                                            >
                                                                <i className="fa fa-trash" aria-hidden="true"></i> xóa
                                                        </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {currentSuppliers.length > suppliersPerPage ? <Pagination itemsPerPage={suppliersPerPage} totalItems={suppliers.length} paginate={paginate}></Pagination> : <br />}
                                </>
                            )}
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <button type="button" className="btn btn-primary fr" onClick={() => (history.push(`/suppliers/add`))}>thêm nhà cung cấp</button>
                </div>
            </div>
        </div>
    );
}

export default SupplierScreen;