import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listProducts } from '../actions/productAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// import { Container } from './styles';

function ProductScreen() {
    const history = useHistory();
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    // console.log(products);
    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Sản Phẩm</h2>
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
                                <i className="fa fa-search mr-5" aria-hidden="true"></i>
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
                                    {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>stt</th>
                                                <th>id</th>
                                                <th>hình ảnh</th>
                                                <th>tên</th>
                                                <th>ngành hàng</th>
                                                <th>thương hiệu</th>
                                                <th>tồn kho</th>
                                                <th>giá nhập</th>
                                                <th>giá bán</th>
                                                <th>thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((product, index) => (
                                                <tr key={product.PID}>
                                                    <td>{index + 1}</td>
                                                    <td>{product.PID}</td>
                                                    <td><img src={product.img_url} alt={product.name} className="product-img"></img></td>
                                                    <td>{product.name}</td>
                                                    <td>{product.category.name}</td>
                                                    <td>{product.brand}</td>
                                                    <td>{product.W_max_qtt}</td>
                                                    <td>2500</td>
                                                    <td>3000</td>
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
                    <button
                        type="button"
                        className="btn btn-primary fr"
                        onClick={() => (history.push(`/products/add`))}
                    >
                        thêm sản phẩm
                    </button>
                </div>
            </div>

        </div>

    );
}

export default ProductScreen;






