import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { detailsDiscount, updateDiscount } from '../actions/discountLabelActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { DISCOUNT_UPDATE_RESET } from '../constants/discountLabelConstants';

function DiscountLabelAddScreen(props) {
    const history = useHistory();
    const discountId = props.match.params.id;

    const [title, setTitle] = useState('');
    const [rate, setRate] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');

    const discountDetails = useSelector((state) => state.discountDetails);
    const { loading, error, discount } = discountDetails;

    const discountUpdate = useSelector((state) => state.discountUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = discountUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: DISCOUNT_UPDATE_RESET });
            props.history.push('/discounts');
        }
        if (!discount || discount.ShID !== discountId) {
            dispatch({ type: DISCOUNT_UPDATE_RESET });
            dispatch(detailsDiscount(discountId));
        }
        dispatch({ type: DISCOUNT_UPDATE_RESET });
    }, [dispatch, successUpdate, props.history,]);

    useEffect(() => {
        if (!loading) {
            setTitle(discount.title);
            setRate(discount.rate);
            setDescription(discount.description);
            setStart_date(discount.start_date);
            setEnd_date(discount.end_date);
        }
    }, [loading,]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateDiscount({
                discountId: discountId,
                title,
                rate,
                description,
                start_date,
                end_date
            })
        );
    };

    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Sửa Nhãn Khuyến Mãi</h2>
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
                                            <label className="form-label">tên sự kiện:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="tên sự kiện"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">mức độ giảm:</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="mức độ giảm giá"
                                                value={rate}
                                                onChange={(e) => setRate(e.target.value)}
                                            />

                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">mô tả :</label>
                                            <textarea
                                                className="form-control"
                                                rows="5"
                                                id="des"
                                                placeholder="mô tả"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            >
                                            </textarea>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-xs-6">
                                                <label className="form-label" >ngày bắt đầu:</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    value={start_date}
                                                    onChange={(e) => setStart_date(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-xs-6">
                                                <label className="form-label" >ngày kết thúc:</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    value={end_date}
                                                    onChange={(e) => setEnd_date(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary fr">sửa nhãn khuyến mãi</button>
                                        <button type="reset" className="btn btn-warning fr mr-3" onClick={() => history.goBack()}>hủy bỏ</button>
                                    </form>
                                </>
                            )}

                </div>
            </div>
        </div>
    );
}

export default DiscountLabelAddScreen;