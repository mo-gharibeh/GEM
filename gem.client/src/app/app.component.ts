import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MurlService } from './murl.service';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  constructor(private http: HttpClient, private _serm: MurlService) { }

  email: any;
  ngOnInit() {
    this.getForecasts();
    this._serm.emailAddress.subscribe(data => this.email = data)
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'gem.client';
}
