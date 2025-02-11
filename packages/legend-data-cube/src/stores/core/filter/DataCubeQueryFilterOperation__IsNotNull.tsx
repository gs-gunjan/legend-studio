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
import { DataCubeQueryFilterOperation } from './DataCubeQueryFilterOperation.js';
import type { DataCubeSnapshotFilterCondition } from '../DataCubeSnapshot.js';
import type { DataCubeColumn } from '../model/DataCubeColumn.js';
import {
  DataCubeColumnDataType,
  DataCubeFunction,
  DataCubeOperationAdvancedValueType,
  DataCubeQueryFilterOperator,
  ofDataType,
  type DataCubeOperationValue,
} from '../DataCubeQueryEngine.js';
import {
  _function,
  _functionName,
  _not,
  _property,
} from '../DataCubeQueryBuilderUtils.js';
import { type V1_AppliedFunction } from '@finos/legend-graph';
import {
  _unwrapNotFilterCondition,
  _filterCondition_base,
} from '../DataCubeSnapshotBuilderUtils.js';
import { returnUndefOnError } from '@finos/legend-shared';

export class DataCubeQueryFilterOperation__IsNotNull extends DataCubeQueryFilterOperation {
  override get label() {
    return 'is not null';
  }

  override get textLabel() {
    return '!= NULL';
  }

  override get description() {
    return 'is not NULL';
  }

  override get operator() {
    return DataCubeQueryFilterOperator.IS_NOT_NULL;
  }

  isCompatibleWithColumn(column: DataCubeColumn) {
    return ofDataType(column.type, [
      DataCubeColumnDataType.TEXT,
      DataCubeColumnDataType.NUMBER,
      DataCubeColumnDataType.DATE,
      DataCubeColumnDataType.TIME,
    ]);
  }

  isCompatibleWithValue(value: DataCubeOperationValue) {
    return (
      value.value === undefined &&
      value.type === DataCubeOperationAdvancedValueType.VOID
    );
  }

  generateDefaultValue(column: DataCubeColumn) {
    return {
      type: DataCubeOperationAdvancedValueType.VOID,
    };
  }

  buildConditionSnapshot(
    expression: V1_AppliedFunction,
    columnGetter: (name: string) => DataCubeColumn,
  ) {
    return this._finalizeConditionSnapshot(
      _filterCondition_base(
        returnUndefOnError(() => _unwrapNotFilterCondition(expression)),
        DataCubeFunction.IS_EMPTY,
        columnGetter,
      ),
    );
  }

  buildConditionExpression(condition: DataCubeSnapshotFilterCondition) {
    return _not(
      _function(_functionName(DataCubeFunction.IS_EMPTY), [
        _property(condition.name),
      ]),
    );
  }
}
