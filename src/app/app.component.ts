import {AfterViewInit, Component} from '@angular/core';
import {ApiService} from "./api.service";
import {LoggingData, UsageLog} from "interacto";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  public usageLogs: Array<UsageLog> = new Array<UsageLog>();
  public errorLogs: Array<LoggingData> = new Array<LoggingData>();
  title = 'logger-backoffice';

  constructor(private apiService: ApiService) {}

  ngAfterViewInit(): void {
    this.refreshData();
  }

  public refreshData(): void {
    this.apiService.fetchUsageLogs().then(data => {
      this.usageLogs = data;
    });
    this.apiService.fetchErrorLogs().then(data => {
      this.errorLogs = data;
    });
  }
}
