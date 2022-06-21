export function ItemCard(props){
    const {
        id,
        name,
        description,
        price,
        full_background,
        addToBasket = Function.prototype,
    } = props;  
    return( 
    <div className="card">
        <div className="card-image">
          <img src={full_background} alt={name}/>
        </div>
        <div className="card-content">
         <span className="card-title">{name}</span>
          <p> {description}</p>
        </div>
        <div class="card-action">
          <button className="btn" onClick={() => addToBasket({id,name,price})}>Купить</button>
          <span className="right" style={{fontSize:'1.5rem'}}>{price} руб.</span>
        </div>
      </div>
     
    );
}