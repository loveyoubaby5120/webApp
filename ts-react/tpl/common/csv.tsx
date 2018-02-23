import { toastr } from './toastr';
import * as $ from 'jquery';
import * as ReactDom from 'react-dom';
import 'jquery.cookie';
import * as React from 'react';

interface CSVImporterProps {
  btnDisplay: string;
  postURL: string;
  csvResponseMsg?: string;
}

export class CSVImporter extends React.Component<CSVImporterProps, {}> {
  state: {
    btnDisabled: boolean;
    btnText: string;
  };
  refs: {
    [key: string]: Element;
    fileInput: Element;
  };

  constructor(props: CSVImporterProps) {
    super();
    this.state = {
      btnText: props.btnDisplay,
      btnDisabled: false,
    };
  }

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

    let URL = window.URL;
    let downloadUrl = URL.createObjectURL(blob);

    if (filename) {
      // use HTML5 a[download] attribute to specify filename

      let a = document.createElement('a');

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

  importCSV = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    let file = ((ReactDom.findDOMNode(this.refs.fileInput) as any).files)[0];
    let formData = new FormData();
    formData.append('csv_file', file, file.name);
    if (!confirm('Upload ' + file.name + '?')) {
      return;
    }

    this.setState({
      btnText: 'Importing...',
      btnDisabled: true,
    });
    toastr.info('Process started! This may take about 10 minutes. Do not close browser window or tab!');
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
    }).done((data) => {
      toastr.success('Great! CSV uploaded successfully! All records saved!');
      this.setState({
        btnText: 'All good',
        btnDisabled: true,
      });
    }).fail((response) => {
      if (response.getResponseHeader('Content-Type') === 'application/csv') {
        let msg = 'Hmmm, There are still some CSV records are not saved. Checkout the downloaded rejected file, fix them then re-upload.'
        if (!!this.props.csvResponseMsg) {
          msg = this.props.csvResponseMsg
        }
        toastr.warning(msg);
        this.setState({
          btnText: 'Check downloaded',
          btnDisabled: true,
        });
        this.downloadResponse(response);
      } else {
        toastr.error('Opps! Upload failed! ' + response.responseText);
        this.setState({
          btnText: 'Failed',
          btnDisabled: true,
        });
      }
    });
  };

  render() {
    return (
      <div>
        <a ref='fileInputBtn' className='btn btn-default pull-right' style={{ marginRight: '10px' }} disabled={this.state.btnDisabled} onClick={this.handleClick}>{this.state.btnText}</a>
        <input ref='fileInput' name='file' type='file' style={{ opacity: 0 }} onChange={this.importCSV} />
      </div>
    );
  }
}
