import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'email',
    sortable: false,
    width: 160,
    valueGetter: (value, rows) => `${rows.email || '' }`,
  },
];


const  Table=({dataApi})=> {
     
        
  return (
    
    <div style={{ height: 400, width: '100%' ,backgroundColor:'white',marginTop:'200px'}}>
      <DataGrid
        rows={[{id: '662b553975984ef29ecbb47e', email: 'test62@gmail.com'}]}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
export default Table;