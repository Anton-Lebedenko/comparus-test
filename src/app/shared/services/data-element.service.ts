import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DEFAULT_TIMEOUT, ElementColorStates, FIELD_SIZE, generateElementsData, PlayingElementModel } from '../utils';

@Injectable()
export class DataElementService {
  public readonly FIELD_SIZE: number = FIELD_SIZE;
  public readonly timeout$: Observable<number>;
  public readonly playingElements$: Observable<PlayingElementModel[]>;

  private timeoutSource: BehaviorSubject<number> = new BehaviorSubject<number>(DEFAULT_TIMEOUT);
  private playingElementsSource: BehaviorSubject<PlayingElementModel[]> = new BehaviorSubject<PlayingElementModel[]>(generateElementsData(this.FIELD_SIZE));

  constructor() {
    this.timeout$ = this.timeoutSource.asObservable();
    this.playingElements$ = this.playingElementsSource.asObservable();
  }

  public updatePlayingElements (playingElements: PlayingElementModel[]): void {
    this.playingElementsSource.next(playingElements);
  }

  public setReactionTimeout(timeout: number): void {
    this.timeoutSource.next(timeout);
  }

  public getRandomUniqueIndex(elements: PlayingElementModel[]): number {
    const availableElementsToRandom: PlayingElementModel[] = elements.filter((el: PlayingElementModel) => el.colorState === ElementColorStates.DEFAULT);
    const randomAvailableIndex: number = Math.floor(Math.random() * availableElementsToRandom.length);
    const availableRandomElement: PlayingElementModel = availableElementsToRandom[randomAvailableIndex];
    return elements.indexOf(availableRandomElement);
  }

  public resetGame(): void {
    this.playingElementsSource.next(generateElementsData(this.FIELD_SIZE));
  }
}
