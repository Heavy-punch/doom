import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listDiscounts } from '../actions/discountLabelActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import { Container } from './styles';

function DiscountLabelScreen() {
    const history = useHistory();
    const dispatch = useDispatch();
    const discountList = useSelector((state) => state.discountList);
    const { loading, error, discounts } = discountList;
    useEffect(() => {
        dispatch(listDiscounts());
    }, [dispatch]);
    console.log(discounts);
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
                                            {discounts.map((discount, index) => (
                                                <tr key={discount.discountId}>
                                                    <td>{index + 1}</td>
                                                    <td>{discount.discountId}</td>
                                                    <td>{discount.title}</td>
                                                    <td>{discount.rate}</td>
                                                    <td className="discount-description">{discount.description}</td>
                                                    <td>{discount.start_date}</td>
                                                    <td>{discount.end_date}</td>
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
                    <button type="button" className="btn btn-primary fr" onClick={() => (history.push(`/discounts/add`))}>thêm nhãn khuyến mãi</button>
                </div>
            </div>

        </div>
    );
}

export default DiscountLabelScreen;