/**
 * Copyright (c) 2015-2017 Google, Inc., Netflix, Inc., Microsoft Corp. and contributors
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
/*tslint:disable indent prefer-template quotemark*/

import { deepEqual } from "fast-equals";

function stringify(x: any): string {
  if (x === undefined) {
    return "undefined";
  }
  return JSON.stringify(x, function(key: any, value: any): any {
    if (Array.isArray(value)) {
      return (
        "[" +
        value.map(function(i: any): any {
          return "\n\t" + stringify(i);
        }) +
        "\n]"
      );
    }
    return value;
  })
    .replace(/\\"/g, '"')
    .replace(/\\t/g, "\t")
    .replace(/\\n/g, "\n");
}

function deleteErrorNotificationStack(marble: any): any {
  const { notification } = marble;
  if (notification) {
    const { kind, error } = notification;
    if (kind === "E" && error instanceof Error) {
      notification.error = { name: error.name, message: error.message };
    }
  }
  return marble;
}

export function observableMatcher(
  actual: any,
  expected: any,
  assert: any,
  assertDeepEqual: any,
  frameworkMatcher: any
): any {
  if (Array.isArray(actual) && Array.isArray(expected)) {
    actual = actual.map(deleteErrorNotificationStack);
    expected = expected.map(deleteErrorNotificationStack);

    if (frameworkMatcher) {
      assertDeepEqual(actual, expected);
    } else {
      const passed = deepEqual(actual, expected);
      if (passed) {
        assert(true, "");
        return;
      }

      let message = "\nExpected \n";
      actual.forEach((x: any) => (message += `\t${stringify(x)}\n`));

      message += "\t\nto deep equal \n";
      expected.forEach((x: any) => (message += `\t${stringify(x)}\n`));

      assert(passed, message);
    }
  } else {
    assertDeepEqual(actual, expected);
  }
}
