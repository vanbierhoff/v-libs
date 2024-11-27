export interface FieldInstanceDecoratorInterface {
  key: string | symbol;
  serializer?: <T>(data: any, options: any) => T;
}
