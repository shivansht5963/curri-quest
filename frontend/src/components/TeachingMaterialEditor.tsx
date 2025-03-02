import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Upload, File, FileText, Paperclip, BookOpen, Check, Loader2 } from 'lucide-react';
import { TeachingMaterial } from '../utils/store';

export interface Props {
  material?: Partial<TeachingMaterial>;
  onSave: (material: Partial<TeachingMaterial>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function TeachingMaterialEditor({ material, onSave, onCancel, isEditing = false }: Props) {
  const [formData, setFormData] = useState<Partial<TeachingMaterial>>({
    id: material?.id || '',
    title: material?.title || '',
    subject: material?.subject || 'Mathematics',
    topic: material?.topic || '',
    type: material?.type || 'notes',
    content: material?.content || '',
    tags: material?.tags || [],
    status: material?.status || 'draft',
    description: material?.description || ''
  });
  
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate file upload
    if (files.length > 0) {
      setIsUploading(true);
      // In a real implementation, you would upload the files to storage here
      setTimeout(() => {
        setIsUploading(false);
        // For demo purposes, we'll just set a dummy URL
        const fileUrl = `/assets/uploads/${files[0].name}`;
        onSave({
          ...formData,
          fileUrl,
        });
      }, 1500);
    } else {
      onSave(formData);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl bg-card p-6 shadow-neo-flat max-w-3xl mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{isEditing ? 'Edit Teaching Material' : 'Add New Teaching Material'}</h2>
        <button 
          type="button" 
          onClick={onCancel}
          className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange}
              placeholder="Enter material title"
              className="h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <select 
              name="subject" 
              value={formData.subject} 
              onChange={handleChange}
              className="h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
              <option value="Social Studies">Social Studies</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Topic</label>
            <input 
              type="text" 
              name="topic" 
              value={formData.topic} 
              onChange={handleChange}
              placeholder="E.g., Algebra, Chemistry, etc."
              className="h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Material Type</label>
            <select 
              name="type" 
              value={formData.type} 
              onChange={handleChange}
              className="h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="notes">Notes</option>
              <option value="presentation">Presentation</option>
              <option value="worksheet">Worksheet</option>
              <option value="video">Video</option>
              <option value="interactive">Interactive</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange}
            placeholder="Provide a brief description of this material"
            className="h-20 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Content</label>
          <textarea 
            name="content" 
            value={formData.content} 
            onChange={handleChange}
            placeholder="Enter the content or notes here"
            className="h-40 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent font-mono"
          />
          <p className="text-xs text-muted-foreground">You can also upload files below if needed.</p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Attach Files</label>
          <div className="border border-dashed border-input rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={triggerFileInput}>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange} 
              className="hidden" 
            />
            <Upload className="h-8 w-8 mb-2 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Click to upload or drag files here</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, PPTX, MP4, ZIP files supported</p>
          </div>
          
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center bg-muted/50 p-2 rounded-lg">
                  <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div className="flex-1 truncate">
                    <p className="text-sm truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFiles(files.filter((_, i) => i !== index));
                    }}
                    className="h-6 w-6 rounded-full hover:bg-muted flex items-center justify-center"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Tags</label>
          <div className="flex items-center">
            <input 
              type="text" 
              value={tagInput} 
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              placeholder="Add tags (e.g., algebra, class10)"
              className="h-10 flex-1 rounded-l-lg border border-input bg-card px-3 py-2 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button 
              type="button"
              onClick={handleAddTag}
              className="h-10 rounded-r-lg bg-accent/80 hover:bg-accent text-white px-3 transition-colors"
            >
              Add
            </button>
          </div>
          
          {formData.tags && formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map(tag => (
                <div key={tag} className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs">
                  <span className="mr-1">{tag}</span>
                  <button 
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="h-3.5 w-3.5 rounded-full hover:bg-muted-foreground/20 flex items-center justify-center"
                  >
                    <X className="h-2 w-2" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input 
                type="radio" 
                name="status" 
                value="draft" 
                checked={formData.status === 'draft'}
                onChange={handleChange}
                className="h-4 w-4 accent-accent"
              />
              <span>Draft</span>
            </label>
            <label className="flex items-center space-x-2">
              <input 
                type="radio" 
                name="status" 
                value="published" 
                checked={formData.status === 'published'}
                onChange={handleChange}
                className="h-4 w-4 accent-accent"
              />
              <span>Published</span>
            </label>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-2">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={isUploading}
            className="px-4 py-2 rounded-lg bg-accent/80 hover:bg-accent text-white font-medium shadow-neo-flat hover:shadow-neo-float transition-all flex items-center"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Update Material
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Save Material
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
