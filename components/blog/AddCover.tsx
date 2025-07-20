'use client';

import { useEdgeStore } from '@/lib/edgestore';
import { useEffect, useRef, useState } from 'react';
import { ImageIcon } from 'lucide-react';

interface AddCoverProps {
  setUploadedCover: (cover: string) => void;
  replaceUrl?: string;
}

const AddCover = ({ setUploadedCover, replaceUrl }: AddCoverProps) => {
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { edgestore } = useEdgeStore();

  const handleButtonClick = () => imgInputRef.current?.click();

  useEffect(() => {
    let isMounted = true;

    const uploadImage = async () => {
      if (!file) return;
      setIsUploading(true);

      try {
        const res = await edgestore.publicFiles.upload({
          file,
          options: replaceUrl ? { replaceTargetUrl: replaceUrl } : undefined,
        });
        if (isMounted && res.url) {
          setUploadedCover(res.url);
        }
      } catch (error) {
        console.error('Upload failed', error);
      } finally {
        if (isMounted) {
          setIsUploading(false);
        }
      }
    };
    uploadImage();

    return () => {
      isMounted = false;
    };
  }, [file, edgestore, replaceUrl, setUploadedCover]);

  return (
    <div className=''>
      <input
        type='file'
        accept='image/*'
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        ref={imgInputRef}
        className='hidden'
      />
      <button
        type='button'
        onClick={handleButtonClick}
        className='flex items-center gap-2'
      >
        <ImageIcon size={20} />
        <span>{!!replaceUrl ? 'Change Cover' : 'Add Cover'}</span>
        Add Cover
      </button>
      {isUploading && <p className='text-green-500'>Uploading...</p>}
    </div>
  );
};

export default AddCover;
