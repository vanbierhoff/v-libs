export const MOCK_OBJECT_FOR_DEEP = {
  obj: {
    field1: 'value1',
    field2: 'value2',
    children: {
      fieldChild: 'value1',
      fieldChilde: 'value2',
      children: {
        nested: 'value3'
      }
    }
  },
  twoObj: {
    twoObj: 'value',
    id: 'id',
    parent: {
      twoObj: {
        id: 'id2',
        children: {
          nestedfield: 'value3'
        }
      }
    }
  }
};
