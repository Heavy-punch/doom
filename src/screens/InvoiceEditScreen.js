import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { detailsInvoice, updateInvoice } from '../actions/invoiceActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { INVOICE_UPDATE_RESET } from '../constants/invoiceConstants';

// import { Container } from './styles';

function InvoiceEditScreen(props) {
    const history = useHistory();
    const invoiceId = props.match.params.id;

    const [cusName, setCusName] = useState('');
    const [total, setTotal] = useState('');
    // const [mngID, setMngID] = useState('');

    const invoiceDetails = useSelector((state) => state.invoiceDetails);
    const { loading, error, invoice } = invoiceDetails;

    const invoiceUpdate = useSelector((state) => state.invoiceUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = invoiceUpdate;

    const dispatch = useDispatch();

    // console.log(invoice);

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: INVOICE_UPDATE_RESET });
            props.history.push('/invoices');
        }
        if (!invoice || invoice.BID !== invoiceId) {
            dispatch({ type: INVOICE_UPDATE_RESET });
            dispatch(detailsInvoice(invoiceId));
        }
        dispatch({ type: INVOICE_UPDATE_RESET });
    }, [dispatch, successUpdate, props.history,]);

    useEffect(() => {
        if (!loading) {
            setCusName(invoice.cus_name);
            setTotal(invoice.total);
            // setMngID(invoice.MngID);
        }
    }, [loading,]);


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateInvoice({
                BID: invoiceId,
                cus_name: cusName,
                total,
                // M_ID: mngID,
            })
        );
    };
    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Sửa Đơn Hàng</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">

                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <>
                                    <form onSubmit={submitHandler}>
                                        <div className="form-group">
                                            <label className="form-label">tên khách hàng:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="tên khách hàng"
                                                name="cusName"
                                                value={cusName}
                                                onChange={(e) => setCusName(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" >tổng giá tiền:</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="tổng giá tiền"
                                                name="total"
                                                value={total}
                                                onChange={(e) => setTotal(e.target.value)}
                                            />
                                        </div>
                                        {/* <div className="form-group">
                                            <label className="form-label" >ID nhân viên bán hàng:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="manager's ID"
                                                name="mngID"
                                                value={mngID}
                                                onChange={(e) => setMngID(e.target.value)}
                                            />
                                        </div> */}
                                        <button type="submit" className="btn btn-primary fr">Sửa đơn hàng</button>
                                        <button type="reset" className="btn btn-warning fr mr-3" onClick={() => history.goBack()}>hủy bỏ</button>
                                    </form>
                                </>
                            )}
                </div>
            </div>
        </div>
    );
}

export default InvoiceEditScreen;