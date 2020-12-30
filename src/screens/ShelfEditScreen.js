import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { detailsShelf, updateShelf } from '../actions/shelfActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { SHELF_UPDATE_RESET } from '../constants/shelfConstants';

// import { Container } from './styles';

function ShelfEditScreen(props) {
    const history = useHistory();
    const shelfId = props.match.params.id;

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');

    const shelfDetails = useSelector((state) => state.shelfDetails);
    const { loading, error, shelf } = shelfDetails;

    const shelfUpdate = useSelector((state) => state.shelfUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = shelfUpdate;

    const dispatch = useDispatch();

    // console.log(shelf);

    useEffect(() => {
        if (successUpdate) {
            props.history.push('/shelves');
        }
        if (!shelf || shelf.ShID !== shelfId) {
            dispatch({ type: SHELF_UPDATE_RESET });
            dispatch(detailsShelf(shelfId));
        }
    }, [dispatch, successUpdate, props.history,]);

    useEffect(() => {
        if (!loading) {
            setName(shelf.name);
            setType(shelf.type);
            setLocation(shelf.location);
            setStatus(shelf.state);
        }
    }, [loading,]);


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateShelf({
                ShID: shelfId,
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
                    <h2>Sửa Kệ Hàng</h2>
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
                                            <label className="form-label">tên kệ hàng:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="tên kệ hàng"
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
                                        <button type="submit" className="btn btn-primary fr">Sửa kệ hàng</button>
                                        <button type="reset" className="btn btn-warning fr mr-3" onClick={() => history.goBack()}>hủy bỏ</button>
                                    </form>
                                </>
                            )}
                </div>
            </div>
        </div>
    );
}

export default ShelfEditScreen;