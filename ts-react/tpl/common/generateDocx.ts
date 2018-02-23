export const saveDataToDocx = (docxTempl: any, imgOpt: ImageOption, docData: DocData, outputName: string) => {
    // load docx templ;
    const Docxtemplater = require('docxtemplater');
    const JSZip = require('jszip');
    const zip = new JSZip(atob(docxTempl));
    const doc = new Docxtemplater();
    doc.loadZip(zip);

    // attach images module to inject images into docx templ
    if (imgOpt) {
        const ImageModule = require('docxtemplater-image-module');
        const imageModule = new ImageModule(imgOpt);
        doc.attachModule(imageModule);
    }

    // setData should be invoked once only
    doc.setData(docData);
    doc.render();
    const out = doc.getZip().generate({ type: 'blob' });
    const FS = require('file-saver');
    FS.saveAs(out, outputName);
};

export interface DocData {
    [key: string]: string | Array<{
        [innerKey: string]: string,
    }>;
}

export class ImageOption {
    centered: boolean;
    imgData: { [imgName: string]: any };
    imgSize: { [imgName: string]: number[] };

    public constructor(theCentered: boolean, imgData: { [imgName: string]: any }, imgSize: { [imgName: string]: number[] }) {
        this.imgData = imgData;
        this.centered = theCentered;
        this.imgSize = imgSize;
    }

    public getImage(tagValue: string, tagName: string) {
        if (this.imgData[tagName]) {
            return atob(this.imgData[tagName]);
        }
    }

    // size:[width, height]
    public getSize(img: any, tagValue: string, tagName: string) {
        const imgNames = Object.keys(this.imgSize);
        // return [315, 269] by default.
        let size = [315, 269];
        for (const imgName of imgNames) {
            if (tagName === imgName) {
                // specified size
                size = this.imgSize[imgName];
            }
            if (tagName.includes('ImgS')) {
                // general small image size
                size = [235, 113];
            }
        }
        return size;
    }
}
