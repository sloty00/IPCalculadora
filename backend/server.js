import express from 'express';
import bodyParser from 'body-parser';
import ip from 'ip';
import cors from 'cors'; // Importa cors directamente desde el módulo

const app = express();
const port = 4000;

app.use(cors()); // Usa cors como middleware

app.use(bodyParser.json());

const calculateSubnet = (cidr) => {
  try {
    const subnet = ip.cidrSubnet(cidr);
    const prefixLength = subnet.subnetMaskLength;

    // Verificar si el prefijo es mayor o igual a 24 para IPv4 relevante en el último octeto
    if (prefixLength >= 24) {
      const networkAddress = subnet.networkAddress;
      const broadcastAddress = subnet.broadcastAddress;
      const subnetMask = subnet.subnetMask;
      const numberOfAddresses = subnet.numHosts;
      
      // Calculamos la información de la subred principal
      const subnetInfo = {
        networkAddress,
        startAddress: subnet.firstAddress,
        endAddress: subnet.lastAddress,
        broadcastAddress,
        subnetMask,
        numberOfAddresses,
        prefixLength,
      };

      // Calculamos las subredes
      const subnets = [];
      const [baseIp] = cidr.split('/');
      const baseAddress = ip.toLong(baseIp);
      const numSubnets = Math.pow(2, 32 - prefixLength);

      for (let i = 2; i < numSubnets; i++) {
        const startIp = ip.fromLong(baseAddress + i * numberOfAddresses);
        const endIp = ip.fromLong(baseAddress + (i + 1) * numberOfAddresses - 1);
        const subnet = ip.cidrSubnet(`${startIp}/${prefixLength}`);
        
        subnets.push({
          networkAddress: subnet.networkAddress,
          startAddress: subnet.firstAddress,
          endAddress: subnet.lastAddress,
          broadcastAddress: subnet.broadcastAddress,
          subnetMask: subnet.subnetMask,
          numberOfAddresses: subnet.numHosts,
          prefixLength: subnet.subnetMaskLength
        });
      }

      return {
        mainSubnet: subnetInfo,
        subnets
      };
    } else {
      // Manejar casos donde el prefijo es menor a 24 (último octeto no relevante)
      return {
        error: 'Prefijo de subred menor a 24 no soportado',
      };
    }
  } catch (error) {
    throw new Error('Error calculating CIDR');
  }
};



app.post('/calculate-subnet', (req, res) => {
  const { cidr } = req.body;
  try {
    const subnetInfo = calculateSubnet(cidr);
    res.json(subnetInfo);
  } catch (error) {
    res.status(500).json({ error: 'Error calculating CIDR' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});