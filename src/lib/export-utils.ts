/**
 * Export utilities for generating PDF and CSV files
 */

// CSV Export
export function exportToCSV(data: Record<string, unknown>[], filename: string, headers?: string[]) {
  if (!data || data.length === 0) {
    console.error("No data to export");
    return;
  }

  // Get headers from data keys or use provided headers
  const csvHeaders = headers || Object.keys(data[0]);

  // Create CSV content
  const csvContent = [
    csvHeaders.join(","),
    ...data.map(row => 
      csvHeaders.map(header => {
        const value = row[header];
        // Handle nested objects, arrays, and special characters
        if (value === null || value === undefined) return "";
        if (typeof value === "object") return JSON.stringify(value).replace(/"/g, '""');
        if (typeof value === "string" && (value.includes(",") || value.includes('"') || value.includes("\n"))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return String(value);
      }).join(",")
    )
  ].join("\n");

  // Create and download file
  const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, `${filename}.csv`);
}

// JSON Export
export function exportToJSON(data: unknown, filename: string) {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });
  downloadBlob(blob, `${filename}.json`);
}

// PDF Export using browser print
export function exportToPDF(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found`);
    return;
  }

  // Clone the element for printing
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    console.error("Could not open print window");
    return;
  }

  // Get all stylesheets
  const styles = Array.from(document.styleSheets)
    .map(styleSheet => {
      try {
        return Array.from(styleSheet.cssRules)
          .map(rule => rule.cssText)
          .join("\n");
      } catch (e) {
        // External stylesheets may cause CORS issues
        return "";
      }
    })
    .join("\n");

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${filename}</title>
        <style>
          ${styles}
          @media print {
            body { 
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              background: #0a1628 !important;
              color: white !important;
            }
          }
          body {
            background: #0a1628;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            padding: 40px;
          }
          .glass-card {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 16px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
          th {
            background: rgba(255,255,255,0.05);
            font-weight: bold;
          }
          h1, h2, h3 {
            color: #06b6d4;
          }
        </style>
      </head>
      <body>
        <h1>CivilizationProtocol Report - ${filename}</h1>
        <p style="color: #64748b; margin-bottom: 24px;">Generated: ${new Date().toLocaleString()}</p>
        ${element.innerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();
  
  // Wait for content to load then print
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
}

// Generate printable report HTML
export function generateReportHTML(title: string, sections: {
  title: string;
  content: string | Record<string, unknown>[];
  type: "text" | "table" | "stats";
}[]): string {
  let html = `
    <div style="max-width: 800px; margin: 0 auto;">
      <h1 style="color: #06b6d4; margin-bottom: 24px;">${title}</h1>
      <p style="color: #64748b; margin-bottom: 32px;">Generated: ${new Date().toLocaleString()}</p>
  `;

  sections.forEach(section => {
    html += `<div class="glass-card" style="margin-bottom: 24px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 24px;">`;
    html += `<h2 style="color: #06b6d4; margin-bottom: 16px;">${section.title}</h2>`;

    if (section.type === "text") {
      html += `<p style="color: #cbd5e1; line-height: 1.6;">${section.content}</p>`;
    } else if (section.type === "table" && Array.isArray(section.content)) {
      const headers = Object.keys(section.content[0] || {});
      html += `
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: rgba(255,255,255,0.05);">
              ${headers.map(h => `<th style="padding: 12px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.1);">${h}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${section.content.map(row => `
              <tr>
                ${headers.map(h => `<td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05);">${row[h] ?? ""}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else if (section.type === "stats" && Array.isArray(section.content)) {
      html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px;">`;
      section.content.forEach(stat => {
        const statObj = stat as Record<string, unknown>;
        html += `
          <div style="background: rgba(6,182,212,0.1); border-radius: 8px; padding: 16px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #06b6d4;">${statObj.value}</div>
            <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">${statObj.label}</div>
          </div>
        `;
      });
      html += `</div>`;
    }

    html += `</div>`;
  });

  html += `</div>`;
  return html;
}

// Download a Blob as a file
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Dashboard specific exports
export function exportDashboardData(data: {
  metrics: { label: string; value: string | number; change?: string }[];
  alerts?: { type: string; message: string; time: string }[];
  regions?: { name: string; quality: number; population: number }[];
}) {
  const filename = `vodeco-dashboard-${new Date().toISOString().split("T")[0]}`;
  
  // Export as JSON for full data
  exportToJSON(data, filename);
}

export function exportMapData(points: {
  id: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  status: string;
  quality?: number;
}[]) {
  const filename = `vodeco-map-data-${new Date().toISOString().split("T")[0]}`;
  
  // Export as CSV
  exportToCSV(
    points.map(p => ({
      ID: p.id,
      Name: p.name,
      Type: p.type,
      Latitude: p.lat,
      Longitude: p.lng,
      Status: p.status,
      Quality: p.quality || "N/A"
    })),
    filename,
    ["ID", "Name", "Type", "Latitude", "Longitude", "Status", "Quality"]
  );
}

export function exportTransactionHistory(transactions: {
  id: string;
  type: string;
  amount: number;
  token: string;
  date: string;
  status: string;
}[]) {
  const filename = `vodeco-transactions-${new Date().toISOString().split("T")[0]}`;
  
  exportToCSV(
    transactions.map(t => ({
      ID: t.id,
      Type: t.type,
      Amount: t.amount,
      Token: t.token,
      Date: t.date,
      Status: t.status
    })),
    filename
  );
}

export function exportProposalData(proposals: {
  id: string;
  title: string;
  status: string;
  votesFor: number;
  votesAgainst: number;
  createdAt: string;
}[]) {
  const filename = `vodeco-dao-proposals-${new Date().toISOString().split("T")[0]}`;
  
  exportToCSV(proposals, filename);
}


















