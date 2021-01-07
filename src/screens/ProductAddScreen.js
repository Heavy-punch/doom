import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createProduct } from '../actions/productAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

// import { Container } from './styles';

function ProductAddScreen(props) {
    const history = useHistory();
    const [image, setImage] = useState([]);
    const [name, setName] = useState('');
    const [barcode, setBarcode] = useState('');
    // const [W_curr_qtt, setW_curr_qtt] = useState('');
    const [W_min_qtt, setW_min_qtt] = useState('');
    const [W_max_qtt, setW_max_qtt] = useState('');
    // const [S_curr_qtt, setS_curr_qtt] = useState('');
    const [S_max_qtt, setS_max_qtt] = useState('');
    const [S_min_qtt, setS_min_qtt] = useState('');
    const [sell_price, setSell_price] = useState('');
    // const [import_price, setImport_price] = useState('');
    const [brand, setBrand] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [notice_days, setNotice_days] = useState('');
    const [vat, setVat] = useState(0);
    const [discountId, setDiscountId] = useState('');
    const [description, setDescription] = useState('description');
    const [otherDetail, setOtherDetail] = useState('otherDetail');

    const dispatch = useDispatch();

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
    } = productCreate;

    // console.log(productCreate);

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push('/products');
        }
        dispatch({ type: PRODUCT_CREATE_RESET });
    }, [successCreate, dispatch, props.history]);

    const submitHandler = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('image', image[image.length - 1]);
        formData.append('name', name);
        formData.append('barcode', barcode);
        formData.append('W_min_qtt', W_min_qtt);
        formData.append('W_max_qtt', W_max_qtt);
        formData.append('S_max_qtt', S_max_qtt);
        formData.append('S_min_qtt', S_min_qtt);
        // formData.append('import_price', import_price);
        formData.append('brand', brand);
        // formData.append('qtt_per_unit', qtt_per_unit);
        formData.append('description', description);
        formData.append('otherDetail', otherDetail);
        formData.append('categoryId', categoryId);
        formData.append('vat', vat);
        formData.append('discountId', discountId);
        formData.append('sell_price', sell_price);
        // formData.append('warehouse_curr_qtt', W_curr_qtt);
        // formData.append('store_curr_qtt', S_curr_qtt);
        formData.append('notice_days', notice_days);

        dispatch(
            createProduct(
                formData
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
                    <h2>Thêm Sản Phẩm</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">

                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
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
                        <div className="form-group">
                            <label className="form-label">mã số ngành hàng:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="ID ngành hàng"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            />
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
                            <label className="form-label">số lượng:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="số lượng"
                                value={W_curr_qtt}
                                onChange={(e) => setW_curr_qtt(e.target.value)}
                            />
                        </div> */}
                        <div className="form-group">
                            <label className="form-label">số lượng điều chỉnh:</label>
                            <div className="form-group row">
                                <div className="col-xs-6">
                                    <div className="input-group">
                                        <span className="input-group-addon">tồn kho ít nhất</span>
                                        <input
                                            type="text"
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
                                            type="text"
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
                                            type="text"
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
                                            type="text"
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
                                    type="text"
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
                        <div className="form-group">
                            <label className="form-label">thuế giá trị gia tăng:</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="thuế giá trị gia tăng"
                                value={vat}
                                onChange={(e) => setVat(e.target.value)}
                            />
                        </div>
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
                        <button type="submit" className="btn btn-primary fr">thêm sản phẩm</button>
                        <button type="submit" className="btn btn-warning fr mr-3" onClick={() => history.goBack()}>hủy bỏ</button>
                        {loadingCreate && <LoadingBox></LoadingBox>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProductAddScreen;






