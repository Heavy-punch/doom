import React, { useState } from 'react';

// import { Container } from './styles';

function Pagination({ itemsPerPage, totalItems, paginate }) {
    const [activeItem, setActiveItem] = useState(1);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    const onClick = (number) => {
        paginate(number);
        setActiveItem(number);
    };
    return (
        <nav>
            <ul className="pagination mg-0">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        {/* <p onClick={() => paginate(number)} className="page-link"> {number} </p> */}
                        <p onClick={() => onClick(number)} className={number === activeItem ? "page-link active" : "page-link"}> {number} </p>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;