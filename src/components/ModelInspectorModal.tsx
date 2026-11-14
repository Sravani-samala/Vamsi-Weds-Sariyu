import React, { useState } from 'react';
import { WeddingData } from '../data/weddingData';
import { X, Check, Sliders } from 'lucide-react';

interface ModelInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WeddingData;
  onUpdateData: (newData: Partial<WeddingData>) => void;
}

export const ModelInspectorModal: React.FC<ModelInspectorModalProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateData,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  // Editable local state
  const [groomFullName, setGroomFullName] = useState(data.groomFullName);
  const [brideFullName, setBrideFullName] = useState(data.brideFullName);
  const [groomFatherName, setGroomFatherName] = useState(data.groomFatherName || '');
  const [groomMotherName, setGroomMotherName] = useState(data.groomMotherName || '');
  const [brideFatherName, setBrideFatherName] = useState(data.brideFatherName || '');
  const [brideMotherName, setBrideMotherName] = useState(data.brideMotherName || '');
  const [weddingDate, setWeddingDate] = useState(data.weddingDate || '');
  const [muhurtamTime, setMuhurtamTime] = useState(data.muhurtamTime || '');
  const [haldiDate, setHaldiDate] = useState(data.haldiDate || '');
  const [venue, setVenue] = useState(data.venue || '');
  const [address, setAddress] = useState(data.address || '');
  const [googleMapsUrl, setGoogleMapsUrl] = useState(data.googleMapsUrl || '');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateData({
      groomFullName: groomFullName.trim() || 'Kandagatla Vamsi',
      brideFullName: brideFullName.trim() || 'Madas Sariyu',
      groomFatherName: groomFatherName.trim() || 'Sri Kandagatla Venkateshwarlu',
      groomMotherName: groomMotherName.trim() || 'Smt. Kandagatla Laxmi',
      brideFatherName: brideFatherName.trim() || 'Sri Madas Narsimha Rao',
      brideMotherName: brideMotherName.trim() || 'Smt. Madas Sujatha',
      weddingDate: weddingDate.trim() || null,
      muhurtamTime: muhurtamTime.trim(),
      haldiDate: haldiDate.trim() || null,
      venue: venue.trim(),
      address: address.trim(),
      googleMapsUrl: googleMapsUrl.trim(),
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="w-full max-w-lg bg-white border-2 border-[#C5A064] rounded-3xl shadow-2xl p-6 md:p-8 relative text-[#3E0B12] max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-[#3E0B12]/60 hover:text-[#58111A] hover:bg-[#FAF7F2] transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <Sliders className="w-4 h-4 text-[#C5A064]" />
          <h3 className="font-bodoni text-2xl text-[#58111A]">
            Edit Ceremony Details
          </h3>
        </div>
        <p className="font-jost text-xs text-[#C5A064] mb-6">
          Update names, family details, dates, times, and venue location for the wedding invitation.
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-jost uppercase tracking-wider text-[#C5A064] font-semibold mb-1">
                Groom Full Name
              </label>
              <input
                type="text"
                value={groomFullName}
                onChange={(e) => setGroomFullName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#C5A064]/40 focus:border-[#58111A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-jost uppercase tracking-wider text-[#C5A064] font-semibold mb-1">
                Bride Full Name
              </label>
              <input
                type="text"
                value={brideFullName}
                onChange={(e) => setBrideFullName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#C5A064]/40 focus:border-[#58111A] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-jost uppercase tracking-wider text-[#C5A064] font-semibold mb-1">
                Groom Parents (Father &amp; Mother)
              </label>
              <input
                type="text"
                placeholder="Father's Name"
                value={groomFatherName}
                onChange={(e) => setGroomFatherName(e.target.value)}
                className="w-full mb-1.5 px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#C5A064]/40 focus:border-[#58111A] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Mother's Name"
                value={groomMotherName}
                onChange={(e) => setGroomMotherName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#C5A064]/40 focus:border-[#58111A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-jost uppercase tracking-wider text-[#C5A064] font-semibold mb-1">
                Bride Parents (Father &amp; Mother)
              </label>
              <input
                type="text"
                placeholder="Father's Name"
                value={brideFatherName}
                onChange={(e) => setBrideFatherName(e.target.value)}
                className="w-full mb-1.5 px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#C5A064]/40 focus:border-[#58111A] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Mother's Name"
                value={brideMotherName}
                onChange={(e) => setBrideMotherName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#C5A064]/40 focus:border-[#58111A] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-jost uppercase tracking-wider text-[#C5A064] font-semibold mb-1">
                Wedding Date
              </label>
              <input
                type="text"
                placeholder="e.g. December 12, 2026"
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#C5A064]/40 focus:border-[#58111A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-jost uppercase tracking-wider text-[#C5A064] font-semibold mb-1">
                Muhurtam Time
              </label>
              <input
                type="text"
                placeholder="e.g. 09:24 AM (Vrischika Lagnam)"
                value={muhurtamTime}
                onChange={(e) => setMuhurtamTime(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#C5A064]/40 focus:border-[#58111A] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-jost uppercase tracking-wider text-[#C5A064] font-semibold mb-1">
              Haldi Ceremony Date
            </label>
            <input
              type="text"
              placeholder="e.g. December 10, 2026"
              value={haldiDate}
              onChange={(e) => setHaldiDate(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#C5A064]/40 focus:border-[#58111A] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-jost uppercase tracking-wider text-[#C5A064] font-semibold mb-1">
              Venue Name
            </label>
            <input
              type="text"
              placeholder="e.g. Sri Venkateswara Kalyana Mandapam"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#C5A064]/40 focus:border-[#58111A] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-jost uppercase tracking-wider text-[#C5A064] font-semibold mb-1">
              Full Address
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Royal Palace Grounds, Main Road, Hyderabad, Telangana"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#C5A064]/40 focus:border-[#58111A] focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-jost uppercase tracking-wider text-[#C5A064] font-semibold mb-1">
              Google Maps URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://maps.google.com/..."
              value={googleMapsUrl}
              onChange={(e) => setGoogleMapsUrl(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#C5A064]/40 focus:border-[#58111A] focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-jost text-[#3E0B12]/70 hover:text-[#58111A]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#58111A] hover:bg-[#3E0B12] text-[#ECC880] text-xs font-jost uppercase tracking-widest font-semibold rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : null}
              <span>{isSaved ? 'Updated!' : 'Save Details'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
