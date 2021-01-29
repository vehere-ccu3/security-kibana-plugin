/*
 *   Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

import React, { Dispatch, SetStateAction } from 'react';
import { EuiForm, EuiFlexGroup, EuiFlexItem, EuiComboBox } from '@elastic/eui';
import { ComboBoxOptions, ResourceType } from '../../types';
import { PanelWithHeader } from '../../utils/panel-with-header';
import { FormRow } from '../../utils/form-row';
import { LIMIT_WIDTH_INPUT_CLASS } from '../../constants';

export function AppsPermissionPanel(props: {
  state: ComboBoxOptions;
  optionUniverse: ComboBoxOptions;
  setState: Dispatch<SetStateAction<ComboBoxOptions>>;
}) {
  const { state, optionUniverse, setState } = props;
  return (
    <PanelWithHeader
      headerText="Apps permissions"
      headerSubText="Specify how users in this role can access the apps. By default, no apps permission is granted."
      // helpLink={DocLinks.AppsPermissionsDoc}
    >
      <EuiForm>
        <FormRow
          headerText="Apps Permissions"
          headerSubText="Specify apps permissions."
        >
          <EuiFlexGroup>
            <EuiFlexItem className={LIMIT_WIDTH_INPUT_CLASS}>
              <EuiComboBox
                placeholder="Search for app name"
                options={optionUniverse}
                selectedOptions={state}
                onChange={setState}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </FormRow>
      </EuiForm>
    </PanelWithHeader>
  );
}
