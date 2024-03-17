import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill} from 'react-icons/bs';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }  from 'recharts';
import SlideBarBuyer from '../Home Panel/SlideBarBuyer';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import './ShowBuyerProducts.css';

function ShowBuyerProducts() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5); // Change this to adjust the number of products per page

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://api-generator.retool.com/u9XTxw/data');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const navigate = useNavigate(); // Initialize the useNavigate hook

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    const handleEditClick = (id) => {
        navigate(`/EditBuyerProducts/${id}`);
    };

    const deleteRev = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete) {
            try {
                await axios.delete(`https://api-generator.retool.com/u9XTxw/data/${id}`);
                loadData();
                console.log("Delete successful");
            } catch (error) {
                console.error("Error deleting review:", error);
            }
        }
    };

    const loadData = async () => {
        try {
            const res = await axios.get("https://api-generator.retool.com/u9XTxw/data");
            setProducts(res.data);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    return (
        <>
            <div className='grid-containerwa'>
                <SlideBarBuyer openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>

                <div className="product-list-container-buyer">
                    <h1 className='buyerheader'>Product List</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Price</th>
                                <th>Inventory</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map(product => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.price}</td>
                                    <td>{product.inventory}</td>
                                    <td>
                                        <button className="primarys-btn" style={{ margin: '2px' }} onClick={() => handleEditClick(product.id)}> Edit </button>
                                        <button className="dangerssq-btn" style={{ margin: '2px' }} onClick={() => deleteRev(product.id)}> Delete </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
                            <button key={index} className={currentPage === index + 1 ? 'active' : 'inactive'} onClick={() => paginate(index + 1)}>{index + 1}</button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShowBuyerProducts;
