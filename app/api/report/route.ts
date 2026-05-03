import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";

// Handle POST requests to /api/report
export async function POST(req: Request) {
  try {
    // ---- Parse & Validate Input ----
    const { result, explanation, strengths, nextSteps } = await req.json();

    if (!result) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // ---- Create PDF ----
    const pdfDoc = await PDFDocument.create();
     // multi-page support
    const page = pdfDoc.addPage([600, 800]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let y = 750; // vertical cursor position

    /* Splits long strings into multiple lines to prevent overflow */
   const wrapText = (
    text: string,
    maxCharsPerLine: number = 80
    ): string[] => {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
        if ((currentLine + word).length > maxCharsPerLine) {
        lines.push(currentLine.trim());
        currentLine = word + " ";
        } else {
        currentLine += word + " ";
        }
    }

    if (currentLine) lines.push(currentLine.trim());

    return lines;
    };

    /* Handles wrapping, spacing, page overflow */
    const drawTextBlock = (
    text: string,
    size = 12,
    bold = false
    ) => {
    const lines = wrapText(text, 75);

    for (const line of lines) {
        page.drawText(line, {
        x: 50,
        y,
        size,
        font: bold ? boldFont : font,
        });
        y -= size + 6; // spacing between lines
    }

    y -= 6; // spacing after paragraph
    };

    // ---- PDF Content ----

    // Title
    drawTextBlock("Job Genie Career Report", 20, true);
    y -= 10;

    // Result
    drawTextBlock(`Recommended Path: ${result}`, 16, true);
    y -= 10;

    // Explanation
    drawTextBlock("Overview", 14, true);
    drawTextBlock(explanation);

    y -= 10;

    // Strengths
    drawTextBlock("Strengths", 14, true);
    strengths.forEach((s: string) => {
    drawTextBlock(`• ${s}`);
    });

    y -= 10;

    // Next Steps
    drawTextBlock("Next Steps", 14, true);
    nextSteps.forEach((step: string) => {
    drawTextBlock(`• ${step}`);
    });

    // ---- Finalize PDF ----
    const pdfBytes = await pdfDoc.save();

    // ---- Return PDF Response ----
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=career-report.pdf",
      },
    });
  } catch (err) {
    // ---- Error Handling ----
    console.error(err);
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}