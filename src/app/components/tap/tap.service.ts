import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MyCountry } from './my-country';

@Injectable({
    providedIn: 'root'
})
export class TapDemoService {
    getStdNames(): Observable<string> {
      return of('Allan, Gui, Ka');
    }

    getCountry(): Observable<MyCountry> {
      return of(new MyCountry());
    }
}
