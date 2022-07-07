import ColorScheme from "color-scheme";
import {RequestOptionsType} from './types'

export function FormatDate(date: Date, joinBy: string) {
  const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
  const formattedDate = String(date.getDate()).padStart(2, "0");
  return [date.getFullYear(), formattedMonth, formattedDate].join(joinBy);
}

function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function GenSimilarColors() {
  const schemeRand = getRandomArbitrary(1, 12);
  const colorRand = getRandomArbitrary(0, 11);
  const scheme = new ColorScheme();
  scheme
    .from_hue(schemeRand) // Start the scheme
    .scheme("triade") // Use the 'triade' scheme, that is, colors
    // selected from 3 points equidistant around
    // the color wheel.
    .variation("soft"); // Use the 'soft' color variation
  const colors = scheme.colors();
  return [colors[colorRand], colors[colorRand + 1]];
}

export function FetchConfig() {
  var myHeaders = new Headers();
  myHeaders.append("apikey", process.env.REACT_APP_APP_ID);

  var requestOptions: RequestOptionsType = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  return requestOptions;
}

export function SetItem(key: string, item: {}) {
  localStorage.setItem(key, JSON.stringify(item));
}

export function GetItem(key: string) {
  const item = localStorage.getItem(key);
  if (!item) {
    return null;
  }
  return JSON.parse(item);
}
