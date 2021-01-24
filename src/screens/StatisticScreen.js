import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listCategories } from '../actions/categoryActions';
import { listImports } from '../actions/importActions';
import { listInvoices } from '../actions/invoiceActions';
import BarChart from '../components/BarChart';
import DoughnutChart from '../components/DoughnutChart';
import LineChart from '../components/LineChart';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// import { Container } from './styles';

function StatisticScreen(props) {
    const dispatch = useDispatch();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const categoryList = useSelector((state) => state.categoryList);
    const { loading: loadingCategory, error: errorCategory, categories } = categoryList;
    useEffect(() => {
        // dispatch(listProducts());
        dispatch(listCategories());
        dispatch(listInvoices());
        dispatch(listImports());
    }, [dispatch]);

    const importList = useSelector((state) => state.importList);
    const { loading: loadingImports, error: errorImports, imports } = importList;

    const invoiceList = useSelector((state) => state.invoiceList);
    const { loading: loadingInvoice, error: errorInvoice, invoices } = invoiceList;

    const [selectDays, setSelectDays] = useState('');
    const [doughnutData, setDoughnutData] = useState([]);
    const [linetData, setLineData] = useState([]);
    const [doughnutTimeFilter, setDoughnutTimeFilter] = useState(1);
    const [lineMonths, setLineMonths] = useState(6);
    const [paymentImport, setPaymentImport] = useState(0);

    useEffect(() => {
        if (!loadingCategory && !loadingInvoice) {
            let arr = categories.map((cate) => ({ cate: cate, qty: 0 }));
            setDoughnutData(arr);
            let d = new Date();
            let lineArr = [...Array(lineMonths).keys()].map(x => d.setMonth(d.getMonth() - 1));
            lineArr.reverse();
            lineArr.push((new Date()).getTime());
            // lineArr = lineArr.map(x => (new Date(x)).getMonth());
            setLineData(lineArr.map(x => ({ time: x, profit: 0, total: 0 })));
            // console.log(linetData);

            if (invoices.length > 0) {
                // ****************START data for doughnut chart*******************************
                let newArr = [...doughnutData];
                newArr.map(x => x.qty = 0);
                for (let i = 0; i < invoices.length; i++) {
                    for (let j = 0; j < invoices[i].products.length; j++) {
                        // console.log("products i ", invoices[i].products.length);
                        for (let n = 0; n < doughnutData.length; n++) {
                            if (doughnutTimeFilter === 1) {
                                if ((newArr[n].cate.CID === invoices[i].products[j].categoryId) && ((new Date(invoices[i].createdAt))).getTime() > (new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime())) {
                                    newArr[n].qty += invoices[i].products[j].ProductOnBill.quantity;
                                    setDoughnutData(newArr);
                                }
                            }
                            else {
                                if ((newArr[n].cate.CID === invoices[i].products[j].categoryId) && ((new Date(invoices[i].createdAt))).getTime() > (new Date().getTime() - doughnutTimeFilter * 24 * 60 * 60 * 1000)) {
                                    newArr[n].qty += invoices[i].products[j].ProductOnBill.quantity;
                                    setDoughnutData(newArr);
                                }
                            }
                        }
                    }
                }
                // console.log(newArr);
                // ****************END data for doughnut chart*******************************
                // ****************START data for line chart*******************************
                let newArr2 = [...linetData];
                newArr2.map(x => x.profit = 0);
                newArr2.map(x => x.total = 0);
                for (let i = 0; i < invoices.length; i++) {
                    for (let j = 0; j < newArr2.length; j++) {
                        // console.log((new Date(newArr[j].time)).getMonth(), " ", (new Date(invoices[i].createdAt)).getMonth());
                        if ((new Date(newArr2[j].time)).getMonth() === (new Date(invoices[i].createdAt)).getMonth() && (new Date(newArr2[j].time)).getFullYear() === (new Date(invoices[i].createdAt)).getFullYear()) {
                            newArr2[j].total += invoices[i].total;
                            newArr2[j].profit += invoices[i].total - invoices[i].products.reduce((a, b) => (a + b.ProductOnBill.quantity * b.ProductOnBill.static_import_price), 0);
                            setLineData(newArr2);
                            break;
                        }
                    }
                }
                console.log(newArr2);
                // ****************END data for line chart*******************************
            }

        }
        if (!loadingImports) {
            let d = new Date();
            let total = 0;
            let newArr = [...imports].filter(x => (x.state === 'close') && ((new Date(x.import_date)).getTime() > (new Date(d.getFullYear(), d.getMonth(), d.getDate())).getTime()));
            // let newArr = [...imports].filter(x => (x.state === 'close'));
            // && (new Date(x.import_date)).getTime() > (new Date(d.getFullYear(), d.getMonth(), d.getDate())).getTime()
            if (newArr.length > 0) {
                for (let i = 0; i < newArr.length; i++) {
                    for (let j = 0; j < newArr[i].products.length; j++) {
                        // console.log(newArr[i].products[j].ProductInImport.real_total_unit, "****", newArr[i].products[j].lot.import_price_unit)
                        // setPaymentImport(paymentImport + (newArr[i].products[j].ProductInImport.real_total_unit * newArr[i].products[j].lot.import_price_unit));
                        total += newArr[i].products[j].ProductInImport.real_total_unit * newArr[i].products[j].lot.import_price_unit;
                    }
                }
            }
            // console.log(total);
            setPaymentImport(total);
            console.log(paymentImport);
        }
    }, [dispatch, loadingCategory, loadingInvoice, loadingImports]);

    // console.log(paymentImport);




    return (
        <div className="container-fluid">
            <div className="row no-mg">
                <>
                    {loadingInvoice ? <LoadingBox></LoadingBox>
                        : errorInvoice ? <MessageBox>{errorInvoice}</MessageBox>
                            : (
                                <>
                                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                        <BarChart barChartData={linetData} />
                                        <h4 className="center">doanh thu</h4>
                                    </div>
                                </>)
                    }
                </>

                {/* <>
                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                        <LineChart />
                    </div>
                </> */}

                <>
                    {loadingCategory || loadingInvoice ? <LoadingBox></LoadingBox>
                        : errorCategory || errorInvoice ? <MessageBox>{errorCategory ? errorCategory : errorInvoice}</MessageBox>
                            : (
                                <>
                                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                        <select
                                            type="text"
                                            className="form-control"
                                            name="status"
                                            value={doughnutTimeFilter}
                                            onChange={(e) => setDoughnutTimeFilter(+e.target.value)}
                                        >
                                            <option value="1">trong ngày</option>
                                            <option value="7">7 ngày</option>
                                            <option value="30">30 ngày</option>
                                            <option value="90">90 ngày</option>
                                        </select>
                                        <DoughnutChart doughnutData={doughnutData} />
                                        <h4 className="center">sức bán theo ngành hàng</h4>
                                    </div>
                                </>)
                    }
                </>

            </div>
            <hr />
            <div className="row no-mg">
                <div className="col-md-12 center">
                    <h3>Thống kê trong ngày</h3>
                </div>
                {loadingInvoice ? <LoadingBox></LoadingBox>
                    : errorInvoice ? <MessageBox>{errorInvoice}</MessageBox>
                        : (
                            <>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div>
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th className="col-xs-1 col-sm-1 col-md-1 col-lg-1">stt</th>
                                                    <th className="col-xs-1 col-sm-1 col-md-1 col-lg-1">id</th>
                                                    <th className="col-xs-2 col-sm-2 col-md-2 col-lg-2">tên khách hàng</th>
                                                    <th className="col-xs-2 col-sm-2 col-md-2 col-lg-2">ngày bán</th>
                                                    <th className="col-xs-2 col-sm-2 col-md-2 col-lg-2">nhân viên thực hiện</th>
                                                    <th className="col-xs-1 col-sm-1 col-md-1 col-lg-1">thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {invoices.map((invoice, index) => (
                                                    <tr key={invoice.BID}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <Link to={`/invoices/${invoice.BID}`}>
                                                                {invoice.BID}
                                                            </Link>
                                                        </td>
                                                        <td>{invoice.cus_name}</td>
                                                        <td>{invoice.createdAt.slice(0, 10).split("-").reverse().join("-")}</td>
                                                        <td>{invoice.manager.LName + " " + invoice.manager.FName + " - " + invoice.MngID}</td>
                                                        <td>{invoice.total.toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )
                }
            </div>
        </div>
    );
}

export default StatisticScreen;














