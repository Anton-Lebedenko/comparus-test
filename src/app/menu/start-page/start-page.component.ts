import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { StartPageForm } from './start-page-form.enum';
import { DataElementService, DEFAULT_TIMEOUT } from '../../shared';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class StartPageComponent implements OnInit, OnDestroy {
  public menuForm!: FormGroup;
  public hasTimeoutRequiredError!: boolean;
  public hasTimeoutPatternError!: boolean;

  public readonly START_PAGE_FORM: typeof StartPageForm = StartPageForm;

  private destroySource: Subject<void> = new Subject();
  constructor(private readonly fb: FormBuilder, private readonly dataElementService: DataElementService) {}

  get timeoutField(): AbstractControl | null {
    return this.menuForm.get(StartPageForm.TIMEOUT);
  }

  get timeoutFieldValue(): number {
    return this.timeoutField?.value ?? DEFAULT_TIMEOUT;
  }

  public ngOnInit(): void {
    this.menuForm = this.fb.group({
      [StartPageForm.TIMEOUT]: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]]
    });
    this.timeoutField?.valueChanges.pipe(takeUntil(this.destroySource)).subscribe(() => {
      this.hasTimeoutRequiredError = !!this.timeoutField?.hasError('required');
      this.hasTimeoutPatternError = !!(this.timeoutField?.hasError('pattern') && !this.timeoutField?.hasError('required'));
    });

    this.dataElementService.resetGame();
  }

  public ngOnDestroy(): void {
    this.destroySource.next();
    this.destroySource.complete();
  }

  public startGame(timeout: number): void {
    this.dataElementService.setReactionTimeout(timeout);
  }
}
