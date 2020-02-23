import * as vscode from 'vscode';

export class TaskTreeDataProvider implements vscode.TreeDataProvider<TreeTask> {

	private _onDidChangeTreeData: vscode.EventEmitter<TreeTask | null> = new vscode.EventEmitter<TreeTask | null>();
	readonly onDidChangeTreeData: vscode.Event<TreeTask | null> = this._onDidChangeTreeData.event;

	private autoRefresh: boolean = true;

	constructor(private context: vscode.ExtensionContext) {
		this.autoRefresh = vscode.workspace.getConfiguration('taskOutline').get('autorefresh');
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	public async getChildren(task?: TreeTask): Promise<TreeTask[]> {

		let taskNames: TreeTask[] = [];
		if (true) {
			for (var i = 0; i < 1; i++) {
				taskNames[i] = new TreeTask(
					"npm",
					"Setup Config",
					vscode.TreeItemCollapsibleState.None,
					{
						command: 'arkademy.setup_vscode', title: "Execute"
					}
				);
			}
		}
		taskNames.push(new TreeTask(
			"npm",
			"Setup Launch Json",
			vscode.TreeItemCollapsibleState.None,
			{
				title: "Execute",
				command: "arkademy.createLaunchJson",
			}
		)

		)
		return taskNames;

	}

	getTreeItem(task: TreeTask): vscode.TreeItem {
		return task;
	}
}

class TreeTask extends vscode.TreeItem {
	type: string;

	constructor(
		type: string,
		label: string,
		collapsibleState: vscode.TreeItemCollapsibleState,
		command?: vscode.Command
	) {
		super(label, collapsibleState);
		this.type = type;
		this.command = command;
	}

}
