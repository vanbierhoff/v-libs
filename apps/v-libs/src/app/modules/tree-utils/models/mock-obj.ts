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


export const MOCK_ARRAY_FOR_DEEP = [
  1,
  {
    id: 5,
    name: 'name',
    child: [
      1, 2
    ]
  },
  [
    {id: 100},
    [
      {name: 'name2'},
      {name: 'name3'}
    ]
  ],
  {id: 10}
];
