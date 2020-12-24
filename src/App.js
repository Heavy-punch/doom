import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import PrivateLayout from './layouts/PrivateLayout';
import PublicLayout from './layouts/PublicLayout';
import CategoryAddScreen from "./screens/CategoryAddScreen";
import CategoryScreen from "./screens/CategoryScreen";
import DiscountLabelAddScreen from "./screens/DiscountLabelAddScreen";
import DiscountLabelScreen from "./screens/DiscountLabelScreen";
import InvoiceScreen from "./screens/InvoiceScreen";
import ManagementScreen from "./screens/ManagementScreen";
import ProductAddScreen from "./screens/ProductAddScreen";
import ProductScreen from "./screens/ProductScreen";
import SellingScreen from "./screens/SellingScreen";
import ShelfAddScreen from "./screens/ShelfAddScreen";
import ShelfScreen from "./screens/ShelfScreen";
import SignInScreen from "./screens/SignInScreen";
import SupplierAddScreen from "./screens/SupplierAddScreen";
import SupplierScreen from "./screens/SupplierScreen";

// function App() {
//     return (
//         <div>
//             <ManagementScreen></ManagementScreen>
//             <ProductScreen></ProductScreen>
//             <ProductAddScreen></ProductAddScreen>
//             <CategoryScreen></CategoryScreen>
//             <CategoryAddScreen></CategoryAddScreen>
//             <ShelfScreen></ShelfScreen>
//             <ShelfAddScreen></ShelfAddScreen>
//             <SupplierScreen></SupplierScreen>
//             <SupplierAddScreen></SupplierAddScreen>
//             <DiscountLabelScreen></DiscountLabelScreen>
//             <DiscountLabelAddScreen></DiscountLabelAddScreen>
//             <InvoiceScreen></InvoiceScreen>
//             <SignInScreen></SignInScreen>
//             <p>this is home page</p>
//         </div>
//     );
// }

// export default App;



function App() {
    return (
        <BrowserRouter>
            <PublicRoute path="/signin" component={PublicLayout}>

            </PublicRoute>
            <PrivateRoute path="/" component={PrivateLayout} >

            </PrivateRoute>
            {/* <div className="grid-container">
                <div className="header">
                    <div className="logo">
                        <Link to="/">
                            <img src="./images/logo.png" alt="mng" />
                        </Link>
                    </div>
                    <div className="logout">
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="main">
                    <div className="sidebar">
                        <div className="user">
                            <img src="./images/user1.png" alt="asfas" />
                        </div>
                        <div className="menu">
                            <Link to="/" className="active">Trang Chủ</Link>
                            <Link to="/statistic">Thống Kê</Link>
                            <Link to="/export">Xuất Hàng</Link>
                            <Link to="/import">Nhập Hàng</Link>
                            <Link to="/management">Quản Lý</Link>
                        </div>
                    </div>
                    <div className="content-wraper">
                        <Route path="/signin" component={SignInScreen}></Route>
                        <PrivateRoute path="/" component={SellingScreen}></PrivateRoute>
                    </div>
                </div>
                <div className="footer">this is footer</div>
            </div> */}
        </BrowserRouter>
    );
}

export default App;
