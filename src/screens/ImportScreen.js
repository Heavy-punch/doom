import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteImport, listImports } from '../actions/importActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { IMPORT_DELETE_RESET } from '../constants/importConstants';
import Pagination from '../components/Pagination';


// import { Container } from './styles';

function ImportScreen(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const importList = useSelector((state) => state.importList);
    const { loading, error, imports } = importList;
    const importDelete = useSelector((state) => state.importDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = importDelete;

    useEffect(() => {
        if (successDelete) {
            dispatch({ type: IMPORT_DELETE_RESET });
        }
        dispatch(listImports());
    }, [dispatch, successDelete]);
    // console.log(imports);

    const [currentPage, setCurrentPage] = useState(1);
    const [importsPerPage] = useState(5);

    const indexOfLastProduct = currentPage * importsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - importsPerPage;
    const currentImports = imports !== undefined ? imports.slice(indexOfFirstProduct, indexOfLastProduct) : [];

    // console.log(currentImports);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const deleteHandler = (delItem) => {
        if (window.confirm('Are you sure to delete?')) {
            var delList = [];
            delList.push(delItem);
            dispatch(deleteImport(delList));
            // console.log(delList);
        }
    };

    const editHandler = (editItem) => {
        props.history.push(`/imports/${editItem}/edit`)
    };
    return (
        <div className="container-fluid">

            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Nhập Hàng</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row" >
                {/* <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
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
                </div> */}
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-15">
                    {loadingDelete && <LoadingBox></LoadingBox>}
                    {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <>
                                    {imports.length === 0 && <MessageBox>No import Found</MessageBox>}
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th className="col-sm-1 col-md-1">stt</th>
                                                <th className="col-sm-1 col-md-1">id</th>
                                                <th className="col-md-2">ngày</th>
                                                <th className="col-md-1">độ ưu tiên</th>
                                                <th className="col-md-1">NV yêu cầu</th>
                                                <th className="col-md-1">NV thực hiện</th>
                                                <th className="col-md-1">NV kiểm hàng</th>
                                                <th className="col-md-1">nhà cung cấp</th>
                                                <th className="col-md-1">trạng thái</th>
                                                <th className="col-md-2">thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentImports.map((imp, index) => (
                                                <tr key={imp.ImID}>
                                                    <td>{index + 1}</td>
                                                    <td>{imp.ImID}</td>
                                                    <td>{imp.request_import_date}</td>
                                                    <td>{imp.urgent_level}</td>
                                                    <td>{imp.requesterId}</td>
                                                    <td>{imp.executorId}</td>
                                                    <td>{imp.checkerId}</td>
                                                    <td>{imp.supplierId}</td>
                                                    <td>{imp.state}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-warning m-10"
                                                            onClick={() => editHandler(imp.ImID)}
                                                        >
                                                            <i className="fa fa-pencil" aria-hidden="true"></i> sửa
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger m-10"
                                                            onClick={() => deleteHandler(imp.ImID)}
                                                        >
                                                            <i className="fa fa-trash" aria-hidden="true"></i> xóa
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Pagination itemsPerPage={importsPerPage} totalItems={imports.length} paginate={paginate}></Pagination>
                                </>
                            )}
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <button type="button" className="btn btn-primary fr" onClick={() => (history.push(`/imports/add`))}>thêm đơn nhập hàng</button>
                </div>
            </div>

        </div>
    );
}

export default ImportScreen;