import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createDiscount } from '../actions/discountLabelActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { DISCOUNT_CREATE_RESET } from '../constants/discountLabelConstants';

function DiscountLabelAddScreen(props) {
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [rate, setRate] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');

    const dispatch = useDispatch();

    const discountCreate = useSelector((state) => state.discountCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
    } = discountCreate;

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: DISCOUNT_CREATE_RESET });
            props.history.push('/discounts');
        }
        dispatch({ type: DISCOUNT_CREATE_RESET });
    }, [successCreate, dispatch, props.history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createDiscount({
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
                    <h2>Thêm Nhãn Khuyến Mãi</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">

                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    {loadingCreate && <LoadingBox></LoadingBox>}
                    {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
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
                        <button type="submit" className="btn btn-primary fr">thêm nhãn khuyến mãi</button>
                        <button type="reset" className="btn btn-warning fr mr-3" onClick={() => history.goBack()}>hủy bỏ</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DiscountLabelAddScreen;