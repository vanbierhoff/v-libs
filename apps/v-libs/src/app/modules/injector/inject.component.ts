import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InjectTest } from './models/injec-item';
import { createInstance, getContextInjector } from '@v/cdk';
import { MANUAL_DEPS, ManualInjectService } from './models/manual-inject';

@Component({
  selector: 'v-libs-inject',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './inject.component.html',
  styleUrl: './inject.component.css'
})
export class InjectComponent implements OnInit {

  constructor(protected elRef: ElementRef) {
  }

  public injectable : InjectTest | null = null

  ngOnInit() {
    this.injectable = createInstance(InjectTest);
    console.log(this.injectable)

    const contextInjector = getContextInjector();
    if(!contextInjector) {
      return
    }
    console.log(contextInjector.get(MANUAL_DEPS))
    console.log(contextInjector.get(ManualInjectService))

  }





}
