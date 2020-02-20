'use strict';
import * as vscode from 'vscode';
// @ts-ignore
import { config } from "./settingsJson";

import { TaskTreeDataProvider } from './testView';
function timestamp(): string {
    return (new Date()).valueOf().toString();
}

function unique5(): string {
    return Math.random().toString(10).substring(6, 11);
}
export function activate(context: vscode.ExtensionContext) {

    // // Test View
    // new TaskTreeDataProvider(context);

    const taskTreeDataProvider = new TaskTreeDataProvider(context);

    vscode.debug.onDidChangeActiveDebugSession((e) => {
        if (e == undefined) {
            vscode.window.setStatusBarMessage(
                "$(debug-stop) Debugging is Stopped ...",
                2000)
        }
        else {
            vscode.window.setStatusBarMessage(
                "$(debug-start) Debugging is Started ...  $(debug-step-over)",
                6000)
        }
    })
    vscode.window.registerTreeDataProvider('testView', taskTreeDataProvider);

    context.subscriptions.push(vscode.commands.registerCommand('arkademy.toggleIndentGuides', async () => {
        var currentState = await vscode.workspace.getConfiguration('editor')
        await vscode.workspace.getConfiguration().update('editor.renderIndentGuides', !currentState.renderIndentGuides, vscode.ConfigurationTarget.Global);
        vscode.commands.executeCommand("editor.action.toggleRenderWhitespace");
    }));

    context.subscriptions.push(vscode.commands.registerCommand('arkademy.toggleIndentToSpace', async () => {
        vscode.commands.executeCommand("editor.action.indentationToSpaces");
    }));

    context.subscriptions.push(vscode.commands.registerCommand('arkademy.toggleIndentToTab', async () => {
        vscode.commands.executeCommand("editor.action.indentationToTabs");
    }));

    context.subscriptions.push(vscode.commands.registerCommand('arkademy.toggleBreadcumb', async () => {
        vscode.commands.executeCommand("breadcrumbs.toggle");
    }));

    context.subscriptions.push(vscode.commands.registerCommand('arkademy.toggleEditorTabs', async () => {
        vscode.commands.executeCommand("workbench.action.toggleTabsVisibility");
    }));

    context.subscriptions.push(vscode.commands.registerCommand('arkademy.openWorkspaceSettings', async () => {
        vscode.commands.executeCommand("workbench.action.openWorkspaceSettings");
    }));
    context.subscriptions.push(vscode.commands.registerCommand('arkademy.openSettingsJson', async () => {
        vscode.commands.executeCommand("workbench.action.openSettingsJson");
    }));
    context.subscriptions.push(vscode.commands.registerCommand('arkademy.openSettingsUi', async () => {
        vscode.commands.executeCommand("workbench.action.openSettings2");
    }));

    context.subscriptions.push(vscode.commands.registerCommand('arkademy.setup_vscode', async () => {
        const dialogOption = await vscode.window.showQuickPick(["Iya, biar lebih mudah", "Tidak"], {
            placeHolder: 'Anda ingin konfigurasi disesuaikan dengan Trainer ? (Compact Folder, Autosave, Emmet disable, Breadcumb disable dan lain2)',
            onDidSelectItem: (dialogOption) => {
                if (dialogOption == "Iya, biar lebih mudah") {
                    vscode.window.showInformationMessage(`Good Choice !!`)
                }
                else {
                    vscode.window.showInformationMessage(`Very Bad Choice !!`)
                }
            }
        });
        if (dialogOption == "Iya, biar lebih mudah") {
            vscode.commands.executeCommand("workbench.action.openSettingsJson");
            for (var key in config) {
                var value = config[key];
                await vscode.workspace.getConfiguration().update(key, value, vscode.ConfigurationTarget.Global);
            }
            vscode.window.showInformationMessage("Global Config pada setting.json sudah di-update secara otomatis")
            vscode.window.showInformationMessage("Arkademy Setup sukses")
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('arkademy.get_unique_date', () => {
        let editor = vscode.window.activeTextEditor;
        editor.edit(editBuilder => {
            const unique = timestamp() + unique5()
            editBuilder.replace(editor.selection, unique)
        }).then(success => {
            var cursorEndPosition = editor.selection.end;
            editor.selection = new vscode.Selection(cursorEndPosition, cursorEndPosition);
        });
    }));
}
