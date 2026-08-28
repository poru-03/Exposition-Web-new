import { useEffect, useState } from 'react';
import { MagazineViewer } from '../components/ui/magazine-viewer';

const MAGAZINE_DATA: Record<string, { issueLabel: string; year: string; title: string; pdfUrl: string; coverImg: string }> = {
  '18': {
    issueLabel: 'ISSUE 18',
    year: '2021',
    title: 'EXPOSITION ISSUE 18 — 2021 EDITION',
    pdfUrl: '/resources/Exposition past magazines/Exposition Issue 18.pdf',
    coverImg: '/magazines/issue-18-cover.jpg',
  },
  '19': {
    issueLabel: 'ISSUE 19',
    year: '2023',
    title: 'EXPOSITION ISSUE 19 — 2023 EDITION',
    pdfUrl: '/resources/Exposition past magazines/Exposition Issue 19.pdf',
    coverImg: '/magazines/issue-19-cover.jpg',
  },
  '20': {
    issueLabel: 'ISSUE 20',
    year: '2024',
    title: 'EXPOSITION ISSUE 20 — 2024 EDITION',
    pdfUrl: '/magazines/Exposition-Issue-20.pdf',
    coverImg: '/magazines/issue-20-cover.jpg',
  },
  '21': {
    issueLabel: 'ISSUE 21',
    year: '2025',
    title: 'EXPOSITION ISSUE 21 — 2025 EDITION',
    pdfUrl: '/resources/Exposition past magazines/Exposition Issue 21.pdf',
    coverImg: '/magazines/issue-21-cover.jpg',
  },
};

export default function MagazineReaderPage() {
  const [magKey, setMagKey] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const issueParam = params.get('issue');
      if (issueParam && MAGAZINE_DATA[issueParam]) {
        return issueParam;
      }
    }
    return '21';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      const params = new URLSearchParams(window.location.search);
      const issueParam = params.get('issue');
      if (issueParam && MAGAZINE_DATA[issueParam]) {
        setMagKey(issueParam);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const selectedMag = MAGAZINE_DATA[magKey] || MAGAZINE_DATA['21'];

  return (
    <MagazineViewer
      key={magKey}
      pdfUrl={selectedMag.pdfUrl}
      issueLabel={selectedMag.issueLabel}
      title={selectedMag.title}
      onClose={() => {
        if (window.history.length > 1) {
          window.close();
        } else {
          window.location.href = '/';
        }
      }}
    />
  );
}
