import React, { useState, useContext } from 'react'
// import { getFirestore, collection, getDocs } from "firebase/firestore"
import { Box, Text, Spacer } from '@chakra-ui/react'
import './Store.scss';
import mainContext from '../../Context/MainContext';
const Store = (props) => {

    const plants = props.data1;
    const gardenItems = props.data2;

    const [modal, setShowModal] = useState(false);
    const [cartItem, setCartItem] = useState(null);
    const [itemImage, setItemImage] = useState(null);
    const [itemPrice, setItemPrice] = useState(0);
    const [category, setCategory] = useState(null);

    const handleClick = (image, name, type, price) => {
        setShowModal(true);
        setCartItem(name);
        setItemImage(image);
        setCategory(type);
        setItemPrice(price);
    }

    return (
        <div className="store">
            <div className="main-container">
            <div className="subtitle">Plants 🪴</div>
                <div className="container">
                    {plants && plants.map((item) => {
                        return (
                            <>
                                <Box onClick={() => handleClick(item.imgSrc, item.name, "plants", item.price)} className="item" bgColor="#E2F3EF" minW="200px" maxW="200px" h="220px" style={{'cursor': 'pointer'}} borderRadius="27px">
                                    <img src={item.imgSrc} className="plant-img" alt="" />
                                    <Text color="#279A84" textAlign="center" pt="10px" textTransform="capitalize" fontWeight="700">{item.name}</Text>
                                </Box>
                            </>
                        );
                    })}
                </div>
                <div className="subtitle">Seeds 🌱</div>
                <div className="container">
                    {gardenItems && gardenItems.map((item) => {
                        return (
                            <>
                                <Box onClick={() => handleClick(item.imgSrc, item.name, "Seeds", item.price)} className="item" bgColor="#E2F3EF" minW="200px" maxW="200px" h="220px" style={{'cursor': 'pointer'}} borderRadius="27px">
                                    <img src={item.imgSrc} className="plant-img" alt="" />
                                    <Text color="#279A84" textAlign="center" pt="10px" textTransform="capitalize" fontWeight="700">{item.name}</Text>
                                </Box>
                            </>
                        );
                    })}
                </div>
                <div className="subtitle">Fertilizers 🧑‍🔬</div>
                <div className="container">
                    {gardenItems && gardenItems.map((item) => {
                        return (
                            <>
                                <Box onClick={() => handleClick(item.imgSrc, item.name, "fertilizers", item.price)} className="item" bgColor="#E2F3EF" minW="200px" maxW="200px" h="220px" style={{'cursor': 'pointer'}} borderRadius="27px">
                                    <img src={item.imgSrc} className="plant-img" alt="" />
                                    <Text color="#279A84" textAlign="center" pt="10px" textTransform="capitalize" fontWeight="700">{item.name}</Text>
                                </Box>
                            </>
                        );
                    })}
                </div>
            </div>

            {modal?<div className="bg" onClick={()=>setShowModal(false)}/>:null}
            {modal?<Modal name={cartItem} img={itemImage} category={category} price={itemPrice} />:null}
        </div>
    )
}

export const BG = () => {
    return (
        <div className="bg"></div>
    )
}

export const Modal = (props) => {

    const cart = useContext(mainContext);
    
    let itemMetaInfo = {
        img: "",
        name: "",
        qty: "",
        totalPrice: ""
    };

    const [ totalItem, setTotalItem ] = useState(0);    //fn: updateTotal()
    const [ totalPrice, setTotalPrice ] = useState(0);      //fn: using updateTotal() to calc total price

    const addItemToCart = (itemImg, itemName, itemQty, price) => {
        itemMetaInfo.img = itemImg;
        itemMetaInfo.name = itemName;
        itemMetaInfo.qty = itemQty;
        itemMetaInfo.totalPrice = price;
        cart.updateCart(itemMetaInfo);
    }

    const updateTotal = (op) => {
        if (op === '+') {
            if (totalItem < 4) {
                setTotalItem(totalItem+1);
                setTotalPrice(props.price*(totalItem+1));    //couter the delay effect 
            } else {
                alert("Items cannot be more than 4");
            }
        } else {
            if (totalItem > 0) {
                setTotalItem(totalItem-1);
                setTotalPrice(props.price*(totalItem-1));   //couter the delay effect 
            } else {
                alert("Items cannot go below 0");
            }
        }
    }
    return (
        <div className="modalBg">
            <div className="modal">
                <div className="product">
                    <img src={props.img} alt="" />
                    <div className="product-info">
                        <span className="name"><b style={{'color':'#128972', 'fontWeight':'800'}}>Name:</b> {props.name}</span>
                        <span className="category"><b style={{'color':'#128972', 'fontWeight':'800'}}>Category:</b> {props.category}</span>
                        <span className="price"><b style={{'color':'#128972', 'fontWeight':'800'}}>Price:</b> <span style={{'color':'#128972', 'fontWeight':'500'}}>{props.price}</span></span>
                        <Spacer />
                        <div className="modify-quantity">
                            <button onClick={() => updateTotal('+')}>+</button><button onClick={() => updateTotal('-')}>-</button>
                        </div>
                        <Spacer pb={4} />
                        <span><b style={{'color':'#128972', 'fontWeight':'800'}}>Qty: </b> &nbsp;<span style={{'color':'#128972', 'fontWeight':'600'}}>{totalItem}&nbsp;{totalItem>0?props.name:null}</span></span>
                    </div>
                </div>
                <Spacer />
                <Spacer />
                <span><b style={{'color':'#128972', 'fontWeight':'800'}}>Total: </b><span style={{'color':'#128972', 'fontWeight':'500'}}>₹{totalPrice}</span></span>
                <Spacer />
                <button onClick={() => addItemToCart(props.img, props.name, totalItem, totalPrice)}>Add to Cart</button>
            </div>
        </div>
    );
}


export default Store