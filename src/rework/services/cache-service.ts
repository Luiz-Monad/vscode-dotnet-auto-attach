/*
 * @file Contains the CacheService, stores information central.
 * @Author: Dennis Jung
 * @Author: Konrad Müller
 * @Date: 2018-06-15 12:30:24
 * @Last Modified by: Dennis Jung
 * @Last Modified time: 2018-06-15 17:08:03
 */

import { Dictionary } from "typescript-collections";
import { Disposable } from "vscode";
import AutoAttachTask from "../models/AutoAttachTask";

/**
 * The CacheService. Provides access to the central cache.
 *
 * @export
 * @class CacheService
 */
export default class CacheService implements Disposable {

	/**
	 * Creates an instance of CacheService.
	 * @memberof CacheService
	 */
	public constructor() {
		this.RunningAutoAttachTasks = new Dictionary<string, AutoAttachTask>();
		this.RunningDebugs = new Dictionary<number, string>();
		this.DisconnectedDebugs = new Set<number>();
	}

	/**
	 * A list of all running AutoAttachTasks.
	 *
	 * @type {Dictionary<string, AutoAttachTask>}
	 * @memberof CacheService
	 */
	public RunningAutoAttachTasks: Dictionary<string, AutoAttachTask>;

	/**
	 * A list of all active debugging sessions.
	 *
	 * @private
	 * @static
	 * @type {Dictionary<number, string>}
	 * @memberof DebuggerService
	 */
	public RunningDebugs: Dictionary<number, string>;

	/**
	 * A list of all debugging sessions which are diconnected.
	 *
	 * @type {Set<number>}
	 * @memberof CacheService
	 */
	public DisconnectedDebugs: Set<number>;

	/**
	 * Dispose the object.
	 *
	 * @memberof CacheService
	 */
	public dispose() {
		this.RunningAutoAttachTasks.forEach((k, v) => { v.Terminate(); });
		this.RunningAutoAttachTasks.clear();
		this.RunningDebugs.clear();
		this.DisconnectedDebugs.clear();
	}

}
