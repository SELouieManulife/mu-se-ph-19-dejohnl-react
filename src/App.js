import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useState } from "react";

import './App.css';

const EMPLOYEES_QUERY = gql`
  query GetEmployees {
    employees {
      id
      name
      dob
      title
      department
    }
  }
`;

const EMPLOYEE_QUERY = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      name
      dob
      title
      department
    }
  }
`;

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'dob', headerName: 'Date of Birth', width: 100 },
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'department', headerName: 'Department', width: 250 },
];

function App() {
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const { data, loading, error } = useQuery(EMPLOYEES_QUERY);
  const { data: employee, loading: loadingEmployee, error: errorEmployee } = useQuery(EMPLOYEES_QUERY, {variables: {id: '1'}});
  console.log(employee);
  return (
    <div className="App">
      {!loading ? 
      <DataGrid
        rows={data?.employees}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onRowClick={(e) => setSelectedEmployee(e)}
      /> : <label>Loading ...</label>}
      
    <Button variant="contained" onClick={() => alert()}>VIEW DETAILS</Button>
    </div>
  );
}

export default App;
