import React, { useEffect, useState } from 'react';
import './style.css'
import Header from './Header';
import Card from './Card';
import { useNavigate } from "react-router-dom"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import _ from 'lodash';
import Button from '@mui/material/Button';
const pageSize = 5;
const View = () => {
    const navigate = useNavigate()
    const [saveCrypto, setSaveCrypto] = useState([])
    const [paginatedPost, setPaginatedPost] = useState([]);



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
        setPaginatedPost(_(crypto).slice(0).take(pageSize).value())
    }

    const pageCount = saveCrypto ? Math.ceil(saveCrypto.length / pageSize) : 0;

    var pagess = _.range(1, pageCount + 1)
    pagess = pagess[pagess.length - 1]

    const pagination = (event) => {
        let pageNumber = parseInt(event.target.textContent)

        const startIndex = (pageNumber - 1) * pageSize;
        const paginatedPost = _(saveCrypto).slice(startIndex).take(pageSize).value();
        setPaginatedPost(paginatedPost);
    }

    const deleteCrypto = async (id) => {

        //API

         await fetch(`http://localhost:5000/api/crypto/deletecrypto/${id}`, {
            method: "Delete",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // const json = response.json()
        // console.log(json);
        getcrypto();
    }

    return (
        <>
            <Header />
            <Card />
            <div className='tableparent'>
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
                                    <td><Button variant="contained" onClick={() => { deleteCrypto(e._id) }}>Delete</Button></td>
                                    <td>{e.currentprice}</td>

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
                <div>
                    <Button variant="contained" onClick={() => { navigate('/') }}>Back</Button>
                </div>
            </div>
        </>
    )
}

export default View;