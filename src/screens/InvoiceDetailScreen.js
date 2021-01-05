import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
                                    <h2>{invoice.name}</h2>
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

                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2">
                                    <img src={invoice.img_url} alt={invoice.name} className="invoice-img large"></img>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                                    <ul style={{ listStyleType: "none", lineHeight: "2rem" }}>
                                        <li>
                                            {invoice.description}
                                        </li>
                                        <br></br>
                                        <li>
                                            {invoice.otherDetail}
                                        </li>
                                    </ul>
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-hover">
                                            <tbody>
                                                <tr>
                                                    <td className="col-md-3">mã số SP:</td>
                                                    <td className="col-md-8">{invoice.PID}</td>
                                                </tr>
                                                <tr>
                                                    <td>tên sản phẩm:</td>
                                                    <td>{invoice.name}</td>
                                                </tr>
                                                <tr>
                                                    <td> mã vạch:</td>
                                                    <td>{invoice.barcode}</td>
                                                </tr>
                                                <tr>
                                                    <td>số lượng tồn kho tối đa dự kiến:</td>
                                                    <td>{invoice.W_max_qtt}</td>
                                                </tr>
                                                <tr>
                                                    <td>số lượng tồn kho tối thiểu dự kiến:</td>
                                                    <td>{invoice.W_min_qtt}</td>
                                                </tr>
                                                <tr>
                                                    <td>số lượng tồn kho hiện tại:</td>
                                                    <td>{invoice.warehouse_curr_qtt}</td>
                                                </tr>
                                                <tr>
                                                    <td>số lượng cửa hàng tối đa dự kiến:</td>
                                                    <td>{invoice.S_max_qtt}</td>
                                                </tr>
                                                <tr>
                                                    <td>số lượng cửa hàng tối thiểu dự kiến:</td>
                                                    <td>{invoice.S_min_qtt}</td>
                                                </tr>
                                                <tr>
                                                    <td>số lượng cửa hàng hiện tại:</td>
                                                    <td>{invoice.store_curr_qtt}</td>
                                                </tr>
                                                <tr>
                                                    <td>giá bán sản phẩm:</td>
                                                    <td>{invoice.sell_price}</td>
                                                </tr>
                                                <tr>
                                                    <td>đơn vị tính:</td>
                                                    <td>{invoice.unit_name}</td>
                                                </tr>
                                                <tr>
                                                    <td>thuế giá trị gia tăng:</td>
                                                    <td>{invoice.vat}</td>
                                                </tr>
                                                <tr>
                                                    <td>thương hiệu:</td>
                                                    <td>{invoice.brand}</td>
                                                </tr>
                                                <tr>
                                                    <td>ngành hàng:</td>
                                                    <td>{invoice.category.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>giảm giá:</td>
                                                    <td>{invoice.discount ? invoice.discount.rate : 0}</td>
                                                </tr>
                                                <tr>
                                                    <td>thời hạn thông báo thanh lý:</td>
                                                    <td>{invoice.notice_days} ngày</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                    {invoice.lots ? (
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th className="col-md-1">lotID</th>
                                                    <th className="col-md-4">ngày hết hạn</th>
                                                    <th className="col-md-3">SL trong kho</th>
                                                    <th className="col-md-3">SL cửa hàng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {invoice.lots.map((lot, index) => (
                                                    <tr key={lot.lotId}>
                                                        <td >{lot.lotId}</td>
                                                        <td >{new Date(lot.expires).toISOString().slice(0, 10)}</td>
                                                        <td >{lot.qttLotInWarehouse}</td>
                                                        <td >{lot.qttInvoiceInStore}</td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    ) : (
                                            <br></br>)}
                                </div>
                            </div>
                        </>
                    )
            }

        </div>
    );
}

export default InvoiceDetailScreen;












