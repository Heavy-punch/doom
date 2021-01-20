import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from '../actions/categoryActions';
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
    }, [dispatch]);

    const invoiceList = useSelector((state) => state.invoiceList);
    const { loading: loadingInvoice, error: errorInvoice, invoices } = invoiceList;

    const [selectDays, setSelectDays] = useState('');
    const [doughnutData, setDoughnutData] = useState([]);
    const [linetData, setLineData] = useState([]);
    const [timeFilter, setTimeFilter] = useState(6);
    const [lineMonths, setLineMonths] = useState(6);

    useEffect(() => {
        if (!loadingCategory && !loadingInvoice) {
            let arr = categories.map((cate) => ({ cate: cate, qty: 0 }));
            setDoughnutData(arr);
            var d = new Date();
            let lineArr = [...Array(lineMonths).keys()].map(x => d.setMonth(d.getMonth() - 1));
            lineArr.reverse();
            lineArr.push((new Date()).getTime());
            // lineArr = lineArr.map(x => (new Date(x)).getMonth());
            setLineData(lineArr.map(x => ({ time: x, profit: 0 })));
            // console.log(linetData);

            if (invoices.length > 0) {
                // ****************START data for doughnut chart*******************************
                for (let i = 0; i < invoices.length; i++) {
                    for (let j = 0; j < invoices[i].products.length; j++) {
                        // console.log("products i ", invoices[i].products.length);
                        for (let n = 0; n < doughnutData.length; n++) {
                            let newArr = [...doughnutData];
                            if (newArr[n].cate.CID === invoices[i].products[j].categoryId) {
                                newArr[n].qty += invoices[i].products[j].ProductOnBill.quantity;
                            }
                            setDoughnutData(newArr);
                        }
                    }
                }
                // ****************END data for doughnut chart*******************************
                // ****************START data for line chart*******************************
                for (let i = 0; i < invoices.length; i++) {
                    let newArr = [...linetData];
                    console.log("im here");
                    for (let j = 0; j < newArr.length; j++) {
                        console.log((new Date(newArr[j].time)).getMonth(), " ", (new Date(invoices[i].createdAt)).getMonth());
                        if ((new Date(newArr[j].time)).getMonth() === (new Date(invoices[i].createdAt)).getMonth() && (new Date(newArr[j].time)).getFullYear() === (new Date(invoices[i].createdAt)).getFullYear()) {
                            newArr[j].profit += invoices[i].total;
                            setLineData(newArr);
                            break;
                        }
                    }
                    console.log(linetData);
                }

                // ****************END data for line chart*******************************
            }

        }
    }, [dispatch, loadingCategory, loadingInvoice,]);






    return (
        <div className="container-fluid">
            <div className="row no-mg">
                {loadingInvoice ? <LoadingBox></LoadingBox>
                    : errorInvoice ? <MessageBox>{errorInvoice}</MessageBox>
                        : (
                            <>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                    <select
                                        type="text"
                                        className="form-control"
                                        name="status"
                                        value={selectDays}
                                        onChange={(e) => setSelectDays(e.target.value)}
                                    >
                                        <option value="">tất cả</option>
                                    </select>
                                    <BarChart barChartData={linetData} />
                                    <h4 className="center">doanh thu</h4>
                                </div>
                            </>)
                }
                {loadingCategory || loadingInvoice ? <LoadingBox></LoadingBox>
                    : errorCategory || errorInvoice ? <MessageBox>{errorCategory ? errorCategory : errorInvoice}</MessageBox>
                        : (
                            <>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                    <DoughnutChart doughnutData={doughnutData} />
                                    <h4 className="center">sức bán theo ngành hàng</h4>
                                </div>
                            </>)
                }


                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                    <LineChart />
                </div>
            </div>
        </div>
    );
}

export default StatisticScreen;














