import { toastr } from './toastr';
import * as $ from 'jquery';
import * as ReactDom from 'react-dom';
import 'jquery.cookie';
import * as React from 'react';

interface JSONProcessorProps {
    btnDisplay: string;
    postURL: string;
}

export class JSONProcessor extends React.Component<JSONProcessorProps, {}> {
    state: {
        btnDisabled: boolean;
        btnText: string;
    } = {
        btnDisabled: false,
        btnText: '点一下？',
    };
    refs: {
        [key: string]: Element;
        fileInput: Element;
    };

    downloadResponse = (response: any) => {
        let filename = '';
        let disposition = response.getResponseHeader('Content-Disposition');
        if (disposition && disposition.indexOf('attachment') !== -1) {
            let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            let matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) {
                filename = matches[1].replace(/['"]/g, '');
            }
        }

        let type = response.getResponseHeader('Content-Type');
        let blob = new Blob([response.responseText], { type: type });

        const URL = window.URL;
        let downloadUrl = URL.createObjectURL(blob);

        if (filename) {
            // use HTML5 a[download] attribute to specify filename

            const a = document.createElement('a');

            // safari doesn't support this yet

            if (typeof (a as any).download === 'undefined') {
                (window as any).location = downloadUrl;
            } else {
                a.href = downloadUrl;
                (a as any).download = filename;
                document.body.appendChild(a);
                a.click();
            }
        } else {
            (window as any).location = downloadUrl;
        }

        setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
    };
    handleClick = () => {
        (ReactDom.findDOMNode(this.refs.fileInput) as any).click();
    };

    importJSON = (ev: React.ChangeEvent<HTMLInputElement>) => {
        ev.preventDefault();
        const file = ((ReactDom.findDOMNode(this.refs.fileInput) as any).files)[0];
        const formData = new FormData();
        formData.append('json_file', file, file.name);
        if (!confirm('Upload ' + file.name + '?')) {
            return;
        }

        this.setState({
            btnText: '正在上传……',
            btnDisabled: true,
        });
        toastr.info('开始啦！需要点时间，别关！');
        $.ajax({
            type: 'POST',
            url: this.props.postURL,
            dataType: 'json',
            contentType: false,
            data: formData,
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
            },
            processData: false,
        }).done((data, textStatus, response) => {
            toastr.success('传上了！');
            this.setState({
                btnText: '点不了了吧？刷新一下',
                btnDisabled: true,
            });

            this.downloadResponse(response);
        });
    }

    render() {
        return (
            <div>
                <a ref='fileInputBtn' className='btn btn-default pull-right' style={{ marginRight: '10px' }} disabled={this.state.btnDisabled} onClick={this.handleClick}>{this.state.btnText}</a>
                <input ref='fileInput' name='file' type='file' style={{ opacity: 0 }} onChange={this.importJSON} />
            </div>
        );
    }
}
