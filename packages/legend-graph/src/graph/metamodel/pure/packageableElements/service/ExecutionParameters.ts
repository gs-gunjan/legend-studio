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
import { CORE_HASH_STRUCTURE } from '../../../../Core_HashUtils.js';
import type { Mapping } from '../mapping/Mapping.js';
import type { PackageableElementReference } from '../PackageableElementReference.js';
import type { Runtime } from '../runtime/Runtime.js';

export abstract class ExecutionParameters implements Hashable {
  abstract get hashCode(): string;
}

export class SingleExecutionParameters
  extends ExecutionParameters
  implements Hashable
{
  key!: string;
  mapping!: PackageableElementReference<Mapping>;
  runtime!: Runtime;

  constructor(
    key: string,
    mapping: PackageableElementReference<Mapping>,
    runtime: Runtime,
  ) {
    super();
    this.key = key;
    this.mapping = mapping;
    this.runtime = runtime;
  }

  override get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.SINGLE_EXECUTION_PARAMETERS,
      this.key,
      this.mapping.valueForSerialization ?? '',
      this.runtime,
    ]);
  }
}

export class MultiExecutionParameters
  extends ExecutionParameters
  implements Hashable
{
  masterKey!: string;
  singleExecutionParameters: SingleExecutionParameters[] = [];

  constructor(
    masterKey: string,
    singleExecutionParameters: SingleExecutionParameters[],
  ) {
    super();
    this.masterKey = masterKey;
    this.singleExecutionParameters = singleExecutionParameters;
  }

  override get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.MULTI_EXECUTION_PARAMETERS,
      this.masterKey,
      hashArray(this.singleExecutionParameters),
    ]);
  }
}
