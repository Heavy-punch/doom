import React, { useState } from 'react';

// import { Container } from './styles';

function AdjustQuantity(props) {
    const [count, setCount] = useState(props.qty);
    return (
        <div className="quantity">
            <button className="minus-btn" type="button" name="button" onClick={() => count > 0 ? setCount(count - 1) : setCount(count)}>
                <i className="fa fa-minus" aria-hidden="true"></i>
            </button>
            <input type="text" name="name" value={count} onChange={(e) => setCount(e.target.value)} />
            <button className="plus-btn" type="button" name="button" onClick={() => setCount(count + 1)}>
                <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
        </div>
    );
}

export default AdjustQuantity;