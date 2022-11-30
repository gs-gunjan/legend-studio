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

import { UnsupportedOperationError } from '@finos/legend-shared';
import { V1_initPackageableElement } from './V1_CoreTransformerHelper.js';
import type { ExecutionEnvironmentInstance } from '../../../../../../../graph/metamodel/pure/packageableElements/service/ExecutionEnvironmentInstance.js';
import { V1_ExecutionEnvironmentInstance } from '../../../model/packageableElements/service/V1_ExecutionEnvironmentInstance.js';
import {
  type ExecutionParameters,
  MultiExecutionParameters,
  SingleExecutionParameters,
} from '../../../../../../../graph/metamodel/pure/packageableElements/service/ExecutionParameters.js';
import {
  type V1_ExecutionParameters,
  V1_MultiExecutionParameters,
  V1_SingleExecutionParameters,
} from '../../../model/packageableElements/service/V1_ExecutionParameters.js';
import type { V1_GraphTransformerContext } from './V1_GraphTransformerContext.js';
import { V1_transformRuntime } from './V1_RuntimeTransformer.js';

const transformSingleExecutionParameters = (
  element: SingleExecutionParameters,
  context: V1_GraphTransformerContext,
): V1_SingleExecutionParameters => {
  const executionParameters = new V1_SingleExecutionParameters();
  executionParameters.key = element.key;
  executionParameters.mapping = element.mapping.valueForSerialization ?? '';
  executionParameters.runtime = V1_transformRuntime(element.runtime, context);
  return executionParameters;
};

const transformMultiExecutionParameters = (
  element: MultiExecutionParameters,
  context: V1_GraphTransformerContext,
): V1_MultiExecutionParameters => {
  const execution = new V1_MultiExecutionParameters();
  execution.masterKey = element.masterKey;
  execution.singleExecutionParameters = element.singleExecutionParameters.map(
    (param) => transformSingleExecutionParameters(param, context),
  );
  return execution;
};

const transformExecutionParameters = (
  metamodel: ExecutionParameters,
  context: V1_GraphTransformerContext,
): V1_ExecutionParameters => {
  if (metamodel instanceof SingleExecutionParameters) {
    return transformSingleExecutionParameters(metamodel, context);
  } else if (metamodel instanceof MultiExecutionParameters) {
    return transformMultiExecutionParameters(metamodel, context);
  }
  throw new UnsupportedOperationError(
    `Can't transform execution parameters`,
    metamodel,
  );
};

export const V1_transformExecutionEnvironmentInstance = (
  element: ExecutionEnvironmentInstance,
  context: V1_GraphTransformerContext,
): V1_ExecutionEnvironmentInstance => {
  const executionEnvironmentInstance = new V1_ExecutionEnvironmentInstance();
  V1_initPackageableElement(executionEnvironmentInstance, element);
  executionEnvironmentInstance.executionParameters.forEach((parameters) =>
    transformExecutionParameters(parameters, context),
  );
  return executionEnvironmentInstance;
};
