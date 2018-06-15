/*
 * @file Contains the AutoAttachDebugConfigurationProvider.
 * @Author: Dennis Jung
 * @Author: Konrad Müller
 * @Date: 2018-06-15 14:46:07
 * @Last Modified by: Dennis Jung
 * @Last Modified time: 2018-06-15 14:51:54
 */

import { CancellationToken, DebugConfigurationProvider, ProviderResult, WorkspaceFolder } from "vscode";
import AutoAttach from "./autoAttach";
import IAutoAttachDebugConfiguration from "./models/AutoAttachDebugConfiguration";

/**
 * The AutoAttachDebugConfigurationProvider.
 *
 * @export
 * @class AutoAttachDebugConfigurationProvider
 * @implements {DebugConfigurationProvider}
 */
export default class AutoAttachDebugConfigurationProvider implements DebugConfigurationProvider {
	/**
	 * Resolves a [debug configuration](#DebugConfiguration) by filling in missing values or by adding/changing/removing attributes.
	 * If more than one debug configuration provider is registered for the same type, the resolveDebugConfiguration calls are chained
	 * in arbitrary order and the initial debug configuration is piped through the chain.
	 * Returning the value 'undefined' prevents the debug session from starting.
	 *
	 * @param folder The workspace folder from which the configuration originates from or undefined for a folderless setup.
	 * @param debugConfiguration The [debug configuration](#DebugConfiguration) to resolve.
	 * @param token A cancellation token.
	 * @return The resolved debug configuration or undefined.
	 */
	public resolveDebugConfiguration(
		folder: WorkspaceFolder | undefined,
		debugConfiguration: IAutoAttachDebugConfiguration,
		token?: CancellationToken
	): ProviderResult<IAutoAttachDebugConfiguration> {
		if (folder) {
			debugConfiguration.workspace = folder;
			AutoAttach.TaskService.StartDotNetWatchTask(debugConfiguration);
		}
		return undefined;
	}
}
