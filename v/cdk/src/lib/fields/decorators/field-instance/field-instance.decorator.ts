import { FieldInstanceDecoratorInterface } from './models/field-instance/field-instance-decorator.interface';
import { addMetaField } from '@v/meta-helper';
import { getGlobalInjector } from '../../../injector';
import { FIELD_META_KEY } from '../../../const';




export function FieldInstanceDecorator(options?: FieldInstanceDecoratorInterface): any {
  return function (
    target: new (...args: any[]) => any
  ) {
    addMetaField(target, FIELD_META_KEY, options);
    return class extends target {

      constructor(...args: any[]) {
        const injector = getGlobalInjector();
        /**
         * design: paramtypes. This corresponds to the types of constructor parameters. It only applies for TypeScript since,
         * with ES6, such parameters aren’t supported. With this language, you need to supply a static getter for the parameter property.
         */
        const designedArgs: any[] = (Reflect as any).getMetadata('design:paramtypes', target) || [];
        if (injector && designedArgs.length > 0 && args.length === 0) {
          args = designedArgs.map((arg, index) => {
            return injector.get(arg, index, target);
          });
        }
        super(...args);
      }
    };
  };
}
