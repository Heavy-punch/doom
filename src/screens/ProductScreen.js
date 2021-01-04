import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { deleteProduct, listProducts } from '../actions/productAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Pagination from '../components/Pagination';
import { PRODUCT_DELETE_RESET } from '../constants/productConstants';

// import { Container } from './styles';

function ProductScreen(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const [sortName, setSortName] = useState('ASC');
    const [isUp, setIsUp] = useState(false);

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;


    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;

    useEffect(() => {
        if (successDelete) {
            dispatch({ type: PRODUCT_DELETE_RESET });
        }
        dispatch(listProducts({ sortByName: sortName }));
    }, [dispatch, successDelete, sortName]);

    useEffect(() => {
        if (!loading) {
            setResult([...products]);
        }
    }, [loading,]);

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;


    const [result, setResult] = useState([]);
    // products !== undefined ? setResult([...products]) : setResult([]);
    // console.log(result);


    const currentProducts = result.slice(indexOfFirstProduct, indexOfLastProduct);
    // const currentProducts = products !== undefined ? products.slice(indexOfFirstProduct, indexOfLastProduct) : [];
    // var a = "tao là Nguyên thích Luyên thuyên";
    // console.log(removeVietnameseTones(a.toLowerCase()));





    // console.log(currentProducts);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const deleteHandler = (delItem) => {
        if (window.confirm('Are you sure to delete?')) {
            var delList = [];
            delList.push(delItem);
            dispatch(deleteProduct(delList));
            // console.log(delList);
        }
    };

    const editHandler = (editItem) => {
        props.history.push(`/products/${editItem}/edit`)
    };

    const onSearchHandler = (e) => {
        e.preventDefault();
        var searchList = [...products].filter((item) => removeVietnameseTones(item.name.toLowerCase()).indexOf(keyword) !== -1);
        setResult(searchList);
        setKeyword('');
    };

    const onSort = () => {
        if (isUp) {
            setIsUp(false);
            setSortName('ASC');
        }
        else {
            setIsUp(true);
            setSortName('DESC');
        }
    }

    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Sản Phẩm</h2>
                </div>
            </div>
            <hr></hr>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            <div className="row" >
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                            <>
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <form onSubmit={onSearchHandler}>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                name="search-bar"
                                                className="form-control"
                                                value={keyword}
                                                onChange={(e) => setKeyword(e.target.value.toLowerCase())}
                                            />
                                            <span className="input-group-btn">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                >
                                                    <i className="fa fa-search mr-5" aria-hidden="true"></i>
                                        tìm kiếm
                                    </button>
                                            </span>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-15">
                                    {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th className="col-sm-1 col-md-1 col-lg-1">stt</th>
                                                <th className="col-sm-1 col-md-1 col-lg-1">id</th>
                                                <th className="col-sm-1 col-md-1 col-lg-1">hình ảnh</th>
                                                <th className="col-sm-1 col-md-2 col-lg-2">
                                                    <span>tên</span>
                                                    <span>
                                                        <button type="button" className="btn btn-primary fr" onClick={onSort}>
                                                            <span>
                                                                <i className={isUp ? "fa fa-arrow-up ml-3" : "fa fa-arrow-down ml-3"} aria-hidden="true"></i>
                                                            </span>
                                                        </button>
                                                    </span>
                                                </th>
                                                <th className="col-sm-1 col-md-1 col-lg-1">ngành hàng</th>
                                                <th className="col-sm-1 col-md-1 col-lg-1">thương hiệu</th>
                                                <th className="col-sm-1 col-md-1 col-lg-1">tồn kho</th>
                                                <th className="col-sm-1 col-md-1 col-lg-1">cửa hàng</th>
                                                {/* <th>giá nhập</th> */}
                                                <th className="col-sm-1 col-md-1 col-lg-1">giá bán</th>
                                                <th className="col-sm-1 col-md-2 col-lg-2">thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentProducts.map((product, index) => (
                                                <tr key={product.PID}>
                                                    <td>{index + 1}</td>
                                                    <td>{product.PID}</td>
                                                    <td>
                                                        <Link to={`/products/${product.PID}`}>
                                                            <img src={product.img_url} alt={product.name} className="product-img"></img>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link to={`/products/${product.PID}`}>
                                                            {product.name}
                                                        </Link>

                                                    </td>
                                                    <td>{product.category.name}</td>
                                                    <td>{product.brand}</td>
                                                    <td>{product.warehouse_curr_qtt}</td>
                                                    <td>{product.store_curr_qtt}</td>
                                                    {/* <td>null</td> */}
                                                    <td>{product.sell_price}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-warning m-10"
                                                            onClick={() => editHandler(product.PID)}
                                                        >
                                                            <i className="fa fa-pencil" aria-hidden="true"></i> sửa
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger m-10"
                                                            onClick={() => deleteHandler(product.PID)}
                                                        >
                                                            <i className="fa fa-trash" aria-hidden="true"></i> xóa
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {/* <Pagination itemsPerPage={productsPerPage} totalItems={products.length} paginate={paginate}></Pagination> */}
                                    <Pagination itemsPerPage={productsPerPage} totalItems={result.length} paginate={paginate}></Pagination>
                                </div>
                            </>
                        )}

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
    function removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g, " ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        return str;
    }
}

export default ProductScreen;






// {products.length > productsPerPage ? <Pagination itemsPerPage={productsPerPage} totalItems={products.length} paginate={paginate}></Pagination> : ""}