export interface Environment {
    API_URL: string;
  }
  
export const environment = {
    apiUrl: process.env["API_URL"] || 'http://localhost:5000',
  }