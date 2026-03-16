import React, { useState, useEffect, useRef, useCallback } from 'react';
import ActivityCard from './ActivityCard';
import type { Activity } from '@/presentation/mocks/recentActivities';

const BATCH_SIZE = 5;
const STAGGER_DELAY = 75;

interface ActivityListProps {
  activities: Activity[];
}

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [animatedIndexes, setAnimatedIndexes] = useState<Set<number>>(new Set());
  const sentinelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate initial batch
  useEffect(() => {
    for (let i = 0; i < Math.min(BATCH_SIZE, activities.length); i++) {
      setTimeout(() => {
        setAnimatedIndexes((prev) => new Set(prev).add(i));
      }, i * STAGGER_DELAY);
    }
  }, [activities.length]);

  // Load more when sentinel is visible
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => {
      const next = Math.min(prev + BATCH_SIZE, activities.length);
      // Animate new batch
      for (let i = prev; i < next; i++) {
        setTimeout(() => {
          setAnimatedIndexes((p) => new Set(p).add(i));
        }, (i - prev) * STAGGER_DELAY);
      }
      return next;
    });
  }, [activities.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const container = containerRef.current;
    if (!sentinel || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleCount < activities.length) {
          loadMore();
        }
      },
      { root: container, threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleCount, activities.length, loadMore]);

  const visibleActivities = activities.slice(0, visibleCount);

  return (
    <div
      ref={containerRef}
      className='flex-1 overflow-y-auto scrollbar-hide'
    >
      <div className='space-y-2'>
        {visibleActivities.map((activity, index) => (
          <div
            key={activity.id}
            className='transition-all duration-500 ease-out'
            style={{
              opacity: animatedIndexes.has(index) ? 1 : 0,
              transform: animatedIndexes.has(index)
                ? 'translateY(0)'
                : 'translateY(16px)',
            }}
          >
            <ActivityCard activity={activity} />
          </div>
        ))}
      </div>

      {/* Sentinel for infinite scroll */}
      {visibleCount < activities.length && (
        <div ref={sentinelRef} className='h-4' />
      )}
    </div>
  );
};

export default ActivityList;
