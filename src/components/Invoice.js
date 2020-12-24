import React from 'react';

// import { Container } from './styles';

function Invoice() {
    return (
        <div className="invoice">
            <div className="invoice-info">
                <h1>hoa don</h1>
                <p className="invoice-date">01/01/2021</p>
                <p className="invoice-mng">nhan vien: nguyen van a - 192</p>
                <p className="invoice-custom-name">khach hang: A</p>
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
                                    <button className="minus-btn" type="button" name="button">
                                        <i className="fa fa-minus" aria-hidden="true"></i>
                                    </button>
                                    <input type="text" name="name" />
                                    <button className="plus-btn" type="button" name="button">
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
                    <button type="button" className="btn btn-success">
                        tao don hang
            </button>
                    <button type="button" className="btn btn-warning">huy</button>
                </div>
            </div>
        </div>
    );
}

export default Invoice;