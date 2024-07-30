// src/app/pdfMakeConfig.ts
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

export function setVfs() {
  return pdfFonts.pdfMake.vfs;
}
