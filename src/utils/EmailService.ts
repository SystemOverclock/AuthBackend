import axios from 'axios';

const API_URL = 'https://n8n.jrmendonca.com.br/webhook';

export const sendEmail = async (email: string, code: string) => {
  const response = await axios.post(`${API_URL}/sendmail`, { "to": email, "subject": "Código de autenticação", "message": `Seu código de autenticação é: ${code}` }, { headers: { 'Content-Type': 'application/json', 'Token': 'xptoxptoxptoxptoxptoxpto' } }  );
  return response.data;
};