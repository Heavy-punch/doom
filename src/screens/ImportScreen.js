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

    const [IMstate, setIMState] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [importsPerPage] = useState(5);

    const indexOfLastProduct = currentPage * importsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - importsPerPage;
    // const currentImports = imports !== undefined ? imports.slice(indexOfFirstProduct, indexOfLastProduct) : [];
    const [currentImports, setCurrentImports] = useState([]);
    const [filteredList, setFilteredList] = useState([]);


    useEffect(() => {
        if (!loading) {
            switch (IMstate) {
                case 'request':
                    setFilteredList(imports.filter(im => im.state === 'request'));
                    setCurrentImports(imports.filter(im => im.state === 'request').slice(indexOfFirstProduct, indexOfLastProduct));
                    break;
                case 'executed':
                    setFilteredList(imports.filter(im => im.state === 'executed'));
                    setCurrentImports(imports.filter(im => im.state === 'executed').slice(indexOfFirstProduct, indexOfLastProduct));
                    break;
                case 'close':
                    setFilteredList(imports.filter(im => im.state === 'close'));
                    setCurrentImports(imports.filter(im => im.state === 'close').slice(indexOfFirstProduct, indexOfLastProduct));
                    break;
                default:
                    setFilteredList(imports);
                    setCurrentImports(imports.slice(indexOfFirstProduct, indexOfLastProduct));
                    break;
            }
        }
    }, [dispatch, loading, currentPage, IMstate,]);

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
        if ((editItem.state === 'close') && (window.alert('đơn nhập hàng đã đóng, chỉ xem?'))) {
            props.history.push(`/imports/${editItem.ImID}/edit`);
        }
        else {
            props.history.push(`/imports/${editItem.ImID}/edit`);
        }
    };
    const onChangeState = (e) => {
        setIMState(e.target.value)
        paginate(1);
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
                                                <th className="col-sm-1 col-md-1 center">stt</th>
                                                <th className="col-sm-1 col-md-1 center">id</th>
                                                <th className="col-md-1 center">ngày yêu cầu</th>
                                                <th className="col-md-1 center">độ ưu tiên</th>
                                                <th className="col-md-1 center">NV yêu cầu</th>
                                                <th className="col-md-1 center">NV thực hiện</th>
                                                <th className="col-md-1 center">NV kiểm hàng</th>
                                                <th className="col-md-1 center">nhà cung cấp</th>

                                                {/* <th className="col-md-1">trạng thái</th> */}
                                                <th className="col-md-2">
                                                    <div className="OP-state">
                                                        <span>trạng thái</span>
                                                        <span>
                                                            <select
                                                                type="text"
                                                                className="form-control"
                                                                name="state"
                                                                value={IMstate}
                                                                // onChange={(e) => setIMState(e.target.value)}
                                                                onChange={onChangeState}
                                                            >
                                                                <option value="">tất cả</option>
                                                                <option value="request">yêu cầu</option>
                                                                <option value="executed">đã thực hiện</option>
                                                                <option value="close">đóng</option>
                                                            </select>
                                                        </span>
                                                    </div>
                                                </th>

                                                <th className="col-md-2 center">thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentImports.map((imp, index) => (
                                                <tr key={imp.ImID}>
                                                    <td className="center">{index + 1}</td>
                                                    <td className="center">{imp.ImID}</td>
                                                    <td className="center">{(new Date(imp.request_import_date)).toLocaleDateString()}</td>
                                                    <td className="center">{imp.urgent_level}</td>
                                                    <td className="center">{imp.requesterId}</td>
                                                    <td className="center">{imp.executorId}</td>
                                                    <td className="center">{imp.checkerId}</td>
                                                    <td className="center">{imp.supplierId}</td>
                                                    <td className="center"><span className={imp.state === "request" ? "label label-info" : imp.state === "executed" ? "label label-success" : "label label-default"}>{imp.state}</span></td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-warning m-10"
                                                            onClick={() => editHandler(imp)}
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
                                    {filteredList.length > importsPerPage ? (<Pagination itemsPerPage={importsPerPage} totalItems={filteredList.length} paginate={paginate}></Pagination>) : <br />}
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