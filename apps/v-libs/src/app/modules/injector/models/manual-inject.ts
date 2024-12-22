import {
  ElementRef,
  inject,
  Injectable,
  InjectionToken,
  Renderer2,
  RendererFactory2
} from '@angular/core';
import { createInjectorWithDeps, setContextInjector } from '@v/cdk';

@Injectable()
export class ManualInjectService {
  public readonly renderer: RendererFactory2 = inject(RendererFactory2);

  createRenderer(host: ElementRef): Renderer2 {
    return this.renderer.createRenderer(host, null);
  }
}

export const MANUAL_DEPS = new InjectionToken<any>('MANUAL_DEPS');

setContextInjector(createInjectorWithDeps( [
  {
    provide: MANUAL_DEPS,
    useValue: 'manual Value',
  },
  ManualInjectService,
],));
