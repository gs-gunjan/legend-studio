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

import { observer } from 'mobx-react-lite';
import type { QueryBuilderState } from '../stores/QueryBuilderState.js';
import {
  Dialog,
  BlankPanelContent,
  CustomSelectorInput,
  PencilIcon,
  TimesIcon,
  DollarIcon,
  PlusIcon,
  DragPreviewLayer,
  useDragPreviewLayer,
  BlankPanelPlaceholder,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  PanelFormTextField,
} from '@finos/legend-art';
import {
  type QueryBuilderParameterDragSource,
  QUERY_BUILDER_PARAMETER_DND_TYPE,
} from '../stores/QueryBuilderParametersState.js';
import {
  type Type,
  VariableExpression,
  GenericTypeExplicitReference,
  GenericType,
  PrimitiveType,
  Multiplicity,
  getMultiplicityPrettyDescription,
} from '@finos/legend-graph';
import {
  type PackageableElementOption,
  buildElementOption,
  getPackageableElementOptionFormatter,
  useApplicationStore,
} from '@finos/legend-application';
import { useDrag } from 'react-dnd';
import { generateEnumerableNameFromToken } from '@finos/legend-shared';
import { DEFAULT_VARIABLE_NAME } from '../stores/QueryBuilderConfig.js';
import { variableExpression_setName } from '../stores/shared/ValueSpecificationModifierHelper.js';
import { LambdaParameterState } from '../stores/shared/LambdaParameterState.js';
import { LambdaParameterValuesEditor } from './shared/LambdaParameterValuesEditor.js';

type MultiplicityOption = { label: string; value: Multiplicity };

const buildMultiplicityOption = (
  multiplicity: Multiplicity,
): MultiplicityOption => ({
  label: getMultiplicityPrettyDescription(multiplicity),
  value: multiplicity,
});

const VariableExpressionEditor = observer(
  (props: {
    queryBuilderState: QueryBuilderState;
    lambdaParameterState: LambdaParameterState;
  }) => {
    // main state
    const { queryBuilderState, lambdaParameterState } = props;
    const applicationStore = useApplicationStore();
    const queryParametersState = queryBuilderState.parametersState;
    const isCreating =
      !queryParametersState.parameterStates.includes(lambdaParameterState);
    const varState = lambdaParameterState.parameter;
    const multiplity = varState.multiplicity;
    const validationMessage = !varState.name
      ? `Parameter name can't be empty`
      : (isCreating &&
          queryParametersState.parameterStates.find(
            (p) => p.parameter.name === varState.name,
          )) ||
        (!isCreating &&
          queryParametersState.parameterStates.filter(
            (p) => p.parameter.name === varState.name,
          ).length > 1)
      ? 'Parameter name already exists'
      : undefined;

    // type
    const variableType =
      lambdaParameterState.variableType ?? PrimitiveType.STRING;
    const selectedType = buildElementOption(variableType);
    const selectedMultiplicity = buildMultiplicityOption(multiplity);
    const typeOptions: PackageableElementOption<Type>[] =
      queryBuilderState.graphManagerState.graph.primitiveTypes
        .map(buildElementOption)
        .concat(
          queryBuilderState.graphManagerState.graph.enumerations.map(
            buildElementOption,
          ),
        );
    const changeType = (val: PackageableElementOption<Type>): void => {
      if (variableType !== val.value) {
        lambdaParameterState.changeVariableType(val.value);
      }
    };

    // multiplicity
    const validParamMultiplicityList = [
      Multiplicity.ONE,
      Multiplicity.ZERO_ONE,
      Multiplicity.ZERO_MANY,
    ];
    const multilicityOptions: MultiplicityOption[] =
      validParamMultiplicityList.map(buildMultiplicityOption);
    const changeMultiplicity = (val: MultiplicityOption): void => {
      lambdaParameterState.changeMultiplicity(varState, val.value);
    };

    const close = (): void => {
      queryParametersState.setSelectedParameter(undefined);
    };
    const onAction = (): void => {
      if (isCreating) {
        queryParametersState.addParameter(lambdaParameterState);
      }
      close();
    };

    return (
      <Dialog
        open={Boolean(lambdaParameterState)}
        onClose={close}
        classes={{
          root: 'editor-modal__root-container',
          container: 'editor-modal__container',
          paper: 'editor-modal__content',
        }}
      >
        <Modal
          darkMode={true}
          className="editor-modal query-builder__parameters__modal"
        >
          <ModalHeader
            title={`${isCreating ? 'Create Parameter' : 'Update Parameter'}`}
          />
          <ModalBody className="query-builder__parameters__modal__body">
            <PanelFormTextField
              name="Parameter Name"
              prompt="Name of the parameter. Should be descriptive of its purpose."
              update={(value: string | undefined): void =>
                variableExpression_setName(varState, value ?? '')
              }
              value={varState.name}
              errorMessage={validationMessage}
              isReadOnly={false}
            />
            <div className="panel__content__form__section">
              <div className="panel__content__form__section__header__label">
                Type
              </div>
              <div className="panel__content__form__section__header__prompt">
                Data type of the parameter.
              </div>
              <CustomSelectorInput
                placeholder="Choose a type..."
                options={typeOptions}
                onChange={changeType}
                value={selectedType}
                darkMode={!applicationStore.TEMPORARY__isLightThemeEnabled}
                formatOptionLabel={getPackageableElementOptionFormatter({
                  darkMode: !applicationStore.TEMPORARY__isLightThemeEnabled,
                })}
              />
            </div>
            <div className="panel__content__form__section">
              <div className="panel__content__form__section__header__label">
                Multiplicity
              </div>
              <div className="panel__content__form__section__header__prompt">
                The multiplity determines how many values a parameter can have.
                Default is set to mandatory single vlue.
              </div>
              <CustomSelectorInput
                placeholder="Choose a multiplicity..."
                options={multilicityOptions}
                onChange={changeMultiplicity}
                value={selectedMultiplicity}
                hasError={
                  !validParamMultiplicityList.includes(
                    selectedMultiplicity.value,
                  )
                }
                darkMode={!applicationStore.TEMPORARY__isLightThemeEnabled}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            {isCreating && (
              <button
                className="btn modal__footer__close-btn btn--dark"
                onClick={onAction}
                disabled={Boolean(validationMessage)}
              >
                Create
              </button>
            )}
            <button className="btn modal__footer__close-btn" onClick={close}>
              Close
            </button>
          </ModalFooter>
        </Modal>
      </Dialog>
    );
  },
);

export const VariableExpressionViewer = observer(
  (props: {
    queryBuilderState: QueryBuilderState;
    isReadOnly: boolean;
    hideActions?: boolean;
    variableExpressionState: LambdaParameterState;
  }) => {
    const {
      queryBuilderState,
      isReadOnly,
      hideActions,
      variableExpressionState,
    } = props;
    const queryParameterState = queryBuilderState.parametersState;
    const variable = variableExpressionState.parameter;
    const name = variable.name;
    const variableType = variable.genericType?.value.rawType;
    const typeName = variableType?.name;
    const editVariable = (): void => {
      queryParameterState.setSelectedParameter(variableExpressionState);
    };
    const deleteVariable = (): void =>
      queryParameterState.removeParameter(variableExpressionState);
    const [, dragConnector, dragPreviewConnector] = useDrag(
      () => ({
        type: QUERY_BUILDER_PARAMETER_DND_TYPE,
        item: { variable: variableExpressionState },
      }),
      [variableExpressionState],
    );
    useDragPreviewLayer(dragPreviewConnector);

    return (
      <div className="query-builder__parameters__parameter" ref={dragConnector}>
        <DragPreviewLayer
          labelGetter={(item: QueryBuilderParameterDragSource): string =>
            item.variable.variableName === ''
              ? '(unknown)'
              : item.variable.variableName
          }
          types={[QUERY_BUILDER_PARAMETER_DND_TYPE]}
        />
        <div className="query-builder__parameters__parameter__content">
          <div className="query-builder__parameters__parameter__icon">
            <div className="query-builder__parameters__parameter-icon">
              <DollarIcon />
            </div>
          </div>
          <div className="query-builder__parameters__parameter__label">
            {name}
            <div className="query-builder__parameters__parameter__type">
              <div className="query-builder__parameters__parameter__type__label">
                {typeName}
              </div>
            </div>
          </div>
        </div>
        {!hideActions && (
          <div className="query-builder__parameters__parameter__actions">
            <button
              className="query-builder__parameters__parameter__action"
              tabIndex={-1}
              disabled={isReadOnly}
              onClick={editVariable}
              title="Edit"
            >
              <PencilIcon />
            </button>
            <button
              className="query-builder__parameters__parameter__action"
              tabIndex={-1}
              onClick={deleteVariable}
              disabled={isReadOnly}
              title="Remove"
            >
              <TimesIcon />
            </button>
          </div>
        )}
      </div>
    );
  },
);

export const QueryBuilderParametersPanel = observer(
  (props: { queryBuilderState: QueryBuilderState }) => {
    const { queryBuilderState } = props;
    const isReadOnly = !queryBuilderState.isQuerySupported;
    const queryParameterState = queryBuilderState.parametersState;
    const varNames = queryBuilderState.parametersState.parameterStates.map(
      (parameter) => parameter.variableName,
    );
    const addParameter = (): void => {
      if (!isReadOnly && !queryBuilderState.isParameterSupportDisabled) {
        const parmaterState = new LambdaParameterState(
          new VariableExpression(
            generateEnumerableNameFromToken(varNames, DEFAULT_VARIABLE_NAME),
            queryBuilderState.graphManagerState.graph.getMultiplicity(1, 1),
            GenericTypeExplicitReference.create(
              new GenericType(PrimitiveType.STRING),
            ),
          ),
          queryBuilderState.observableContext,
          queryBuilderState.graphManagerState.graph,
        );
        queryParameterState.setSelectedParameter(parmaterState);
        parmaterState.mockParameterValue();
      }
    };

    return (
      <div className="panel query-builder__parameters">
        <div className="panel__header">
          <div className="panel__header__title">
            <div className="panel__header__title__label">parameters</div>
          </div>
          {!isReadOnly && !queryBuilderState.isParameterSupportDisabled && (
            <div className="panel__header__actions">
              <button
                className="panel__header__action"
                tabIndex={-1}
                onClick={addParameter}
                title="Add Parameter"
              >
                <PlusIcon />
              </button>
            </div>
          )}
        </div>
        <div className="panel__content query-builder__parameters__content">
          {!queryBuilderState.isParameterSupportDisabled && (
            <>
              {Boolean(queryParameterState.parameterStates.length) &&
                queryParameterState.parameterStates.map((parameter) => (
                  <VariableExpressionViewer
                    key={parameter.uuid}
                    queryBuilderState={queryBuilderState}
                    isReadOnly={isReadOnly}
                    variableExpressionState={parameter}
                  />
                ))}
              {!queryParameterState.parameterStates.length && (
                <BlankPanelPlaceholder
                  text="Add a parameter"
                  disabled={isReadOnly}
                  onClick={addParameter}
                  clickActionType="add"
                  previewText="No parameter"
                  tooltipText="Click to add a new parameter"
                />
              )}
            </>
          )}
          {queryBuilderState.isParameterSupportDisabled && (
            <BlankPanelContent>Parameters are not supported</BlankPanelContent>
          )}
        </div>
        {queryParameterState.selectedParameter && (
          <VariableExpressionEditor
            queryBuilderState={queryBuilderState}
            lambdaParameterState={queryParameterState.selectedParameter}
          />
        )}
        {queryParameterState.parameterValuesEditorState.showModal && (
          <LambdaParameterValuesEditor
            graph={queryBuilderState.graphManagerState.graph}
            observerContext={queryBuilderState.observableContext}
            lambdaParametersState={queryParameterState}
          />
        )}
      </div>
    );
  },
);
