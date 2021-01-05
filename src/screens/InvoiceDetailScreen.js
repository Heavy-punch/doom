import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { detailsInvoice } from '../actions/invoiceActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// import { Container } from './styles';

function InvoiceDetailScreen(props) {
    // const history = useHistory();
    const dispatch = useDispatch();
    const invoiceId = props.match.params.id;

    const invoiceDetails = useSelector((state) => state.invoiceDetails);
    const { loading, error, invoice } = invoiceDetails;
    useEffect(() => {
        dispatch(detailsInvoice(invoiceId))
    },
        [dispatch, invoiceId]
    );
    // console.log(invoice);




    return (

        <div className="container-fluid">
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                        <>
                            <div className="row center">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <h2>Đơn hàng - {invoice.BID}</h2>
                                </div>
                            </div>
                            <hr></hr>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => props.history.goBack()}
                            >
                                Quay lại
                            </button>

                            <div className="row center">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <ul style={{ listStyleType: "none" }}>
                                        <li>ngày thực hiện: {invoice.createdAt.slice(0, 10).split("-").reverse().join("-")}</li>
                                        {/* <li>{invoice.createdAt}</li> */}
                                        <li>tên khách hàng: {invoice.cus_name}</li>
                                        <li>nhân viên: {invoice.manager.LName + " " + invoice.manager.FName + " - " + invoice.MngID}</li>
                                        <li>giá trị đơn hàng: {invoice.total}</li>
                                    </ul>
                                </div>
                                <hr />
                                {/* <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2">
                                </div> */}
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th className="col-xs-1 col-sm-1 col-md-1 col-lg-1 center">stt</th>
                                                <th className="col-xs-1 col-sm-1 col-md-1 col-lg-1 center">id sản phẩm</th>
                                                <th className="col-xs-2 col-sm-2 col-md-2 col-lg-2 center">tên sản phẩm </th>
                                                <th className="col-xs-2 col-sm-2 col-md-2 col-lg-2 center">số lượng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invoice.products.map((product, index) => (
                                                <tr key={product.BID}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <Link to={`/products/${product.PID}`}>
                                                            {product.PID}
                                                        </Link>
                                                    </td>
                                                    <td>{product.name}</td>
                                                    <td>{product.ProductOnBill.quantity}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )
            }

        </div>
    );
}

export default InvoiceDetailScreen;












