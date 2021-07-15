import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoggingData, UsageLog} from "interacto";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  fetchUsageLogs(): Promise<Array<UsageLog>> {
    return this.httpClient
      .get<Array<UsageLog>>('/api/usage')
      .toPromise();
  }

  fetchErrorLogs(): Promise<Array<LoggingData>> {
    return this.httpClient
      .get<Array<LoggingData>>('/api/err')
      .toPromise();
  }

  async deleteErrorLogs() {
    await this.httpClient.delete('/api/err').subscribe(() => {});
  }

  async deleteUsageLogs() {
    await this.httpClient.delete('/api/usage').subscribe(() => {});
  }
}
