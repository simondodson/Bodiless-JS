/**
 * Copyright © 2019 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import { PageEditContext } from '@bodiless/core';
import { Value as SlateEditorValue } from 'slate';
import { Editor } from 'slate-react';
import RichText from '../src/RichText';

const getDefaultRichTextItems = () => ({});
const getRichTextInitialValue = () => ({});

const setupPageEditContext = (isEdit: boolean): PageEditContext => {
  const pageEditContext = new PageEditContext();
  Object.defineProperty(pageEditContext, 'isEdit', { value: isEdit });
  return pageEditContext;
};

describe('richtext content editable', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  // tslint:disable-next-line: max-line-length
  test('richtext is editable, hover menu and buttons rendered when isEdit enabled in pageEditContext', () => {
    const pageEditContext = setupPageEditContext(true);
    const wrapper = mount(
      <PageEditContext.Provider value={pageEditContext}>
        <RichText design={getDefaultRichTextItems()} initialValue={getRichTextInitialValue()} />
      </PageEditContext.Provider>,
    );
    expect(wrapper.find('Editor').props().readOnly).toBe(false);
    expect(wrapper.find('HoverMenu').length).toBe(1);
    expect(wrapper.find('PageContextProvider').length).toBe(1);

    const editor = wrapper.find('Editor').instance() as Editor;
    PageEditContext.prototype.refresh = jest.fn();
    expect(PageEditContext.prototype.refresh).toHaveBeenCalledTimes(0);
    editor.props.onChange!({ operations: [] as any, value: SlateEditorValue.create() });
    expect(PageEditContext.prototype.refresh).toHaveBeenCalledTimes(1);

    PageEditContext.prototype.activate = jest.fn();
    expect(PageEditContext.prototype.activate).toHaveBeenCalledTimes(0);
    wrapper.find('Editor').simulate('click');
    expect(PageEditContext.prototype.activate).toHaveBeenCalledTimes(1);
  });

  // tslint:disable-next-line: max-line-length
  test('richtext is not editable, hover menu and buttons are not rendered when isEdit disabled in pageEditContext', () => {
    const pageEditContext = setupPageEditContext(false);
    const wrapper = mount(
      <PageEditContext.Provider value={pageEditContext}>
        <RichText design={getDefaultRichTextItems()} initialValue={getRichTextInitialValue()} />
      </PageEditContext.Provider>,
    );

    expect(wrapper.find('Editor').props().readOnly).toBe(true);
    expect(wrapper.find('HoverMenu').length).toBe(0);
    expect(wrapper.find('PageContextProvider').length).toBe(0);

    const editor = wrapper.find('Editor').instance() as Editor;
    editor.props.onChange!({ operations: [] as any, value: SlateEditorValue.create() });
    expect(PageEditContext.prototype.refresh).toHaveBeenCalledTimes(0);

    expect(wrapper.find('Editor').props().onClick).toBeUndefined();
    wrapper.find('Editor').simulate('click');
    expect(PageEditContext.prototype.activate).toHaveBeenCalledTimes(0);
  });
});
