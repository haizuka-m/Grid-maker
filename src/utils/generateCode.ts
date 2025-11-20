import type { GridItem } from '../store/gridStore';

export const generateCSS = (rows: number, columns: number, gap: number, items: GridItem[]) => {
  let css = `.container {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  gap: ${gap}px;
  width: 100%;
  height: 100%;
}

`;

  items.forEach((item) => {
    css += `.${item.name.toLowerCase().replace(/\s+/g, '-')} {
  grid-column: ${item.colStart} / ${item.colEnd};
  grid-row: ${item.rowStart} / ${item.rowEnd};
  background-color: ${item.color};
}

`;
  });

  return css;
};

export const generateHTML = (items: GridItem[]) => {
  let html = `<div class="container">\n`;

  items.forEach((item) => {
    html += `  <div class="${item.name.toLowerCase().replace(/\s+/g, '-')}">${item.name}</div>\n`;
  });

  html += `</div>`;

  return html;
};

export const generateFullHTML = (rows: number, columns: number, gap: number, items: GridItem[]) => {
  const css = generateCSS(rows, columns, gap, items);
  const html = generateHTML(items);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Grid Layout</title>
  <style>
    body { margin: 0; height: 100vh; }
${css.split('\n').map(line => '    ' + line).join('\n')}
  </style>
</head>
<body>
${html.split('\n').map(line => '  ' + line).join('\n')}
</body>
</html>`;
};
