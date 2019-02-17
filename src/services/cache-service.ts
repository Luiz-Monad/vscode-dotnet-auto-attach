/*
 * @file Contains the CacheService, stores information central.
 * @Author: Dennis Jung
 * @Author: Konrad Müller
 * @Date: 2018-06-15 12:30:24
 * @Last Modified by: Dmitry Kosinov
 * @Last Modified time: 2019-02-06 16:27:48
 */

import { Dictionary } from "typescript-collections";
import { DebugSession, Disposable } from "vscode";
import DotNetAutoAttachTask from "../models/DotNetAutoAttachTask";

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
		this.RunningAutoAttachTasks = new Dictionary<
			string,
			DotNetAutoAttachTask
		>();
		this.RunningDebugs = new Dictionary<number, string>();
		this.DisconnectedDebugs = new Set<number>();
	}

	/**
	 * A list of all running DotNetAutoAttachTasks.
	 *
	 * @type {Dictionary<string, DotNetAutoAttachTask>}
	 * @memberof CacheService
	 */
	public RunningAutoAttachTasks: Dictionary<string, DotNetAutoAttachTask>;

	/**
	 * A list of all active debugging sessions.
	 *
	 * @private
	 * @static
	 * @type {Dictionary<number, string>}
	 * @memberof CacheService
	 */
	public RunningDebugs: Dictionary<number, string>;

	public ActiveDebugSessions: Array<DebugSession> = new Array<DebugSession>();

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
		this.RunningAutoAttachTasks.forEach((k, v) => {
			v.Terminate();
		});
		this.RunningAutoAttachTasks.clear();
		this.RunningDebugs.clear();
		this.DisconnectedDebugs.clear();
	}
}
