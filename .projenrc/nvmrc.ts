import { Component, Project, TextFile } from 'projen';

export class NvmRc extends Component {
  readonly project: Project;
  public readonly filename = '.nvmrc';
  public readonly nodeVersion: string;

  constructor(project: Project, version: string) {
    super(project);
    this.project = project;
    this.nodeVersion = version;
  }

  preSynthesize(): void {
    new TextFile(this.project, this.filename, {
      lines: [this.nodeVersion],
    });
  }
}
