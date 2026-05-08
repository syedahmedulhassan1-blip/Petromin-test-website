// ============================================================================
// ImageUploader
// ----------------------------------------------------------------------------
// Drop or click to upload. Shows preview. Lets admin paste a URL directly too.
// On upload, file goes to Supabase Storage cms-images bucket → public URL is
// returned and stored in the DB row.
// ============================================================================

import { useState } from 'react';
import { Upload as UploadIcon, X, Loader2 } from 'lucide-react';
import { uploadImage } from '../../lib/cms';

interface ImageUploaderProps {
  label?: string;
  value: string | null;
  onChange: (url: string | null) => void;
  folder?: string; // e.g. 'offers', 'services'
}

export default function ImageUploader({
  label = 'Image',
  value,
  onChange,
  folder = 'general',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  async function handleFile(file: File) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Max file size is 5MB');
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>

      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="w-full max-w-xs h-48 object-cover rounded-lg border border-gray-200"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-600 rounded-full p-1.5 shadow"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files?.[0];
            if (file) handleFile(file);
          }}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
            dragOver
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-gray-600">
              <Loader2 className="w-6 h-6 animate-spin" />
              <p className="text-sm">Uploading…</p>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center gap-2">
              <UploadIcon className="w-8 h-8 text-gray-400" />
              <p className="text-sm text-gray-600">
                <span className="text-red-600 font-semibold">Click to upload</span>{' '}
                or drag and drop
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, WebP — max 5MB</p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
            </label>
          )}
        </div>
      )}

      {/* Manual URL input fallback */}
      <div className="mt-2">
        <input
          type="url"
          placeholder="…or paste an image URL"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value || null)}
          className="w-full px-3 py-1.5 border border-gray-200 rounded text-xs text-gray-600 outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
