import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './style.css'
import Header from './Header';
import Card from './Card';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import _ from 'lodash';
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
const pageSize = 5;
const Home = () => {
    const navigate = useNavigate()
    const [data, setdata] = useState([]);
    const [rate, setrate] = useState();
    const [searchData, setSearchData] = useState(" ");
    // const [data1, setdata1] = useState([]);

    const [saveCrypto, setSaveCrypto] = useState([])
    const [paginatedPost, setPaginatedPost] = useState([]);
    // const [paginatedRate, setpaginatedrate] = useState([]);
    // const [currentPage, setcurrentPage] = useState(1);

    useEffect(() => {
        axios.get(`http://api.coinlayer.com/api/list?access_key=006ea93269b9688e99f47a84226df6e6`)
            .then(res => {
                // console.log(typeof(res.data))
                const record = res.data.crypto;
                let newData = [...data, Object.values(record)]
                setdata(newData[0]);
                // setdata1(newData[0]);
                setPaginatedPost(_(newData[0]).slice(0).take(pageSize).value())
                // console.log(record);
                // const keys = Object.values(record);
                // // let key = keys[0];
                // console.log(keys.map((e)=>{
                //     return {name:e.name,symbol:e.symbol}

                // }));

            }).catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get(`http://api.coinlayer.com/api/live?access_key=006ea93269b9688e99f47a84226df6e6`)
            .then(res => {
                setrate(res.data.rates);
                // setpaginatedrate(_(res.data.rates).slice(0).take(pageSize).value())
                // console.log(res.data.rates);
                // addPrice();
            }).catch(err => {
                console.log(err)
            })
    }, [])

    const newData = data?.forEach((e, idx) => {
        let obj = e
        obj.price = Object?.values(rate)[idx];
        return obj
    })
    // const newData = data?.map((e, idx) => {
    //     let obj = e
    //     obj.price = Object?.values(rate)[idx];
    //     return obj
    // })

    useEffect(() => {

        setdata(newData);
    }, [])

    const pageCount = data ? Math.ceil(data.length / pageSize) : 0;

    var pagess = _.range(1, pageCount + 1)
    pagess = pagess[pagess.length - 1]


    useEffect(() => {
        getcrypto();
    }, [])

    // function for get all data which store in database
    const getcrypto = async () => {
        const response = await fetch('http://localhost:5000/api/crypto/fetchalldata', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        })
        const crypto = await response.json(); // parses JSON response into native JavaScript objects
        setSaveCrypto(crypto);

    }

    // main function for save data in database
    const savecrypto = async (name, symbol, currentprice) => {

        const response = await fetch('http://localhost:5000/api/crypto/savecrypto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, symbol, currentprice })
        })
        getcrypto()
    }

    //function to save data in database
    const save = (idx) => {

        savecrypto(idx.name, idx.symbol, idx.price)
    }

    // function for change data on page number
    const pagination = (event) => {
        let pageNumber = parseInt(event.target.textContent)

        const startIndex = (pageNumber - 1) * pageSize;
        const paginatedPost = _(data).slice(startIndex).take(pageSize).value();
        setPaginatedPost(paginatedPost);
    }

    useEffect(() => {
        let newData = data.filter((ele) => {
            //   ele.name.indexOf(seachData);
            return ele.name.toLowerCase().includes(searchData.toLowerCase());
        });
        searchData.length === 0 ? setPaginatedPost(_(data).slice(0).take(pageSize).value()) :
            setPaginatedPost(newData);
    }, [searchData]);

    //   console.log(searchData);
    const searchCrypto = (e) => {
        setSearchData(e.target.value);
    }
    return (
        <>
            <Header />
            <Card />

            <div className='tableparent'>
                <div className='searchBarParent'>
                    <h2 style={{ marginLeft: "68px" }}>Crypto Details Table</h2>
                    <input className="searchBar" type="text" placeholder="Search Crypto" onChange={searchCrypto} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Crypto Name</th>
                            <th>Symbol</th>
                            <th>Action</th>
                            <th>Current Price</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            paginatedPost.map((e, idx) => {

                                return (<tr key={idx}>
                                    <td>{e.name}</td>
                                    <td><div style={{ backgroundColor: "#E6E6F2", width: "fit-content", padding: "0px 9px", borderRadius: " 12px", color: "#5858FD" }}>
                                        <ul style={{ paddingLeft: "17px", margin: "0px" }}>
                                            <li>
                                                {e.symbol}
                                            </li>

                                        </ul>
                                    </div></td>
                                    <td>

                                        {
                                            saveCrypto.find((el) => {
                                                return el.symbol === e.symbol
                                            }) ? <Button variant="contained" style={{
                                                backgroundColor: "#6D5BD0",

                                            }} onClick={() => { navigate('/view') }}>View</Button> : <Button variant="contained" onClick={(ele) => { save({ name: e.name, symbol: e.symbol, price: e.price }) }}>Save Data</Button>
                                        }

                                    </td>
                                    <td>{e.price}</td>

                                </tr>)
                            })
                        }
                    </tbody>
                </table>
                <div className='pageContainer' >
                    <div className='pagination'>
                        <Stack spacing={2}>

                            <Pagination count={pagess} color="primary" onClick={pagination} />

                        </Stack>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;