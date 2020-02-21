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

function matchLineNumber(m) {

    if (!m) {
        return -1
    }
    let lines = m[0].split("\n")
    if (lines.length > 1) {
        return lines.length
    }
    return 1
}
class PsqlDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
    public provideDocumentSymbols(document: vscode.TextDocument,
        token: vscode.CancellationToken): Thenable<vscode.SymbolInformation[]> {
        return new Promise((resolve, reject) => {
            var aliasName = [];
            var aliasPosition = [];
            var symbols = [];
            var barisTerakhir = document.lineCount;

            for (var i = 0; i < barisTerakhir; i++) {
                let rangeToRead = new vscode.Range(i, 0, barisTerakhir + 1, 0)
                let content = document.getText(rangeToRead)
                let matchContent = content.match(/(( AS )\((?:\(.*\)|[^\(])*\))/i)
                // let matchContent = content.match(/(AS )\(\s*([^]+)\)/)
                if (matchContent) {
                    let barisContent = matchLineNumber(matchContent)
                    aliasPosition.push([i, (i + barisContent - 1)])
                    aliasName.push(content.match(/\w+(?=\s+AS \()/i)[0])
                    i += (barisContent - 1)
                }
                // else if (content.match(/(AS )\(([^]+)\)/)) {
                else if (content.match(/( AS )\(([^]+)\)\s(?=SELECT)/i)) {
                    let matchContent = content.match(/( AS )\(([^]+)\)\s(?=SELECT)/i)
                    let barisContent = matchLineNumber(matchContent)
                    aliasPosition.push([i, (i + barisContent - 1)])
                    aliasName.push(content.match(/\w+(?=\s+AS \()/i)[0])
                    i += (barisContent - 1)
                    if (content.match(/\w+(?=\s+AS \()/i)[0] == 'target'){
                        console.log("ASd")
                    }
                    // untuk terakhir
                    aliasPosition.push([i += 2, barisTerakhir + 1])
                    aliasName.push("End Product")
                    i = barisTerakhir
                }
                else {
                    aliasPosition.push([i += 2, barisTerakhir + 1])
                    aliasName.push("End Product")
                    i = barisTerakhir
                }
            }

            for (let i = 0; i < aliasName.length; i++) {
                let tes = new vscode.Range(aliasPosition[i][0], 0, aliasPosition[i][1], 0)
                symbols.push({
                    name: aliasName[i],
                    kind: vscode.SymbolKind.Function,
                    location: new vscode.Location(document.uri, tes)
                })
            }
            for (var i = 0; i < document.lineCount; i++) {
                var line = document.lineAt(i);
                if (line.text.match(/{[^\]\[\r\n]*\}/)) {
                    let hasil = line.text.match(/{[^\]\[\r\n]*\}/)
                    symbols.push({
                        name: hasil[0],
                        kind: vscode.SymbolKind.Key,
                        location: new vscode.Location(document.uri, line.range)
                    })
                }
            }

            resolve(symbols);
        });
    }
}
export function activate(context: vscode.ExtensionContext) {

    // // Test View
    // new TaskTreeDataProvider(context);

    const taskTreeDataProvider = new TaskTreeDataProvider(context);

    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(
        { language: "sql" }, new PsqlDocumentSymbolProvider()
    ));

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

    context.subscriptions.push(vscode.commands.registerCommand('arkademy.toggleBreadcrumb', async () => {
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
            placeHolder: 'Anda ingin konfigurasi disesuaikan dengan Trainer ? (Compact Folder, Autosave, Emmet disable, Hide Breadcrumb dan lain2)',
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
