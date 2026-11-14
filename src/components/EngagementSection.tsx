import React from 'react';
import { WeddingData } from '../data/weddingData';
import { useIsDesktop } from '../hooks/useIsDesktop';
import { EngagementDesktop } from './engagement/EngagementDesktop';
import { EngagementMobile } from './engagement/EngagementMobile';

interface EngagementSectionProps {
  data: WeddingData;
  onExploreNext?: () => void;
}

export const EngagementSection: React.FC<EngagementSectionProps> = ({
  onExploreNext,
}) => {
  const isDesktop = useIsDesktop();

  return isDesktop ? (
    <EngagementDesktop key="desktop" onExploreNext={onExploreNext} />
  ) : (
    <EngagementMobile key="mobile" onExploreNext={onExploreNext} />
  );
};
