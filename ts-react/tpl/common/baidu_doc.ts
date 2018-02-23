let isAppend = false;

declare let window: any;

export const baiduDoc = {
  src: [
    'https://static.bcedocument.com/reader/v2/doc_reader_v2.js',
    'https://static.exp.bcedocument.com/reader/v2/doc_reader_v2.js',
  ],
  index: 0,
  init(elem: string, option: any) {
    this._setBaiDuDoc(elem, option);
  },
  _setBaiDuDoc(elem: string, option: any) {
    const that = this;
    if (!isAppend) {
      const s = document.createElement('script');
      s.src = this.src[this.index];
      s.onload = () => {
        new window.Document(elem, option);
        isAppend = true;
      };
      s.onerror = () => {
        setTimeout(() => {
          if (this.index === this.src.length - 1) {
            this.index = 0;
          } else {
            this.index++;
          }
          that._setBaiDuDoc(elem, option);
        }, 1000);
      };
      document.body.appendChild(s);
    } else {
      new window.Document(elem, option);
    }
  },
};
