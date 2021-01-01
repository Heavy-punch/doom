import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { detailsProduct } from '../actions/productAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// import { Container } from './styles';

function ProductDetailScreen(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const productId = props.match.params.id;

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    useEffect(() => {
        dispatch(detailsProduct(productId))
    }
        ,
        [dispatch, productId]
    );





    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                        <>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => props.history.goBack()}
                            >
                                Quay lại
                            </button>
                            <ul>
                                <li>
                                    {product.PID}
                                </li>
                                <li>
                                    {product.name}
                                </li>
                                <li>
                                    {product.description}
                                </li>
                                <li>
                                    {product.otherDetail}
                                </li>
                                <li>
                                    {product.barcode}
                                </li>
                                <li>
                                    {product.img_url}
                                </li>
                                <li>
                                    {product.W_max_qtt}
                                </li>
                                <li>
                                    {product.W_min_qtt}
                                </li>
                                <li>
                                    {product.S_max_qtt}
                                </li>
                                <li>
                                    {product.S_min_qtt}
                                </li>
                                <li>
                                    {product.sell_price}
                                </li>
                                <li>
                                    {product.unit_name}
                                </li>
                                <li>
                                    {product.vat}
                                </li>
                                <li>
                                    {product.brand}
                                </li>
                                <li>
                                    {product.categoryId}
                                </li>
                                <li>
                                    {product.discountId}
                                </li>
                                <li>
                                    {product.lots}
                                </li>
                            </ul>
                        </>
                    )
            }
        </div>
    );
}

export default ProductDetailScreen;








