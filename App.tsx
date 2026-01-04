
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import StudentCard from './components/StudentCard';
import { fetchStudentData } from './services/googleSheetsService';
import { Student, FetchStatus } from './types';

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.IDLE);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Initial data fetch
  useEffect(() => {
    const initFetch = async () => {
      setStatus(FetchStatus.LOADING);
      try {
        const data = await fetchStudentData();
        setStudents(data);
        setStatus(FetchStatus.SUCCESS);
      } catch (err) {
        setStatus(FetchStatus.ERROR);
        setErrorMsg('Gagal memuatkan pangkalan data. Sila semak sambungan internet anda.');
      }
    };
    initFetch();
  }, []);

  const filteredStudents = useMemo(() => {
    if (!hasSearched || searchQuery.trim() === '') return [];
    
    const query = searchQuery.toLowerCase().trim();
    return students.filter(student => 
      student.nama.toLowerCase().includes(query) || 
      student.emelDelima.toLowerCase().includes(query)
    );
  }, [students, searchQuery, hasSearched]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length < 3) {
      alert('Sila masukkan sekurang-kurangnya 3 aksara untuk carian.');
      return;
    }
    setHasSearched(true);
  };

  const handleReset = () => {
    setSearchQuery('');
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Carian Murid
          </h2>
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Masukkan Nama Murid atau ID DELIMa..."
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg text-black font-medium shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={status === FetchStatus.LOADING}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {status === FetchStatus.LOADING ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Cari Sekarang</>
                )}
              </button>
              {hasSearched && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-all"
                >
                  Set Semula
                </button>
              )}
            </div>
            <p className="text-xs text-gray-400 text-center italic">
              Nota: Sila masukkan nama penuh mengikut sijil kelahiran untuk hasil yang lebih tepat.
            </p>
          </form>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {status === FetchStatus.ERROR && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">{errorMsg}</p>
                </div>
              </div>
            </div>
          )}

          {hasSearched && filteredStudents.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest px-2">
                Hasil Carian ({filteredStudents.length})
              </h3>
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                {filteredStudents.map((student, idx) => (
                  <StudentCard key={idx} student={student} />
                ))}
              </div>
            </div>
          )}

          {hasSearched && filteredStudents.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Tiada rekod ditemui</h3>
              <p className="mt-1 text-sm text-gray-500">Sila pastikan ejaan nama adalah betul atau cuba carian yang lebih umum.</p>
            </div>
          )}

          {!hasSearched && status === FetchStatus.SUCCESS && (
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-800">Selamat Datang ke Portal Semakan</h3>
                <p className="text-blue-700 leading-relaxed">
                  Sistem ini memudahkan murid dan ibu bapa menyemak ID DELIMa secara kendiri. 
                  Gunakan kotak carian di atas untuk memulakan semakan.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SK Nanga Penyarai. Hak Cipta Terpelihara.
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Data dikemaskini dari Google Sheets secara automatik.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
