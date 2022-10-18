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

import { type SuperGenericFunction, printObject } from '../CommonUtils.js';

/**
 * A generic error that can be used for building other errors in the application
 * which does not require Javascript stack trace.
 *
 * If the Javascript stack trace is needed to trace back where the problem occurs,
 * `EnrichedError` is the more suitable candidate.
 *
 * This type of error is useful for wrapping the innermost error or errors coming
 * from the servers. Since we enforce in the app that errors thrown must be of type
 * `Error`, this acts as a good wrapper to manage errors better.
 * See https://github.com/microsoft/TypeScript/issues/13219
 */
export abstract class ApplicationError extends Error {
  constructor(message: string | undefined) {
    super();
    this.message =
      message === undefined || message === '' ? '(no error message)' : message;
  }

  /**
   * This provides more detail (better context) about the error, including the error message
   * stack trace, etc.
   */
  get detail(): string {
    return this.message;
  }
}

// Since Javascript does not fully support rethrowing error, we need to customize and manipulate the stack trace
// See https://stackoverflow.com/questions/42754270/re-throwing-exception-in-nodejs-and-not-losing-stack-trace
export class EnrichedError extends Error {
  constructor(
    name: string,
    error: string | Error | undefined,
    overideMessage?: string,
  ) {
    super(
      overideMessage
        ? overideMessage
        : error instanceof Error
        ? error.message
        : error,
    );
    this.name = name;
    // if the material used to make this error is also an error, we maintain the stack trace and
    // follow the `rethrown` error stack trace convention
    // See https://www.twilio.com/blog/how-to-read-and-understand-a-java-stacktrace
    if (error instanceof Error) {
      const messageLines = (this.message.match(/\n/g) ?? []).length + 1;
      this.stack = `${(this.stack ?? '')
        .split('\n')
        .slice(0, messageLines + 1)
        .join('\n')}\nCaused by: ${error.stack}`;
    } else {
      if (typeof Error.captureStackTrace === 'function') {
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        // This only works in Chrome for now. Firefox (as of Feb 2020) will throw error
        // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
        Error.captureStackTrace(this, this.constructor);
      } else {
        // otherwise, use the non-standard but defacto stack trace (available in most browser)
        this.stack = new Error(error).stack as string;
      }
    }
  }
}

/**
 * Signals that a method has been invoked at an illegal or
 * inappropriate time.  In other words, the environment or
 * application is not in an appropriate state for the requested
 * operation.
 */
export class IllegalStateError extends EnrichedError {
  constructor(error?: Error | string) {
    super('Illegal State Error [PLEASE NOTIFY DEVELOPER]', error);
  }
}

export class UnsupportedOperationError extends EnrichedError {
  constructor(message?: string | undefined, unsupportedObject?: unknown) {
    super(
      'Unsupported Operation Error',
      message || unsupportedObject
        ? `${message}${
            unsupportedObject ? `\n${printObject(unsupportedObject)}` : ''
          }`
        : undefined,
    );
  }
}

/**
 * This is a relatively crude way to handle error of type unknown thrown for now.
 * We should revisit this when Typescript supports `throws` clause
 * See https://github.com/microsoft/TypeScript/issues/13219
 *
 * NOTE: There's a problem with this check in JSDOM leading so we have to disable this in test environment
 * JSDOM uses their own isolated object rather than native object for performance purpose
 * See https://github.com/jsdom/jsdom/issues/3082
 * For example, TypeErrors generated by `webidl2js` or `whatwg-url` used by `jsdom`, or manually-thrown ones inside impl classes,
 * are thrown using global.TypeError, not dom.window.TypeError. This change is hard to implement as of now
 * See https://github.com/jsdom/jsdom/issues/2727
 * See https://github.com/facebook/jest/issues/2549
 *
 * Read more related discussions at:
 * https://github.com/jsdom/jsdom/issues/1737
 * https://github.com/webcomponents/polyfills/issues/105
 * https://github.com/jsdom/jsdom/issues/1769
 * https://github.com/jsdom/jsdom/issues/2555
 */
export function assertErrorThrown(error: unknown): asserts error is Error {
  // eslint-disable-next-line no-process-env
  if (process.env.NODE_ENV === 'test') {
    return;
  }
  if (!(error instanceof Error)) {
    throw new IllegalStateError('Expected error to be thrown');
  }
}

export const returnUndefOnError = <T extends SuperGenericFunction>(
  fn: T,
): ReturnType<T> | undefined => {
  try {
    return fn();
  } catch {
    return undefined;
  }
};

export const decorateErrorMessageIfExists = <T extends SuperGenericFunction>(
  fn: T,
  errorMessageDecorator: (msg: string) => string,
): ReturnType<T> => {
  try {
    return fn();
  } catch (error) {
    assertErrorThrown(error);
    error.message = errorMessageDecorator(error.message);
    throw error;
  }
};
