import React from 'react';

// import { Container } from './styles';

function SearchProduct() {
    return (
        <div className="search-product">
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
                        <th>anh</th>
                        <th>ten</th>
                        <th>nganh hang</th>
                        <th>gia ban</th>
                        <th>hanh dong</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td></td>
                        <td>mi tom</td>
                        <td>thuc pham</td>
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
    );
}

export default SearchProduct;