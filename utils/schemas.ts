import yup from 'utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const loginResolver = yupResolver(
  yup
    .object({
      email: yup.string().max(50).email().required(),
      password: yup.string().max(24).required(),
    })
    .required(),
);
