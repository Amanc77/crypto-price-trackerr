import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
// Style Component
import "./Home.css";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    setInput(event.target.value);

    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });

    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>Crypto Price Tracker</h1>

        <p>
          Welcome to the world's largest cryptocurrency marketplace. <br /> Sign
          up to explore more about cryptos.
        </p>

        <form onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            list="coinlist"
            value={input}
            type="text"
            placeholder="Search crypto..."
            required
          />

          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Name</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>1H %</p>
          <p style={{ textAlign: "center" }}>24H %</p>
          <p style={{ textAlign: "center" }}>7D %</p>
          <p className="market-cap">Market Cap</p>
          <p className="volume">Volume(24h)</p>
          <p className="circulating-Supply">Circulating Supply</p>
          <p className="last-7daysImage">Last 7 Days</p>
        </div>

        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>

            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>

            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>

            <p
              className={
                item.price_change_percentage_1h_in_currency > 0
                  ? "green"
                  : "red"
              }
            >
              {item.price_change_percentage_1h_in_currency != null
                ? item.price_change_percentage_1h_in_currency.toFixed(2)
                : "N/A"}
            </p>

            <p
              className={
                item.price_change_percentage_24h_in_currency > 0
                  ? "green"
                  : "red"
              }
            >
              {item.price_change_percentage_24h_in_currency != null
                ? item.price_change_percentage_24h_in_currency.toFixed(2)
                : "N/A"}
            </p>

            <p
              className={
                item.price_change_percentage_7d_in_currency > 0
                  ? "green"
                  : "red"
              }
            >
              {item.price_change_percentage_7d_in_currency != null
                ? item.price_change_percentage_7d_in_currency.toFixed(2)
                : "N/A"}
            </p>

            <p className="market-cap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>

            <p className="volume">
              {currency.symbol} {item.total_volume?.toLocaleString() ?? "N/A"}
            </p>

            <p className="circulating-Supply">
              {item.circulating_supply?.toLocaleString() ?? "N/A"}
            </p>

            <p className="last-7daysImage">
              <img
                src={`https://quickchart.io/chart?c=${encodeURIComponent(
                  JSON.stringify({
                    type: "line",
                    data: {
                      labels: Array(item.sparkline_in_7d.price.length).fill(""),
                      datasets: [
                        {
                          data: item.sparkline_in_7d.price,
                          borderColor:
                            item.sparkline_in_7d.price.at(-1) >=
                            item.sparkline_in_7d.price[0]
                              ? "#06C270"
                              : "#E74C3C",
                          borderWidth: 2,
                          fill: false,
                          tension: 0.4,
                        },
                      ],
                    },
                    options: {
                      plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false },
                      },
                      scales: {
                        x: { display: false },
                        y: { display: false },
                      },
                      elements: { point: { radius: 0 } },
                      layout: { padding: 0 },
                      backgroundColor: "white",
                    },
                  })
                )}`}
                alt="7d trend"
                style={{
                  width: "100%",
                  height: "55px",
                  objectFit: "cover",

                  backgroundColor: "white",
                }}
              />
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
