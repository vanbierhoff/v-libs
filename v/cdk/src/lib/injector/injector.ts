/**
 * Injection function. Can be used to provide arguments for form constructor.
 */
export interface VInjectionProvider {
    get(token: any, order?: number, originalConstructor?: any): any;
}

let VGlobalInjector: VInjectionProvider | false = false;
let contextInjector: VInjectionProvider | false = false;


/**
 * Returns global injector (if any).
 */
export function getGlobalInjector(): VInjectionProvider | false {
    return VGlobalInjector;
}

export function getContextInjector(): VInjectionProvider | false {
    return contextInjector;
}

/**
 * Sets global injector. This value will be used as fallback injector if no value is specified at form level.
 */
export function setGlobalInjector(val: VInjectionProvider | false): void {
    VGlobalInjector = val;
}

export function setContextInjector(val: VInjectionProvider | false): void {
    contextInjector = val;
}
