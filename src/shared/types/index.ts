export type DefaultCurrencies = {
  curr1: string;
  curr2: string;
  amount: number;
};

export type RequestOptionsType = {
  method: string;
  headers: Headers;
  redirect: RequestRedirect | undefined;
};

export type ChartProps = {
  currencies: { [key: string]: string }[];
  history: { [key: string]: {} }[];
  updateStatus: Function;
  updateHistory: Boolean;
};

export type GraphDataProps = {
  labels: string[];
  datasets: [];
};
