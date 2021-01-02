import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createImport } from '../actions/importActions';
import { listProducts } from '../actions/productAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Pagination from '../components/Pagination';

import { IMPORT_CREATE_RESET } from '../constants/importConstants';
import { PRODUCT_LIST_REQUEST } from '../constants/productConstants';

// import { Container } from './styles';

function ImportAddScreen(props) {
    const history = useHistory();
    const [keyword, setKeyword] = useState('');
    const [cart, setCart] = useState([]);
    const [urgent_level, setUrgent_level] = useState('normal');
    const [bonus, setBonus] = useState('');

    const getCurrentDate = () => { let date = new Date(); return date };


    // console.log(type);
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const importCreate = useSelector((state) => state.importCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
    } = importCreate;

    // console.log(importCreate);

    useEffect(() => {
        // dispatch(listProducts());
        dispatch({ type: PRODUCT_LIST_REQUEST });
    }, []);

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: IMPORT_CREATE_RESET });
            props.history.push('/imports');
        }
        dispatch({ type: IMPORT_CREATE_RESET });
    }, [successCreate, dispatch, props.history]);

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products !== undefined ? products.slice(indexOfFirstProduct, indexOfLastProduct) : [];

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const onSearchHandler = (e) => {
        e.preventDefault();
        dispatch(listProducts(keyword));
        setKeyword('');
        // setName(null);
    };

    const addToCart = (product, quantity) => {
        var index = findProductInCart([...cart], product);
        if (index === -1) {
            console.log("can't find");
            let newArr = [...cart];
            newArr.push({ product, qty: quantity });
            setCart(newArr);
        }
        else {
            console.log("finded");
            let newArr = [...cart];
            newArr[index].qty += quantity;
            setCart(newArr);
        }
    };

    const findProductInCart = (fcart, fproduct) => {
        var index = -1;
        if (fcart.length > 0) {
            for (let i = 0; i < fcart.length; i++) {
                if (fcart[i].product.PID === fproduct.PID) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };

    const deleteHandler = (index) => {
        console.log("delete");
        let newArr = [...cart];
        newArr.splice(index, 1);
        setCart(newArr);
        // console.log(newArr);
    };

    const onChangeQty = (event, index) => {
        console.log("change qty");
        let newArr = [...cart];
        newArr[index].qty = parseInt(event.target.value, 10);
        setCart(newArr);
    };

    const subQty = (index) => {
        console.log("sub 1 qty");
        let newArr = [...cart];
        newArr[index].qty -= 1;
        setCart(newArr);
    };

    const addQty = (index) => {
        console.log("add 1 qty");
        let newArr = [...cart];
        newArr[index].qty += 1;
        setCart(newArr);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        let importProducts = [];
        cart.forEach(item => importProducts.push({ productId: item.product.PID, request_total_unit: item.qty }));
        dispatch(
            createImport({
                urgent_level,
                bonus,
                importProducts,
            })
        );
    };

    // console.log(cart);


    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Thêm Đơn Nhập Hàng</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                    <form onSubmit={onSearchHandler}>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="text"
                                name="search-bar"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <span className="input-group-btn">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    <i className="fa fa-search mr-3" aria-hidden="true"></i>
                                tìm kiếm
                            </button>
                            </span>
                        </div>
                    </form>
                    {loading ? (
                        <hr></hr>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <>
                                    {products.length === 0 && <MessageBox>No product Found</MessageBox>}
                                    <table className="table table-bordered table-hover mt15">
                                        <thead>
                                            <tr>
                                                <th className="col-xs-1 col-md-1">id</th>
                                                <th className="col-xs-2 col-md-2">ảnh</th>
                                                <th className="col-xs-4 col-md-4">tên</th>
                                                <th className="col-xs-3 col-md-3">giá bán</th>
                                                <th className="col-xs-2 col-md-2">thêm</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentProducts.map((product, index) => (
                                                <tr key={product.PID}>
                                                    <td>{product.PID}</td>
                                                    <td><img src={product.img_url} alt={product.name} className="product-img"></img></td>
                                                    <td>{product.name}</td>
                                                    <td>{product.sell_price}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            onClick={() => addToCart(product, 1)}
                                                        >
                                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {products.length > productsPerPage ? <Pagination itemsPerPage={productsPerPage} totalItems={products.length} paginate={paginate}></Pagination> : <br></br>}
                                </>
                            )}
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label className="form-label" >độ ưu tiên:</label>
                            <select
                                type="text"
                                className="form-control"
                                name="status"
                                value={urgent_level}
                                onChange={(e) => setUrgent_level(e.target.value)}
                            >
                                <option value="normal">bình thường</option>
                                <option value="prior">ưu tiên</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">ghi chú:</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="ghi chú"
                                value={bonus}
                                onChange={(e) => setBonus(e.target.value)}
                            >
                            </textarea>
                        </div>

                        <table className="table table-hover mt15">
                            <thead>
                                <tr>
                                    <th className="col-md-1">stt</th>
                                    <th className="col-md-2">tên sp</th>
                                    <th className="col-md-2">số lượng</th>
                                    {/* <th className="col-md-2">đơn giá</th>
                                    <th className="col-md-2">giảm giá</th>
                                    <th className="col-md-2">thành tiền</th> */}
                                    <th className="col-md-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((cartItem, index) => (
                                    <tr key={cartItem.product.PID}>
                                        <td>{index + 1}</td>
                                        <td>{cartItem.product.name}</td>
                                        <td>
                                            <div className="quantity">
                                                <button
                                                    className="minus-btn"
                                                    type="button"
                                                    disabled={cartItem.qty < 2}
                                                    onClick={() => subQty(index)}
                                                >
                                                    <i className="fa fa-minus" aria-hidden="true"></i>
                                                </button>
                                                <input
                                                    type="number"
                                                    value={cartItem.qty}
                                                    onChange={(e) => onChangeQty(e, index)}
                                                />
                                                <button
                                                    className="plus-btn"
                                                    type="button"
                                                    disabled={cartItem.qty > cartItem.product.W_max_qtt - 1 - cartItem.product.warehouse_curr_qtt}
                                                    onClick={() => addQty(index)}
                                                >
                                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-danger m-10"
                                                onClick={() => deleteHandler(index)}
                                            >
                                                <i className="fa fa-trash" aria-hidden="true"></i> xóa
                                                        </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button type="submit" className="btn btn-primary fr">Thêm đơn nhập hàng</button>
                        <button type="reset" className="btn btn-warning fr mr-3" onClick={() => history.goBack()}>hủy bỏ</button>
                        {loadingCreate && <LoadingBox></LoadingBox>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ImportAddScreen;