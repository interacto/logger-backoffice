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
  columnsToDisplay = ['name','sessionID', 'date', 'duration', 'cancelled'];
  title = 'logger-backoffice';

  constructor(private apiService: ApiService) {}

  ngAfterViewInit(): void {
    this.refreshData();
  }
  //TODO: merge logs?
  public refreshData(): void {
    this.apiService.fetchUsageLogs().then(data => {
      this.usageLogs = data;
    });
    this.apiService.fetchErrorLogs().then(data => {
      this.errorLogs = data;
    });
  }

  public deleteData(): void {
    if(confirm('Do you really want to delete all logs from the server?')) {
      this.apiService.deleteUsageLogs().then(() => this.usageLogs = []);
      this.apiService.deleteErrorLogs().then(() => this.errorLogs = []);
    }
  }
}
