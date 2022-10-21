/**
 * Copyright (c) 2020-present, Goldman Sachs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// References to resolve in Mapping
// - Class mapping - targetClass
// - PropertyMapping - Property
// - Pure Instance - source class `OPTIONAL`
// - Enumeration mapping - targetEnumeration
// - Enumeration mapping - sourceType `OPTIONAL`
// - Association mapping - targetAssociation
// - Association mapping - stores
// - MappingTest - inputData - flatdata
// - MappingTest - inputData - class
// - MappingTestData - storeTestData - class
export const TEST_DATA__MappingRoundtrip = [
  {
    path: 'test::tClass',
    content: {
      _type: 'class',
      name: 'tClass',
      package: 'test',
      properties: [
        {
          multiplicity: {
            lowerBound: 1,
            upperBound: 1,
          },
          name: 'fullName',
          type: 'String',
        },
        {
          multiplicity: {
            lowerBound: 0,
          },
          name: 'name',
          type: 'String',
        },
      ],
    },
    classifierPath: 'meta::pure::metamodel::type::Class',
  },
  {
    path: 'test::tEnum',
    content: {
      _type: 'Enumeration',
      name: 'tEnum',
      package: 'test',
      values: [
        {
          value: 'b',
        },
      ],
    },
    classifierPath: 'meta::pure::metamodel::type::Enumeration',
  },
  {
    path: 'test::tMapping1',
    content: {
      _type: 'mapping',
      classMappings: [
        {
          _type: 'operation',
          class: 'tClass',
          id: 'tiec',
          operation: 'STORE_UNION',
          parameters: ['tiec', 'tiec'],
          root: true,
        },
      ],
      enumerationMappings: [],
      includedMappings: [],
      name: 'tMapping1',
      package: 'test',
      tests: [],
    },
    classifierPath: 'meta::pure::mapping::Mapping',
  },
  {
    path: 'test::tMapping2',
    content: {
      _type: 'mapping',
      classMappings: [
        {
          _type: 'operation',
          class: 'tClass',
          id: 'test_tClass',
          operation: 'STORE_UNION',
          parameters: ['test_tClass'],
          root: true,
        },
        {
          _type: 'pureInstance',
          class: 'tClass',
          id: 'cay',
          propertyMappings: [
            {
              _type: 'purePropertyMapping',
              property: {
                class: 'tClass',
                property: 'fullName',
              },
              explodeProperty: false,
              source: '',
              transform: {
                _type: 'lambda',
                body: [
                  {
                    _type: 'func',
                    function: 'substring',
                    parameters: [
                      {
                        _type: 'property',
                        parameters: [
                          {
                            _type: 'var',
                            name: 'src',
                          },
                        ],
                        property: 'fullName',
                      },
                      {
                        _type: 'integer',
                        multiplicity: {
                          lowerBound: 1,
                          upperBound: 1,
                        },
                        values: [0],
                      },
                      {
                        _type: 'func',
                        function: 'indexOf',
                        parameters: [
                          {
                            _type: 'property',
                            parameters: [
                              {
                                _type: 'var',
                                name: 'src',
                              },
                            ],
                            property: 'fullName',
                          },
                          {
                            _type: 'string',
                            multiplicity: {
                              lowerBound: 1,
                              upperBound: 1,
                            },
                            values: [' '],
                          },
                        ],
                      },
                    ],
                  },
                ],
                parameters: [],
              },
            },
            {
              _type: 'purePropertyMapping',
              property: {
                class: 'tClass',
                property: 'fullName',
              },
              source: '',
              transform: {
                _type: 'lambda',
                body: [
                  {
                    _type: 'func',
                    function: 'substring',
                    parameters: [
                      {
                        _type: 'property',
                        parameters: [
                          {
                            _type: 'var',
                            name: 'src',
                          },
                        ],
                        property: 'fullName',
                      },
                      {
                        _type: 'integer',
                        multiplicity: {
                          lowerBound: 1,
                          upperBound: 1,
                        },
                        values: [0],
                      },
                      {
                        _type: 'func',
                        function: 'indexOf',
                        parameters: [
                          {
                            _type: 'property',
                            parameters: [
                              {
                                _type: 'var',
                                name: 'src',
                              },
                            ],
                            property: 'fullName',
                          },
                          {
                            _type: 'string',
                            multiplicity: {
                              lowerBound: 1,
                              upperBound: 1,
                            },
                            values: [' '],
                          },
                        ],
                      },
                    ],
                  },
                ],
                parameters: [],
              },
            },
            {
              _type: 'purePropertyMapping',
              property: {
                class: 'tClass',
                property: 'name',
              },
              source: '',
              explodeProperty: true,
              transform: {
                _type: 'lambda',
                body: [
                  {
                    _type: 'func',
                    function: 'substring',
                    parameters: [
                      {
                        _type: 'property',
                        parameters: [
                          {
                            _type: 'func',
                            function: 'cast',
                            parameters: [
                              {
                                _type: 'var',
                                name: 'src',
                              },
                              {
                                _type: 'packageableElementPtr',
                                fullPath: 'tClass',
                              },
                            ],
                          },
                        ],
                        property: 'fullName',
                      },
                      {
                        _type: 'func',
                        function: 'plus',
                        parameters: [
                          {
                            _type: 'collection',
                            multiplicity: {
                              lowerBound: 2,
                              upperBound: 2,
                            },
                            values: [
                              {
                                _type: 'func',
                                function: 'indexOf',
                                parameters: [
                                  {
                                    _type: 'property',
                                    parameters: [
                                      {
                                        _type: 'var',
                                        name: 'src',
                                      },
                                    ],
                                    property: 'fullName',
                                  },
                                  {
                                    _type: 'string',
                                    multiplicity: {
                                      lowerBound: 1,
                                      upperBound: 1,
                                    },
                                    values: [' '],
                                  },
                                ],
                              },
                              {
                                _type: 'integer',
                                multiplicity: {
                                  lowerBound: 1,
                                  upperBound: 1,
                                },
                                values: [1],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        _type: 'func',
                        function: 'length',
                        parameters: [
                          {
                            _type: 'property',
                            parameters: [
                              {
                                _type: 'var',
                                name: 'src',
                              },
                            ],
                            property: 'fullName',
                          },
                        ],
                      },
                    ],
                  },
                ],
                parameters: [],
              },
            },
          ],
          root: false,
          srcClass: 'tClass',
        },
      ],
      enumerationMappings: [
        {
          enumValueMappings: [
            {
              enumValue: 'b',
              sourceValues: [
                {
                  _type: 'enumSourceValue',
                  enumeration: 'test::tEnum',
                  value: 'b',
                },
              ],
            },
          ],
          enumeration: 'tEnum',
          id: 'TargetTradeTypeMapping2',
        },
      ],
      includedMappings: [],
      name: 'tMapping2',
      package: 'test',
      tests: [
        {
          assert: {
            _type: 'expectedOutputMappingTestAssert',
            expectedOutput:
              '{"defects":[],"value":{"name":"oneName 99"},"source":{"defects":[],"value":{"oneName":"oneName 99"},"source":{"number":1,"record":"{\\"oneName\\":\\"oneName 99\\",\\"anotherName\\":\\"anotherName 17\\",\\"oneDate\\":\\"2020-04-13\\",\\"anotherDate\\":\\"2020-02-25\\",\\"oneNumber\\":27,\\"anotherNumber\\":28}"}}}',
          },
          inputData: [
            {
              _type: 'object',
              data: '{"oneName":"oneName 2","anotherName":"anotherName 16","oneDate":"2020-02-05","anotherDate":"2020-04-13","oneNumber":24,"anotherNumber":29}',
              inputType: 'JSON',
              sourceClass: 'tClass',
            },
            {
              _type: 'object',
              data: '{"oneName":"oneName 2","anotherName":"anotherName 16","oneDate":"2020-02-05","anotherDate":"2020-04-13","oneNumber":24,"anotherNumber":29}',
              inputType: 'XML',
              sourceClass: 'tClass',
            },
          ],
          name: 'test2',
          query: {
            _type: 'lambda',
            body: [
              {
                _type: 'func',
                function: 'serialize',
                parameters: [
                  {
                    _type: 'func',
                    function: 'graphFetchChecked',
                    parameters: [
                      {
                        _type: 'func',
                        function: 'getAll',
                        parameters: [
                          {
                            _type: 'packageableElementPtr',
                            fullPath: 'tClass',
                          },
                        ],
                      },
                      {
                        _type: 'rootGraphFetchTree',
                        class: 'tClass',
                        subTrees: [
                          {
                            _type: 'propertyGraphFetchTree',
                            parameters: [],
                            property: 'name',
                            subTrees: [],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    _type: 'rootGraphFetchTree',
                    class: 'tClass',
                    subTrees: [
                      {
                        _type: 'propertyGraphFetchTree',
                        parameters: [],
                        property: 'name',
                        subTrees: [],
                      },
                    ],
                  },
                ],
              },
            ],
            parameters: [],
          },
        },
      ],
    },
    classifierPath: 'meta::pure::mapping::Mapping',
  },
  {
    path: '__internal__::SectionIndex',
    content: {
      _type: 'sectionIndex',
      name: 'SectionIndex',
      package: '__internal__',
      sections: [
        {
          _type: 'importAware',
          imports: [],
          elements: ['test::tClass', 'test::tEnum'],
          parserName: 'Pure',
        },
        {
          _type: 'importAware',
          imports: ['test'],
          elements: ['test::tMapping1', 'test::tMapping2'],
          parserName: 'Mapping',
        },
      ],
    },
    classifierPath: 'meta::pure::metamodel::section::SectionIndex',
  },
];

export const TEST_DATA__LocalPropertyMapping = [
  {
    path: 'test::Firm',
    content: {
      _type: 'class',
      name: 'Firm',
      package: 'test',
      properties: [
        {
          multiplicity: {
            lowerBound: 1,
            upperBound: 1,
          },
          name: 'id',
          type: 'Integer',
        },
        {
          multiplicity: {
            lowerBound: 1,
            upperBound: 1,
          },
          name: 'legalName',
          type: 'String',
        },
      ],
    },
    classifierPath: 'meta::pure::metamodel::type::Class',
  },
  {
    path: 'test::Person',
    content: {
      _type: 'class',
      name: 'Person',
      package: 'test',
      properties: [
        {
          multiplicity: {
            lowerBound: 1,
            upperBound: 1,
          },
          name: 'name',
          type: 'String',
        },
      ],
    },
    classifierPath: 'meta::pure::metamodel::type::Class',
  },
  {
    path: 'test::Firm_Person',
    content: {
      _type: 'association',
      name: 'Firm_Person',
      package: 'test',
      properties: [
        {
          multiplicity: {
            lowerBound: 1,
            upperBound: 1,
          },
          name: 'employer',
          type: 'test::Firm',
        },
        {
          multiplicity: {
            lowerBound: 0,
          },
          name: 'employees',
          type: 'test::Person',
        },
      ],
    },
    classifierPath: 'meta::pure::metamodel::relationship::Association',
  },
  {
    path: 'test::crossPropertyMappingWithLocalProperties',
    content: {
      _type: 'mapping',
      classMappings: [
        {
          _type: 'pureInstance',
          class: 'test::Person',
          id: 'p',
          propertyMappings: [
            {
              _type: 'purePropertyMapping',
              explodeProperty: false,
              localMappingProperty: {
                multiplicity: {
                  lowerBound: 1,
                  upperBound: 1,
                },
                type: 'Integer',
              },
              property: {
                property: 'firmId',
              },
              source: '',
              transform: {
                _type: 'lambda',
                body: [
                  {
                    _type: 'integer',
                    multiplicity: {
                      lowerBound: 1,
                      upperBound: 1,
                    },
                    values: [1],
                  },
                ],
                parameters: [],
              },
            },
            {
              _type: 'purePropertyMapping',
              explodeProperty: false,
              property: {
                class: 'test::Person',
                property: 'name',
              },
              source: '',
              transform: {
                _type: 'lambda',
                body: [
                  {
                    _type: 'property',
                    parameters: [
                      {
                        _type: 'var',
                        name: 'src',
                      },
                    ],
                    property: 'name',
                  },
                ],
                parameters: [],
              },
            },
          ],
          root: false,
          srcClass: 'test::Person',
        },
      ],
      enumerationMappings: [],
      includedMappings: [],
      name: 'crossPropertyMappingWithLocalProperties',
      package: 'test',
      tests: [],
    },
    classifierPath: 'meta::pure::mapping::Mapping',
  },
];

export const TEST_DATA__AggregationAwareMappingRoundtrip = [
  {
    classifierPath: 'meta::pure::metamodel::type::Class',
    content: {
      _type: 'class',
      name: 'FiscalCalendar',
      package: 'test',
      properties: [
        {
          multiplicity: {
            lowerBound: 1,
            upperBound: 1,
          },
          name: 'date',
          type: 'Date',
        },
        {
          multiplicity: {
            lowerBound: 1,
            upperBound: 1,
          },
          name: 'fiscalYear',
          type: 'Integer',
        },
        {
          multiplicity: {
            lowerBound: 1,
            upperBound: 1,
          },
          name: 'fiscalMonth',
          type: 'Integer',
        },
        {
          multiplicity: {
            lowerBound: 1,
            upperBound: 1,
          },
          name: 'fiscalQtr',
          type: 'Integer',
        },
      ],
    },
    path: 'test::FiscalCalendar',
  },
  {
    classifierPath: 'meta::pure::metamodel::type::Class',
    content: {
      _type: 'class',
      name: 'Sales',
      package: 'test',
      properties: [
        {
          multiplicity: {
            lowerBound: 1,
            upperBound: 1,
          },
          name: 'id',
          type: 'Integer',
        },
        {
          multiplicity: {
            lowerBound: 1,
            upperBound: 1,
          },
          name: 'salesDate',
          type: 'test::FiscalCalendar',
        },
        {
          multiplicity: {
            lowerBound: 1,
            upperBound: 1,
          },
          name: 'revenue',
          type: 'Float',
        },
      ],
    },
    path: 'test::Sales',
  },
  {
    classifierPath: 'meta::pure::metamodel::type::Class',
    content: {
      _type: 'class',
      name: 'Sales_By_Date',
      package: 'test',
      properties: [
        {
          multiplicity: {
            lowerBound: 1,
            upperBound: 1,
          },
          name: 'salesDate',
          type: 'test::FiscalCalendar',
        },
        {
          multiplicity: {
            lowerBound: 1,
            upperBound: 1,
          },
          name: 'netRevenue',
          type: 'Float',
        },
      ],
    },
    path: 'test::Sales_By_Date',
  },
  {
    classifierPath: 'meta::pure::mapping::Mapping',
    content: {
      _type: 'mapping',
      classMappings: [
        {
          _type: 'pureInstance',
          class: 'test::FiscalCalendar',
          id: 'b',
          propertyMappings: [
            {
              _type: 'purePropertyMapping',
              explodeProperty: false,
              property: {
                class: 'test::FiscalCalendar',
                property: 'date',
              },
              source: '',
              transform: {
                _type: 'lambda',
                body: [
                  {
                    _type: 'property',
                    parameters: [
                      {
                        _type: 'var',
                        name: 'src',
                      },
                    ],
                    property: 'date',
                  },
                ],
                parameters: [],
              },
            },
            {
              _type: 'purePropertyMapping',
              explodeProperty: false,
              property: {
                class: 'test::FiscalCalendar',
                property: 'fiscalYear',
              },
              source: '',
              transform: {
                _type: 'lambda',
                body: [
                  {
                    _type: 'property',
                    parameters: [
                      {
                        _type: 'var',
                        name: 'src',
                      },
                    ],
                    property: 'fiscalYear',
                  },
                ],
                parameters: [],
              },
            },
            {
              _type: 'purePropertyMapping',
              explodeProperty: false,
              property: {
                class: 'test::FiscalCalendar',
                property: 'fiscalMonth',
              },
              source: '',
              transform: {
                _type: 'lambda',
                body: [
                  {
                    _type: 'property',
                    parameters: [
                      {
                        _type: 'var',
                        name: 'src',
                      },
                    ],
                    property: 'fiscalMonth',
                  },
                ],
                parameters: [],
              },
            },
            {
              _type: 'purePropertyMapping',
              explodeProperty: false,
              property: {
                class: 'test::FiscalCalendar',
                property: 'fiscalQtr',
              },
              source: '',
              transform: {
                _type: 'lambda',
                body: [
                  {
                    _type: 'property',
                    parameters: [
                      {
                        _type: 'var',
                        name: 'src',
                      },
                    ],
                    property: 'fiscalQtr',
                  },
                ],
                parameters: [],
              },
            },
          ],
          root: false,
          srcClass: 'test::FiscalCalendar',
        },
        {
          _type: 'aggregationAware',
          aggregateSetImplementations: [
            {
              aggregateSpecification: {
                aggregateValues: [
                  {
                    aggregateFn: {
                      _type: 'lambda',
                      body: [
                        {
                          _type: 'func',
                          function: 'sum',
                          parameters: [
                            {
                              _type: 'var',
                              name: 'mapped',
                            },
                          ],
                        },
                      ],
                      parameters: [],
                    },
                    mapFn: {
                      _type: 'lambda',
                      body: [
                        {
                          _type: 'property',
                          parameters: [
                            {
                              _type: 'var',
                              name: 'this',
                            },
                          ],
                          property: 'revenue',
                        },
                      ],
                      parameters: [],
                    },
                  },
                ],
                canAggregate: true,
                groupByFunctions: [
                  {
                    groupByFn: {
                      _type: 'lambda',
                      body: [
                        {
                          _type: 'property',
                          parameters: [
                            {
                              _type: 'var',
                              name: 'this',
                            },
                          ],
                          property: 'salesDate',
                        },
                      ],
                      parameters: [],
                    },
                  },
                ],
              },
              index: 0,
              setImplementation: {
                _type: 'pureInstance',
                class: 'test::Sales',
                id: 'a_Aggregate_0',
                propertyMappings: [
                  {
                    _type: 'purePropertyMapping',
                    explodeProperty: false,
                    property: {
                      class: 'test::Sales',
                      property: 'salesDate',
                    },
                    source: '',
                    target: 'b',
                    transform: {
                      _type: 'lambda',
                      body: [
                        {
                          _type: 'property',
                          parameters: [
                            {
                              _type: 'var',
                              name: 'src',
                            },
                          ],
                          property: 'salesDate',
                        },
                      ],
                      parameters: [],
                    },
                  },
                  {
                    _type: 'purePropertyMapping',
                    explodeProperty: false,
                    property: {
                      class: 'test::Sales',
                      property: 'revenue',
                    },
                    source: '',
                    transform: {
                      _type: 'lambda',
                      body: [
                        {
                          _type: 'property',
                          parameters: [
                            {
                              _type: 'var',
                              name: 'src',
                            },
                          ],
                          property: 'netRevenue',
                        },
                      ],
                      parameters: [],
                    },
                  },
                ],
                root: false,
                srcClass: 'test::Sales_By_Date',
              },
            },
          ],
          class: 'test::Sales',
          id: 'a',
          mainSetImplementation: {
            _type: 'pureInstance',
            class: 'test::Sales',
            id: 'a_Main',
            propertyMappings: [
              {
                _type: 'purePropertyMapping',
                explodeProperty: false,
                property: {
                  class: 'test::Sales',
                  property: 'salesDate',
                },
                source: '',
                target: 'b',
                transform: {
                  _type: 'lambda',
                  body: [
                    {
                      _type: 'property',
                      parameters: [
                        {
                          _type: 'var',
                          name: 'src',
                        },
                      ],
                      property: 'salesDate',
                    },
                  ],
                  parameters: [],
                },
              },
              {
                _type: 'purePropertyMapping',
                explodeProperty: false,
                property: {
                  class: 'test::Sales',
                  property: 'revenue',
                },
                source: '',
                transform: {
                  _type: 'lambda',
                  body: [
                    {
                      _type: 'property',
                      parameters: [
                        {
                          _type: 'var',
                          name: 'src',
                        },
                      ],
                      property: 'revenue',
                    },
                  ],
                  parameters: [],
                },
              },
            ],
            root: false,
            srcClass: 'test::Sales',
          },
          propertyMappings: [
            {
              _type: 'AggregationAwarePropertyMapping',
              property: {
                class: 'test::Sales',
                property: 'salesDate',
              },
              source: 'a',
              target: 'b',
            },
            {
              _type: 'AggregationAwarePropertyMapping',
              property: {
                class: 'test::Sales',
                property: 'revenue',
              },
              source: 'a',
            },
          ],
          root: false,
        },
      ],
      enumerationMappings: [],
      includedMappings: [],
      name: 'map',
      package: 'test',
      tests: [],
    },
    path: 'test::map',
  },
  {
    path: '__internal__::SectionIndex',
    content: {
      _type: 'sectionIndex',
      name: 'SectionIndex',
      package: '__internal__',
      sections: [
        {
          _type: 'importAware',
          imports: [],
          elements: [
            'test::FiscalCalendar',
            'test::Sales',
            'test::Sales_By_Date',
          ],
          parserName: 'Pure',
        },
        {
          _type: 'importAware',
          imports: [],
          elements: ['test::map'],
          parserName: 'Mapping',
        },
      ],
    },
    classifierPath: 'meta::pure::metamodel::section::SectionIndex',
  },
];

export const TEST_DATA__Relational_LocalPropertyMappingRoundtrip = [
  {
    path: 'my::models::Product',
    content: {
      _type: 'class',
      name: 'Product',
      package: 'my::models',
      properties: [
        {
          multiplicity: {
            lowerBound: 1,
            upperBound: 1,
          },
          name: 'productId',
          type: 'String',
        },
        {
          multiplicity: {
            lowerBound: 1,
            upperBound: 1,
          },
          name: 'productName',
          type: 'String',
        },
        {
          multiplicity: {
            lowerBound: 1,
            upperBound: 1,
          },
          name: 'description',
          type: 'String',
        },
      ],
    },
    classifierPath: 'meta::pure::metamodel::type::Class',
  },
  {
    path: 'my::database::inMemoryAndRelationalDb',
    content: {
      _type: 'relational',
      filters: [],
      includedStores: [],
      joins: [],
      name: 'inMemoryAndRelationalDb',
      package: 'my::database',
      schemas: [
        {
          name: 'default',
          tables: [
            {
              columns: [
                {
                  name: 'productId',
                  nullable: false,
                  type: {
                    _type: 'Varchar',
                    size: 100,
                  },
                },
                {
                  name: 'productName',
                  nullable: true,
                  type: {
                    _type: 'Varchar',
                    size: 100,
                  },
                },
                {
                  name: 'description',
                  nullable: true,
                  type: {
                    _type: 'Varchar',
                    size: 1000,
                  },
                },
              ],
              name: 'productTable',
              primaryKey: ['productId'],
            },
          ],
          views: [],
        },
      ],
    },
    classifierPath: 'meta::relational::metamodel::Database',
  },
  {
    path: 'my::mappings::InMemoryAndRelationalCrossStoreMapping1',
    content: {
      _type: 'mapping',
      classMappings: [
        {
          _type: 'relational',
          class: 'my::models::Product',
          distinct: false,
          id: 'prod_set',
          mainTable: {
            _type: 'Table',
            database: 'my::database::inMemoryAndRelationalDb',
            mainTableDb: 'my::database::inMemoryAndRelationalDb',
            schema: 'default',
            table: 'productTable',
          },
          primaryKey: [
            {
              _type: 'column',
              column: 'productId',
              table: {
                _type: 'Table',
                database: 'my::database::inMemoryAndRelationalDb',
                mainTableDb: 'my::database::inMemoryAndRelationalDb',
                schema: 'default',
                table: 'productTable',
              },
              tableAlias: 'productTable',
            },
          ],
          propertyMappings: [
            {
              _type: 'relationalPropertyMapping',
              localMappingProperty: {
                multiplicity: {
                  lowerBound: 1,
                  upperBound: 1,
                },
                type: 'String',
              },
              property: {
                property: 'local',
              },
              relationalOperation: {
                _type: 'column',
                column: 'productName',
                table: {
                  _type: 'Table',
                  database: 'my::database::inMemoryAndRelationalDb',
                  mainTableDb: 'my::database::inMemoryAndRelationalDb',
                  schema: 'default',
                  table: 'productTable',
                },
                tableAlias: 'productTable',
              },
            },
            {
              _type: 'relationalPropertyMapping',
              property: {
                class: 'my::models::Product',
                property: 'productId',
              },
              relationalOperation: {
                _type: 'column',
                column: 'productId',
                table: {
                  _type: 'Table',
                  database: 'my::database::inMemoryAndRelationalDb',
                  mainTableDb: 'my::database::inMemoryAndRelationalDb',
                  schema: 'default',
                  table: 'productTable',
                },
                tableAlias: 'productTable',
              },
            },
            {
              _type: 'relationalPropertyMapping',
              property: {
                class: 'my::models::Product',
                property: 'productName',
              },
              relationalOperation: {
                _type: 'column',
                column: 'productName',
                table: {
                  _type: 'Table',
                  database: 'my::database::inMemoryAndRelationalDb',
                  mainTableDb: 'my::database::inMemoryAndRelationalDb',
                  schema: 'default',
                  table: 'productTable',
                },
                tableAlias: 'productTable',
              },
            },
            {
              _type: 'relationalPropertyMapping',
              property: {
                class: 'my::models::Product',
                property: 'description',
              },
              relationalOperation: {
                _type: 'column',
                column: 'description',
                table: {
                  _type: 'Table',
                  database: 'my::database::inMemoryAndRelationalDb',
                  mainTableDb: 'my::database::inMemoryAndRelationalDb',
                  schema: 'default',
                  table: 'productTable',
                },
                tableAlias: 'productTable',
              },
            },
          ],
          root: false,
        },
      ],
      enumerationMappings: [],
      includedMappings: [],
      name: 'InMemoryAndRelationalCrossStoreMapping1',
      package: 'my::mappings',
      tests: [],
    },
    classifierPath: 'meta::pure::mapping::Mapping',
  },
];

export const TEST_DATA__MappingTestSuiteRoundtrip = [
  {
    "path": "test::Address",
    "content": {
      "_type": "class",
      "name": "Address",
      "superTypes": [],
      "originalMilestonedProperties": [],
      "properties": [
        {
          "name": "streetNumber",
          "type": "Integer",
          "multiplicity": {
            "lowerBound": 1,
            "upperBound": 1
          },
          "stereotypes": [],
          "taggedValues": []
        },
        {
          "name": "streetName",
          "type": "String",
          "multiplicity": {
            "lowerBound": 1,
            "upperBound": 1
          },
          "stereotypes": [],
          "taggedValues": []
        },
        {
          "name": "stateInfo",
          "type": "test::StateInfo",
          "multiplicity": {
            "lowerBound": 1,
            "upperBound": 1
          },
          "stereotypes": [],
          "taggedValues": []
        }
      ],
      "qualifiedProperties": [],
      "stereotypes": [],
      "taggedValues": [],
      "constraints": [],
      "package": "test"
    },
    "classifierPath": "meta::pure::metamodel::type::Class"
  },
  {
    "path": "test::model",
    "content": {
      "_type": "class",
      "name": "model",
      "superTypes": [],
      "originalMilestonedProperties": [],
      "properties": [
        {
          "name": "name",
          "type": "String",
          "multiplicity": {
            "lowerBound": 1,
            "upperBound": 1
          },
          "stereotypes": [],
          "taggedValues": []
        },
        {
          "name": "id",
          "type": "String",
          "multiplicity": {
            "lowerBound": 1,
            "upperBound": 1
          },
          "stereotypes": [],
          "taggedValues": []
        }
      ],
      "qualifiedProperties": [],
      "stereotypes": [],
      "taggedValues": [],
      "constraints": [],
      "package": "test"
    },
    "classifierPath": "meta::pure::metamodel::type::Class"
  },
  {
    "path": "test::data::MyData",
    "content": {
      "_type": "dataElement",
      "name": "MyData",
      "stereotypes": [],
      "taggedValues": [],
      "data": {
        "_type": "externalFormat",
        "contentType": "application/json",
        "data": "{\"name\":\"john doe\",\"id\":\"77\"}"
      },
      "package": "test::data"
    },
    "classifierPath": "meta::pure::data::DataElement"
  },
  {
    "path": "test::data::MyTestData",
    "content": {
      "_type": "dataElement",
      "name": "MyTestData",
      "stereotypes": [],
      "taggedValues": [],
      "data": {
        "_type": "externalFormat",
        "contentType": "application/json",
        "data": "{\"ame\": ame 35\",\"  \"id\": 82,\"  \"streetNumber\": 86,\"  \"streetName\": \"streetName 99\",\"  \"pinCode\": 94,\"  \"stateName\": \"stateName 21\"}"
      },
      "package": "test::data"
    },
    "classifierPath": "meta::pure::data::DataElement"
  },
  {
    "path": "test::changedTestModel",
    "content": {
      "_type": "class",
      "name": "changedTestModel",
      "superTypes": [],
      "originalMilestonedProperties": [],
      "properties": [
        {
          "name": "name",
          "type": "String",
          "multiplicity": {
            "lowerBound": 1,
            "upperBound": 1
          },
          "stereotypes": [],
          "taggedValues": []
        },
        {
          "name": "id",
          "type": "Integer",
          "multiplicity": {
            "lowerBound": 1,
            "upperBound": 1
          },
          "stereotypes": [],
          "taggedValues": []
        },
        {
          "name": "streetNumber",
          "type": "Integer",
          "multiplicity": {
            "lowerBound": 1,
            "upperBound": 1
          },
          "stereotypes": [],
          "taggedValues": []
        },
        {
          "name": "streetName",
          "type": "String",
          "multiplicity": {
            "lowerBound": 1,
            "upperBound": 1
          },
          "stereotypes": [],
          "taggedValues": []
        },
        {
          "name": "pinCode",
          "type": "Integer",
          "multiplicity": {
            "lowerBound": 1,
            "upperBound": 1
          },
          "stereotypes": [],
          "taggedValues": []
        },
        {
          "name": "stateName",
          "type": "String",
          "multiplicity": {
            "lowerBound": 1,
            "upperBound": 1
          },
          "stereotypes": [],
          "taggedValues": []
        }
      ],
      "qualifiedProperties": [],
      "stereotypes": [],
      "taggedValues": [],
      "constraints": [],
      "package": "test"
    },
    "classifierPath": "meta::pure::metamodel::type::Class"
  },
  {
    "path": "test::PersonModel",
    "content": {
      "_type": "class",
      "name": "PersonModel",
      "superTypes": [],
      "originalMilestonedProperties": [],
      "properties": [
        {
          "name": "name",
          "type": "String",
          "multiplicity": {
            "lowerBound": 1,
            "upperBound": 1
          },
          "stereotypes": [],
          "taggedValues": []
        },
        {
          "name": "id",
          "type": "String",
          "multiplicity": {
            "lowerBound": 1,
            "upperBound": 1
          },
          "stereotypes": [],
          "taggedValues": []
        },
        {
          "name": "address",
          "type": "test::Address",
          "multiplicity": {
            "lowerBound": 1,
            "upperBound": 1
          },
          "stereotypes": [],
          "taggedValues": []
        }
      ],
      "qualifiedProperties": [],
      "stereotypes": [],
      "taggedValues": [],
      "constraints": [],
      "package": "test"
    },
    "classifierPath": "meta::pure::metamodel::type::Class"
  },
  {
    "path": "test::changedModel",
    "content": {
      "_type": "class",
      "name": "changedModel",
      "superTypes": [],
      "originalMilestonedProperties": [],
      "properties": [
        {
          "name": "name",
          "type": "String",
          "multiplicity": {
            "lowerBound": 1,
            "upperBound": 1
          },
          "stereotypes": [],
          "taggedValues": []
        },
        {
          "name": "id",
          "type": "Integer",
          "multiplicity": {
            "lowerBound": 1,
            "upperBound": 1
          },
          "stereotypes": [],
          "taggedValues": []
        }
      ],
      "qualifiedProperties": [],
      "stereotypes": [],
      "taggedValues": [],
      "constraints": [],
      "package": "test"
    },
    "classifierPath": "meta::pure::metamodel::type::Class"
  },
  {
    "path": "test::StateInfo",
    "content": {
      "_type": "class",
      "name": "StateInfo",
      "superTypes": [],
      "originalMilestonedProperties": [],
      "properties": [
        {
          "name": "stateName",
          "type": "String",
          "multiplicity": {
            "lowerBound": 1,
            "upperBound": 1
          },
          "stereotypes": [],
          "taggedValues": []
        },
        {
          "name": "pinCode",
          "type": "Integer",
          "multiplicity": {
            "lowerBound": 1,
            "upperBound": 1
          },
          "stereotypes": [],
          "taggedValues": []
        }
      ],
      "qualifiedProperties": [],
      "stereotypes": [],
      "taggedValues": [],
      "constraints": [],
      "package": "test"
    },
    "classifierPath": "meta::pure::metamodel::type::Class"
  },
  {
    "path": "test::modelToModelTestMapping",
    "content": {
      "_type": "mapping",
      "classMappings": [
        {
          "_type": "pureInstance",
          "class": "test::PersonModel",
          "propertyMappings": [
            {
              "_type": "purePropertyMapping",
              "explodeProperty": false,
              "property": {
                "class": "test::PersonModel",
                "property": "name"
              },
              "source": "",
              "transform": {
                "_type": "lambda",
                "body": [
                  {
                    "_type": "property",
                    "parameters": [
                      {
                        "_type": "var",
                        "name": "src"
                      }
                    ],
                    "property": "name"
                  }
                ],
                "parameters": []
              }
            },
            {
              "_type": "purePropertyMapping",
              "explodeProperty": false,
              "property": {
                "class": "test::PersonModel",
                "property": "id"
              },
              "source": "",
              "transform": {
                "_type": "lambda",
                "body": [
                  {
                    "_type": "func",
                    "function": "toString",
                    "parameters": [
                      {
                        "_type": "property",
                        "parameters": [
                          {
                            "_type": "var",
                            "name": "src"
                          }
                        ],
                        "property": "id"
                      }
                    ]
                  }
                ],
                "parameters": []
              }
            },
            {
              "_type": "purePropertyMapping",
              "explodeProperty": false,
              "property": {
                "class": "test::PersonModel",
                "property": "address"
              },
              "source": "",
              "target": "test_Address",
              "transform": {
                "_type": "lambda",
                "body": [
                  {
                    "_type": "var",
                    "name": "src"
                  }
                ],
                "parameters": []
              }
            }
          ],
          "root": true,
          "srcClass": "test::changedTestModel"
        },
        {
          "_type": "pureInstance",
          "class": "test::Address",
          "propertyMappings": [
            {
              "_type": "purePropertyMapping",
              "explodeProperty": false,
              "property": {
                "class": "test::Address",
                "property": "streetNumber"
              },
              "source": "",
              "transform": {
                "_type": "lambda",
                "body": [
                  {
                    "_type": "property",
                    "parameters": [
                      {
                        "_type": "var",
                        "name": "src"
                      }
                    ],
                    "property": "streetNumber"
                  }
                ],
                "parameters": []
              }
            },
            {
              "_type": "purePropertyMapping",
              "explodeProperty": false,
              "property": {
                "class": "test::Address",
                "property": "streetName"
              },
              "source": "",
              "transform": {
                "_type": "lambda",
                "body": [
                  {
                    "_type": "property",
                    "parameters": [
                      {
                        "_type": "var",
                        "name": "src"
                      }
                    ],
                    "property": "streetName"
                  }
                ],
                "parameters": []
              }
            },
            {
              "_type": "purePropertyMapping",
              "explodeProperty": false,
              "property": {
                "class": "test::Address",
                "property": "stateInfo"
              },
              "source": "",
              "target": "test_StateInfo",
              "transform": {
                "_type": "lambda",
                "body": [
                  {
                    "_type": "var",
                    "name": "src"
                  }
                ],
                "parameters": []
              }
            }
          ],
          "root": true,
          "srcClass": "test::changedTestModel"
        },
        {
          "_type": "pureInstance",
          "class": "test::StateInfo",
          "propertyMappings": [
            {
              "_type": "purePropertyMapping",
              "explodeProperty": false,
              "property": {
                "class": "test::StateInfo",
                "property": "stateName"
              },
              "source": "",
              "transform": {
                "_type": "lambda",
                "body": [
                  {
                    "_type": "property",
                    "parameters": [
                      {
                        "_type": "var",
                        "name": "src"
                      }
                    ],
                    "property": "stateName"
                  }
                ],
                "parameters": []
              }
            },
            {
              "_type": "purePropertyMapping",
              "explodeProperty": false,
              "property": {
                "class": "test::StateInfo",
                "property": "pinCode"
              },
              "source": "",
              "transform": {
                "_type": "lambda",
                "body": [
                  {
                    "_type": "property",
                    "parameters": [
                      {
                        "_type": "var",
                        "name": "src"
                      }
                    ],
                    "property": "pinCode"
                  }
                ],
                "parameters": []
              }
            }
          ],
          "root": true,
          "srcClass": "test::changedTestModel"
        }
      ],
      "enumerationMappings": [],
      "includedMappings": [],
      "name": "modelToModelTestMapping",
      "package": "test",
      "testSuites": [
        {
          "_type": "mappingTestSuite",
          "id": "testSuite1",
          "storeTestDatas": [
            {
              "data": {
                "_type": "modelStore",
                "instances": {
                  "test::changedTestModel": {
                    "_type": "pair",
                    "first": {
                      "_type": "packageableElementPtr",
                      "fullPath": "generated::default__generatedBindingForTestData__test_modelToModelTestMapping__testSuite1"
                    },
                    "second": {
                      "_type": "packageableElementPtr",
                      "fullPath": "test::data::MyTestData"
                    }
                  }
                }
              },
              "store": "ModelStore"
            }
          ],
          "tests": [
            {
              "_type": "mappingTest",
              "assertions": [
                {
                  "_type": "equalToJson",
                  "expected": {
                    "_type": "externalFormat",
                    "contentType": "application/json",
                    "data": "{\"id\":\"82\",\"address\":{\"streetName\":\"streetName 99\",\"stateInfo\":{\"pinCode\":94,\"stateName\":\"stateName 21\"}}}"
                  },
                  "id": "assert1"
                }
              ],
              "id": "test1",
              "query": {
                "_type": "lambda",
                "body": [
                  {
                    "_type": "func",
                    "function": "serialize",
                    "parameters": [
                      {
                        "_type": "func",
                        "function": "graphFetch",
                        "parameters": [
                          {
                            "_type": "func",
                            "function": "getAll",
                            "parameters": [
                              {
                                "_type": "packageableElementPtr",
                                "fullPath": "test::PersonModel"
                              }
                            ]
                          },
                          {
                            "_type": "rootGraphFetchTree",
                            "class": "test::PersonModel",
                            "subTrees": [
                              {
                                "_type": "propertyGraphFetchTree",
                                "parameters": [],
                                "property": "id",
                                "subTrees": []
                              },
                              {
                                "_type": "propertyGraphFetchTree",
                                "parameters": [],
                                "property": "address",
                                "subTrees": [
                                  {
                                    "_type": "propertyGraphFetchTree",
                                    "parameters": [],
                                    "property": "streetName",
                                    "subTrees": []
                                  },
                                  {
                                    "_type": "propertyGraphFetchTree",
                                    "parameters": [],
                                    "property": "stateInfo",
                                    "subTrees": [
                                      {
                                        "_type": "propertyGraphFetchTree",
                                        "parameters": [],
                                        "property": "pinCode",
                                        "subTrees": []
                                      },
                                      {
                                        "_type": "propertyGraphFetchTree",
                                        "parameters": [],
                                        "property": "stateName",
                                        "subTrees": []
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "_type": "rootGraphFetchTree",
                        "class": "test::PersonModel",
                        "subTrees": [
                          {
                            "_type": "propertyGraphFetchTree",
                            "parameters": [],
                            "property": "id",
                            "subTrees": []
                          },
                          {
                            "_type": "propertyGraphFetchTree",
                            "parameters": [],
                            "property": "address",
                            "subTrees": [
                              {
                                "_type": "propertyGraphFetchTree",
                                "parameters": [],
                                "property": "streetName",
                                "subTrees": []
                              },
                              {
                                "_type": "propertyGraphFetchTree",
                                "parameters": [],
                                "property": "stateInfo",
                                "subTrees": [
                                  {
                                    "_type": "propertyGraphFetchTree",
                                    "parameters": [],
                                    "property": "pinCode",
                                    "subTrees": []
                                  },
                                  {
                                    "_type": "propertyGraphFetchTree",
                                    "parameters": [],
                                    "property": "stateName",
                                    "subTrees": []
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ],
                "parameters": []
              }
            }
          ]
        }
      ],
      "tests": []
    },
    "classifierPath": "meta::pure::mapping::Mapping"
  },
  {
    "path": "generated::default__generatedBindingForTestData__test_modelToModelTestMapping__testSuite1",
    "content": {
      "_type": "binding",
      "contentType": "application/json",
      "includedStores": [],
      "modelUnit": {
        "packageableElementExcludes": [],
        "packageableElementIncludes": [
          "test::changedTestModel"
        ]
      },
      "name": "default__generatedBindingForTestData__test_modelToModelTestMapping__testSuite1",
      "package": "generated"
    },
    "classifierPath": "meta::external::shared::format::binding::Binding"
  },
  {
    "path": "generated::default__generatedBindingForTestData__test_modelToModelMapping__testSuite1",
    "content": {
      "_type": "binding",
      "contentType": "application/json",
      "includedStores": [],
      "modelUnit": {
        "packageableElementExcludes": [],
        "packageableElementIncludes": [
          "test::model"
        ]
      },
      "name": "default__generatedBindingForTestData__test_modelToModelMapping__testSuite1",
      "package": "generated"
    },
    "classifierPath": "meta::external::shared::format::binding::Binding"
  },
  {
    "path": "test::modelToModelMapping",
    "content": {
      "_type": "mapping",
      "classMappings": [
        {
          "_type": "pureInstance",
          "class": "test::changedModel",
          "propertyMappings": [
            {
              "_type": "purePropertyMapping",
              "explodeProperty": false,
              "property": {
                "class": "test::changedModel",
                "property": "name"
              },
              "source": "",
              "transform": {
                "_type": "lambda",
                "body": [
                  {
                    "_type": "property",
                    "parameters": [
                      {
                        "_type": "var",
                        "name": "src"
                      }
                    ],
                    "property": "name"
                  }
                ],
                "parameters": []
              }
            },
            {
              "_type": "purePropertyMapping",
              "explodeProperty": false,
              "property": {
                "class": "test::changedModel",
                "property": "id"
              },
              "source": "",
              "transform": {
                "_type": "lambda",
                "body": [
                  {
                    "_type": "func",
                    "function": "parseInteger",
                    "parameters": [
                      {
                        "_type": "property",
                        "parameters": [
                          {
                            "_type": "var",
                            "name": "src"
                          }
                        ],
                        "property": "id"
                      }
                    ]
                  }
                ],
                "parameters": []
              }
            }
          ],
          "root": true,
          "srcClass": "test::model"
        }
      ],
      "enumerationMappings": [],
      "includedMappings": [],
      "name": "modelToModelMapping",
      "package": "test",
      "testSuites": [
        {
          "_type": "mappingTestSuite",
          "id": "testSuite1",
          "storeTestDatas": [
            {
              "data": {
                "_type": "modelStore",
                "instances": {
                  "test::model": {
                    "_type": "pair",
                    "first": {
                      "_type": "packageableElementPtr",
                      "fullPath": "generated::default__generatedBindingForTestData__test_modelToModelMapping__testSuite1"
                    },
                    "second": {
                      "_type": "packageableElementPtr",
                      "fullPath": "test::data::MyData"
                    }
                  }
                }
              },
              "store": "ModelStore"
            }
          ],
          "tests": [
            {
              "_type": "mappingTest",
              "assertions": [
                {
                  "_type": "equalToJson",
                  "expected": {
                    "_type": "externalFormat",
                    "contentType": "application/json",
                    "data": "{\"id\" : 77, \"name\" : \"john doe\"}"
                  },
                  "id": "assert1"
                }
              ],
              "id": "test1",
              "query": {
                "_type": "lambda",
                "body": [
                  {
                    "_type": "func",
                    "function": "serialize",
                    "parameters": [
                      {
                        "_type": "func",
                        "function": "graphFetch",
                        "parameters": [
                          {
                            "_type": "func",
                            "function": "getAll",
                            "parameters": [
                              {
                                "_type": "packageableElementPtr",
                                "fullPath": "test::changedModel"
                              }
                            ]
                          },
                          {
                            "_type": "rootGraphFetchTree",
                            "class": "test::changedModel",
                            "subTrees": [
                              {
                                "_type": "propertyGraphFetchTree",
                                "parameters": [],
                                "property": "id",
                                "subTrees": []
                              },
                              {
                                "_type": "propertyGraphFetchTree",
                                "parameters": [],
                                "property": "name",
                                "subTrees": []
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "_type": "rootGraphFetchTree",
                        "class": "test::changedModel",
                        "subTrees": [
                          {
                            "_type": "propertyGraphFetchTree",
                            "parameters": [],
                            "property": "id",
                            "subTrees": []
                          },
                          {
                            "_type": "propertyGraphFetchTree",
                            "parameters": [],
                            "property": "name",
                            "subTrees": []
                          }
                        ]
                      }
                    ]
                  }
                ],
                "parameters": []
              }
            }
          ]
        }
      ],
      "tests": []
    },
    "classifierPath": "meta::pure::mapping::Mapping"
  }
];

