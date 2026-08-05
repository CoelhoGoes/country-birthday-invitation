import { jsPDF } from "jspdf";
import { eventConfig } from "@/lib/eventConfig";

const PAGE_MARGIN = 48;
const LINE_HEIGHT = 18;

export type RsvpExportRow = {
  name: string;
  confirmed: boolean;
};

// Gera o PDF de confirmações direto no navegador (substitui a exportação
// em .xlsx — ver docs/design-reference.md). Só nome e status, como pedido.
export function downloadRsvpPdf(rsvps: RsvpExportRow[]) {
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

  const confirmedCount = rsvps.filter((r) => r.confirmed).length;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(`Confirmações — ${eventConfig.title}`, PAGE_MARGIN, y);
  y += LINE_HEIGHT + 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`${rsvps.length} resposta(s) — ${confirmedCount} confirmada(s)`, PAGE_MARGIN, y);
  y += LINE_HEIGHT + 10;

  const nameColumnWidth = contentWidth - 80;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  ensureSpace(1);
  doc.text("Nome", PAGE_MARGIN, y);
  doc.text("Confirmado", PAGE_MARGIN + nameColumnWidth, y);
  y += LINE_HEIGHT;
  doc.setLineWidth(0.5);
  doc.line(PAGE_MARGIN, y - LINE_HEIGHT + 6, pageWidth - PAGE_MARGIN, y - LINE_HEIGHT + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  if (rsvps.length === 0) {
    ensureSpace(1);
    doc.text("Nenhuma confirmação ainda.", PAGE_MARGIN, y);
    y += LINE_HEIGHT;
  }

  rsvps.forEach((rsvp) => {
    const nameLines = doc.splitTextToSize(rsvp.name, nameColumnWidth - 10);
    ensureSpace(nameLines.length);
    doc.text(nameLines, PAGE_MARGIN, y);
    doc.text(rsvp.confirmed ? "Sim" : "Não", PAGE_MARGIN + nameColumnWidth, y);
    y += nameLines.length * LINE_HEIGHT;
  });

  doc.save("confirmacoes-rsvp.pdf");
}
