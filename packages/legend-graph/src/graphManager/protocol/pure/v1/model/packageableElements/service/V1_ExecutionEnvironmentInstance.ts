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

import { type Hashable, hashArray } from '@finos/legend-shared';
import { CORE_HASH_STRUCTURE } from '../../../../../../../graph/Core_HashUtils.js';
import {
  V1_PackageableElement,
  type V1_PackageableElementVisitor,
} from '../V1_PackageableElement.js';
import type { V1_ExecutionParameters } from './V1_ExecutionParameters.js';

export class V1_ExecutionEnvironmentInstance
  extends V1_PackageableElement
  implements Hashable
{
  executionParameters: V1_ExecutionParameters[] = [];

  override get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.EXECUTION_ENVIRONMENT_INSTANCE,
      hashArray(this.executionParameters),
    ]);
  }

  accept_PackageableElementVisitor<T>(
    visitor: V1_PackageableElementVisitor<T>,
  ): T {
    return visitor.visit_ExecutionEnvironmentInstance(this);
  }
}
