
import { Student } from '../types';

const SHEET_ID = '1resHEtXvOOtXN4ZeKZ6c3aLrq7HjpcNFmrRw-YEc598';
const SHEET_NAME = 'EMEL ID DELIMA';
// Using the Google Visualization API to get the data in CSV format
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;

export async function fetchStudentData(): Promise<Student[]> {
  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error('Gagal memuat turun data dari Google Sheets.');
    }
    
    const csvText = await response.text();
    const rows = csvText.split('\n');
    
    // Skip header row and map to Student object
    // Rows from gviz CSV often have quotes around strings
    const students: Student[] = rows.slice(1).map(row => {
      // Simple CSV split (note: doesn't handle commas within quotes perfectly, 
      // but for this specific data structure it should be fine)
      const columns = row.split(',').map(col => col.replace(/^"(.*)"$/, '$1').trim());
      
      return {
        nama: columns[0] || '',
        emelDelima: columns[1] || ''
      };
    }).filter(s => s.nama !== '');

    return students;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
}
