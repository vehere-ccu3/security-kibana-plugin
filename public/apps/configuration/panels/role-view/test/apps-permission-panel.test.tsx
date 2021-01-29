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

import React from 'react';
import { shallow } from 'enzyme';
import { AppsPermissionPanel } from '../apps-permission-panel';
import { EuiButton, EuiEmptyPrompt, EuiLoadingSpinner } from '@elastic/eui';
import { PermissionTree } from '../../permission-tree';
import { Action, ResourceType } from '../../../types';
import { buildHashUrl } from '../../../utils/url-builder';

describe('Role view - apps permission panel', () => {
  const sampleRole = 'role';
  const sampleAppsPermission = ['sampleAppsPermission'];

  it('no apps permission', () => {
    const component = shallow(
      <AppsPermissionPanel
        roleName={sampleRole}
        appsPermissions={[]}
        actionGroups={{}}
        loading={false}
        isReserved={false}
      />
    );
    expect(component.find(EuiEmptyPrompt).length).toBe(1);
  });

  it('should show loading spinner when apps permissions are loading', () => {
    const component = shallow(
      <AppsPermissionPanel
        roleName={sampleRole}
        appsPermissions={[]}
        actionGroups={{}}
        loading={true}
        isReserved={false}
      />
    );
    expect(component.find(EuiLoadingSpinner).length).toBe(1);
  });

  it('Add apps permission button is disabled for reserved role', () => {
    const wrapper = shallow(
      <AppsPermissionPanel
        roleName={sampleRole}
        appsPermissions={[]}
        actionGroups={{}}
        loading={false}
        isReserved={true}
      />
    );
    const prompt = wrapper.find(EuiEmptyPrompt).dive();
    expect(prompt.find(EuiButton)).toHaveLength(1);
    const button = prompt.find('[data-test-subj="addAppsPermission"]');
    expect(button.prop('disabled')).toBe(true);
  });

  it('should render to role edit page when click on Add apps permission button', () => {
    const wrapper = shallow(
      <AppsPermissionPanel
        roleName={sampleRole}
        appsPermissions={[]}
        actionGroups={{}}
        loading={false}
        isReserved={false}
      />
    );
    const prompt = wrapper.find(EuiEmptyPrompt).dive();
    prompt.find('[data-test-subj="addAppsPermission"]').simulate('click');
    expect(window.location.hash).toBe(buildHashUrl(ResourceType.roles, Action.edit, sampleRole));
  });

  it('with apps permission', () => {
    const component = shallow(
      <AppsPermissionPanel
        roleName={sampleRole}
        appsPermissions={sampleAppsPermission}
        actionGroups={{}}
        loading={false}
        isReserved={false}
      />
    );
    expect(component.find(PermissionTree).length).toBe(1);
    expect(component.find(PermissionTree).prop('permissions')).toBe(sampleAppsPermission);
  });
});
