import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listCategories } from '../actions/categoryActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// import { Container } from './styles';

function CategoryScreen() {
    const history = useHistory();
    const dispatch = useDispatch();
    const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories } = categoryList;
    useEffect(() => {
        dispatch(listCategories());
    }, [dispatch]);
    // console.log(categoryList);
    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Ngành Hàng</h2>
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
                        />
                        <span className="input-group-btn">
                            <button
                                type="button"
                                className="btn btn-primary"
                            >
                                <i className="fa fa-search mr-3" aria-hidden="true"></i>
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
                                    {categories.length === 0 && <MessageBox>No Category Found</MessageBox>}
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>stt</th>
                                                <th>id</th>
                                                <th>hình ảnh</th>
                                                <th>tên</th>
                                                <th>danh sách kệ hàng</th>
                                                <th>thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories.map((category, index) => (
                                                <tr key={category.CID}>
                                                    <td>{index + 1}</td>
                                                    <td>{category.CID}</td>
                                                    <td><img src={category.img_url} alt={category.name} className="cat-img"></img></td>
                                                    <td>{category.name}</td>
                                                    <td>
                                                        <ul>{category.shelves.map((shelf, index) => (
                                                            <li key={shelf.ShID}>{shelf.ShID}</li>
                                                        ))}</ul>
                                                    </td>
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
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <button type="button" className="btn btn-primary fr" onClick={() => (history.push(`/categories/add`))}>thêm ngành hàng</button>
                </div>
            </div>

        </div>
    );
}

export default CategoryScreen;