import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";
import { GenSimilarColors } from "../shared/utility";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({
  currencies,
  history,
  updateStatus,
  updateHistory
}) {
  const [currencySelect, setCurrencySelect] = React.useState<string[]>([]);
  const [graphData, setGraphData] = React.useState({
    labels: [],
    datasets: [{}]
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const
      },
      title: {
        display: true,
        text: "Daily currency rates"
      }
    }
  };

  useEffect(() => {
    if (currencySelect.length !== 0) {
      const labels = history.quotes ? Object.keys(history.quotes) : [];

      let itemStruct = {
        labels: labels,
        datasets: []
      };
      currencySelect.forEach((item) => {
        let colorScheme = GenSimilarColors();
        itemStruct.datasets.push({
          label: item,
          data: history.quotes
            ? Object.entries(history.quotes).map(
                ([key, val]) => val["EUR" + item]
              )
            : [],
          borderColor: "#" + colorScheme[1],
          backgroundColor: "#" + colorScheme[0]
        });
      });
      setGraphData(itemStruct);
    }
  }, [currencySelect]);

  const handleChange = (event: SelectChangeEvent<typeof currencySelect>) => {
    const {
      target: { value }
    } = event;
    setCurrencySelect(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  console.log("updateHistoryX", updateHistory);

  return (
    <Paper>
      <Box className="chart_fields">
        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel id="demo-multiple-checkbox-label">Currencies</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={currencySelect}
            onChange={handleChange}
            input={<OutlinedInput label="Currencies" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {Object.keys(currencies).map((currency) => (
              <MenuItem key={currency} value={currency}>
                <Checkbox checked={currencySelect.indexOf(currency) > -1} />
                <ListItemText primary={currency} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={() => updateStatus(true)} variant="outlined">
          Update
        </Button>
        <CircularProgress
          style={{ display: updateHistory ? "block" : "none" }}
        />
      </Box>
      <Line className="chart_graph" options={options} data={graphData} />
    </Paper>
  );
}
