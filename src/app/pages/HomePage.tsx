import React, { useState, useEffect } from 'react';
import { HomeGreeting } from '../../modules/home/components/HomeGreeting';
import { HomeDepartmentsStrip } from '../../modules/home/components/HomeDepartmentsStrip';
import { ContinueLearningTile } from '../../modules/home/components/ContinueLearningTile';
import { RecentProjectsTile } from '../../modules/home/components/RecentProjectsTile';
import { UpcomingTasksTile } from '../../modules/home/components/UpcomingTasksTile';
import { SkillMapTile } from '../../modules/home/components/SkillMapTile';
import { CustomiseTilesModal } from '../../modules/home/components/CustomiseTilesModal';
import { storageService, DEFAULT_DASHBOARD_CONFIG } from '../../services/storage';
import { Profile, DashboardTilesConfig } from '../../types';

export const HomePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isCustomiseOpen, setIsCustomiseOpen] = useState(false);
  const [tileConfig, setTileConfig] = useState<DashboardTilesConfig>(() =>
    storageService.getDashboardConfig()
  );

  useEffect(() => {
    setProfile(storageService.getProfile());
  }, []);

  const handleToggleTile = (key: keyof DashboardTilesConfig) => {
    const updated = { ...tileConfig, [key]: !tileConfig[key] };
    setTileConfig(updated);
    storageService.saveDashboardConfig(updated);
  };

  const handleResetTiles = () => {
    setTileConfig(DEFAULT_DASHBOARD_CONFIG);
    storageService.saveDashboardConfig(DEFAULT_DASHBOARD_CONFIG);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 01. Greeting with Profile Name */}
      <HomeGreeting
        profile={profile}
        onOpenCustomise={() => setIsCustomiseOpen(true)}
      />

      {/* 02. Five Departments Strip */}
      {tileConfig.departmentsStrip && <HomeDepartmentsStrip />}

      {/* 03. Asymmetrical Editorial Tile Grid (Deliberately Different Sizes) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Continue Learning: Large 8-col tile */}
        {tileConfig.continueLearning && (
          <div className={`${tileConfig.upcomingTasks ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
            <ContinueLearningTile />
          </div>
        )}

        {/* Upcoming Tasks: 4-col vertical checklist tile */}
        {tileConfig.upcomingTasks && (
          <div className={`${tileConfig.continueLearning ? 'lg:col-span-4' : 'lg:col-span-12'}`}>
            <UpcomingTasksTile />
          </div>
        )}

        {/* Recent Projects: 7-col studio ledger tile */}
        {tileConfig.recentProjects && (
          <div className={`${tileConfig.skillMap ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            <RecentProjectsTile />
          </div>
        )}

        {/* Skill Map Preview: 5-col electric tile */}
        {tileConfig.skillMap && (
          <div className={`${tileConfig.recentProjects ? 'lg:col-span-5' : 'lg:col-span-12'}`}>
            <SkillMapTile />
          </div>
        )}
      </div>

      {/* Customise Tiles Modal */}
      <CustomiseTilesModal
        isOpen={isCustomiseOpen}
        onClose={() => setIsCustomiseOpen(false)}
        config={tileConfig}
        onToggleTile={handleToggleTile}
        onReset={handleResetTiles}
      />
    </div>
  );
};

export default HomePage;
