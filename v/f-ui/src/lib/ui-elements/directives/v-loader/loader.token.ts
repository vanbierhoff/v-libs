import { InjectionToken } from '@angular/core';
import { VLoaderDirective } from './v-loader.directive';


export const V_LOADER_TOKEN = new InjectionToken<VLoaderDirective>('vloader:loader');
