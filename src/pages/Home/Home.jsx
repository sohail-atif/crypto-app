import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {

  const {allCoin, currency} = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (event)=>{
    setInput(event.target.value);
    if(event.target.value === ""){
      setDisplayCoin(allCoin);
    }
  }

  const searchHandler = async (event) => {
    event.preventDefault();

    const tickerSymbolRegex = /^[A-Z]{3,5}$/;
    if (tickerSymbolRegex.test(input.trim())) {
      
        const coins = await allCoin.filter((item) => {
            return item.symbol.toUpperCase() === input.toUpperCase();
        });
        setDisplayCoin(coins);
        return; 
    }

    if (input.length < 3 || input.length > 30) {
        alert("Please enter between 3 and 30 characters.");
        return; 
    }
    
    const specialCharRegex = /^[A-Za-z0-9\s-]*$/;
    if (!specialCharRegex.test(input)) {
        alert("Please avoid special characters except hyphen (-).");
        return; 
    }

    const coins = await allCoin.filter((item) => {
        return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
};
  useEffect(()=>{
    setDisplayCoin(allCoin);
  },[allCoin])

  return (
    <div className='home'>
      <div className='hero'>
        <h1>Largest<br/> Crypto Platform</h1>
        <p>Search away and track your favorite coins with ease</p>
        <form onSubmit={searchHandler}>

          <input onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='Search crypto..' required/>

        <datalist id='coinlist'>
          {allCoin.map((item, index)=>(<option key={index} value={item.name}/>))}
        </datalist>

          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:"center"}}>24h Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        { 
          displayCoin.slice(0,10).map((item, index)=>(
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h>0?"green":"red"}>
                {Math.floor(item.price_change_percentage_24h*100)/100}</p>
              <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home