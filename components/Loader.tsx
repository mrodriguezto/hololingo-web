import { Box, CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: 3 }}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
