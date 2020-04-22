import * as vscode from 'vscode';

export class TestView {

	constructor(context: vscode.ExtensionContext) {
		const view = vscode.window.createTreeView('shortcutView', { treeDataProvider: aNodeWithIdTreeDataProvider(), showCollapseAll: true });
	}
}

const treeOriginal = {
	'a': {
		'aa': {
			'aaa': {
				'aaaa': {
					'aaaaa': {
						'aaaaaa': {

						}
					}
				}
			}
		},
		'ab': {}
	},
	'b': {
		'ba': {},
		'bb': {}
	}
};
const tree = {
	'a &&& EE': {
		'aa &&& haha': {
			'aaa': {
				'aaaa': {
					'aaaaa': {
						'aaaaaa': {

						}
					}
				}
			}
		},
		'ab': {}
	},
	'b': {
		'ba': {},
		'bb': {}
	}
};

const treec = {
	// 'Editohortcut': {
	// 	'b': {
	// 		'ba &&& arkademy.get_unique_date &&& alt + v': {},
	// 	}
	// },
	// 'Editor Shortcut': {
	// 	'Toggle Comment': {
	// 		'Ctrl + / &&& editor.action.commentLine': {},
	// 	},
	// 	'ba ': {
	// 		'Alt + V &&& arkademy.get_unique_date': {},
	// 		'Alt + V &&& editor.action.commentLine': {},
	// 	},
	// },
	// 'c': {
	// 	'abcdef &&& arkademy.get_unique_date &&& alt + v': {},
	// }
};
let nodes = {};
function unique5(): string{
    return Math.random().toString(10).substring(6,11);
}
function aNodeWithIdTreeDataProvider(): vscode.TreeDataProvider<{ key: string }> {
	return {
		getChildren: (element: { key: string }): { key: string }[] => {
			return getChildren(element ? element.key : undefined).map(key => getNode(key));
		},
		getTreeItem: (element: { key: string }): vscode.TreeItem => {
			const treeItem = getTreeItem(element.key);
			treeItem.id = unique5();
			return treeItem;
		},
		getParent: ({ key }: { key: string }): { key: string } => {
			const splittedKey = key.split(' &&& ')
			const nodeId = splittedKey[0]
			const parentKey = nodeId.substring(0, nodeId.length - 1);
			return parentKey ? new Key(parentKey) : void 0;
		}
	};
}

function getChildren(key: string): string[] {
	if (!key) {
		return Object.keys(tree);
	}
	let treeElement = getTreeElement(key);
	if (treeElement) {
		return Object.keys(treeElement);
	}
	return [];
}

function getTreeItem(key: string): vscode.TreeItem {
	const treeElement = getTreeElement(key);
	const splittedKey = key.split(' &&& ')
	if (splittedKey.length == 1){
		return {
			label: splittedKey[0],
			collapsibleState: treeElement && Object.keys(treeElement).length ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None
		}
	}
	else if (splittedKey.length == 2){
		return {
			label: splittedKey[1],
			collapsibleState: treeElement && Object.keys(treeElement).length ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None
		}
	}
	const label = splittedKey[0]
	const command = splittedKey[1]
	const tooltip = splittedKey[2]
	return {
		label: label,
		command: {
			'command': command,
			'title': 'execute',
		},
		tooltip: tooltip,
		collapsibleState: treeElement && Object.keys(treeElement).length ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None
	};
}

function getTreeElement(element): any {
	let parent = tree;
	for (let i = 0; i < element.length; i++) {
		parent = parent[element.substring(0, i + 1)];
		if (!parent) {
			return null;
		}
	}
	return parent;
}

function getNode(key: string): { key: string } {
	const splittedKey = key.split(' &&& ')
	const nodeId = splittedKey[0]
	if (!nodes[key]) {
		nodes[key] = new Key(nodeId);
	}
	return nodes[key];
}

class Key {
	constructor(readonly key: string) { }
}
