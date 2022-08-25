import { format as fnsFormat } from 'date-fns';
import { es } from 'date-fns/locale';

const format = (date: string) => {
  const formattedDate = fnsFormat(new Date(date), 'd MMM, Y - hh:ss', {
    locale: es,
  });

  return formattedDate;
};

const formatDate = {
  format,
};

export default formatDate;
