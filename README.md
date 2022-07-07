![A screenshot of currency converter with historical graph](https://github.com/abrarum/currency_converter/blob/main/demo_currency_convert.png)

# currency_converter

## [Live Demo](https://currency-converter-self.vercel.app/)

## how to run?

1. npm install on root.
2. npm start

## Features

1. Convert a specific amount between EUR, USD and CHF.
2. Historical graph of unlimited currency rates for 2 weeks duration
3. Data persistence in LocalStorage for graph.
4. Manual update trigger to update historical graph.
5. Multi-select currency display on graph.
6. Used MUI library for a sleek look + add. styling for proper displaying

## Tools

1. Frontend (Typescript with Javascript(JSX), React)
2. Libraries (MUI, React-Chartjs-2, Color-Scheme)
3. Backend (LocalStorage to persist history api)
4. APIs (ApiLayer aka currencyLayer for both /convert and /history endpoints) - OpenExchangeRates api had restrictions esp. with the source property which was vital for /convert to work.
5. IDE (CodeSandBox b.c its easy to setup and ready to go)

## What could be improved

1. More code refactoring
2. Mobile responsiveness
3. Data persistence for conversion as well
