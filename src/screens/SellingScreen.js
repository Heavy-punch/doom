import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productAction';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import Pagination from '../components/Pagination';
// import AdjustQuantity from '../components/AdjustQuantity';
import { createInvoice } from '../actions/invoiceActions';
import { INVOICE_CREATE_RESET } from '../constants/invoiceConstants';
import { PRODUCT_LIST_REQUEST } from '../constants/productConstants';

function SellingScreen(props) {
    const [name, setName] = useState('');
    const [cusName, setCusName] = useState('');
    const [cart, setCart] = useState([]);

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const getCurrentDate = () => { let date = new Date(); return date };
    // console.log(userInfo);
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        // dispatch(listProducts());
        dispatch({ type: PRODUCT_LIST_REQUEST });
    }, []);

    const invoiceCreate = useSelector((state) => state.invoiceCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
    } = invoiceCreate;

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: INVOICE_CREATE_RESET });
            setCart([]);
            setCusName('');
        }
    }, [successCreate, dispatch,]);

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
        dispatch(listProducts(name));
        setName('');
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
    // console.log(cart);

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

    const totalFunc = (a, b) => {
        if (b.product.discount !== null) {
            return a + b.product.sell_price * ((100 - b.product.discount.rate) / 100) * b.qty;
        }
        return a + b.product.sell_price * b.qty;
    };

    var total = cart.reduce(totalFunc, 0);

    const submitInvoice = (e) => {
        e.preventDefault();
        let sellProducts = [];
        cart.forEach(item => sellProducts.push({ PID: item.product.PID, quantity: item.qty }));
        dispatch(
            createInvoice({
                cus_name: cusName ? cusName : "anonymous",
                total,
                sellProducts,
            })
        );
    };

    // const submitInvoice = (e) => {
    //     e.preventDefault();
    // };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-5 col-lg-4">
                    <form onSubmit={onSearchHandler}>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="text"
                                name="search-bar"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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

                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-7">
                    <form onSubmit={submitInvoice}>
                        <div className="invoice">
                            <div className="invoice-info">
                                <h1>Hóa Đơn</h1>
                                <p className="invoice-date">Ngày: {getCurrentDate().toDateString()}</p>
                                <p className="invoice-mng">Nhân viên bán hàng: {userInfo.FName + " " + userInfo.LName + " - " + userInfo.MngID}</p>

                                <div className="form-group mg-0 cus-name">
                                    <label className="col-sm-2 form-label pd-0">tên khách hàng:</label>
                                    <input
                                        type="text"
                                        className="form-control col-sm-10"
                                        value={cusName}
                                        onChange={(e) => setCusName(e.target.value)}
                                    />
                                </div>
                                <hr />
                            </div>
                            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
                            <div className="invoice-detail">
                                <table className="table table-hover mt15">
                                    <thead>
                                        <tr>
                                            <th className="col-md-1">stt</th>
                                            <th className="col-md-2">tên sp</th>
                                            <th className="col-md-2">số lượng</th>
                                            <th className="col-md-2">đơn giá</th>
                                            <th className="col-md-2">giảm giá</th>
                                            <th className="col-md-2">thành tiền</th>
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
                                                            onClick={() => addQty(index)}
                                                        >
                                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                                {/* <td><AdjustQuantity qty={cartItem.qty}></AdjustQuantity></td> */}
                                                <td>{cartItem.product.sell_price} vnd</td>
                                                {/* <td>{cartItem.product.end_date}</td> */}
                                                <td>{cartItem.product.discount ? cartItem.product.discount.rate : 0}% </td>
                                                <td>{cartItem.product.discount ? cartItem.product.sell_price * (1 - cartItem.product.discount.rate / 100) * cartItem.qty : cartItem.product.sell_price * cartItem.qty} vnd</td>
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
                                <hr />
                                <div className="total">
                                    <p className="total-raw">
                                        {/* <b>tong cong: {cart.reduce(totalFunc, 0)}</b> */}
                                        <b>tổng cộng: {total}</b> vnd
                                    </p>
                                    <hr />
                                    <button
                                        type="reset"
                                        className="btn btn-warning mr-3"
                                        onClick={() => setCart([])}
                                    >
                                        hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                    >
                                        tạo đơn hàng
                                    </button>
                                    {loadingCreate && <LoadingBox></LoadingBox>}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SellingScreen;



