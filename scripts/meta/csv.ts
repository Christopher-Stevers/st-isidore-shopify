import fs from 'fs';
import path from 'path';
import {parse} from 'csv-parse/sync';
import {stringify} from 'csv-stringify/sync';
import {UnifiedConfig} from './schema';

// Load the OG header from the provided template CSV to preserve order exactly
export function readTemplateHeader(templatePath: string): string[] {
  const csv = fs.readFileSync(templatePath, 'utf8');
  const [headerLine] = csv.split(/\r?\n/);
  // Split respecting commas, header has no quotes in template
  return parse(headerLine, {relax_column_count: true, bom: true})[0] as string[];
}

export function readTemplateRows(templatePath: string): Array<Record<string, string>> {
  const csv = fs.readFileSync(templatePath, 'utf8');
  const records = parse(csv, {
    columns: true,
    skip_empty_lines: true,
  }) as Array<Record<string, string>>;
  return records;
}

// Reads a CSV file, converts each row to JSON objects,
// and returns an array of those objects.
export function readFullTemplate(csvPath: string): any[] {
  const csvData = fs.readFileSync(csvPath, 'utf8');
  // Parse with columns: true to return array of objects keyed by headers
  return parse(csvData, {
    columns: true,
    skip_empty_lines: true,
    bom: true
  });
}

export type CsvRow = Record<string, string | number | undefined>;

// Deterministic CSV writer preserving header order; fills missing with empty strings
export function writeCsv(
  header: string[],
  rows: CsvRow[],
  outPath: string,
) {
  const data = rows.map((row) =>
    header.map((key) => (row[key] === undefined ? '' : String(row[key]))),
  );
  const csv = stringify([header, ...data]);
  fs.mkdirSync(path.dirname(outPath), {recursive: true});
  fs.writeFileSync(outPath, csv, 'utf8');
}

// Utility to build empty row shaped to the OG header
export function emptyRow(header: string[]): CsvRow {
  const obj: CsvRow = {};
  header.forEach((h) => (obj[h] = ''));
  return obj;
}

// Formats ISO string to Meta CSV expected format if needed (keep ISO default)
export function fmtTime(iso?: string): string {
  return iso ? new Date(iso).toISOString() : '';
}

// UTM builder
export function buildUrlWithUtm(base: string, utm: UnifiedConfig['utm'],
  overrides?: Partial<UnifiedConfig['utm']>,
): string {
  const u = new URL(base);
  const merged = {...utm, ...(overrides || {})};
  if (merged.source) u.searchParams.set('utm_source', merged.source);
  if (merged.medium) u.searchParams.set('utm_medium', merged.medium);
  if (merged.campaign) u.searchParams.set('utm_campaign', merged.campaign);
  if (merged.content) u.searchParams.set('utm_content', merged.content);
  if (merged.term) u.searchParams.set('utm_term', merged.term);
  return u.toString();
}


