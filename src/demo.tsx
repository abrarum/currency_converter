import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Converter from "./components/Converter";
import Chart from "./components/Chart";
import { FormatDate, FetchConfig, SetItem, GetItem } from "./shared/utility";
import constants from "./shared/constants";
import styled from "styled-components";

/* styling */
const GithubLink = styled.a`
  display: block;
  width: 100%;
  text-align: center;
`;

export default function BasicSelect() {
  const [historyRates, setHistoryRates] = useState<{ [key: string]: {} }[]>([]);
  const [updateHistory, setUpdateHistory] = useState(false);
  const [currencyList, setCurrencyList] = useState<{ [key: string]: string }[]>(
    []
  );
  const requestOptions = FetchConfig();

  const fetchHistoricalRates = () => {
    const historyList = GetItem(constants.LS_HISTORY);
    if (historyList && !updateHistory) {
      setHistoryRates(historyList);
    } else {
      const dateNow = new Date();
      const pastDays = 14;
      const end_date = FormatDate(dateNow, "-");
      const start_date = FormatDate(
        new Date(dateNow.setDate(dateNow.getDate() - pastDays)),
        "-"
      );
      fetch(
        `https://api.apilayer.com/currency_data/timeframe?start_date=${start_date}&end_date=${end_date}&source=EUR`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setHistoryRates(result.quotes);
          SetItem(constants.LS_HISTORY, result.quotes);
        })
        .catch((error) => console.log("error", error));

      setUpdateHistory(false);
    }
  };

  const fetchCurrencies = () => {
    const currenciesList = GetItem(constants.LS_CURRENCIES);
    if (currenciesList && !updateHistory) {
      setCurrencyList(currenciesList);
    } else {
      fetch("https://api.apilayer.com/currency_data/list", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setCurrencyList(result.currencies);
          SetItem(constants.LS_CURRENCIES, result.currencies);
        })
        .catch((error) => console.log("error", error));
      setUpdateHistory(false);
    }
  };

  useEffect(() => {
    fetchCurrencies();
    fetchHistoricalRates();
  }, [updateHistory]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <GithubLink
        target="_blank"
        href="https://github.com/abrarum/currency_converter"
      >
        Github
      </GithubLink>
      <Converter />
      <Chart
        updateHistory={updateHistory}
        updateStatus={setUpdateHistory}
        currencies={currencyList}
        history={historyRates}
      />
    </Box>
  );
}
