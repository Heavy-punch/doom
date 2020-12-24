import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SellingScreen() {
    const [count, setCount] = useState(1);
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const getCurrentDate = () => { let date = new Date(); return date };
    // console.log(userInfo);
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                    <div className="form-group">
                        <div className="col-sm-12 ml15">
                            <input
                                type="search"
                                name=""
                                id="input"
                                className="form-control"
                                required="required"
                                placeholder="tim kiem"
                            />
                        </div>
                    </div>

                    <table className="table table-bordered table-hover mt15">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>ảnh</th>
                                <th>tên</th>
                                <th>giá bán</th>
                                <th>thêm</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td></td>
                                <td>mi tom</td>
                                <td>3000</td>
                                <td>
                                    <button type="button" className="btn btn-primary">
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="invoice">
                        <div className="invoice-info">
                            <h1>Hóa Đơn</h1>
                            <p className="invoice-date">Ngày: {getCurrentDate().toDateString()}</p>
                            <p className="invoice-mng">Nhân viên bán hàng: {userInfo.FName + " " + userInfo.LName + " - " + userInfo.MngID}</p>
                            <p className="invoice-custom-name">Khách hàng: A</p>
                            <hr />
                        </div>
                        <div className="invoice-detail">
                            <table className="table table-hover mt15">
                                <thead>
                                    <tr>
                                        <th>stt</th>
                                        <th>ten sp</th>
                                        <th>so luong</th>
                                        <th>don gia</th>
                                        <th>giam gia</th>
                                        <th>thanh tien</th>
                                        <th>xoa san pham</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>mi tom</td>
                                        <td>
                                            <div className="quantity">
                                                <button className="minus-btn" type="button" name="button" onClick={() => count > 0 ? setCount(count - 1) : setCount(count)}>
                                                    <i className="fa fa-minus" aria-hidden="true"></i>
                                                </button>
                                                <input type="text" name="name" value={count} onChange={(e) => setCount(e.target.value)} />
                                                <button className="plus-btn" type="button" name="button" onClick={() => setCount(count + 1)}>
                                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td>3000</td>
                                        <td>0</td>
                                        <td>3000</td>
                                        <td>
                                            <button type="button" className="btn btn-primary">
                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <div className="total">
                                <p className="total-raw"><b>tong cong: 3000</b></p>
                                <hr />
                                <button type="reset" className="btn btn-warning mr-3">hủy</button>
                                <button type="button" className="btn btn-success">
                                    tạo đơn hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellingScreen;



