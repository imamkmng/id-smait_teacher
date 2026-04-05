import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Upload, Download, Image as ImageIcon, Shuffle, FileDown } from 'lucide-react';

export default function App() {
  const [name, setName] = useState('IMAM ROHMAN, S.KOM');
  const [role, setRole] = useState('TENAGA PENDIDIK');
  const [idLabel, setIdLabel] = useState('NIP / NUPTK');
  const [idNumber, setIdNumber] = useState('0067829104325678');
  const [validUntil, setValidUntil] = useState('31 DESEMBER 2026');
  const [academicYear, setAcademicYear] = useState('2023/2024');
  const [photo, setPhoto] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignature(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadCard = async (compressed: boolean = false) => {
    if (cardRef.current && !isDownloading) {
      setIsDownloading(true);
      try {
        const canvas = await html2canvas(cardRef.current, {
          scale: compressed ? 1 : 3, // Higher resolution for HD, 1 for compressed
          useCORS: true,
          backgroundColor: null,
        });
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `id-card-${name.replace(/\s+/g, '-').toLowerCase()}${compressed ? '-small' : ''}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error generating image:', error);
        alert('Failed to generate image. Please try again.');
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const generateRandom = async () => {
    const names = ["BUDI SANTOSO, S.PD", "SITI AMINAH, M.PD", "AHMAD FAUZI, S.KOM", "NURUL HIDAYAH, S.E", "EKO PRASETYO, S.T", "LINA MARLINA, S.AG", "HENDRA WIJAYA, M.TI"];
    const roles = ["TENAGA PENDIDIK", "STAF TATA USAHA", "KEPALA SEKOLAH", "WAKIL KEPALA SEKOLAH", "GURU BIMBINGAN KONSELING", "PUSTAKAWAN"];
    const labels = ["NIP / NUPTK", "NIG", "NIK", "NIP"];

    setName(names[Math.floor(Math.random() * names.length)]);
    setRole(roles[Math.floor(Math.random() * roles.length)]);
    setIdLabel(labels[Math.floor(Math.random() * labels.length)]);
    
    let randomId = '';
    for(let i=0; i<16; i++) {
      randomId += Math.floor(Math.random() * 10).toString();
    }
    setIdNumber(randomId);

    const months = ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const randomYear = 2025 + Math.floor(Math.random() * 5);
    setValidUntil(`${randomDay} ${months[Math.floor(Math.random() * months.length)]} ${randomYear}`);

    const academicYears = ["2023/2024", "2024/2025", "2025/2026", "2026/2027"];
    setAcademicYear(academicYears[Math.floor(Math.random() * academicYears.length)]);

    try {
      const gender = Math.random() > 0.5 ? 'men' : 'women';
      const id = Math.floor(Math.random() * 99);
      const response = await fetch(`https://randomuser.me/api/portraits/${gender}/${id}.jpg`);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Failed to fetch random photo", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">ID Card Generator</h1>
          <p className="text-gray-600 mt-2">Fill in the details to generate a custom ID card</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
          {/* Form Section */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6 border-b pb-2">
              <h2 className="text-xl font-semibold">Card Details</h2>
              <button
                onClick={generateRandom}
                className="text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors font-medium border border-blue-200"
              >
                <Shuffle size={14} />
                Random
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors uppercase"
                  placeholder="e.g. JOHN DOE, S.KOM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role / Title</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors uppercase"
                  placeholder="e.g. TENAGA PENDIDIK"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID Label</label>
                  <input
                    type="text"
                    value={idLabel}
                    onChange={(e) => setIdLabel(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors uppercase"
                    placeholder="e.g. NIP / NUPTK"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                  <input
                    type="text"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                    placeholder="e.g. 1234567890"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Ajaran</label>
                  <input
                    type="text"
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors uppercase"
                    placeholder="e.g. 2023/2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Masa Berlaku / Kontrak</label>
                  <input
                    type="text"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors uppercase"
                    placeholder="e.g. 31 DESEMBER 2026"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                  <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-md hover:border-green-500 transition-colors bg-gray-50">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label
                          htmlFor="logo-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500 px-2 py-1"
                        >
                          <span>Upload Logo</span>
                          <input id="logo-upload" name="logo-upload" type="file" accept="image/*" className="sr-only" onChange={handleLogoUpload} />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                  <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-md hover:border-green-500 transition-colors bg-gray-50">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500 px-2 py-1"
                        >
                          <span>Upload Photo</span>
                          <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handlePhotoUpload} />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanda Tangan</label>
                <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-md hover:border-green-500 transition-colors bg-gray-50">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="signature-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500 px-2 py-1"
                      >
                        <span>Upload Tanda Tangan</span>
                        <input id="signature-upload" name="signature-upload" type="file" accept="image/*" className="sr-only" onChange={handleSignatureUpload} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-6">
                <button
                  onClick={() => downloadCard(false)}
                  disabled={isDownloading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Download size={20} />
                  {isDownloading ? 'Processing...' : 'Download HD (PNG)'}
                </button>
                <button
                  onClick={() => downloadCard(true)}
                  disabled={isDownloading}
                  className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold py-2.5 px-4 rounded-md flex items-center justify-center gap-2 transition-colors border border-emerald-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <FileDown size={18} />
                  {isDownloading ? 'Processing...' : 'Download Compressed (Small PNG)'}
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="w-full lg:w-auto flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Live Preview</h2>
            
            {/* The ID Card */}
            <div 
              ref={cardRef}
              className="w-[360px] min-h-[570px] bg-[#ffffff] rounded-xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] relative flex flex-col border border-[#e5e7eb]"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {/* Header */}
              <div className="bg-[#1a7c3b] p-4 flex items-center gap-3 relative z-10 h-[100px]">
                {/* Logo Placeholder */}
                <div className="w-[68px] h-[68px] bg-[#ffffff] rounded-md flex items-center justify-center shrink-0 p-1 overflow-hidden">
                  {logo ? (
                    <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full rounded-full border-2 border-[#dc2626] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 border-4 border-[#ffffff] rounded-full z-10 pointer-events-none"></div>
                      <div className="w-[85%] h-[85%] bg-[#dc2626] rounded-full flex flex-col items-center justify-center text-[#ffffff] relative">
                        {/* Simplified logo representation */}
                        <div className="w-6 h-6 border-b-2 border-[#ffffff] rounded-full absolute top-1"></div>
                        <div className="w-2 h-2 bg-[#ffffff] rounded-full absolute top-3"></div>
                        <div className="text-[6px] font-bold mt-4 tracking-widest">HARUM</div>
                      </div>
                      {/* Outer text simulation */}
                      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow" style={{ animationDuration: '20s' }}>
                        <path id="curve" d="M 15 50 A 35 35 0 1 1 85 50 A 35 35 0 1 1 15 50" fill="transparent" />
                        <text className="text-[8px] font-bold fill-[#dc2626] uppercase tracking-widest">
                          <textPath href="#curve" startOffset="50%" textAnchor="middle">
                            Sekolah Islam Terpadu
                          </textPath>
                        </text>
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Header Text */}
                <div className="flex flex-col text-[#ffffff] justify-center h-full">
                  <div className="text-[14px] font-extrabold leading-tight tracking-wide mt-0.5">SMAIT HARAPAN UMAT KARAWANG</div>
                  <div className="text-[10px] mt-1 opacity-90">NPSN: 69947172 • TAHUN AJARAN {academicYear || '2023/2024'}</div>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 flex flex-col items-center pt-5 pb-2 relative bg-[#ffffff]">
                {/* Top right decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#e8f3ec] transform rotate-45 translate-x-16 -translate-y-16 z-0"></div>
                
                {/* Photo */}
                <div className="w-[140px] h-[180px] bg-[#2563eb] rounded-lg border-4 border-[#f3f4f6] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] overflow-hidden z-10 mb-4 relative flex items-center justify-center">
                  {photo ? (
                    <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-[#ffffff] opacity-50 flex flex-col items-center">
                      <ImageIcon size={48} />
                      <span className="text-xs mt-2">No Photo</span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="text-[22px] font-extrabold text-[#0f592d] text-center px-4 uppercase leading-tight z-10 w-full">
                  {name || 'NAME PLACEHOLDER'}
                </div>

                {/* Role */}
                <div className="bg-[#1a7c3b] text-[#ffffff] px-6 py-1.5 rounded-full text-[15px] font-bold mt-2 uppercase tracking-wide z-10 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                  {role || 'ROLE PLACEHOLDER'}
                </div>

                {/* ID Info */}
                <div className="mt-auto mb-4 flex flex-col items-center z-10 w-full">
                  <div className="text-[#6b7280] text-[13px] font-bold tracking-[0.2em] uppercase">
                    {idLabel || 'ID LABEL'}
                  </div>
                  <div className="text-[#1f2937] text-[20px] font-extrabold mt-1 tracking-wide">
                    {idNumber || '0000000000000000'}
                  </div>
                  
                  {/* Signature Area */}
                  <div className="h-12 mt-1 mb-1 flex items-center justify-center w-full">
                    {signature ? (
                      <img src={signature} alt="Signature" className="h-full object-contain mix-blend-multiply" />
                    ) : (
                      <div className="text-[#9ca3af] text-[10px] italic border-b border-dashed border-gray-300 w-24 text-center pb-1">Tanda Tangan</div>
                    )}
                  </div>

                  <div className="text-[#dc2626] text-[10px] font-bold mt-1 tracking-wider uppercase bg-[#fee2e2] px-3 py-1 rounded-full border border-[#fca5a5]">
                    EXPIRED DATE: {validUntil || '31 DESEMBER 2026'}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-[#f8f9fa] py-3 px-4 text-center border-t border-[#e5e7eb] z-10 flex flex-col items-center justify-center shrink-0">
                <div className="text-[#9ca3af] text-[10px] font-bold tracking-widest uppercase mb-1">
                  KARTU IDENTITAS RESMI SEKOLAH
                </div>
                <div className="text-[#6b7280] text-[8px] leading-tight">
                  Jl. Pakuncen, Desa Sukaharja, Kec. Telukjambe Timur, Kab. Karawang, Jawa Barat, kode pos 41361
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
