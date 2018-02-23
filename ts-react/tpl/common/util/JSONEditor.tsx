import * as Editor from 'jsoneditor';
import * as React from 'react';
import * as ReactDom from 'react-dom';

export class JSONEditor extends React.Component<{ mode: string }, {}> {
  refs: {
    [key: string]: HTMLDivElement;
    editorc: HTMLDivElement;
  };

  editor: Editor;

  componentDidMount() {
    const editorc = ReactDom.findDOMNode<HTMLDivElement>(this.refs.editorc);
    this.editor = new Editor(editorc, { mode: this.props.mode ? this.props.mode : 'tree' });
  }

  setValue(data: any) {
    this.editor.set(data);
  }

  getValue(): any {
    return this.editor.get();
  }

  render() {
    return (
      <div ref='editorc' style={{ height: '100%' }} />
    );
  }
}
