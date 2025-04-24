import { createHashRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./assets/Dashboard/Dashboard";
import Analytics from "./assets/Dashboard/Analytics";
import Offers from "./assets/Dashboard/offers";
import Products from "./assets/Dashboard/Products";
import Inventory from "./assets/Dashboard/Inventory";
import Orders from "./assets/Dashboard/Orders";
import Sales from "./assets/Dashboard/Sales";
import Customers from "./assets/Dashboard/Customers";
import Messages from "./assets/Dashboard/Message";
import Report from "./assets/Dashboard/Report";
import Shipping from "./assets/Dashboard/Shipping";
import Admins from "./assets/Dashboard/Admins";
import Settings from "./assets/Dashboard/Settings";

const router = createHashRouter([
    {
        path:'/',
        element:<App></App>,
        children:[
            {
                path:'',
                element:<Dashboard></Dashboard>
            },
            {
                path:'/analytics',
                element:<Analytics></Analytics>
            },
            {
                path:'/offers',
                element:<Offers></Offers>
            },
            {
                path:'/products',
                element:<Products></Products>
            },
            {
                path:'/inventory',
                element:<Inventory></Inventory>
            },
            {
                path:'/orders',
                element:<Orders></Orders>
            },
            {
                path:'/sales',
                element:<Sales></Sales>
            },
            {
                path:'/customers',
                element:<Customers></Customers>
            },
            {
                path:'/message',
                element:<Messages></Messages>
            },
            {
                path:'/reports',
                element:<Report></Report>
            },
            {
                path:'/shipping',
                element:<Shipping></Shipping>
            },
            {
                path:'/admins',
            element:<Admins></Admins>         
           },
           {
            path:'/settings',
            element:<Settings></Settings>
           }
        ]
    }
])


export default router