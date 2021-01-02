import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createCategory } from '../actions/categoryActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CATEGORY_CREATE_RESET } from '../constants/categoryConstants';

// import { Container } from './styles';

function CategoryAddScreen(props) {
    const history = useHistory();
    const [name, setName] = useState('');
    const [image, setImage] = useState([]);
    const [shelfIds, setShelfIds] = useState('');

    const dispatch = useDispatch();

    const categoryCreate = useSelector((state) => state.categoryCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
    } = categoryCreate;

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: CATEGORY_CREATE_RESET });
            props.history.push('/categories');
        }
        dispatch({ type: CATEGORY_CREATE_RESET });
    }, [successCreate, dispatch, props.history]);

    const submitHandler = (e) => {
        e.preventDefault();
        let shelfArray = (shelfIds.trim()).split(" ");
        let array = shelfArray.map((item) => parseInt(item, 10));
        // console.log(array);

        let formData = new FormData();
        formData.append('name', name);
        formData.append('image', image[image.length - 1]);
        // formData.append('shelfIds', array);

        array.forEach(id => formData.append('shelfIds', id));

        // console.log(formData.get('name'));
        // for (var value of formData.values()) {
        //     console.log(value);
        // }

        dispatch(
            // createCategory({
            //     name: name,
            //     image: image[0],
            //     shelfIds: array,
            // })
            createCategory(
                formData
            )
        );

    };

    const onChangeImage = (e) => {
        // console.log('image: ', image);
        setImage([...image, e.target.files[0]]);
        // setImage(e.target.files[0]);
        // console.log('image: ', image);
        // console.log(image);
    };

    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Thêm Ngành Hàng</h2>
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
                            <label className="form-label">tên ngành hàng:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="tên ngành hàng"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {/* <div className="form-group">
                            <label className="form-label">hình ảnh:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="địa chỉ ảnh"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div> */}
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

                        <button type="submit" className="btn btn-primary fr">thêm ngành hàng</button>
                        <button type="reset" className="btn btn-warning fr mr-3" onClick={() => history.goBack()}>hủy bỏ</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CategoryAddScreen;