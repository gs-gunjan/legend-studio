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

import { hashArray, type Hashable } from '@finos/legend-shared';
import { CORE_HASH_STRUCTURE } from '../../../../../../../graph/Core_HashUtils.js';
import type { V1_Runtime } from '../../../model/packageableElements/runtime/V1_Runtime.js';

export abstract class V1_ExecutionParameters implements Hashable {
  abstract get hashCode(): string;
}

export class V1_SingleExecutionParameters
  extends V1_ExecutionParameters
  implements Hashable
{
  key!: string;
  mapping!: string;
  runtime!: V1_Runtime;

  override get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.SINGLE_EXECUTION_PARAMETERS,
      this.key,
      this.mapping,
      this.runtime,
    ]);
  }
}

export class V1_MultiExecutionParameters
  extends V1_ExecutionParameters
  implements Hashable
{
  masterKey!: string;
  singleExecutionParameters: V1_SingleExecutionParameters[] = [];

  override get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.MULTI_EXECUTION_PARAMETERS,
      this.masterKey,
      hashArray(this.singleExecutionParameters),
    ]);
  }
}
