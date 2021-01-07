import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { deleteInvoice, listInvoices } from '../actions/invoiceActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { INVOICE_DELETE_RESET } from '../constants/invoiceConstants';
import Pagination from '../components/Pagination';


// import { Container } from './styles';

function InvoiceScreen(props) {
    const [isUp, setIsUp] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const invoiceList = useSelector((state) => state.invoiceList);
    const { loading, error, invoices } = invoiceList;
    const invoiceDelete = useSelector((state) => state.invoiceDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = invoiceDelete;

    useEffect(() => {
        if (successDelete) {
            dispatch({ type: INVOICE_DELETE_RESET });
        }
        dispatch(listInvoices());
    }, [dispatch, successDelete,]);

    // console.log(invoices);

    const [currentPage, setCurrentPage] = useState(1);
    const [invoicesPerPage] = useState(5);

    const indexOfLastProduct = currentPage * invoicesPerPage;
    const indexOfFirstProduct = indexOfLastProduct - invoicesPerPage;
    const currentInvoices = invoices !== undefined ? invoices.slice(indexOfFirstProduct, indexOfLastProduct) : [];

    // console.log(currentInvoices);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const deleteHandler = (delItem) => {
        if (window.confirm('Are you sure to delete?')) {
            var delList = [];
            delList.push(delItem);
            dispatch(deleteInvoice(delList));
            // console.log(delList);
        }
    };

    // const editHandler = (editItem) => {
    //     props.history.push(`/Invoices/${editItem}/edit`)
    // };
    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Đơn Hàng</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row" >
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-15">
                    {loadingDelete && <LoadingBox></LoadingBox>}
                    {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <>
                                    {invoices.length === 0 && <MessageBox>No invoice Found</MessageBox>}
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th className="col-xs-1 col-sm-1 col-md-1 col-lg-1">stt</th>
                                                <th className="col-xs-1 col-sm-1 col-md-1 col-lg-1">id</th>
                                                <th className="col-xs-2 col-sm-2 col-md-2 col-lg-2">tên khách hàng</th>
                                                <th className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                                    ngày bán
                                                    {/* <span>ngày bán</span> */}
                                                    {/* <span>
                                                        <button type="button" className="btn btn-primary" onClick={() => { isUp ? setIsUp(false) : setIsUp(true) }}>
                                                            sắp xếp
                                            <span>
                                                                <i className={isUp ? "fa fa-arrow-up ml-3" : "fa fa-arrow-down ml-3"} aria-hidden="true"></i>
                                                            </span>
                                                        </button>
                                                    </span> */}
                                                </th>
                                                <th className="col-xs-2 col-sm-2 col-md-2 col-lg-2">nhân viên thực hiện</th>
                                                <th className="col-xs-1 col-sm-1 col-md-1 col-lg-1">thành tiền</th>
                                                <th className="col-xs-3 col-sm-3 col-md-3 col-lg-3">thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentInvoices.map((invoice, index) => (
                                                <tr key={invoice.BID}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <Link to={`/invoices/${invoice.BID}`}>
                                                            {invoice.BID}
                                                        </Link>
                                                    </td>
                                                    <td>{invoice.cus_name}</td>
                                                    <td>{invoice.createdAt}</td>
                                                    <td>{invoice.manager.LName + invoice.manager.FName + " - " + invoice.MngID}</td>
                                                    <td>{invoice.total}</td>
                                                    <td>
                                                        {/* <button
                                                            type="button"
                                                            className="btn btn-warning m-10"
                                                            onClick={() => editHandler(invoice.BID)}
                                                        >
                                                            <i className="fa fa-pencil" aria-hidden="true"></i> sửa
                                                        </button> */}
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger m-10"
                                                            onClick={() => deleteHandler(invoice.BID)}
                                                        >
                                                            <i className="fa fa-trash" aria-hidden="true"></i> xóa
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Pagination itemsPerPage={invoicesPerPage} totalItems={invoices.length} paginate={paginate}></Pagination>
                                </>
                            )}
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <button type="button" className="btn btn-primary fr" onClick={() => (history.push(`/`))}>tạo đơn hàng mới</button>
                </div>
            </div>
        </div>
    );
}

export default InvoiceScreen;
