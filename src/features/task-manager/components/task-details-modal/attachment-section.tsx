'use client';

import { useState } from 'react';
import { Button } from 'components/ui/button';
import { Plus, Download, Trash2, File, ImageIcon } from 'lucide-react';

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'other';
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

  // Create pairs of attachments for the 2-column layout
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
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-sm flex items-center gap-1 text-green-600"
        >
          <Plus className="h-4 w-4" />
          Add
        </Button>
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
