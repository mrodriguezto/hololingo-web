import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: 'Este campo no es válido',
    required: 'Este campo es requerido',
  },
  string: {
    min: 'Debe ser mayor a ${min}',
    max: 'Debe ser menor a ${max}',
    email: 'No es un email válido',
  },
});

export default yup;
