import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { Good } from "../../../dtos/good";

import "../../../style/goodHolder.scss";

export interface IGoodProps {
    good_name: string;
    good_qauntity: string;
    cost_of_goods: number;
}

function GoodHolder(props: IGoodProps) {

    const [readyState, setReadyState] = useState(false);

    const [goodName, setGoodName] = useState(props.good_name);
    const [goodQauntity, setGoodQauntity] = useState(props.good_qauntity);
    const [goodCosts, setCostOfGoods] = useState(props.cost_of_goods);

    return (
        <>

                {/* <div className="good-img-slot" style ={ { backgroundImage: "" } } ></div> */}
                <div className="good-img-slot"> </div>
                <div className="good-name-slot">{goodName}</div>
                <div className="good-quantity-slot">{goodQauntity}</div>
                <div className="good-price-slot">{goodCosts}</div>
        </>
    );

}

export default GoodHolder;