import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../utils/consts';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  URL = BASE_API_URL + 'devices';

  constructor(private httpClient: HttpClient) {}

  getAll(pageNumber: number, pageSize: number) {
    return this.httpClient.get<
      {
        category: { id: number; name: string };
        partNumber: number;
        color: string;
        id: number;
      }[]
    >(this.URL, {
      params: { pageNumber, pageSize },
    });
  }

  create(
    device: Partial<{
      category: { id?: number, name?: string } | null;
      partNumber: number | null | undefined;
      color: string | null | undefined;
    }>,
  ) {
    return this.httpClient.post(this.URL, device);
  }

  delete(id: number) {
    return this.httpClient.delete(this.URL + '/' + id);
  }
}
