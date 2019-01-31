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
  }

  getStdNames() {
    this.stdNames$ = this.tapService.getStdNames().pipe(
      tap(std => console.log(std)),
      map(res => res.split(','))
    );
   }


}
