import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatesControlService {
  //SIGNALS
  public trendingPageScrollPositionState: WritableSignal<number> = signal<number>(0);
  public searchPageScrollPositionState: WritableSignal<number> = signal<number>(0);

  constructor() { }
}
