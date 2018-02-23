import { csrfToken } from 'common/ajax';
import { replaceWithStubInTest } from 'common/test/stub-component';
import * as invariant from 'invariant';
import * as $ from 'jquery';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as SimditorRaw from 'simditor';
import 'simditor/styles/simditor.css';
import './simditor-extra.css';

require('./simditor-clearhtml.js');
require('./simditor-checklist.js');

export interface SimditorProps {
  className?: string;
  opts?: {};
  imagePath?: string;
  toolbar?: string[];
  uploadEndpoint?: string;
  initContent?: string;
  onChange?: (content: string) => void;
  hackyConfirm?: boolean;
  placeholder?: string;
  value?: string;
  onFocus?: () => void;
}

@replaceWithStubInTest
export class Simditor extends React.Component<SimditorProps, any> {
  public static defaultProps = {
    className: '',
    imagePath: '',
    opts: {},
    toolbar: [
      'title',
      'bold', 'italic',
      'underline', 'strikethrough',
      'ol', 'ul',
      'blockquote',
      'link',
      'table',
      'hr',
      'indent', 'outdent',
      'image',
      'clearhtml',
    ],
  };

  refs: {
    [key: string]: Element;
    textarea: Element;
  };

  private editor: any;

  constructor(props: any, context: any) {
    super(props, context);
    this.editor = null;
    this.state = {
      className: `simpeditor ${this.props.className}`,
      flag: false,
      opts: this.props.opts,
    };
    invariant(this.props.imagePath, 'imagePath not specified');
  }

  componentDidMount() {
    const textarea = ReactDom.findDOMNode(this.refs.textarea);
    this.editor = new SimditorRaw(Object.assign({}, {
      pasteImage: true,
      imageButton: 'upload',
      textarea: $(textarea),
      toolbar: this.props.toolbar,
      toolbarHidden: !this.props.toolbar,
      upload: {
        connectionCount: 1,
        fileKey: 'image',
        imageTooLargeError: () => {
          alert('上传的图片文件太大，不能超过1MB。请修改文件大小后重新上传。');
        },
        leaveConfirm: '正在上传文件中，如果离开页面将自动取消。',
        headers: {
          'X-CSRFToken': csrfToken(),
        },
        params: {
          image_path: this.props.imagePath,
        },
        url: this.props.uploadEndpoint,
      },
    }, this.state.opts));
    this.setValue(this.props.value || this.props.initContent || '');
    this.editor.on('focus', () => {
      if (!this.editor) { return; }
      if (this.props.onFocus) {
        this.props.onFocus();
      }
    });
    this.editor.on('valuechanged', (e: any, src: any) => {
      if (!this.editor) {
        return;
      }
      if (this.props.onChange) {
        this.props.onChange(this.getValue());
      }
      if (this.props.hackyConfirm) {
        if (this.getValue()) {
          this.setState({ flag: true });
        } else {
          this.setState({ flag: false });
        }
      }
    });
  }

  componentDidUpdate(prevProps: SimditorProps) {
    if (this.props.hackyConfirm) {
      if (this.state.flag === true) {
        window.onbeforeunload = function onbeforeunload_handler() {
          const warning = '';
          return warning;
        };
      } else {
        window.onbeforeunload = null;
      }
    }
    if ((this.props.value === '' || !this.props.value) && this.props.value !== prevProps.value) {
      this.setValue(this.props.value);
    }
  }

  componentWillUnmount() {
    this.editor = null;
  }

  getValue() {
    return this.editor.getValue();
  }

  setValue(content: any) {
    this.editor.setValue(content);
  }

  sync() {
    return this.editor.sync();
  }

  focus() {
    return this.editor.focus();
  }

  blur() {
    return this.editor.blur();
  }

  hidePopover() {
    return this.editor.hidePopover();
  }

  destroy() {
    this.editor.destroy();
  }

  render() {
    return (
      <div className={this.state.className}>
        <textarea ref='textarea' placeholder={this.props.placeholder}></textarea>
      </div>
    );
  }
}
