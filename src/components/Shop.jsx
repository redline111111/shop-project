import {useState,useEffect} from "react"
import {API_KEY,API_URL} from '../config'
import {Preloader} from './Preloader'
import {ItemsList} from './ItemsList.jsx'
import {Cart} from './Cart'
import {BasketList} from './BasketList'
import {Alert   } from './Alert'
function Shop(){
    const [items, setItems] = useState([]);
    const [loading,setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow,setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');


    const removeFromBasket =(itemId) =>{
        const newOrder = order.filter(el => el.id !== itemId);
        setOrder(newOrder);

    }

    const addToBasket = (item) =>{
        const itemIndex = order.findIndex(elem => elem.id === item.id);
        
        if(itemIndex < 0){
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder([...order, newItem]);
        }else{
            const newOrder = order.map(((orderItem, index) => {
                if(index === itemIndex){
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    }
                }else{
                    return orderItem;
                }
            }))
            setOrder(newOrder);
        }
        setAlertName(item.name);
    }

    const handleBaskeShow = () =>{
        setBasketShow(!isBasketShow);
    }

    const incQuantity = (itemId) =>{
        const newOrder = order.map((elem) => {
            if(elem.id === itemId){
                const newQuantity = elem.quantity + 1;
                return{
                    ...elem,
                    quantity: newQuantity,
                }
        }else{
            return elem;
        }
    });
    setOrder(newOrder);
}

    const decQuantity = (itemId) =>{
        const newOrder = order.map((elem) => {
            if(elem.id === itemId){
                const newQuantity = elem.quantity - 1;
                return{
                    ...elem,
                    quantity: newQuantity >= 0 ? newQuantity : 0,
                }
        }else{
            return elem;
        }
    });
    setOrder(newOrder);
    }
    const closeAlertName = () =>{
        setAlertName('');
    }
    useEffect(function getItems(){
        fetch(API_URL,{
            headers: {
                Authorization: API_KEY,
            },  
        }).then((response) => response.json())
          .then((data) => {
                data.featured && setItems(data.featured);
                setLoading(false);
            });
    }, []);

    return(<main className="container content">
            <Cart quantity = {order.length} handleBaskeShow = {handleBaskeShow}/>
            {loading ? <Preloader/> : <ItemsList goods = {items} addToBasket = {addToBasket}/>}
            {
                isBasketShow && (<BasketList order ={order} handleBaskeShow = {handleBaskeShow} removeFromBasket = {removeFromBasket} incQuantity ={incQuantity} decQuantity={decQuantity}/>)
            }
            {
                alertName && <Alert name ={alertName} closeAlertName= {closeAlertName}/>
            }
        </main>
    )
}
export {Shop}   