import React from 'react'
import { createContext, useContext, useState, useEffect } from "react"

const ContextApi = createContext(null);
export const usecontext =()=> useContext(ContextApi);

export const Context = (props) => {
const [total, setTotal] = useState(0);
const [detail, setDetail] = useState([]);
const [adminedit, setAdminedit] = useState([]);
const [user, setUser] = useState([]);
  return <ContextApi.Provider value = {{
    total,
    setTotal,
    setDetail,
    detail,adminedit,setAdminedit,user,setUser,
  }} >
    {props.children}
  </ContextApi.Provider>
}
