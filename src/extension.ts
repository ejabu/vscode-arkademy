'use strict';
import * as vscode from 'vscode';
// @ts-ignore
import * as config from './config.json';

function timestamp(): string{
    return (new Date()).valueOf().toString();
}

function unique5(): string{
    return Math.random().toString(10).substring(6,11);
}
export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('toggle.editor.renderIndentGuides', async () => {
        var currentState = await vscode.workspace.getConfiguration('editor')
        await vscode.workspace.getConfiguration().update('editor.renderIndentGuides', !currentState.renderIndentGuides, vscode.ConfigurationTarget.Global);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('arkademy.setup_vscode', async () => {
        for(var key in config) {
            var value = config[key];
            await vscode.workspace.getConfiguration().update(key, value, vscode.ConfigurationTarget.Global);
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
