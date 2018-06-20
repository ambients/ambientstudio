import { indexesOf, isQuote, pushOne, replaceAll } from "ambients-utils";

function isDelimiter(str: string): boolean {
    return str === ';' || str === ':' || isQuote(str);
}

export default function(html: string, replaceViewBox = false): string {
    const colors: Array<string> = [];
    for (const index of indexesOf(html, '#')) {
        if (isDelimiter(html[index - 1])) {
            if (isDelimiter(html[index + 7]))
                pushOne(colors, html.substring(index, index + 7));
            else if (isDelimiter(html[index + 4]))
                pushOne(colors, html.substring(index, index + 4));
        }
    }
    for (const index of indexesOf(html, 'rgba(')) {
        let indexEnd = -1;
        for (let i = index + 5; i < html.length; ++i)
            if (html[i] === ')') {
                indexEnd = i + 1;
                break;
            }
        if (indexEnd !== -1) pushOne(colors, html.substring(index, indexEnd));
    }
    for (const index of indexesOf(html, 'rgb(')) {
        let indexEnd = -1;
        for (let i = index + 4; i < html.length; ++i)
            if (html[i] === ')') {
                indexEnd = i + 1;
                break;
            }
        if (indexEnd !== -1) pushOne(colors, html.substring(index, indexEnd));
    }
    for (const color of colors.sort((a, b) => { return b.length - a.length })) {
        html = replaceAll(html, color, 'currentColor');
    }
    if (replaceViewBox) {
        const index = html.indexOf('viewBox="');
        let indexEnd = -1;
        for (let i = index + 9; i < html.length; ++i)
            if (html[i] === '"') {
                indexEnd = i + 1;
                break;
            }
        if (indexEnd !== -1) {
            const viewBox = html.substring(index, indexEnd);
            const parts = viewBox.split(' '), width = parts[2], height = parts[3].slice(0, -1);
            html = html.replace(viewBox, `width="${ width }" height="${ height }"`);
        }
    }
    return html;
}