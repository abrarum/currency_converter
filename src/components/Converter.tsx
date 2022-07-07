import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import constants from "../shared/constants";
import { DefaultCurrencies } from "../shared/types";
import TextField from "@mui/material/TextField";
import { FetchConfig } from "../shared/utility";
import Paper from "@mui/material/Paper";
import "../global.css"

const defaultValues: DefaultCurrencies = {
  curr1: Object.keys(constants.CURRENCIES)[0],
  curr2: Object.keys(constants.CURRENCIES)[1],
  amount: 0
};

export default function Converter() {
  const [formValues, setFormValues] = useState(defaultValues);
  const [rates, setRates] = useState(0);
  const requestOptions = FetchConfig();

  const fetchConvertRates = () => {
    // setRates(100.25);

    fetch(
      `https://api.apilayer.com/currency_data/convert?to=${
        formValues.curr2
      }&from=${formValues.curr1}&amount=${formValues.amount.toString()}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setRates(result.result.toFixed(2));
      })
      .catch((error) => console.log("error", error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>): void => {
    setRates(0);
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetchConvertRates();
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <form onSubmit={handleSubmit}>
        <Paper className="currency_form">
          <Typography className="currency_result" variant="h2">
            {constants.CURRENCIES[formValues.curr2 as keyof typeof constants.CURRENCIES]}
            {rates}
          </Typography>

          <Box className="currency_fields">
            <TextField
              id="demo-simple-select"
              label="amount"
              name="amount"
              value={formValues.amount}
              onChange={handleInputChange}
            />
            <FormControl>
              <InputLabel id="demo-simple-select-label">From</InputLabel>
              <Select
                id="demo-simple-select"
                name="curr1"
                value={formValues.curr1}
                onChange={handleInputChange}
              >
                {Object.keys(constants.CURRENCIES).map((currency) => {
                  if (currency !== formValues.curr2) {
                    return (
                      <MenuItem key={currency} value={currency}>
                        {" "}
                        {currency}{" "}
                      </MenuItem>
                    );
                  } else {
                    return null;
                  }
                })}
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="demo-simple-select-label">To</InputLabel>
              <Select
                id="demo-simple-select"
                name="curr2"
                value={formValues.curr2}
                onChange={handleInputChange}
              >
                {Object.keys(constants.CURRENCIES).map((currency) => {
                  if (currency !== formValues.curr1) {
                    return (
                      <MenuItem key={currency} value={currency}>
                        {" "}
                        {currency}{" "}
                      </MenuItem>
                    );
                  } else {
                    return null;
                  }
                })}
              </Select>
            </FormControl>
          </Box>
          <Button
            className="currency_submit"
            type="submit"
            variant="contained"
            size="large"
          >
            {" "}
            Convert{" "}
          </Button>
        </Paper>
      </form>
    </Box>
  );
}
