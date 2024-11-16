import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';


@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const url = 'http://hello-service.default.svc.cluster.local/hello';
    return fetchData(url)
  }
}

// Defina a interface para o tipo de dados que você espera da resposta
interface ApiResponse {
  data: string; 
}

// Função para fazer a chamada HTTP
async function fetchData(url: string): Promise<string> {
  try {
    const response: AxiosResponse<string> = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error message: ', error.message);
      throw new Error('Failed to fetch data');
    } else {
      console.error('Unexpected error: ', error);
      throw new Error('An unexpected error occurred');
    }
  }
}