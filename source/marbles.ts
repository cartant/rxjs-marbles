/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import { Configuration, defaults } from "./configuration";
import { Context } from "./context";

export interface MarblesFunction {
    (func: (context: Context) => any): () => any;
    <T>(func: (context: Context, t: T) => any): (t: T) => any;
    (func: (context: Context, ...rest: any[]) => any): (...rest: any[]) => any;
}
export function configure(configuration: Configuration): MarblesFunction;
export function configure<T>(factory: (t: T) => Configuration): MarblesFunction;
export function configure(configurationOrFactory: any): MarblesFunction {

    function _marbles(func: (context: Context) => any): () => any;
    function _marbles<T>(func: (context: Context, t: T) => any): (t: T) => any;
    function _marbles(func: (context: Context, ...rest: any[]) => any): (...rest: any[]) => any;
    function _marbles(func: (context: Context, ...rest: any[]) => any): (...rest: any[]) => any {

        const test = function(this: any, ...rest: any[]): any {

            const configuration = deriveConfiguration(...rest);
            if (configuration.run) {
                throw new Error("run is not yet supported.");
            }
            const context = new Context(configuration);
            try {
                return func.call(this, context, ...rest);
            } finally {
                context.teardown();
            }
        };

        // Jasmine, Jest and Mocha need to see an explicit parameter for callbacks
        // to be passed. It's the presence of the parameter that indicates to the
        // framework that it's an asynchronous test. Not important now, but maybe
        // later if support for real-world, asynchronous marble tests is to be
        // added.

        if (func.length > 1) {
            /*tslint:disable-next-line:no-unnecessary-callback-wrapper*/
            return (first: any, ...rest: any[]) => test(first, ...rest);
        }
        return test;
    }

    function deriveConfiguration(...args: any[]): Configuration {

        const explicit: Configuration = (typeof configurationOrFactory === "function") ?
            configurationOrFactory(...args) :
            configurationOrFactory;
        return { ...defaults(), ...explicit };
    }

    return _marbles;
}

export const marbles = configure(defaults());
