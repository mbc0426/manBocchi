export interface Photo {
  id: string;
  title: string;
  caption: string;
  alt: string;
  src: string;
  thumbnail?: string;
  width: number;
  height: number;
  category: string;
  credit: string;
  source: string;
  demo: boolean;
}

/** Replace these demo photos with your own photos and captions. */
export const photos: Photo[] = [
  {
    id: 'quiet-lake', title: '山间来信', caption: '水面静下来，远山就有了另一种形状。',
    alt: '群山与树木倒映在宁静的湖面上', src: '/images/quiet-lake.webp', thumbnail: '/images/quiet-lake-800.webp',
    width: 1600, height: 1067, category: '山野', credit: 'Unsplash',
    source: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e', demo: true,
  },
  {
    id: 'forest-light', title: '林间的光', caption: '沿着光的方向，慢慢走一段。',
    alt: '阳光穿过茂密森林中的高大树木', src: '/images/forest-light.webp', thumbnail: '/images/forest-light-800.webp',
    width: 1600, height: 1066, category: '光影', credit: 'Unsplash',
    source: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', demo: true,
  },
  {
    id: 'open-mountains', title: '向远处看', caption: '把视线交给山，把时间留给自己。',
    alt: '阳光下连绵起伏的山脉与远方的天空', src: '/images/open-mountains.webp', thumbnail: '/images/open-mountains-800.webp',
    width: 1600, height: 1063, category: '山野', credit: 'Unsplash',
    source: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', demo: true,
  },
  {
    id: 'morning-mist', title: '清晨未散', caption: '雾还没散的时候，世界很轻。',
    alt: '晨雾笼罩着起伏的田野与树林', src: '/images/morning-mist.webp', thumbnail: '/images/morning-mist-800.webp',
    width: 1600, height: 1067, category: '日常', credit: 'Unsplash',
    source: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8', demo: true,
  },
  {
    id: 'blue-distance', title: '湖边停靠', caption: '有些风景，适合安静地看。',
    alt: '蓝色湖水与远处群山构成的宁静风景', src: '/images/blue-distance.webp', thumbnail: '/images/blue-distance-800.webp',
    width: 1600, height: 1067, category: '山野', credit: 'Unsplash',
    source: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e', demo: true,
  },
  {
    id: 'green-hills', title: '风经过的地方', caption: '在一片绿色里，找回缓慢的节奏。',
    alt: '从高处俯瞰绿色山谷和蜿蜒的自然地形', src: '/images/green-hills.webp', thumbnail: '/images/green-hills-800.webp',
    width: 1600, height: 953, category: '日常', credit: 'Unsplash',
    source: 'https://images.unsplash.com/photo-1501854140801-50d01698950b', demo: true,
  },
];
