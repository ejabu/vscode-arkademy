'use strict';
import * as vscode from 'vscode';

const config = {
    "workbench.settings.useSplitJSON": false,
    "workbench.tree.indent": 14,
    "files.exclude": {
      "**/__pycache__": true,
      "**/*.pyc": true,
      "**/.git": true,
      "**/.vscode": true,
      "**/*.lock": true,
      "**/CVS": true,
    },
    "files.watcherExclude": {
      "**/.git/objects/**": true,
      "**/.git/subtree-cache/**": true,
      "**/node_modules/**": true,
      "**/tmp": true,
      ".vscode": true,
    },
    "search.useIgnoreFiles": false,
    "search.exclude": {
      "**/node_modules": true,
      "test/**": true,
      "**/bower_components": true,
      "**/.git": true,
      "**/.DS_Store": true,
      "**/tmp": true,
      "**/coverage": true,
      "**/*.po": true
    },
    "python.linting.enabled": true,
    "python.linting.pylintArgs": [
      "--disable=E1003",
      "--disable=E1101",
      "--disable=E1121",
      "--disable=E0401",
      "--disable=E0203",
      "--disable=W0105",
      "--disable=W0125",
      "--disable=W0201",
      "--disable=W0212",
      "--disable=W0611",
      "--disable=W0612",
      "--disable=W0613",
      "--disable=W0622",
      "--disable=W0631",
      "--disable=W0640",
      "--disable=W0703",
      "--disable=C0103",
      "--disable=C0111",
      "--disable=C0301",
      "--disable=C0321",
      "--disable=C0326",
      "--disable=C0330",
      "--disable=C0411",
      "--disable=R1703",
      "--disable=R1705",
      "--disable=R1706",
      "--disable=R0201",
      "--disable=R0913",
      "--disable=R0916",
      "--disable=R0915",
      "--disable=R0902",
      "--disable=R0903",
      "--disable=R0914",
      "--disable=R0916",
      "--disable=W0104",
      "--disable=W0511",
      "--disable=W0621"
    ],
    "terminal.integrated.fontSize": 17,
    "terminal.integrated.copyOnSelection": true,
    "editor.cursorStyle": "line",
    "editor.cursorBlinking": "solid",
    "editor.mouseWheelZoom": true,
    "editor.suggestFontSize": 13,
    "editor.quickSuggestions": false,
    "editor.quickSuggestionsDelay": 0,
    "editor.snippetSuggestions": "top",
    "editor.suggestOnTriggerCharacters": true,
    "editor.wordBasedSuggestions": true,
    "editor.minimap.enabled": false,
    "editor.formatOnSave": false,
    "[json]": {
      "editor.tabSize": 2
    },
    "[xml]": {
      "editor.tabSize": 4,
      "editor.formatOnSave": false,
    },
    "[python]": {
      "editor.tabSize": 4,
      "files.trimTrailingWhitespace": true,
      "files.trimFinalNewlines": false,
      "files.insertFinalNewline": true
    },
    "workbench.editor.tabSizing": "shrink",
    "explorer.confirmDragAndDrop": false,
    "search.location": "panel",
    "editor.cursorWidth": 1,
    "workbench.editor.showTabs": true,
    "workbench.list.keyboardNavigation": "simple",
    "workbench.statusBar.visible": true,
    "workbench.activityBar.visible": true,
    "update.enableWindowsBackgroundUpdates": false,
    "update.showReleaseNotes": false,
    "extensions.autoCheckUpdates": false,
    "extensions.autoUpdate": false,
    "editor.tabCompletion": "on",
    "editor.autoClosingBrackets": "always",
    "breadcrumbs.enabled": false,
    "workbench.editor.enablePreviewFromQuickOpen": false,
    "debug.toolBarLocation": "docked",
    "telemetry.enableTelemetry": false,
    "telemetry.enableCrashReporter": false,
    "files.insertFinalNewline": true,
    "files.trimFinalNewlines": false,
    "files.associations": {
        "*.json": "jsonc"
    },
    "emmet.showExpandedAbbreviation": "never",
    "emmet.showAbbreviationSuggestions": false,
    "window.zoomLevel": 1,
    "editor.glyphMargin": true,
    "editor.lineNumbers": "on",
    "editor.renderWhitespace": "none",
    "editor.occurrencesHighlight": false,
}

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
