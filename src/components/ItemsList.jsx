import {ItemCard} from './ItemCard'

function ItemsList(props){
    const {goods = [], addToBasket = Function.prototype} = props;
   
    if(!goods.length){
        return <h3>Ничего не найдено</h3>
    }

    return( <div className="items">

        {goods.map(item => (
            <ItemCard key={item.id} {...item} addToBasket = {addToBasket}/>
        ))}
    </div>
    );
}

export {ItemsList}