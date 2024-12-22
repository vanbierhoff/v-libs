import { Injector } from '@angular/core';


/**
 * Injection function. Can be used to provide arguments for form constructor.
 */
export interface VInjectionProvider  {
    get(token: any, order?: number, originalConstructor?: any): any;
}

let VGlobalInjector: Injector | false = false;
let contextInjector: Injector | false = false;


/**
 * Returns global injector (if any).
 */
export function getGlobalInjector(): Injector | false {
    return VGlobalInjector;
}

export function getContextInjector(): Injector | false {
    return contextInjector;
}

/**
 * Sets global injector. This value will be used as fallback injector if no value is specified at form level.
 */
export function setGlobalInjector(val: Injector | false): void {
    VGlobalInjector = val;
}

export function setContextInjector(val: Injector | false): void {
    contextInjector = val;
}
