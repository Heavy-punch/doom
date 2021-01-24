import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listCategories } from '../actions/categoryActions';
import { detailsProduct, updateProduct } from '../actions/productAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_DETAILS_RESET, PRODUCT_UPDATE_RESET } from '../constants/productConstants';

// import { Container } from './styles';

function ProductEditScreen(props) {
    const history = useHistory();
    const productId = props.match.params.id;

    const [image, setImage] = useState([]);
    const [name, setName] = useState('');
    const [barcode, setBarcode] = useState('');
    const [W_curr_qtt, setW_curr_qtt] = useState('');
    const [W_min_qtt, setW_min_qtt] = useState('');
    const [W_max_qtt, setW_max_qtt] = useState('');
    const [S_curr_qtt, setS_curr_qtt] = useState('');
    const [S_max_qtt, setS_max_qtt] = useState('');
    const [S_min_qtt, setS_min_qtt] = useState('');
    const [sell_price, setSell_price] = useState('');
    const [import_price, setImport_price] = useState('');
    const [brand, setBrand] = useState('');
    const [catID, setCatID] = useState('');
    const [qtt_per_unit, setqQtt_per_unit] = useState(1);
    const [vat, setVat] = useState(0);
    const [discountId, setDiscountId] = useState('');
    const [description, setDescription] = useState('description');
    const [otherDetail, setOtherDetail] = useState('otherDetail');
    const [notice_days, setNotice_days] = useState('');


    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const categoryList = useSelector((state) => state.categoryList);
    const { loading: loadingCategory, error: errorCategory, categories } = categoryList;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

    console.log(catID);

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            props.history.push('/products');
        }
        if (!product || product.ShID !== productId) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch(detailsProduct(productId));
        }
        dispatch(listCategories());
        dispatch({ type: PRODUCT_UPDATE_RESET });
    }, [dispatch, successUpdate, props.history,]);

    useEffect(() => {
        if (!loading) {
            setName(product.name);
            product.barcode ? setBarcode(product.barcode) : setBarcode(barcode);
            // product.W_curr_qtt ? setW_curr_qtt(product.W_curr_qtt) : setW_curr_qtt(W_curr_qtt);
            setW_min_qtt(product.W_min_qtt);
            setW_max_qtt(product.W_max_qtt);
            // product.S_curr_qtt ? setS_curr_qtt(product.S_curr_qtt) : setS_curr_qtt(S_curr_qtt);
            setS_max_qtt(product.S_min_qtt);
            setS_min_qtt(product.S_max_qtt);
            setBrand(product.brand);
            setDescription(product.description);
            setOtherDetail(product.otherDetail);
            setCatID(product.categoryId);
            product.discountId ? setDiscountId(product.discountId) : setDiscountId(discountId);
            setSell_price(product.sell_price);
            setVat(product.vat);
            setNotice_days(product.notice_days);
        }
    }, [loading,]);

    const submitHandler = (e) => {
        e.preventDefault();

        let formData = new FormData();
        if (image.length > 0) {
            formData.append('image', image[image.length - 1]);
        }
        formData.append('name', name);
        formData.append('barcode', barcode);
        // formData.append('W_curr_qtt', W_curr_qtt);
        formData.append('W_min_qtt', W_min_qtt);
        formData.append('W_max_qtt', W_max_qtt);
        // formData.append('S_curr_qtt', S_curr_qtt);
        formData.append('S_max_qtt', S_max_qtt);
        formData.append('S_min_qtt', S_min_qtt);
        formData.append('sell_price', sell_price);
        formData.append('import_price', import_price);
        formData.append('brand', brand);
        formData.append('categoryId', catID);
        formData.append('qtt_per_unit', qtt_per_unit);
        formData.append('description', description);
        formData.append('otherDetail', otherDetail);
        // formData.append('discountId', discountId);
        // formData.append('vat', vat);
        formData.append('notice_days', notice_days);

        dispatch(
            updateProduct(
                formData, productId
            )
        );
        // for (var value of formData.values()) {
        //     console.log(value);
        // }
    };

    const onChangeImage = (e) => {
        setImage([...image, e.target.files[0]]);
    };

    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Sửa Sản Phẩm</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">

                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <>
                                    <form onSubmit={submitHandler}>
                                        <div className="form-group">
                                            <label className="form-label">tên sản phẩm:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="tên sản phẩm"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">hình ảnh:</label>
                                            <input
                                                type="file"
                                                className="form-control-file border"
                                                name="image"
                                                onChange={onChangeImage}
                                            />
                                        </div>
                                        {/* <div className="form-group">
                            <label className="form-label">giá nhập SP:</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="giá nhập"
                                value={import_price}
                                onChange={(e) => setImport_price(e.target.value)}
                            />
                        </div> */}
                                        <div className="form-group">
                                            <label className="form-label">giá bán SP:</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="giá bán"
                                                value={sell_price}
                                                onChange={(e) => setSell_price(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">thương hiệu:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="thuong hieu"
                                                value={brand}
                                                onChange={(e) => setBrand(e.target.value)}
                                            />
                                        </div>
                                        {/* <div className="form-group">
                                            <label className="form-label">mã số ngành hàng:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="ID ngành hàng"
                                                value={catID}
                                                onChange={(e) => setCatID(e.target.value)}
                                            />
                                        </div> */}
                                        <div className="form-group">
                                            <label className="form-label">ngành hàng:</label>
                                            {loadingCategory ? (
                                                <LoadingBox></LoadingBox>
                                            ) : errorCategory ? (
                                                <MessageBox variant="danger">{errorCategory}</MessageBox>
                                            ) : (
                                                        <>
                                                            <select
                                                                type="text"
                                                                className="form-control"
                                                                value={catID}
                                                                onChange={(e) => setCatID(e.target.value)}
                                                            >
                                                                <option value=""></option>
                                                                {
                                                                    categories.map((cate, index) => (
                                                                        <option key={cate.CID} value={cate.CID}>{cate.name}</option>
                                                                    ))
                                                                }
                                                            </select>
                                                        </>
                                                    )
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">mô tả :</label>
                                            <textarea
                                                className="form-control"
                                                rows="5"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            >
                                            </textarea>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">mô tả khác:</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                value={otherDetail}
                                                onChange={(e) => setOtherDetail(e.target.value)}
                                            >
                                            </textarea>
                                        </div>
                                        {/* <div className="form-group">
                                            <label className="form-label">số lượng tồn kho hiện tại:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="sơ lượng tồn kho hiện tại"
                                                value={W_curr_qtt}
                                                onChange={(e) => setW_curr_qtt(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">số lượng cửa hàng hiện tại:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="sơ lượng cửa hàng hiện tại"
                                                value={S_curr_qtt}
                                                onChange={(e) => setS_curr_qtt(e.target.value)}
                                            />
                                        </div> */}
                                        <div className="form-group">
                                            <label className="form-label">số lượng điều chỉnh:</label>
                                            <div className="form-group row">
                                                <div className="col-xs-6">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">tồn kho ít nhất</span>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={W_min_qtt}
                                                            onChange={(e) => setW_min_qtt(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xs-6">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">tồn kho nhiều nhất</span>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={W_max_qtt}
                                                            onChange={(e) => setW_max_qtt(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-xs-6">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">cửa hàng ít nhất</span>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={S_min_qtt}
                                                            onChange={(e) => setS_min_qtt(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xs-6">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">cửa hàng nhiều nhất</span>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            value={S_max_qtt}
                                                            onChange={(e) => setS_max_qtt(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="form-group">
                            <label className="form-label">mã số lô hàng:</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="mã số lô hàng"
                                    value={1}
                                    onChange={(e) => setS_max_qtt(e.target.value)}
                                />
                                <div className="input-group-btn">
                                    <button className="btn btn-default" type="button">
                                        <i className="fa fa-plus-circle" aria-hidden="true"></i><span className="ml-3">tạo mới</span>
                                    </button>
                                </div>
                            </div>
                        </div> */}
                                        <div className="form-group">
                                            <label className="form-label">mã vạch:</label>
                                            <div className="input-group">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="mã vạch"
                                                    value={barcode}
                                                    onChange={(e) => setBarcode(e.target.value)}
                                                />
                                                <div className="input-group-btn">
                                                    <button
                                                        className="btn btn-default"
                                                        type="button"
                                                        onClick={() => setBarcode(Math.floor(Math.random() * (10 ** 13)))}
                                                    >
                                                        <i className="fa fa-barcode" aria-hidden="true"></i><span className="ml-3">quét</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">mã giảm giá:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="mã giảm giá"
                                                value={discountId}
                                                onChange={(e) => setDiscountId(e.target.value)}
                                            />
                                        </div>
                                        {/* <div className="form-group">
                                            <label className="form-label">thuế giá trị gia tăng:</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="thuế giá trị gia tăng"
                                                value={vat}
                                                onChange={(e) => setVat(e.target.value)}
                                            />
                                        </div> */}
                                        <div className="form-group">
                                            <label className="form-label">thời hạn thông báo thanh lý:</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="nhập số ngày kích hoạt"
                                                value={notice_days}
                                                onChange={(e) => setNotice_days(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary fr">sửa sản phẩm</button>
                                        <button type="submit" className="btn btn-warning fr mr-3" onClick={() => history.goBack()}>hủy bỏ</button>
                                        {loadingUpdate && <LoadingBox></LoadingBox>}
                                    </form>
                                </>
                            )}
                </div>
            </div>
        </div>
    );
}

export default ProductEditScreen;






