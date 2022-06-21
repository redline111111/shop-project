import {useEffect} from 'react'

function Alert(props){
    const {name = '', closeAlertName = Function.prototype} = props;

    useEffect(() => {
        const timerId = setTimeout(closeAlertName, 3000);

        return () =>{
            clearTimeout(timerId);
        };
    },[name]);

    return <div className="" id="toast-container">
        <div className="toast">
            {name} добавлен в корзину
        </div>
    </div>
}

export {Alert}