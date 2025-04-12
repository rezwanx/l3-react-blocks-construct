import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from 'components/ui/button';
import { Plus, Download, Trash2, File, ImageIcon, Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'other';
  file?: File;
}

export function AttachmentsSection() {
  const [attachments, setAttachments] = useState<Attachment[]>([
    {
      id: '1',
      name: 'acceptance criteria.pdf',
      size: '600.00 KB',
      type: 'pdf',
    },
    {
      id: '2',
      name: 'reference-calendar.png',
      size: '58.00 KB',
      type: 'image',
    },
    {
      id: '3',
      name: 'acceptance criteria.pdf',
      size: '600.00 KB',
      type: 'pdf',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteAttachment = (id: string) => {
    setAttachments(attachments.filter((attachment) => attachment.id !== id));
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <File className="h-5 w-5 text-blue-500" />;
      case 'image':
        return <ImageIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <File className="h-5 w-5 text-blue-500" />;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileType = (file: File): 'pdf' | 'image' | 'other' => {
    if (file.type.includes('pdf')) return 'pdf';
    if (file.type.includes('image')) return 'image';
    return 'other';
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newAttachments = acceptedFiles.map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: formatFileSize(file.size),
      type: getFileType(file),
      file: file,
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);
    setIsDialogOpen(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
      'application/pdf': [],
    },
  });

  const createAttachmentRows = () => {
    const rows = [];
    for (let i = 0; i < attachments.length; i += 2) {
      rows.push(attachments.slice(i, i + 2));
    }
    return rows;
  };

  const attachmentRows = createAttachmentRows();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-medium">Attachments</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-sm flex items-center gap-1 text-green-600"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Attachments</DialogTitle>
            </DialogHeader>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-300 hover:border-primary/50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-10 w-10 text-gray-400" />
                {isDragActive ? (
                  <p>Drop the files here...</p>
                ) : (
                  <>
                    <p className="text-sm font-medium">
                      Drag & drop files here, or click to select files
                    </p>
                    <p className="text-xs text-gray-500">
                      Upload any file type. Max file size: 10MB.
                    </p>
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {attachmentRows.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          {row.map((attachment) => (
            <div key={attachment.id} className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                {getFileIcon(attachment.type)}
                <div>
                  <p className="text-sm font-medium">{attachment.name}</p>
                  <p className="text-xs text-gray-500">{attachment.size}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500"
                  onClick={() => handleDeleteAttachment(attachment.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ))}

      {attachments.length === 0 && (
        <div className="text-center py-6 text-gray-500">No attachments yet</div>
      )}
    </div>
  );
}
