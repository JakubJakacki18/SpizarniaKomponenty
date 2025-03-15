export interface Environment {
    SQL_URL: string;
  }
  
export const environment : Environment = {
    SQL_URL: process.env["SQL"] || 'localhost',
  }