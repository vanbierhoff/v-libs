import map from 'lodash/map';
import { ManualInjectInterface } from './models/manual-inject.interface';
import forEach from 'lodash/forEach';
import { getGlobalInjector } from '@v/cdk';



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
                const designedArgs: any[] = Reflect.getMetadata('design:paramtypes', target) || [];
                if (injector && designedArgs.length > 0 && args.length === 0) {
                    args = map(designedArgs, (arg, index) => {
                        let deps = injector.get(arg, index, target);
                        if (deps) {
                            return deps;
                        }
                    });
                }
                super(...args);
                forEach(manual, manalArg => this[manalArg.field] = injector.get(manalArg.token));
            }
        };
    };
}
