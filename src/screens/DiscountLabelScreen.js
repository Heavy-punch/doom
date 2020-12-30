import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteDiscount, listDiscounts } from '../actions/discountLabelActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Pagination from '../components/Pagination';
import { DISCOUNT_DELETE_RESET } from '../constants/discountLabelConstants';

// import { Container } from './styles';

function DiscountLabelScreen(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const discountList = useSelector((state) => state.discountList);
    const { loading, error, discounts } = discountList;
    const discountDelete = useSelector((state) => state.discountDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = discountDelete;

    // console.log(discountList);
    useEffect(() => {
        if (successDelete) {
            dispatch({ type: DISCOUNT_DELETE_RESET });
        }
        dispatch(listDiscounts());
    }, [dispatch, successDelete]);

    const [currentPage, setCurrentPage] = useState(1);
    const [discountsPerPage] = useState(5);

    const indexOfLastProduct = currentPage * discountsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - discountsPerPage;
    const currentDiscounts = discounts !== undefined ? discounts.slice(indexOfFirstProduct, indexOfLastProduct) : [];

    // console.log(currentDiscounts);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // console.log(discountDelete);

    const deleteHandler = (delItem) => {
        if (window.confirm('Are you sure to delete?')) {
            var delList = [];
            delList.push(delItem);
            dispatch(deleteDiscount(delList));
            console.log(delList);
        }
    };

    const editHandler = (editItem) => {
        props.history.push(`/discounts/${editItem}/edit`)
    };

    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Nhãn Khuyến Mãi</h2>
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
                    {loadingDelete && <LoadingBox></LoadingBox>}
                    {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <>
                                    {discounts.length === 0 && <MessageBox>No discount Found</MessageBox>}
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>stt</th>
                                                <th>id</th>
                                                <th>tiêu đề</th>
                                                <th>độ giảm giá</th>
                                                <th>mô tả</th>
                                                <th>ngày bắt đầu</th>
                                                <th>ngày kết thúc</th>
                                                <th>thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentDiscounts.map((discount, index) => (
                                                <tr key={discount.discountId}>
                                                    <td>{index + 1}</td>
                                                    <td>{discount.discountId}</td>
                                                    <td>{discount.title}</td>
                                                    <td>{discount.rate}</td>
                                                    <td className="discount-description">{discount.description}</td>
                                                    <td>{discount.start_date}</td>
                                                    <td>{discount.end_date}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-warning m-10"
                                                            onClick={() => editHandler(discount.discountId)}
                                                        >
                                                            <i className="fa fa-pencil" aria-hidden="true"></i> sửa
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger m-10"
                                                            onClick={() => deleteHandler(discount.discountId)}
                                                        >
                                                            <i className="fa fa-trash" aria-hidden="true"></i> xóa
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Pagination itemsPerPage={discountsPerPage} totalItems={discounts.length} paginate={paginate}></Pagination>
                                </>
                            )}
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <button type="button" className="btn btn-primary fr" onClick={() => (history.push(`/discounts/add`))}>thêm nhãn khuyến mãi</button>
                </div>
            </div>

        </div>
    );
}

export default DiscountLabelScreen;