export interface Environment {
    API_URL: string;
  }
  
export const environment : Environment= {
    API_URL: process.env["API_URL"] || 'http://localhost:5000',
  }