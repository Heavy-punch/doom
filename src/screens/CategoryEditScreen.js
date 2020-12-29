import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createCategory, detailsCategory, updateCategory } from '../actions/categoryActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CATEGORY_CREATE_RESET, CATEGORY_UPDATE_RESET } from '../constants/categoryConstants';

// import { Container } from './styles';

function CategoryAddScreen(props) {
    const history = useHistory();
    const categoryId = props.match.params.id;

    const [name, setName] = useState('');
    const [image, setImage] = useState([]);
    const [shelfIds, setShelfIds] = useState('');

    const categoryDetails = useSelector((state) => state.categoryDetails);
    const { loading, error, category } = categoryDetails;

    const categoryUpdate = useSelector((state) => state.categoryUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = categoryUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successUpdate) {
            props.history.push('/categories');
        }
        if (!category || category.ShID !== categoryId) {
            dispatch({ type: CATEGORY_UPDATE_RESET });
            dispatch(detailsCategory(categoryId));
        }
    }, [dispatch, successUpdate, props.history,]);

    useEffect(() => {
        if (!loading) {
            var arr = '';
            for (let i = 0; i < category.shelves.length; i++) {
                // arr.push(parseInt(category.shelves[i], 10));
                if (i === category.shelves.length - 1) {
                    arr += category.shelves[i].ShID;
                }
                else {
                    arr += category.shelves[i].ShID + " ";
                }
            }
            setName(category.name);
            setShelfIds(arr);
        }
    }, [loading,]);

    const submitHandler = (e) => {
        e.preventDefault();
        let shelfArray = (shelfIds.trim()).split(" ");
        let array = shelfArray.map((item) => parseInt(item, 10));
        // console.log(array);

        let formData = new FormData();
        formData.append('name', name);
        if (image.length > 0) {
            formData.append('image', image[0]);
        }
        // formData.append('shelfIds', array);
        array.forEach(id => formData.append('shelfIds', id));

        dispatch(
            updateCategory(
                formData,
                categoryId
            )
        );
    };

    const onChangeImage = (e) => {
        setImage([...image, e.target.files[0]]);
    };

    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Sửa Ngành Hàng</h2>
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
                                            <label className="form-label">tên ngành hàng:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="tên ngành hàng"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" >hình ảnh:</label>
                                            <input
                                                type="file"
                                                className="form-control-file border"
                                                name="image"
                                                onChange={onChangeImage}
                                            // onChange={(e) => setImage(e.target.files[0])}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" >danh sách kệ hàng:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="danh sách kệ hàng"
                                                value={shelfIds}
                                                onChange={(e) => setShelfIds(e.target.value)}
                                            />
                                            <small id="emailHelp" className="form-text text-muted">ID cách nhau một khoảng trống</small>
                                        </div>

                                        <button type="submit" className="btn btn-primary fr">sửa ngành hàng</button>
                                        <button type="reset" className="btn btn-warning fr mr-3" onClick={() => history.goBack()}>hủy bỏ</button>
                                    </form>
                                </>
                            )}

                </div>
            </div>
        </div>
    );
}

export default CategoryAddScreen;