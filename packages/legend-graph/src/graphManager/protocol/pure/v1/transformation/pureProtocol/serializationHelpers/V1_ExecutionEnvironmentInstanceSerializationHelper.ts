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
  createModelSchema,
  primitive,
  deserialize,
  custom,
  list,
  serialize,
  type ModelSchema,
} from 'serializr';
import {
  type PlainObject,
  usingConstantValueSchema,
  UnsupportedOperationError,
  usingModelSchema,
  optionalCustom,
} from '@finos/legend-shared';
import { V1_Service } from '../../../model/packageableElements/service/V1_Service.js';
import {
  type V1_Runtime,
  V1_EngineRuntime,
  V1_LegacyRuntime,
  V1_RuntimePointer,
} from '../../../model/packageableElements/runtime/V1_Runtime.js';
import {
  V1_runtimePointerModelSchema,
  V1_RuntimeType,
} from './V1_RuntimeSerializationHelper.js';
import type { PureProtocolProcessorPlugin } from '../../../../PureProtocolProcessorPlugin.js';
import {
  type V1_ExecutionParameters,
  V1_MultiExecutionParameters,
  V1_SingleExecutionParameters,
} from '../../../model/packageableElements/service/V1_ExecutionParameters.js';
import { EXECUTION_PARAMETERS } from '../../../../../../../graph/MetaModelConst.js';
import type { ExecutionEnvironmentInstance } from '../../../../../../../graph/metamodel/pure/packageableElements/service/ExecutionEnvironmentInstance.js';
import { V1_ExecutionEnvironmentInstance } from '../../../model/packageableElements/service/V1_ExecutionEnvironmentInstance.js';

export const V1_EXECUTION_ENVIRONMENT_PROTOCOL_TYPE =
  'executionEnvironmentInstance';

const V1_serializeRuntimeValue = (
  protocol: V1_Runtime,
): PlainObject<V1_Runtime> => {
  if (protocol instanceof V1_RuntimePointer) {
    return serialize(V1_runtimePointerModelSchema, protocol);
  } else if (protocol instanceof V1_EngineRuntime) {
    return serialize(V1_EngineRuntime, protocol);
  } else if (protocol instanceof V1_LegacyRuntime) {
    return serialize(V1_LegacyRuntime, protocol);
  }
  throw new UnsupportedOperationError(
    `Can't serialize runtime value`,
    protocol,
  );
};

const V1_deserializeRuntimeValue = (
  json: PlainObject<V1_Runtime>,
): V1_Runtime => {
  switch (json._type) {
    case V1_RuntimeType.RUNTIME_POINTER:
      return deserialize(V1_runtimePointerModelSchema, json);
    case V1_RuntimeType.ENGINE_RUNTIME:
      return deserialize(V1_EngineRuntime, json);
    case V1_RuntimeType.LEGACY_RUNTIME:
    case undefined:
      return deserialize(V1_LegacyRuntime, json);
    default:
      throw new UnsupportedOperationError(
        `Can't deeserialize runtime value of type '${json._type}'`,
      );
  }
};

const singleExecutionParamaterModelSchema = createModelSchema(
  V1_SingleExecutionParameters,
  {
    _type: usingConstantValueSchema(
      EXECUTION_PARAMETERS.SINGLE_EXECUTION_PARAMETERS,
    ),
    key: primitive(),
    mapping: primitive(),
    runtime: custom(
      (val) => V1_serializeRuntimeValue(val),
      (val) => V1_deserializeRuntimeValue(val),
    ),
  },
);

const multiExecutionParametersModelSchema = createModelSchema(
  V1_MultiExecutionParameters,
  {
    _type: usingConstantValueSchema(
      EXECUTION_PARAMETERS.MULTI_EXECUTION_PARAMETERS,
    ),
    masterKey: primitive(),
    singleExecutionParameters: list(
      usingModelSchema(singleExecutionParamaterModelSchema),
    ),
  },
);

const V1_serializeExecutionParameters = (
  protocol: V1_ExecutionParameters,
): PlainObject<V1_ExecutionParameters> => {
  if (protocol instanceof V1_SingleExecutionParameters) {
    return serialize(singleExecutionParamaterModelSchema, protocol);
  } else if (protocol instanceof V1_MultiExecutionParameters) {
    return serialize(multiExecutionParametersModelSchema, protocol);
  }
  throw new UnsupportedOperationError(
    `Can't serialize execution parameters`,
    protocol,
  );
};

const V1_deserializeExecutionParameters = (
  json: PlainObject<V1_ExecutionParameters>,
): V1_ExecutionParameters => {
  switch (json._type) {
    case EXECUTION_PARAMETERS.SINGLE_EXECUTION_PARAMETERS:
      return deserialize(singleExecutionParamaterModelSchema, json);
    case EXECUTION_PARAMETERS.MULTI_EXECUTION_PARAMETERS:
      return deserialize(multiExecutionParametersModelSchema, json);
    default:
      throw new UnsupportedOperationError(
        `Can't deserialize execution parameters of type '${json._type}'`,
      );
  }
};

export const V1_executionEnvironmentModelSchema = (
  plugins: PureProtocolProcessorPlugin[],
): ModelSchema<V1_ExecutionEnvironmentInstance> =>
  createModelSchema(V1_ExecutionEnvironmentInstance, {
    _type: usingConstantValueSchema('executionEnvironmentInstance'),
    executionParameters: list(
      optionalCustom(
        (val) => V1_serializeExecutionParameters(val),
        (val) => V1_deserializeExecutionParameters(val),
      ),
    ),
  });
