import {Fragment} from 'react';
import meals from '../../assests/meals.jpg';
import classes from './Header.module.css';
import HeaderCardBtn from './HeaderCartBtn';
const Header=props=>{
    return<Fragment>
     <header className={classes.header}>
     <h1>Meals</h1>
     <HeaderCardBtn onClick={props.onShowCart}></HeaderCardBtn>
     </header>
     <div className={classes['main-image']}>
      <img src={meals} alt="fooddd"/>
     </div>

    </Fragment>
};


export default Header;