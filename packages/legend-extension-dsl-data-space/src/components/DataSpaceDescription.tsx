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

import { AnchorLinkIcon } from '@finos/legend-art';
import type { DataSpaceViewerState } from '../stores/DataSpaceViewerState.js';
import { observer } from 'mobx-react-lite';
import { DataSpaceWikiPlaceholder } from './DataSpacePlaceholder.js';
import { DataSpaceMarkdownTextViewer } from './DataSpaceMarkdownTextViewer.js';
import { useEffect, useRef } from 'react';

export const DataSpaceDescription = observer(
  (props: { dataSpaceViewerState: DataSpaceViewerState }) => {
    const { dataSpaceViewerState } = props;
    const analysisResult = dataSpaceViewerState.dataSpaceAnalysisResult;
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // do
    }, [dataSpaceViewerState]);

    return (
      <div ref={sectionRef} className="data-space__viewer__wiki__section">
        <div className="data-space__viewer__wiki__section__header">
          <div className="data-space__viewer__wiki__section__header__label">
            Description
            <div className="data-space__viewer__wiki__section__header__anchor">
              <AnchorLinkIcon />
            </div>
          </div>
        </div>
        <div className="data-space__viewer__wiki__section__content">
          {analysisResult.description !== undefined && (
            <div className="data-space__viewer__description">
              <div className="data-space__viewer__description__content">
                <DataSpaceMarkdownTextViewer
                  value={analysisResult.description}
                />
              </div>
            </div>
          )}
          {analysisResult.description === undefined && (
            <DataSpaceWikiPlaceholder message="No description provided" />
          )}
        </div>
      </div>
    );
  },
);
