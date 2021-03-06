/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AzureParentTreeItem, IActionContext, ICreateChildImplContext } from "vscode-azureextensionui";
import { SubscriptionTreeItem } from '../../explorer/SubscriptionTreeItem';
import { WebAppTreeItem } from "../../explorer/WebAppTreeItem";
import { ext } from "../../extensionVariables";
import { showCreatedWebAppMessage } from "./showCreatedWebAppMessage";

export async function createWebApp(context: IActionContext & Partial<ICreateChildImplContext>, node?: AzureParentTreeItem | undefined, suppressCreatedWebAppMessage: boolean = false): Promise<WebAppTreeItem> {
    if (!node) {
        node = <AzureParentTreeItem>await ext.tree.showTreeItemPicker(SubscriptionTreeItem.contextValue, context);
    }

    const newSite: WebAppTreeItem = <WebAppTreeItem>await node.createChild(context);
    if (!suppressCreatedWebAppMessage) {
        showCreatedWebAppMessage(newSite);
    }
    return newSite;
}

export async function createWebAppAdvanced(context: IActionContext, node?: AzureParentTreeItem | undefined): Promise<WebAppTreeItem> {
    return await createWebApp({ ...context, advancedCreation: true }, node);
}
