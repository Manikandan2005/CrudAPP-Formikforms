import React from "react";
import AdminAuthor from "../components/AdminAuthor";
import AdminBooks from "../components/AdminBooks";
import { Navigate } from "react-router-dom";
import EditAuthor from "../components/EditAuthor";
import EditBooks from "../components/EditBooks";
import CreateAuthor from "../components/CreateAuthor";
import CreateBooks from "../components/CreateBooks";


const AppRoutes = [
    {
        path:'/',
        exact:true,
        element:<AdminAuthor/>
    },
    {
        path:'/books',
        exact:true,
        element:<AdminBooks/>
    },
    {
        path:'/editbooks/:id',
        exact:true,
        element:<EditBooks/>
    },
    {
        path:'/editauthor/:id',
        exact:true,
        element:<EditAuthor/>
    },
    {
        path:'/createauthor',
        exact:true,
        element:<CreateAuthor/>
    },
    {
        path:'/createbook',
        exact:true,
        element:<CreateBooks/>
    },
    {
        path:'*',
        exact:false,
        element:<Navigate to ="/"/>
    }
]


export default AppRoutes