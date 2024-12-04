import { ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { BaseCustomControl } from './custom-control';



export const vBaseControlFactory = (host: ElementRef, control?: NgControl | null) => new BaseCustomControl(host, control);
