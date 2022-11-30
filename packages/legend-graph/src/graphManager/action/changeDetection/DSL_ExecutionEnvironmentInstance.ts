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

import { computed, observable } from 'mobx';
import { makeObservable } from 'mobx/dist/api/makeObservable.js';
import type { ExecutionEnvironmentInstance } from '../../../graph/metamodel/pure/packageableElements/service/ExecutionEnvironmentInstance.js';
import {
  type ExecutionParameters,
  MultiExecutionParameters,
  SingleExecutionParameters,
} from '../../../graph/metamodel/pure/packageableElements/service/ExecutionParameters.js';
import {
  type ObserverContext,
  observe_PackageableElementReference,
  skipObservedWithContext,
} from './CoreObserverHelper.js';
import { observe_Runtime } from './DSL_Mapping_ObserverHelper.js';

export const observe_SingleExecutionParameters = skipObservedWithContext(
  (
    metamodel: SingleExecutionParameters,
    context,
  ): SingleExecutionParameters => {
    makeObservable(metamodel, {
      key: observable,
      runtime: observable,
      hashCode: computed,
    });

    observe_PackageableElementReference(metamodel.mapping);
    observe_Runtime(metamodel.runtime, context);

    return metamodel;
  },
);

export const observe_MultiExecutionParameters = skipObservedWithContext(
  (metamodel: MultiExecutionParameters, context): MultiExecutionParameters => {
    makeObservable(metamodel, {
      masterKey: observable,
      singleExecutionParameters: observable,
      hashCode: computed,
    });

    metamodel.singleExecutionParameters.forEach((parameter) =>
      observe_SingleExecutionParameters(parameter, context),
    );

    return metamodel;
  },
);

export const observe_ExecutionParameters = (
  metamodel: ExecutionParameters,
  context: ObserverContext,
): ExecutionParameters => {
  if (metamodel instanceof SingleExecutionParameters) {
    return observe_SingleExecutionParameters(metamodel, context);
  } else if (metamodel instanceof MultiExecutionParameters) {
    return observe_MultiExecutionParameters(metamodel, context);
  }
  return metamodel;
};

export const observe_ExecutionEnvironmentInstance = skipObservedWithContext(
  (
    metamodel: ExecutionEnvironmentInstance,
    context: ObserverContext,
  ): ExecutionEnvironmentInstance => {
    makeObservable(metamodel, {
      executionParameters: observable,
      hashCode: computed,
    });

    metamodel.executionParameters.forEach((parameters) =>
      observe_ExecutionParameters(parameters, context),
    );
    return metamodel;
  },
);
