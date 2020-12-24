import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listInvoices } from '../actions/invoiceActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// import { Container } from './styles';

function InvoiceScreen() {
    const [isUp, setIsUp] = useState(false);
    const dispatch = useDispatch();
    const invoiceList = useSelector((state) => state.invoiceList);
    const { loading, error, invoices } = invoiceList;
    useEffect(() => {
        dispatch(listInvoices());
    }, [dispatch]);
    console.log(invoices);
    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Đơn Hàng</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row" >
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="input-group">
                        <input
                            type="text"
                            name="search-bar"
                            className="form-control"
                            placeholder="tìm kiếm theo id..."
                        />
                        <span className="input-group-btn">
                            <button
                                type="button"
                                className="btn btn-primary"
                            >
                                <i className="fa fa-search mr-5" aria-hidden="true"></i>
                                        tìm kiếm
                                    </button>
                        </span>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-15">
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
                                                <th>stt</th>
                                                <th>id</th>
                                                <th>tên khách hàng</th>
                                                <th className="flex">
                                                    <span>ngày bán</span>
                                                    <span>
                                                        <button type="button" className="btn btn-primary" onClick={() => { isUp ? setIsUp(false) : setIsUp(true) }}>
                                                            sắp xếp
                                            <span>
                                                                <i className={isUp ? "fa fa-arrow-up ml-3" : "fa fa-arrow-down ml-3"} aria-hidden="true"></i>
                                                            </span>
                                                        </button>
                                                    </span>
                                                </th>
                                                <th>nhân viên thực hiện</th>
                                                <th>thành tiền</th>
                                                <th>thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invoices.map((invoice, index) => (
                                                <tr key={invoice.BID}>
                                                    <td>{index + 1}</td>
                                                    <td>{invoice.BID}</td>
                                                    <td>{invoice.cus_name}</td>
                                                    <td>{invoice.createdAt}</td>
                                                    <td>{invoice.manager.LName + invoice.manager.FName + " - " + invoice.MngID}</td>
                                                    <td>{invoice.total}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-warning m-10">sửa</button>
                                                        <button type="button" className="btn btn-danger m-10">xóa</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )}
                </div>
            </div>
        </div>
    );
}

export default InvoiceScreen;
