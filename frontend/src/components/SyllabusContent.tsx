import React from "react";
import { BookOpen, Download, Link, FileText, FileCheck, Bookmark } from "lucide-react";

export interface Topic {
  id: string;
  name: string;
  description: string;
  subtopics?: string[];
  resources?: Resource[];
}

export interface Resource {
  type: "pdf" | "link" | "notes" | "worksheet";
  title: string;
  url?: string;
}

export interface SyllabusContentProps {
  subject: string;
  topic: Topic;
  colorVar: string;
}

export function SyllabusContent({ subject, topic, colorVar }: SyllabusContentProps) {
  const renderResourceIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4" />;
      case "link":
        return <Link className="h-4 w-4" />;
      case "notes":
        return <Bookmark className="h-4 w-4" />;
      case "worksheet":
        return <FileCheck className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-neo-flat p-6 mb-6">
      <div className="mb-6">
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium bg-[hsl(var(${colorVar}))/20] text-[hsl(var(${colorVar}))] mb-2`}>
          {subject}
        </span>
        <h2 className="text-xl font-bold mb-2">{topic.name}</h2>
        <p className="text-muted-foreground">{topic.description}</p>
      </div>

      {/* Subtopics */}
      {topic.subtopics && topic.subtopics.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Key Concepts</h3>
          <ul className="space-y-2">
            {topic.subtopics.map((subtopic, index) => (
              <li key={index} className="flex items-start">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center bg-[hsl(var(${colorVar}))/20] text-[hsl(var(${colorVar}))] mr-3 shadow-neo-inner text-xs`}>
                  {index + 1}
                </div>
                <span>{subtopic}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Resources */}
      {topic.resources && topic.resources.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3">Learning Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topic.resources.map((resource, index) => (
              <a 
                key={index}
                href={resource.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors shadow-neo-flat hover:shadow-neo-float group"
              >
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center bg-[hsl(var(${colorVar}))/20] text-[hsl(var(${colorVar}))] mr-3 shadow-neo-inner`}>
                  {renderResourceIcon(resource.type)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{resource.title}</p>
                  <p className="text-xs text-muted-foreground capitalize">{resource.type}</p>
                </div>
                <Download className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}