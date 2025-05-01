import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency, loading, error } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value === "") {
      setDisplayCoin(allCoin);
    } else {
      const coins = allCoin.filter((coin) =>
        coin.name.toLowerCase().includes(value.toLowerCase())
      );
      setDisplayCoin(coins);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (input === "") {
      setDisplayCoin(allCoin);
    } else {
      const coins = allCoin.filter((coin) =>
        coin.name.toLowerCase().includes(input.toLowerCase())
      );
      setDisplayCoin(coins.length > 0 ? coins : allCoin);
    }
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  if (loading)
    return <div className="text-center mt-10 text-white">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="px-4 text-white font-sans sm:px-6">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mt-5 space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Crypto Price Tracker
        </h1>
        <p className="text-sm sm:text-base text-gray-300 font-medium">
          Welcome to the world's largest cryptocurrency marketplace.
          <br />
          Sign up to explore more about cryptos.
        </p>
        <form
          onSubmit={searchHandler}
          className="flex items-center gap-2 bg-[#1a1333] border border-gray-600 rounded-lg px-3 py-2 w-full mx-auto mt-6 sm:w-4/5"
        >
          <input
            type="text"
            placeholder="Search crypto..."
            value={input}
            onChange={inputHandler}
            list="coinlist"
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm sm:text-base font-medium tracking-wide"
          />
          <datalist id="coinlist">
            {allCoin.map((coin, i) => (
              <option key={i} value={coin.name} />
            ))}
          </datalist>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition text-sm sm:text-base"
          >
            Search
          </button>
        </form>
      </div>

      {/* Table Section */}
      <div className="max-w-7xl mx-auto mt-8 sm:mt-12 bg-gradient-to-br from-purple-800/20 to-purple-900/10 rounded-xl overflow-x-auto">
        <div className="hidden sm:grid sm:grid-cols-[0.4fr_2.5fr_1fr_1fr_1fr_2fr_2fr_2.5fr] text-xs sm:text-sm font-semibold text-gray-300 px-3 sm:px-5 py-3 border-b border-gray-700">
          <p>#</p>
          <p>Name</p>
          <p>Price</p>
          <p className="text-center">1H %</p>
          <p className="text-center">24H %</p>
          <p className="text-right">Market Cap</p>
          <p className="text-right">Volume(24h)</p>
          <p className="text-right">Circulating Supply</p>
        </div>

        <div className="w-full">
          {displayCoin.length > 0 ? (
            displayCoin.slice(0, 10).map((coin) => (
              <Link
                to={`/coin/${coin.id}`}
                key={coin.id}
                className="block sm:grid sm:grid-cols-[0.4fr_2.5fr_1fr_1fr_1fr_2fr_2fr_2.5fr] items-center px-3 sm:px-5 py-4 border-b border-gray-700 hover:bg-gray-800 transition-all text-xs sm:text-sm font-medium w-full"
              >
                <div className="sm:hidden flex items-center gap-3">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                  <div className="flex-1">
                    <p className="font-semibold tracking-wide">
                      {coin.name} - {coin.symbol.toUpperCase()}
                    </p>
                    <p className="text-gray-400">#{coin.market_cap_rank}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold tracking-wide">
                      {currency.symbol} {coin.current_price.toLocaleString()}
                    </p>
                    <p
                      className={`${
                        coin.price_change_percentage_24h_in_currency > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h_in_currency?.toFixed(
                        2
                      ) ?? "N/A"}
                      % (24h)
                    </p>
                  </div>
                </div>

                <p className="hidden sm:block">{coin.market_cap_rank}</p>
                <div className="hidden sm:flex items-center gap-2">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                  <p className="font-semibold tracking-wide">
                    {coin.name} - {coin.symbol.toUpperCase()}
                  </p>
                </div>
                <p className="hidden sm:block font-semibold tracking-wide">
                  {currency.symbol} {coin.current_price.toLocaleString()}
                </p>
                <p
                  className={`hidden sm:block text-center tracking-wide ${
                    coin.price_change_percentage_1h_in_currency > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_1h_in_currency?.toFixed(2) ??
                    "N/A"}
                  %
                </p>
                <p
                  className={`hidden sm:block text-center tracking-wide ${
                    coin.price_change_percentage_24h_in_currency > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h_in_currency?.toFixed(2) ??
                    "N/A"}
                  %
                </p>
                <p className="hidden sm:block text-right tracking-wide">
                  {currency.symbol} {coin.market_cap?.toLocaleString() ?? "N/A"}
                </p>
                <p className="hidden sm:block text-right tracking-wide">
                  {currency.symbol}{" "}
                  {coin.total_volume?.toLocaleString() ?? "N/A"}
                </p>
                <p className="hidden sm:block text-right tracking-wide">
                  {coin.circulating_supply?.toLocaleString() ?? "N/A"}
                </p>
              </Link>
            ))
          ) : (
            <div className="text-center mt-10 text-gray-400">
              No coins found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
