import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

const IpCalculator = () => {
  const [cidr, setCidr] = useState('');
  const [ip, setIp] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const validateCIDR = (cidr) => {
    const cidrPattern = /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/;
    return cidrPattern.test(cidr);
  };

  const validateIP = (ip) => {
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipPattern.test(ip);
  };

  const calculateIPv4 = async () => {
    if (!validateCIDR(cidr)) {
      setError('Formato de CIDR inválido. Ejemplo correcto: 192.168.1.0/24');
      return;
    }
    setError('');
    try {
      const response = await axios.post('http://localhost:4000/calculate-ipv4', { cidr });
      setResult(response.data);
    } catch (error) {
      console.error('Error calculating CIDR:', error);
      setError('Error calculating CIDR');
    }
  };

  const calculateIPv4Single = async () => {
    if (!validateIP(ip)) {
      setError('Formato de IP inválido. Ejemplo correcto: 192.168.1.1');
      return;
    }
    setError('');
    try {
      const response = await axios.post('http://localhost:4000/calculate-ipv4-single', { ip });
      setResult(response.data);
    } catch (error) {
      console.error('Error calculating IP:', error);
      setError('Error calculating IP');
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Calculador de IPv4
        </Typography>
        <TextField
          label="CIDR Notation"
          variant="outlined"
          value={cidr}
          onChange={(e) => setCidr(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={calculateIPv4}>
          Calcular CIDR
        </Button>
        <TextField
          label="Dirección IP"
          variant="outlined"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={calculateIPv4Single}>
          Calcular IP
        </Button>
        {error && (
          <Alert severity="error" style={{ marginTop: '20px' }}>
            {error}
          </Alert>
        )}
        {result && (
          <Box mt={4}>
            <Typography variant="h6">Resultados:</Typography>
            <Typography>Dirección: {result.address}</Typography>
            <Typography>Subred: {result.subnet}</Typography>
            <Typography>Primer Host: {result.firstHost}</Typography>
            <Typography>Último Host: {result.lastHost}</Typography>
            <Typography>Número de Hosts: {result.numberOfHosts}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default IpCalculator;