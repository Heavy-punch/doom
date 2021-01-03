import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { detailsProduct } from '../actions/productAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// import { Container } from './styles';

function ProductDetailScreen(props) {
    // const history = useHistory();
    const dispatch = useDispatch();
    const productId = props.match.params.id;

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    useEffect(() => {
        dispatch(detailsProduct(productId))
    },
        [dispatch, productId]
    );
    // console.log(product);




    return (

        <div className="container-fluid">
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                        <>
                            <div className="row center">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <h2>{product.name}</h2>
                                </div>
                            </div>
                            <hr></hr>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => props.history.goBack()}
                            >
                                Quay lại
                            </button>

                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2">
                                    <img src={product.img_url} alt={product.name} className="product-img large"></img>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                                    <ul style={{ listStyleType: "none", lineHeight: "2rem" }}>
                                        <li>
                                            {product.description}
                                        </li>
                                        <br></br>
                                        <li>
                                            {product.otherDetail}
                                        </li>
                                    </ul>
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-hover">
                                            <tbody>
                                                <tr>
                                                    <td className="col-md-3">mã số SP:</td>
                                                    <td className="col-md-8">{product.PID}</td>
                                                </tr>
                                                <tr>
                                                    <td>tên sản phẩm:</td>
                                                    <td>{product.name}</td>
                                                </tr>
                                                <tr>
                                                    <td> mã vạch:</td>
                                                    <td>{product.barcode}</td>
                                                </tr>
                                                <tr>
                                                    <td>số lượng tồn kho tối đa dự kiến:</td>
                                                    <td>{product.W_max_qtt}</td>
                                                </tr>
                                                <tr>
                                                    <td>số lượng tồn kho tối thiểu dự kiến:</td>
                                                    <td>{product.W_min_qtt}</td>
                                                </tr>
                                                <tr>
                                                    <td>số lượng tồn kho hiện tại:</td>
                                                    <td>{product.warehouse_curr_qtt}</td>
                                                </tr>
                                                <tr>
                                                    <td>số lượng cửa hàng tối đa dự kiến:</td>
                                                    <td>{product.W_max_qtt}</td>
                                                </tr>
                                                <tr>
                                                    <td>số lượng cửa hàng tối thiểu dự kiến:</td>
                                                    <td>{product.W_min_qtt}</td>
                                                </tr>
                                                <tr>
                                                    <td>số lượng cửa hàng hiện tại:</td>
                                                    <td>{product.warehouse_curr_qtt}</td>
                                                </tr>
                                                <tr>
                                                    <td>giá bán sản phẩm:</td>
                                                    <td>{product.sell_price}</td>
                                                </tr>
                                                <tr>
                                                    <td>đơn vị tính:</td>
                                                    <td>{product.unit_name}</td>
                                                </tr>
                                                <tr>
                                                    <td>thuế giá trị gia tăng:</td>
                                                    <td>{product.vat}</td>
                                                </tr>
                                                <tr>
                                                    <td>thương hiệu:</td>
                                                    <td>{product.brand}</td>
                                                </tr>
                                                <tr>
                                                    <td>ngành hàng:</td>
                                                    <td>{product.category.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>giảm giá:</td>
                                                    <td>{product.discount ? product.discount.rate : 0}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                    {product.lots ? (
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th className="col-md-1">lotID</th>
                                                    <th className="col-md-4">ngày hết hạn</th>
                                                    <th className="col-md-3">SL trong kho</th>
                                                    <th className="col-md-3">SL cửa hàng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {product.lots.map((lot, index) => (
                                                    <tr key={lot.lotId}>
                                                        <td >{lot.lotId}</td>
                                                        <td >{new Date(lot.expires).toISOString().slice(0, 10)}</td>
                                                        <td >{lot.qttLotInWarehouse}</td>
                                                        <td >{lot.qttProductInStore}</td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                    ) : (
                                            <br></br>)}
                                </div>
                            </div>
                        </>
                    )
            }

        </div >
    );
}

export default ProductDetailScreen;












