
import React from 'react';
import { Student } from '../types';

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(student.emelDelima);
    alert('Emel disalin ke papan keratan!');
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Nama Murid</h3>
          <p className="text-xl font-bold text-gray-800 break-words">{student.nama}</p>
        </div>
        <div className="ml-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Aktif
          </span>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">ID DELIMa</h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <code className="bg-gray-50 border border-gray-200 text-gray-700 px-3 py-2 rounded-lg font-mono text-sm flex-1 break-all">
            {student.emelDelima}
          </code>
          <button 
            onClick={copyToClipboard}
            className="text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors font-medium whitespace-nowrap"
          >
            Salin Emel
          </button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end">
        <a 
          href="https://mail.google.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
        >
          Log Masuk Gmail
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default StudentCard;
