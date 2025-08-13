import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useLanguage } from '@/contexts/LanguageContext';


export const DocumentUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState('');
  const [docText, setDocText] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const { translateText, currentLanguage } = useLanguage();

  const handleFile = (f: File) => setFile(f);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post('http://localhost:8000/process-doc', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      let translatedSummary = res.data.summary;
      if (currentLanguage.code !== 'en') {
        translatedSummary = await translateText(res.data.summary);
      }

      setSummary(translatedSummary);
      setDocText(res.data.extracted_text);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQnA = async () => {
    if (!question || !docText) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('question', question);
      formData.append('document_text', docText);

      const res = await axios.post('http://localhost:8000/qna', formData);

      let translatedAnswer = res.data.answer;
      if (currentLanguage.code !== 'en') {
        translatedAnswer = await translateText(res.data.answer);
      }

      setAnswer(translatedAnswer);
    } catch (err) {
      console.error('QnA error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Box */}
      <motion.div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
        }}
      >
        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg font-medium mb-2">Upload Legal Documents</p>
        <p className="text-sm text-muted-foreground mb-4">
          Drag & drop files here or click to browse
        </p>
        <div className="flex gap-2 justify-center">
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          />
          <Button size="sm" onClick={() => document.getElementById('fileInput')?.click()}>
            <FileText className="h-4 w-4 mr-2" /> Browse Files
          </Button>
          <Button size="sm" variant="outline" onClick={handleUpload}>
            <Camera className="h-4 w-4 mr-2" /> {loading ? 'Processing...' : 'Scan Document'}
          </Button>
        </div>
      </motion.div>

      {/* Summary + QnA */}
      {summary && (
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="font-semibold">Summary:</h3>
          <p>{summary}</p>

          <div className="mt-4">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about the document"
              className="border p-2 rounded w-full mb-2"
            />
            <Button onClick={handleQnA} disabled={loading}>
              {loading ? 'Loading...' : 'Ask'}
            </Button>
          </div>

          {answer && (
            <div className="mt-4">
              <h4 className="font-semibold">Answer:</h4>
              <p>{answer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
