import { ManualInjectInterface } from './models/manual-inject.interface';
import { getGlobalInjector } from '../injector';

/**
 *
 * Decorator for inject deps with use Angular DI
 * @description Decorator search dependencies in DI mechanism and inject their into a class
 */
export function InjectDepsDecorator(manual?: ManualInjectInterface[]): any {
    return function (
        target: new (...args: any[]) => any
    ) {
        return class extends target {
            constructor(...args: any[]) {
                const injector = getGlobalInjector();
                if (!injector) {
                    throw new Error(`Error: Injector doesnt exist`);
                }
                /**
                 * design: paramtypes. This corresponds to the types of constructor parameters. It only applies for TypeScript since,
                 * with ES6, such parameters aren’t supported. With this language, you need to supply a static getter for the parameter property.
                 */

                  const designedArgs: any[] = (Reflect as any).getOwnMetadata('design:paramtypes', target) || [];
                  if (injector && designedArgs.length > 0 && args.length === 0) {

                    args = designedArgs.map ((arg, index) => {
                      const deps = injector.get(arg, index);
                      if (deps) {
                        return deps;
                      }
                    });
                  }

                super(...args);
                manual?.forEach(manalArg => this[manalArg.field] = injector.get(manalArg.token));
            }
        };
    };
}
