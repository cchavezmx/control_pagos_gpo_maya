import dayjs from "dayjs";

const createTitle = (titleHeader: string, prefix: string) => {
  const [title, subtitle] = titleHeader.split(prefix);

  return {
    title: title,
    subtitle: subtitle,
  };
};

const currencyValueGetter = (params: number) => {
  let value = 0
  if (typeof params === 'object') {
    value = parseFloat(params["$numberDecimal"]);
  } else {
    value = params
  }
  return Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format((value));
}

const dayformatValueGutter = (params: string) => {  
  return dayjs(params).format("DD/MM/YY")
}

const styleModal = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export { createTitle, currencyValueGetter, dayformatValueGutter, styleModal };
