"use strict";

const fs = require("fs");
const path = require("path");

const outfile = path.join(__dirname, "..", "public", "cv.pdf");
const chunks = [];
const objOffsets = [];

/** @param {string} s */
function writeStr(s) {
  chunks.push(Buffer.from(s, "utf8"));
}

function startObject() {
  objOffsets.push(Buffer.concat(chunks).length);
}

writeStr("%PDF-1.4\n");

startObject();
writeStr(`1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
`);

startObject();
writeStr(`2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
`);

startObject();
writeStr(`3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >>
>>
endobj
`);

const streamText = `BT
/F1 20 Tf
72 742 Td
(Muhammad Uzair Zia) Tj
0 -28 Td
(Computer Engineer - AI / ML Specialist) Tj
0 -38 Td
(Swap public/cv.pdf with your exported resume when ready.) Tj
ET
`;

startObject();
writeStr(`4 0 obj
<< /Length ${Buffer.byteLength(streamText, "utf8")} >>
stream
${streamText}endstream
endobj
`);

const body = Buffer.concat(chunks);
const xrefOffset = body.length;

let xref = "xref\n0 5\n0000000000 65535 f \n";
for (const off of objOffsets) {
  xref += String(off).padStart(10, "0") + " 00000 n \n";
}
const trailer = `trailer
<< /Size 5 /Root 1 0 R >>
startxref
${xrefOffset}
%%EOF
`;
const pdf = Buffer.concat([body, Buffer.from(xref + trailer, "utf8")]);
fs.mkdirSync(path.dirname(outfile), { recursive: true });
fs.writeFileSync(outfile, pdf);
