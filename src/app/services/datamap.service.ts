import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

// base URL for the data files
const BASE_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data';
const TIME_SERIES = 'csse_covid_19_time_series';
const DAILY_SERIES = 'csse_covid_19_daily_reports';
const FILE_NAME = 'time_series_covid19_';

export enum DATA_SET {
  CONFIRMED = 'confirmed_global',
  RECOVERED = 'recovered_global',
  DEATHS = 'deaths_global'
}

export interface IRegionData {
  value: number;
  lat: number;
  lon: number;
  region: string;
  country: string;
}

export interface IWorldData {
  data: IRegionData[];
  peakValue: number;
  totalCases: number;
}

export interface ICasesData {
  totalConfirmed: IWorldData;
  totalRecovered: IWorldData;
  totalDeaths: IWorldData;
}

@Injectable()
export class RemoteDataService {
  public dataSets = [DATA_SET.CONFIRMED, DATA_SET.RECOVERED, DATA_SET.DEATHS];

  private data: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public data$: Observable<any[]> = this.data.asObservable();

  constructor() { }

  /**
   * Retrieves data from global timely report file, based on the index passed.
   * 0 goes for Confirmed report, 1 for Recovered, 2 for Deaths
   */
  public getDataSet(index: number, lastCommit?: number): Observable<any> {
    let loadDataFromCache = false;
    const lastUpdate = parseInt(window.localStorage.getItem('lastUpdate'), 10);
    if (lastUpdate && lastCommit && lastUpdate >= lastCommit) {
      loadDataFromCache = true;
    }

    const dataSet = this.dataSets[index];
    let data$: Observable<any>;

    if (loadDataFromCache) {
        data$ = Observable.create(observer => {
        const data = window.localStorage.getItem(`${FILE_NAME}${dataSet}`);
        observer.next(data);
        observer.complete();
      });
    } else {
      data$ = Observable.create(observer => {
        fetch(`${BASE_URL}/${TIME_SERIES}/${FILE_NAME}${dataSet}.csv`)
          .then(response => {
            return response.text();
          })
          .then(data => {
            window.localStorage.setItem(`${FILE_NAME}${dataSet}`, data);
            const currentTime = new Date().getTime();
            window.localStorage.setItem(`lastUpdate`,  currentTime as any);
            observer.next(data);
            observer.complete();
          })
          .catch(err => {
            // observer.error('Using offline data; ' + err);
            this.loadOfflineData(index, observer);
          });
      });
    }

    return data$;
  }

  /**
   * Retrieves the daily report file for last available day.
   */
  public getDataSetFromDailyReport(loadFromCache: boolean): Observable<any> {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    let todayFileName = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: 'numeric' }).format(yesterday);
    todayFileName = todayFileName.split('/').join('-');
    let data$: Observable<any>;

    if (loadFromCache) {
        data$ = Observable.create(observer => {
        const data = window.localStorage.getItem(`${todayFileName}`);
        observer.next(data);
        observer.complete();
      });
    } else {
      data$ = Observable.create(observer => {
        // tslint:disable-next-line: max-line-length
        fetch(`${BASE_URL}/${DAILY_SERIES}/${todayFileName}.csv`)
          .then(response => {
            return response.text();
          })
          .then(data => {
            window.localStorage.setItem(`${todayFileName}`, data);
            observer.next(data);
            observer.complete();
          })
          .catch(err => {
            observer.error('Using offline data; ' + err);
          });
      });
    }

    return data$;
  }

  /**
   * Retrieves the date when the data source files were last updated.
   */
  public getLatestCommits(): Observable<any> {
    const resultData$ = Observable.create(observer => {
      fetch(`https://api.github.com/repos/CSSEGISandData/COVID-19/commits`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });
    });

    return resultData$;
  }

  public loadOfflineData(index: number, observer) {
    const baseDataPath = 'assets';
    const dataSet = this.dataSets[index];

    fetch(`${baseDataPath}/${TIME_SERIES}/${FILE_NAME}${dataSet}.csv`)
      .then(response => {
        return response.text();
      })
      .then(data => {
        observer.next(data);
        observer.complete();
      });
  }

  /**
   * Converts csv file data to JSON, calculate highest value per region and total value for all regions.
   * Returns an IWorldData оObject.
   */
  public csvToJson(csvData: string): IWorldData {
      csvData = csvData.replace(/, /g, ' - ');
      csvData = csvData.replace(/"/g, '');
      const csvLines = csvData.split('\n');
      const headers = csvLines[0].split(',');
      const locations = [];
      let data: IRegionData[] = [];
      let totalCases = 0;
      let peakValue = 0;

      for (let i = 1; i < csvLines.length; i++) {
          const columns = csvLines[i].split(',');
          let dataItem = {} as IRegionData;

          const value = parseInt(columns[columns.length - 1], 10);

          if (value > 0) {
              const region = columns[0];
              const country = columns[1];
              const lat = parseInt(columns[2], 10);
              const lon = parseInt(columns[3], 10);
              totalCases += value;
              dataItem = { region, country, lat, lon, value };
              locations.push(dataItem);
              if (value > peakValue) {
                  peakValue = value;
              }
          }
      }

      // aggregate list based on country
      // const result = locations.reduce((prev, item) => {
      //     const newItem = prev.find((i) => {
      //         return i.country === item.country;
      //     });
      //     if (newItem) {
      //         newItem.value += item.value;
      //     } else {
      //         prev.push(item);
      //     }
      //     return prev;
      // }, []);

      data = locations.sort((a, b) => {
        return b.value - a.value;
      });

      return { data, peakValue, totalCases };
  }
}
