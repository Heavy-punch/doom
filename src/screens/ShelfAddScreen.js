import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createShelf } from '../actions/shelfActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { SHELF_CREATE_RESET } from '../constants/shelfConstants';

// import { Container } from './styles';

function ShelfAddScreen(props) {
    const history = useHistory();
    const [name, setName] = useState('');
    const [type, setType] = useState('small');
    const [location, setLocation] = useState('warehouse');
    const [status, setStatus] = useState('available');

    // console.log(type);
    const dispatch = useDispatch();

    const shelfCreate = useSelector((state) => state.shelfCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
    } = shelfCreate;


    useEffect(() => {
        if (successCreate) {
            dispatch({ type: SHELF_CREATE_RESET });
            props.history.push('/shelves');
        }
        dispatch({ type: SHELF_CREATE_RESET });
    }, [successCreate, dispatch, props.history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createShelf({
                name,
                type,
                location,
                state: status,
            })
        );
    };
    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Thêm Kệ Hàng</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">

                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    {loadingCreate && <LoadingBox></LoadingBox>}
                    {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
                    {/* {successCreate && <MessageBox >thêm thành công</MessageBox>} */}
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label className="form-label">tên kệ hàng:</label>
                            <input
                                type="text"
                                className="form-control"
                                // placeholder="tên kệ hàng"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" >kiểu kệ hàng:</label>
                            <select
                                type="text"
                                className="form-control"
                                name="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="small">nhỏ</option>
                                <option value="medium">vừa</option>
                                <option value="large">lớn</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label" >vị trí đặt:</label>
                            <select
                                type="text"
                                className="form-control"
                                name="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                <option value="warehouse">kho</option>
                                <option value="store">cửa hàng</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label" >trạng thái:</label>
                            <select
                                type="text"
                                className="form-control"
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="available">còn trống</option>
                                <option value="full">đầy</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary fr">Thêm kệ hàng</button>
                        <button type="reset" className="btn btn-warning fr mr-3" onClick={() => history.goBack()}>hủy bỏ</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ShelfAddScreen;