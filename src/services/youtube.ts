export type YouTubeVideo = {
  id: string;
  title: string;
  views: string;
  rawViews?: number;
  uploadedAgo: string;
  publishedAt?: string;
  duration: string;
  description?: string;
  thumbnailUrl?: string;
};

// Static curated fallback videos in case of offline/network failure
export const STATIC_YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    id: 'rQw_91DxB3U',
    title: 'Voices of Vision Podcast Series Ep.3 | Action Over Perfection: Malinda Alahakoon',
    views: '17.8K views',
    uploadedAgo: '1 week ago',
    duration: '30:14',
    description:
      'Tech entrepreneur and innovator Malinda Alahakoon shares hard-won insights on execution over perfection, startup perseverance, and personal branding.',
  },
  {
    id: 'Iueo728JKPE',
    title: 'Voices of Vision Podcast Series Ep.2 | The Future is Built: The Nikin Matharaarachchi',
    views: '626 views',
    uploadedAgo: '1 month ago',
    duration: '36:27',
    description:
      'Forbes 30 Under 30 Asia honoree & Synapse AI Labs Founder Nikin Matharaarachchi explores AI innovation, startup ecosystems, and tech accessibility.',
  },
  {
    id: '1TR9K3amna8',
    title: 'Voices of Vision Podcast Series Ep.1 | Adapt or Fail: The Yevan David Story',
    views: '812 views',
    uploadedAgo: '1 month ago',
    duration: '23:33',
    description:
      'Formula 3 driver Yevan David, the first and only Sri Lankan in the official FIA Formula 3 Championship, discusses motorsport discipline and racing strategy.',
  },
  {
    id: 'i8Z2dicQzpU',
    title: 'Exposition Issue 21 | Official Live Stream',
    views: '140 views',
    uploadedAgo: '7 months ago',
    duration: '3:29:07',
    description: 'Official live coverage and keynote addresses from the grand launch of Exposition Issue 21.',
  },
  {
    id: 'gD9rdK6cfiw',
    title: 'EXPOSITION Magazine Interview with Mr.Manoda Gamage',
    views: '191 views',
    uploadedAgo: '12 years ago',
    duration: '56:57',
    description:
      'Exclusive in-depth interview with Mr. Manoda Gamage discussing corporate leadership and strategic growth.',
  },
  {
    id: 'yujsTy-iZ_s',
    title: 'MIT Documentary',
    views: '471 views',
    uploadedAgo: '12 years ago',
    duration: '12:48',
    description:
      'Official documentary on the BSc. (Hons.) in Management and Information Technology degree program at University of Kelaniya.',
  },
  {
    id: 'sP9A0o7FfPI',
    title: 'Exposition Magazine Interview with Mr.Lalith Weerathunga',
    views: '115 views',
    uploadedAgo: '12 years ago',
    duration: '1:05:18',
    description:
      'Executive dialogue with Mr. Lalith Weerathunga exploring public administration, governance, and leadership.',
  },
  {
    id: 'wA03XxLvnBQ',
    title: 'EXPOSITION Magazine Interview with Mr. Bradlet Emerson',
    views: '34 views',
    uploadedAgo: '12 years ago',
    duration: '48:29',
    description:
      'Corporate strategist Mr. Bradlet Emerson on organizational leadership and financial management.',
  },
];

const CACHE_KEY = 'exposition_youtube_videos_cache_v2';
const CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

export function parseDuration(iso: string): { formatted: string; totalSeconds: number } {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return { formatted: '0:00', totalSeconds: 0 };
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (hours > 0) {
    return {
      formatted: `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
      totalSeconds,
    };
  }
  return {
    formatted: `${minutes}:${String(seconds).padStart(2, '0')}`,
    totalSeconds,
  };
}

export function formatViews(views: string | number): string {
  const n = typeof views === 'number' ? views : parseInt(views || '0', 10);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K views`;
  return `${n} views`;
}

export function formatTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSec < 60) return 'just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) return `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
}

export async function fetchLatestYouTubeVideos(): Promise<YouTubeVideo[]> {
  // 1. Check localStorage cache
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.timestamp && Date.now() - parsed.timestamp < CACHE_TTL_MS && Array.isArray(parsed.videos)) {
        return parsed.videos;
      }
    }
  } catch (e) {
    // ignore cache read errors
  }

  const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};
  const apiKey = env.VITE_YOUTUBE_API_KEY;
  const channelId = env.VITE_YOUTUBE_CHANNEL_ID || 'UCP6N5Df33uiRyps30eLVZ5Q';

  if (!apiKey) {
    return STATIC_YOUTUBE_VIDEOS;
  }

  try {
    // The uploads playlist ID is the channel ID with 'UU' instead of 'UC'
    const uploadsPlaylistId = channelId.startsWith('UC')
      ? 'UU' + channelId.slice(2)
      : channelId;

    // Step 1: Get playlist items (up to 15 items to have plenty after filtering shorts)
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=15&key=${apiKey}`;
    const plRes = await fetch(playlistUrl);
    if (!plRes.ok) throw new Error(`Playlist fetch failed: ${plRes.statusText}`);
    const plData = await plRes.json();

    if (!plData.items || plData.items.length === 0) {
      return STATIC_YOUTUBE_VIDEOS;
    }

    const videoIds = plData.items
      .map((item: any) => item.snippet?.resourceId?.videoId)
      .filter(Boolean)
      .join(',');

    // Step 2: Get video statistics and content details for real views & duration
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${apiKey}`;
    const vRes = await fetch(videosUrl);
    if (!vRes.ok) throw new Error(`Videos fetch failed: ${vRes.statusText}`);
    const vData = await vRes.json();

    const fetchedVideos: YouTubeVideo[] = (vData.items || [])
      .map((item: any) => {
        const durationInfo = parseDuration(item.contentDetails?.duration || '');
        const rawViews = parseInt(item.statistics?.viewCount || '0', 10);
        return {
          id: item.id,
          title: item.snippet?.title || '',
          views: formatViews(rawViews),
          rawViews,
          uploadedAgo: formatTimeAgo(item.snippet?.publishedAt || ''),
          publishedAt: item.snippet?.publishedAt,
          duration: durationInfo.formatted,
          durationSeconds: durationInfo.totalSeconds,
          description: item.snippet?.description || '',
          thumbnailUrl:
            item.snippet?.thumbnails?.maxres?.url ||
            item.snippet?.thumbnails?.high?.url ||
            item.snippet?.thumbnails?.medium?.url ||
            `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`,
        };
      })
      // Filter out shorts (< 60s) so only full episodes and interviews are displayed in 16:9 player
      .filter((v: any) => v.durationSeconds > 60);

    // Merge with any classic historical videos from STATIC_YOUTUBE_VIDEOS that aren't in the recent uploads
    const existingIds = new Set(fetchedVideos.map((v) => v.id));
    const mergedVideos = [
      ...fetchedVideos,
      ...STATIC_YOUTUBE_VIDEOS.filter((v) => !existingIds.has(v.id)),
    ];

    // Cache to localStorage
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          videos: mergedVideos,
        })
      );
    } catch (e) {
      // ignore cache write error
    }

    return mergedVideos.length > 0 ? mergedVideos : STATIC_YOUTUBE_VIDEOS;
  } catch (error) {
    console.warn('Failed to fetch dynamic YouTube videos, falling back to static:', error);
    return STATIC_YOUTUBE_VIDEOS;
  }
}
