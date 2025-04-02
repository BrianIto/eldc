import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../utils/consts';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  URL = BASE_API_URL + 'categories';

  constructor(private httpClient: HttpClient) {}

  getAll(pageNumber: number, pageSize: number) {
    return this.httpClient.get<{ id: number; name: string }[]>(this.URL, {
      params: { pageNumber, pageSize },
    });
  }

  create(category: Partial<{ name: string | null }>) {
    return this.httpClient.post(this.URL, category);
  }

  delete(id: number) {
    return this.httpClient.delete(this.URL + '/' + id);
  }
}
