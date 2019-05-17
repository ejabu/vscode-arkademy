'use strict';
import * as vscode from 'vscode';
// import * as cp from 'child_process';

const config = {
	"workbench.settings.useSplitJSON": false,
	"workbench.tree.indent": 14,
	"files.exclude": {
	  "**/__pycache__": true,
	  "**/ark_cafe_demo": true,
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
	"editor.snippetSuggestions": "top",
	"editor.suggestOnTriggerCharacters": true,
	"editor.wordBasedSuggestions": true,
	"editor.minimap.enabled": false,
	"editor.formatOnSave": false,
  
	"workbench.startupEditor": "newUntitledFile",
	"search.useIgnoreFiles": false,
	"[json]": {
	  "editor.tabSize": 2
	},
	"[xml]": {
	  "editor.tabSize": 4,
	  "editor.formatOnSave": false,
	  "xmlTools.splitXmlnsOnFormat": false,
	  "xmlTools.splitAttributesOnFormat": false
	},
	"[python]": {
	  "editor.tabSize": 4,
	  "files.trimTrailingWhitespace": true,
	  "files.trimFinalNewlines": false,
	  "files.insertFinalNewline": true
	},
	"explorer.confirmDelete": false,
	"editor.wordWrapColumn": 80,
	"workbench.sideBar.location": "left",
	"workbench.editor.tabSizing": "shrink",
	"python.formatting.autopep8Path": "autopep8",
	"python.formatting.provider": "yapf",
	"explorer.confirmDragAndDrop": false,
	"search.location": "panel",
	"editor.cursorWidth": 1,
	"workbench.editor.showTabs": true,
	"workbench.statusBar.feedback.visible": false,
	"workbench.list.keyboardNavigation": "simple",
	"workbench.statusBar.visible": true,
	"workbench.activityBar.visible": true,
	"update.enableWindowsBackgroundUpdates": false,
	"update.showReleaseNotes": false,
	"extensions.autoCheckUpdates": false,
	"extensions.autoUpdate": false,
	"editor.tabCompletion": "on",
	"zenMode.fullScreen": false,
	"editor.autoClosingBrackets": "always",
	"zenMode.restore": true,
	"zenMode.hideTabs": false,
	"diffEditor.renderSideBySide": true,
	"breadcrumbs.enabled": false,
	"workbench.editor.enablePreviewFromQuickOpen": false,
	"debug.toolBarLocation": "docked",
	"telemetry.enableTelemetry": false,
	"telemetry.enableCrashReporter": false,
	"files.insertFinalNewline": true,
	"files.trimFinalNewlines": false,
	"editor.fontFamily": "DejaVu Sans Mono",
	"editor.fontSize": 17,
	"editor.lineHeight": 25,
	"editor.fontLigatures": true,
	"files.associations": {
		"*.json": "json"
	},
	"emmet.showExpandedAbbreviation": "never",
	"emmet.showAbbreviationSuggestions": false,
	"xmlTools.enableXmlTreeView": false,
	"projects.statusbarEnabled": false,
	"window.zoomLevel": 1,
	"editor.glyphMargin": true,
	"editor.lineNumbers": "on",
	"zenMode.hideStatusBar": false,
	"window.menuBarVisibility": "hidden",
	"window.enableMenuBarMnemonics": false,
	"editor.renderWhitespace": "none",
	"workbench.colorTheme": "Arkademy",
	"editor.occurrencesHighlight": false,
	"git.decorations.enabled": true,
	"git.confirmSync": false,
	"git.enableSmartCommit": true,
	"git.alwaysShowStagedChangesResourceGroup": true,
	"gitHistory.hideCommitViewExplorer": false
}

function uuidv4(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	  return v.toString(16);
	});
}
function timestamp(): string{
	return (new Date()).valueOf().toString()
}
function unique5(): string{
	return Math.random().toString(10).substring(6,11);
}
export function activate(context: vscode.ExtensionContext) {
	// let NEXT_TERM_ID = 1;

	context.subscriptions.push(vscode.commands.registerCommand('toggle.editor.renderIndentGuides', async () => {
		var currentState = await vscode.workspace.getConfiguration('editor')
		await vscode.workspace.getConfiguration().update('editor.renderIndentGuides', !currentState.renderIndentGuides, vscode.ConfigurationTarget.Global);

	}));
	context.subscriptions.push(vscode.commands.registerCommand('arkademy.setup_vscode', async () => {
		// const terminal =  vscode.window.createTerminal(`Ext Terminal #${NEXT_TERM_ID++}`);
		// vscode.window.showInformationMessage('Hello World 5!');
		// let editor = vscode.window.activeTextEditor;

		// Ref 
		// https://github.com/Microsoft/vscode-extension-samples/blob/master/configuration-sample/src/extension.ts

		for(var key in config) {
			var value = config[key];
			await vscode.workspace.getConfiguration().update(key, value, vscode.ConfigurationTarget.Global);
			// await vscode.workspace.getConfiguration().update('editor.renderWhitespace', 'none', vscode.ConfigurationTarget.Global);
		}
		// Command From Linux
		// cp.exec('date +%s%2N', {cwd: vscode.workspace.rootPath, env: process.env}, (e, stdout) => {
		// 	if (e) {
		// 			vscode.window.showErrorMessage(e.message);
		// 	} else {
		// 		editor.edit(editBuilder => {
		// 			const hasil = stdout.trim()
		// 			editBuilder.replace(editor.selection, hasil);
		// 		});
		// 	}
		// 	});

	}));
	context.subscriptions.push(vscode.commands.registerCommand('arkademy.get_unique_date', () => {
		let editor = vscode.window.activeTextEditor;
		editor.edit(editBuilder => {
			const unique = timestamp() + unique5()
			editBuilder.replace(editor.selection, unique);
		});
	}));
}
