

export interface DeepFirstInterface {
  /**
   * Search field with this name and return field if exist
   */
  byField?: string | Symbol;
  /**
   * During searched function searches  a data in only fields with this name
   */
  searchByField?: string;
  deep?: number ;
  asResult?: any;
}
