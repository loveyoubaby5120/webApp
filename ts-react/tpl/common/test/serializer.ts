import { Parser } from 'htmlparser2';

export const serializer = {
    test(object: any) {
        return typeof object === 'string' && object.trim()[0] === '<';
    },
    print(val: string) {
        return format(val).trim();
    },
};

// Forked from https://github.com/rayrutjes/diffable-html/blob/master/index.js

// https://www.w3.org/TR/html/syntax.html#writing-html-documents-elements
const voidElements = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'menuitem',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
];

const noClosingTag = true;

function format(html: string) {
    const elements: string[] = [];
    const indentSize = 2;

    let currentDepth = 0;

    const increaseCurrentDepth = () => {
        currentDepth++;
    };

    const decreaseCurrentDepth = () => {
        currentDepth--;
    };

    const getIndentation = (size: number) => {
        return ' '.repeat(size);
    };

    const getIndentationForDepth = (depth: number) => {
        return getIndentation(indentSize * depth);
    };

    const getCurrentIndentation = () => {
        return getIndentationForDepth(currentDepth);
    };

    const getAttributeIndentation = (tagName: string) => {
        return getIndentation(indentSize * currentDepth + tagName.length - 1);
    };

    const append = (content: string) => {
        elements.push(content);
    };

    const appendLineBreak = () => {
        append('\n');
    };

    const appendIndentation = (depth: number) => {
        append(getIndentationForDepth(depth));
    };

    const appendCurrentIndentation = () => {
        append(getCurrentIndentation());
    };

    const appendOpeningTag = (name: string) => {
        append('<' + name);
    };

    const appendClosingTagOnSameLine = (closeWith = '>') => {
        append(closeWith);
    };

    const appendClosingTagOnNewLine = (closeWith = '>') => {
        appendLineBreak();
        appendIndentation(currentDepth - 1);
        append(closeWith);
    };

    const getAttributeAsString = (name: string, value: string) => {
        if (value.length === 0) {
            return name;
        }

        return `${name}="${value}"`;
    };

    const appendAttribute = (name: string, value: string) => {
        let attribute = ' ' + name;

        if (value.length > 0) {
            attribute += `="${value}"`;
        }

        append(attribute);
    };

    const appendAttributeOnNewLine = (name: string, value: string, tagName: string) => {
        appendLineBreak();
        append(getAttributeIndentation(tagName));
        appendAttribute(name, value);
    };

    const appendAttributes = (attributes: { [key: string]: string }, tagName: string) => {
        const names = Object.keys(attributes);

        if (names.length === 1) {
            appendAttribute(names[0], attributes[names[0]]);
        }

        if (names.length <= 1) {
            return;
        }

        let firstAttribute = true;
        for (let name in attributes) {
            if (firstAttribute === true) {
                firstAttribute = false;
                appendAttribute(name, attributes[name]);
            } else {
                appendAttributeOnNewLine(name, attributes[name], tagName);
            }
        }
    };

    const appendClosingTag = (attributes: { [key: string]: string }, closeWith: string) => {
        if (Object.keys(attributes).length <= 1) {
            appendClosingTagOnSameLine(closeWith);

            return;
        }
        appendClosingTagOnSameLine(closeWith);
        // Print '>' on a separate line.
        // appendClosingTagOnNewLine(closeWith);
    };

    const render = () => {
        return elements.join('');
    };

    const isXmlDirective = (name: string) => {
        return name === '?xml';
    };

    const isVoidTagName = (name: string) => {
        return voidElements.indexOf(name) !== -1;
    };

    const extractAttributesFromString = (content: string) => {
        const attributes: { [key: string]: string } = {};

        const pieces = content.split(/\s/);
        // Remove tag name.
        delete pieces[0];

        pieces.forEach(element => {
            if (element.length === 0) {
                return;
            }
            if (element.indexOf('=') === -1) {
                attributes[element] = '';
            }
        });

        const attributesRegex = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/gim;

        let result;
        while ((result = attributesRegex.exec(content))) {
            attributes[result[1]] = result[2];
        }

        return attributes;
    };

    const parser = new Parser(
        {
            onprocessinginstruction: function (name, data) {
                let closingTag = '>';
                if (isXmlDirective(name)) {
                    closingTag = '?>';
                }

                appendLineBreak();
                appendCurrentIndentation();
                increaseCurrentDepth();
                appendOpeningTag(name);

                const attributes = extractAttributesFromString(data);
                appendAttributes(attributes, name);
                appendClosingTag(attributes, closingTag);
                decreaseCurrentDepth();
            },
            onopentag: function (name, attributes) {
                appendLineBreak();
                appendCurrentIndentation();
                increaseCurrentDepth();
                appendOpeningTag(name);

                appendAttributes(attributes, name);
                appendClosingTag(attributes, '>');
            },
            ontext: function (text) {
                const trimmed = text.trim();
                if (trimmed.length === 0) {
                    return;
                }

                appendLineBreak();
                appendCurrentIndentation();
                append(trimmed);
            },
            onclosetag: function (tagname) {
                decreaseCurrentDepth();
                if (noClosingTag) {
                    return;
                }
                const isVoidTag = isVoidTagName(tagname);
                if (isVoidTag === true) {
                    return;
                }
                if (isVoidTag === false) {
                    appendLineBreak();
                }
                appendCurrentIndentation();
                append(`</${tagname}>`);
            },
            oncomment: function (data) {
                if (data.includes('react')) {
                    return;
                }
                appendLineBreak();
                appendCurrentIndentation();
                append('<!--');
                append(data);
                append('-->');
            },
        },
        {
            lowerCaseTags: false,
            recognizeSelfClosing: true,
        }
    );
    parser.write(html);
    parser.end();

    appendLineBreak();

    return render();
};