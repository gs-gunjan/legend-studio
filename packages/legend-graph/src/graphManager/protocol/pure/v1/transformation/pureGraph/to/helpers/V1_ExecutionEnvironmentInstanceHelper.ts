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

import {
  UnsupportedOperationError,
  assertNonEmptyString,
  assertNonNullable,
} from '@finos/legend-shared';
import {
  type Runtime,
  RuntimePointer,
} from '../../../../../../../../graph/metamodel/pure/packageableElements/runtime/Runtime.js';
import type { V1_GraphBuilderContext } from '../../../../transformation/pureGraph/to/V1_GraphBuilderContext.js';
import {
  type V1_Runtime,
  V1_RuntimePointer,
  V1_EngineRuntime,
  V1_LegacyRuntime,
  V1_StoreConnections,
  V1_IdentifiedConnection,
} from '../../../../model/packageableElements/runtime/V1_Runtime.js';
import { V1_buildEngineRuntime } from './V1_RuntimeBuilderHelper.js';
import { V1_PackageableElementPointer } from '../../../../model/packageableElements/V1_PackageableElement.js';
import { GraphBuilderError } from '../../../../../../../../graphManager/GraphManagerUtils.js';
import { PackageableElementPointerType } from '../../../../../../../../graph/MetaModelConst.js';
import {
  type ExecutionParameters,
  MultiExecutionParameters,
  SingleExecutionParameters,
} from '../../../../../../../../graph/metamodel/pure/packageableElements/service/ExecutionParameters.js';
import {
  type V1_ExecutionParameters,
  V1_MultiExecutionParameters,
  V1_SingleExecutionParameters,
} from '../../../../model/packageableElements/service/V1_ExecutionParameters.js';

const buildExecutionRuntime = (
  runtime: V1_Runtime,
  mapping: string,
  context: V1_GraphBuilderContext,
): Runtime => {
  const mappingPointer = new V1_PackageableElementPointer(
    PackageableElementPointerType.MAPPING,
    mapping,
  );
  if (runtime instanceof V1_RuntimePointer) {
    assertNonNullable(
      runtime.runtime,
      `Runtime pointer 'runtime' field is missing`,
    );
    return new RuntimePointer(context.resolveRuntime(runtime.runtime));
  } else if (runtime instanceof V1_EngineRuntime) {
    runtime.mappings = runtime.mappings.length
      ? runtime.mappings
      : [mappingPointer];
    return V1_buildEngineRuntime(runtime, context);
  } else if (runtime instanceof V1_LegacyRuntime) {
    const engineRuntime = new V1_EngineRuntime();
    engineRuntime.mappings = runtime.mappings.length
      ? runtime.mappings
      : [mappingPointer];
    let idx = 1;
    engineRuntime.connections = [];
    runtime.connections.forEach((connection) => {
      assertNonNullable(
        connection.store,
        `Legacy runtime embedded connection 'store' field is missing`,
      );
      const identifiedConnection = new V1_IdentifiedConnection();
      identifiedConnection.id = `connection_${idx} `;
      idx++;
      identifiedConnection.connection = connection;
      let storeConnections = engineRuntime.connections.find(
        (sc) => sc.store.path === connection.store,
      );
      if (!storeConnections) {
        const newStoreConnections = new V1_StoreConnections();
        newStoreConnections.store = new V1_PackageableElementPointer(
          PackageableElementPointerType.STORE,
          connection.store,
        );
        storeConnections = newStoreConnections;
      }
      storeConnections.storeConnections.push(identifiedConnection);
    });
    return V1_buildEngineRuntime(engineRuntime, context);
  }
  throw new UnsupportedOperationError();
};

export const V1_buildExecutionParameters = (
  executionParameters: V1_ExecutionParameters,
  context: V1_GraphBuilderContext,
): ExecutionParameters => {
  if (executionParameters instanceof V1_SingleExecutionParameters) {
    assertNonEmptyString(
      executionParameters.key,
      `Single Execution Parameters 'key' field is missing`,
    );
    return new SingleExecutionParameters(
      executionParameters.key,
      context.resolveMapping(executionParameters.mapping),
      buildExecutionRuntime(
        executionParameters.runtime,
        executionParameters.mapping,
        context,
      ),
    );
  } else if (executionParameters instanceof V1_MultiExecutionParameters) {
    assertNonEmptyString(
      executionParameters.masterKey,
      `Multi Execution Parameters 'masterKey' field is missing`,
    );
    const executionParameter = new MultiExecutionParameters(
      executionParameters.masterKey,
      [],
    );
    const uniqueKeys = new Set();
    executionParameter.singleExecutionParameters =
      executionParameters.singleExecutionParameters.map(
        (keyedExecutionParameter) => {
          assertNonEmptyString(
            keyedExecutionParameter.key,
            `Single Execution Parameter 'key' field is missing`,
          );
          // check duplicated key
          if (uniqueKeys.has(keyedExecutionParameter.key)) {
            throw new GraphBuilderError(
              `Service multi-execution with key '${keyedExecutionParameter.key}' already exists`,
            );
          }
          return V1_buildExecutionParameters(
            keyedExecutionParameter,
            context,
          ) as SingleExecutionParameters;
        },
      );
    return executionParameters;
  }
  throw new UnsupportedOperationError();
};
