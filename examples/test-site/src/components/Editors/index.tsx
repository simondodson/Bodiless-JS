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

import { flow } from 'lodash';
import { RichText } from '@bodiless/richtext-ui';
import {
  withDesign, addClasses,
} from '@bodiless/fclasses';
import {
  asBold,
  asItalic,
  asLink,
  asUnderline,
  asAlignLeft,
  asAlignRight,
  asAlignCenter,
  asAlignJustify,
  asHeader3,
  asHeader2,
  asHeader1,
  asSuperScript,
  asEditableLink,
} from '../Elements.token';
import asEditor from './asEditor';

const simpleDesign = {
  SuperScript: asSuperScript,
};
const basicDesign = {
  Bold: asBold,
  Italic: asItalic,
  Underline: asUnderline,
  Link: flow(asEditableLink(), asLink),
  ...simpleDesign,
  RedText: addClasses('text-red-500'),
  AlignLeft: asAlignLeft,
  AlignRight: asAlignRight,
  AlignJustify: asAlignJustify,
  AlignCenter: asAlignCenter,
};
const fullFeaturedDesign = {
  ...basicDesign,
  H1: asHeader1,
  H2: asHeader2,
  H3: asHeader3,
};

const EditorSimple = withDesign(simpleDesign)(RichText);
const EditorBasic = withDesign(basicDesign)(RichText);
const EditorFullFeatured = withDesign(fullFeaturedDesign)(RichText);
const asEditorBasic = asEditor(EditorBasic);
const asEditorSimple = asEditor(EditorSimple);
const asEditorFullFeatured = asEditor(EditorFullFeatured);
export {
  EditorBasic,
  EditorFullFeatured,
  asEditorBasic,
  asEditorFullFeatured,
  EditorSimple,
  asEditorSimple,
};
