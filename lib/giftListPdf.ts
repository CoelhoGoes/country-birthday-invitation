import { jsPDF } from "jspdf";
import { eventConfig } from "@/lib/eventConfig";
import { giftCategories, giftListWarning } from "@/lib/giftListContent";

const PAGE_MARGIN = 48;
const LINE_HEIGHT = 16;

export function downloadGiftListPdf() {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - PAGE_MARGIN * 2;

  let y = PAGE_MARGIN;

  const ensureSpace = (linesNeeded: number) => {
    if (y + linesNeeded * LINE_HEIGHT > pageHeight - PAGE_MARGIN) {
      doc.addPage();
      y = PAGE_MARGIN;
    }
  };

  const writeParagraph = (text: string, fontSize: number, style: "normal" | "bold" | "italic") => {
    doc.setFont("helvetica", style);
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, contentWidth);
    ensureSpace(lines.length);
    doc.text(lines, PAGE_MARGIN, y);
    y += lines.length * LINE_HEIGHT;
  };

  writeParagraph(`Lista de Presentes — ${eventConfig.title}`, 18, "bold");
  y += 8;

  writeParagraph(giftListWarning, 11, "italic");
  y += 12;

  giftCategories.forEach((category) => {
    ensureSpace(2);
    writeParagraph(category.title.toUpperCase(), 13, "bold");

    if (category.note) {
      writeParagraph(category.note, 11, "bold");
    }

    category.items.forEach((item) => {
      writeParagraph(`•  ${item}`, 11, "normal");
    });

    if (category.footnote) {
      writeParagraph(category.footnote, 10, "italic");
    }

    y += 10;
  });

  doc.save("lista-presentes-da-welly.pdf");
}
