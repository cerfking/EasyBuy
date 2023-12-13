import StoreFront from "./Store"
import Home from "./Store/home";
import Products from "./Store/products";
import Cart from "./Store/cart";
import Profile from "./Store/account";
import Register from "./Store/register";
import EditProfile from "./Store/account/editProfile";
import Following from "./Store/following";
import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router-dom";
import store from "./Store/reducerStore";
import {Provider} from "react-redux";
import ShoppingCart from "./Store/cart";
import Login from "./Store/register/login";
import Admin from "./Store/admin";
import Seller from "./Store/seller";
import Product from "./Store/products/product";
import OtherProfile from "./Store/account/otherProfile";
import OnlineProducts from "./Store/onlineSearch";
import OnlineProduct from "./Store/onlineSearch/onlineProduct";

const AV = require("leancloud-storage");
const { Query, User } = AV;

AV.init({
    appId: "87MoejtsgthauyCfsSs2blKG-MdYXbMMI",
    appKey: "tPcqtMVaUjWxLtRRqSy5OyJK",
    serverURL: "https://87moejts.api.lncldglobal.com",
});


function App() {


    return (
        <Provider store={store}>
        <HashRouter>
            <div>
                <Routes>
                    <Route path="/" element={<StoreFront/>}/>
                    <Route path="/Home" element={<Home/>}/>
                    <Route path="/OnlineProducts" element={<OnlineProducts/>}/>
                    <Route path="/OnlineProducts/OnlineProduct/:shopId/:id" element={<OnlineProduct/>}/>
                    <Route path="/Products" element={<Products/>}/>
                    <Route path="/Products/Product/:id" element={<Product/>} />
                    <Route path="/Cart" element={<ShoppingCart/>}/>
                    <Route path="/Profile" element={<Profile/>}/>
                    <Route path="/Profile/:id" element={<OtherProfile/>}/>
                    <Route path="/Following" element={<Following/>}/>
                    <Route path="/Register" element={<Register/>}/>
                    <Route path="/Profile/EditProfile" element={<EditProfile/>}/>
                    <Route path="/Register/Login" element={<Login/>}/>
                    <Route path="/Admin" element={<Admin/>}/>
                    <Route path="/Seller" element={<Seller/>}/>
                </Routes>
            </div>
        </HashRouter>
        </Provider>
    );
}
export default App;

