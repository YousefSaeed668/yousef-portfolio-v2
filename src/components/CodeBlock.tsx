import { use } from 'react'
import { codeToHtml } from 'shiki'

interface CodeBlockProps {
  code?: string
  language?: string
  filename?: string
}


const LANGUAGE_MAP: Record<string, string> = {
  js: 'javascript',
  javascript: 'javascript',
  ts: 'typescript',
  typescript: 'typescript',
  jsx: 'jsx',
  tsx: 'tsx',
  css: 'css',
  html: 'html',
  json: 'json',
  bash: 'bash',
  sh: 'bash',
  shell: 'bash',
  python: 'python',
  py: 'python',
  rust: 'rust',
  go: 'go',
  java: 'java',
  c: 'c',
  cpp: 'cpp',
  csharp: 'csharp',
  php: 'php',
  ruby: 'ruby',
  swift: 'swift',
  kotlin: 'kotlin',
  sql: 'sql',
  yaml: 'yaml',
  yml: 'yaml',
  toml: 'toml',
  markdown: 'markdown',
  md: 'markdown',
  graphql: 'graphql',
  dockerfile: 'dockerfile',
}

function HighlightedCode({ htmlPromise }: { htmlPromise: Promise<string> }) {
  const html = use(htmlPromise)
  return (
    <div
      className="shiki-wrapper overflow-x-auto text-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const lang = LANGUAGE_MAP[language?.toLowerCase() ?? ''] ?? 'text'
  const safeCode = code ?? ''

  const htmlPromise = codeToHtml(safeCode, {
    lang,
    theme: 'one-dark-pro',
  })

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#21252b] border-b border-white/10">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
          {filename || language || 'code'}
        </span>
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
      </div>

      <HighlightedCode htmlPromise={htmlPromise} />
    </div>
  )
}
