import {
  Component,
  HostBinding,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { VInputCompositionComponent } from '../../../../../../v/f-ui/src/lib/ui-elements/v-compose/v-input-composition.component';
import { VInputComponent } from '../../../../../../v/f-ui/src/lib/ui-elements/v-input/views/v-input.component';
import { VLabelDirective } from '../../../../../../v/f-ui/src/lib/ui-elements/v-babel/v-label.directive';
import { VButtonComponent } from '../../../../../../v/f-ui/src/lib/ui-elements/v-button/v-button.component';
import { ValueTransformer } from '../../../../../../v/f-ui/src/lib/shared';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'v-libs-forms',
  standalone: true,
  imports: [
    CommonModule,
    VInputComponent,
    VInputCompositionComponent,
    VLabelDirective,
    VButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  @HostBinding('style.--colorTitle')
  public color: string = 'green';

  @ViewChild('button', { read: VButtonComponent })
  public vButton: VButtonComponent | undefined = undefined;

  public show = true;
  // @ts-ignore
  public userForm: FormGroup;
  protected fb = inject(FormBuilder);
  public customControl = new FormControl('data', [Validators.required]);
  public customControl2 = new FormControl('data2', [Validators.required]);

  public transformer: ValueTransformer<any, string> = (v: any): string => {
    if (v?.startsWith('+')) {
      return v;
    }
    return `+${v}`;
  };

  locked = false;

  ngOnInit() {
    // console.log(this.customControl);
    this.initForm();
  }

  submit(form: any) {
    console.log(form);
  }

  getAccessToVButton() {
    setTimeout(() => {
      console.log(this.vButton);
    }, 1500);
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      type: [null, [Validators.required]],
      name: [null, [Validators.required]],
    });
  }
}
