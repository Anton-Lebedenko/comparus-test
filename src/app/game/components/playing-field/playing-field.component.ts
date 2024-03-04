import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CustomModalWindowService, DataElementService, ElementColorStates, MAX_SCORE, PlayingElementModel } from '../../../shared';
import {
  AsyncSubject,
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  repeat,
  Subject,
  switchMap,
  take,
  takeUntil,
  timer,
  withLatestFrom
} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playing-field',
  templateUrl: './playing-field.component.html',
  styleUrl: './playing-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayingFieldComponent implements OnInit, OnDestroy {
  public readonly FIELD_SIZE: number = this.dataElementService.FIELD_SIZE;
  public playingElements$!: Observable<PlayingElementModel[]>;

  public playerScore$!: Observable<number>;
  public computerScore$!: Observable<number>;
  private playerScoreSource: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private computerScoreSource: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private clickedElementId$: Subject<string> = new Subject<string>();

  private randomIndex!: number;

  private timerStart$: Subject<void> = new Subject<void>();
  private timerStop$: Subject<void> = new Subject<void>();

  private gameOverSource: AsyncSubject<boolean> = new AsyncSubject();
  private destroySource: Subject<void> = new Subject();

  private dialogRef: any;

  constructor(
    private readonly dataElementService: DataElementService,
    private readonly modalWindowService: CustomModalWindowService,
    private readonly router: Router
  ) {
    this.playerScore$ = this.playerScoreSource.asObservable();
    this.computerScore$ = this.computerScoreSource.asObservable();
  }

  public ngOnInit(): void {
    this.playingElements$ = this.dataElementService.playingElements$;

    this.timerInit();
    this.clickListenerInit();
    this.gameStepInit();

    this.gameOverSource.pipe(takeUntil(this.destroySource)).subscribe((isPlayerWinner: boolean) => this.openModalWindow(isPlayerWinner));
  }

  public ngOnDestroy(): void {
    this.destroySource.next();
    this.destroySource.complete();
    this.gameOverSource.next(false);
    this.gameOverSource.complete();
  }

  public elementById(index: number, item: PlayingElementModel): string {
    return item.id;
  }

  public onElementClickHandler(elementId: string): void {
    this.clickedElementId$.next(elementId);
  }

  private timerInit(): void {
    this.dataElementService.timeout$
      .pipe(
        take(1),
        switchMap((timeout: number) => timer(timeout, timeout)),
        withLatestFrom(this.playingElements$),
        takeUntil(merge(this.timerStop$, this.gameOverSource)),
        repeat({delay: () => this.timerStart$}),
      )
      .subscribe(
        ([_, playingElements]: [number, PlayingElementModel[]]) => {
          this.changeElementColorState(playingElements, ElementColorStates.COMPUTER_WINNER);
          this.incrementScore(this.computerScoreSource);
        }
      );
  }

  private clickListenerInit(): void {
    this.clickedElementId$
      .pipe(takeUntil(this.gameOverSource), withLatestFrom(this.playingElements$))
      .subscribe(([clickedElementId, playingElements]: [string, PlayingElementModel[]]) => {
        if (clickedElementId === playingElements[this.randomIndex].id) {
          this.stopTimer();
          this.changeElementColorState(playingElements, ElementColorStates.PLAYER_WINNER);
          this.incrementScore(this.playerScoreSource);
        }
      });
  }

  private gameStepInit(): void {
    combineLatest([this.playerScore$, this.computerScore$])
      .pipe(takeUntil(this.gameOverSource), withLatestFrom(this.playingElements$))
      .subscribe(([[playerScore, computerScore], playingElements]: [[number, number], PlayingElementModel[]]) => {
        const isPlayerWinner: boolean = playerScore === MAX_SCORE;
        const isComputerWinner: boolean = computerScore === MAX_SCORE;
        if (isPlayerWinner || isComputerWinner) {
          this.gameOver(isPlayerWinner);
        } else {
          this.paintNewYellowElement(playingElements);
          this.startTimer();
        }
      });
  }

  private changeElementColorState(playingElements: PlayingElementModel[], colorState: ElementColorStates): void {
    playingElements[this.randomIndex].colorState = colorState;
    this.dataElementService.updatePlayingElements([...playingElements]);
  }

  private paintNewYellowElement(playingElements: PlayingElementModel[]): void {
    this.randomIndex = this.dataElementService.getRandomUniqueIndex(playingElements);
    if (this.randomIndex > -1) {
      this.changeElementColorState(playingElements, ElementColorStates.IN_PLAY);
    }
  }

  private incrementScore(entity: BehaviorSubject<number>): void {
    let currentScore: number = entity.value;
    entity.next(++currentScore);
  }

  private openModalWindow(isPlayerWinner: boolean): void {
    this.dialogRef = this.modalWindowService.openModal({
      width: '350px',
      data: {
        content: isPlayerWinner ? 'You WIN!' : 'You lose',
        buttonContent: 'Close'
      }
    });
    this.dialogRef.afterClosed().pipe(takeUntil(this.destroySource)).subscribe(() => {
      this.router.navigateByUrl('/start');
    });
  }

  private gameOver(isPlayerWinner: boolean): void {
    this.gameOverSource.next(isPlayerWinner);
    this.gameOverSource.complete();
  }

  private stopTimer(): void {
    this.timerStop$.next();
  }

  private startTimer(): void {
    this.timerStart$.next();
  }
}
