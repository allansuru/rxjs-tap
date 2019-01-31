import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, filter, retry, catchError } from 'rxjs/operators';
import { TapDemoService } from '../tap/tap.service';

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.scss']
})
export class TapComponent implements OnInit {

  stdNames$: Observable<string[]>;
  countryName$: Observable<string>;
  countryStates: string[];

  constructor(private tapService: TapDemoService) { }

  ngOnInit() {
    this.getStdNames();
    this.getCountryName();
    this.getCountryStates();
  }

  getStdNames() {
    this.stdNames$ = this.tapService.getStdNames().pipe(
      tap(std => console.log(std)),
      map(res => res.split(','))
    );
   }

   getCountryName() {
    this.countryName$ = this.tapService.getCountry().pipe(
      tap(cname => console.log('Accessing country name...')),
      map(country => country.getCountryName()),
      tap(cname => console.log(cname)),
      catchError(err => {
        console.error(err);
        return of('');
      })
    );
   }

   getCountryStates() {
    this.tapService.getCountry().pipe(
      retry(2),
      tap(cname => console.log('Accessing country states...')),
      map(country => country.getCountryStates()),
      tap(states => console.log(states)),
      catchError(err => {
        console.error(err);
        return of([]);
      })
    )
    .subscribe(res => this.countryStates = res);
   }


}
