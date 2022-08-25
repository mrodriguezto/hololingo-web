import { Box } from '@mui/material';
import { DataGrid, GridColumns, GridRowsProp, GridToolbar } from '@mui/x-data-grid';

type Props = {
  rows: GridRowsProp;
  columns: GridColumns;
};

const Table = ({ rows, columns }: Props) => {
  return (
    <Box display="flex" sx={{ height: 'calc(100vh - 150px)', width: '100%' }}>
      <DataGrid
        density="standard"
        rows={rows}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
        autoPageSize
        disableColumnMenu
      />
    </Box>
  );
};

export default Table;
