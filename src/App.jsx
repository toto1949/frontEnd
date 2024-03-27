import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/products-page/ProductList.jsx";
import AddProductForm from "./pages/product/AddProductForm.jsx";
import ProductDetail from "./components/products-page/ProductDetail.jsx";
import Checkout from "./pages/checkout-page/Checkout.jsx";
import OrderTable from "./pages/OrderTable.jsx";
import UpdateProductForm from "./pages/product/UpdateProductForm.jsx";
import LoginPage from "./LoginPage.jsx";
import ShoppingCart from "./pages/ShoppingCart.jsx";
import Sidebar from "./components/Sidebar.jsx";
import {useState} from "react";

function App() {
    const [showSideBar, setShowSideBar] = useState(false);
    return (
        <BrowserRouter>
            <div className="app">
                <header className={`header ${showSideBar ? "shifted-content" : ""}`}>
                    <h1>My Store</h1>
                </header>
                <Sidebar className="sidebar" onShow={setShowSideBar}/>

                <div  className={`main-content ${showSideBar ? "shifted-content" : ""}`}>
                    <div className={`content ${showSideBar ? "shifted-content" : ""}`}>
                        <Routes>
                            <Route path="/" element={<LoginPage/>}/>
                            <Route path="/products" element={<ProductList/>}/>
                            <Route path="/products/add" element={<AddProductForm/>}/>
                            <Route path="/products/:number" element={<ProductDetail/>}/>
                            <Route path="/checkout" element={<Checkout/>}/>
                            <Route
                                path="/orders"
                                element={<OrderTable showSideBar={showSideBar}/>}
                            />
                            <Route
                                path="/products/:number/edit"
                                element={<UpdateProductForm/>}
                            />
                            <Route
                                path="/shop"
                                element={<ShoppingCart showSideBar={showSideBar}/>}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
