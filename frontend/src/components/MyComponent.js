import React, { useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const MyComponent = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [cidrInput, setCidrInput] = useState('');

  const fetchDataIPv4 = async () => {
    try {
      const response = await axios.post('http://localhost:4000/calculate-subnet', { cidr: cidrInput });
      setResult(response.data);
      setError('');
    } catch (error) {
      setError('Error fetching data');
      setResult(null);
    }
  };

  const handleInputChange = (event) => {
    setCidrInput(event.target.value);
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField
            label="Ingrese una dirección IP (Ej: 192.168.1.0/24)"
            variant="outlined"
            fullWidth
            value={cidrInput}
            onChange={handleInputChange}
            placeholder="Ej: 192.168.1.0/24"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={fetchDataIPv4}>Fetch Data IPv4</Button>
        </Grid>
      </Grid>
      
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      {result && (
        <div>
          <Typography variant="h6" gutterBottom>Datos:</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Dirección de Red</TableCell>
                  <TableCell>Primer IP</TableCell>
                  <TableCell>Última IP</TableCell>
                  <TableCell>Broadcast</TableCell>
                  <TableCell>Máscara de Subred</TableCell>
                  <TableCell>Número de Hosts</TableCell>
                  <TableCell>Longitud de Prefijo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{result.mainSubnet.networkAddress}</TableCell>
                  <TableCell>{result.mainSubnet.startAddress}</TableCell>
                  <TableCell>{result.mainSubnet.endAddress}</TableCell>
                  <TableCell>{result.mainSubnet.broadcastAddress}</TableCell>
                  <TableCell>{result.mainSubnet.subnetMask}</TableCell>
                  <TableCell>{result.mainSubnet.numberOfAddresses}</TableCell>
                  <TableCell>{result.mainSubnet.prefixLength}</TableCell>
                </TableRow>
                {result.subnets.map((subnet, index) => (
                  <TableRow key={index}>
                    <TableCell>{subnet.networkAddress}</TableCell>
                    <TableCell>{subnet.startAddress}</TableCell>
                    <TableCell>{subnet.endAddress}</TableCell>
                    <TableCell>{subnet.broadcastAddress}</TableCell>
                    <TableCell>{subnet.subnetMask}</TableCell>
                    <TableCell>{subnet.numberOfAddresses}</TableCell>
                    <TableCell>{subnet.prefixLength}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default MyComponent;