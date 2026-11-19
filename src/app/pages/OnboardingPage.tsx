import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ProgressBar, Button } from '../../components/ui';
import { StepProfile } from '../../modules/onboarding/components/StepProfile';
import { StepInterests } from '../../modules/onboarding/components/StepInterests';
import { StepGoals } from '../../modules/onboarding/components/StepGoals';
import { StepWorkspaceType } from '../../modules/onboarding/components/StepWorkspaceType';
import { storageService } from '../../services/storage';
import { Profile, WorkspaceType } from '../../types';

export const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState<string[]>(['branding', 'graphic design']);
  const [goals, setGoals] = useState<string[]>(['Launch an independent brand or studio']);
  const [workspaceTypes, setWorkspaceTypes] = useState<WorkspaceType[]>(['independent creator']);
  const navigate = useNavigate();

  const toggle = <T,>(list: T[], item: T): T[] =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  const handleFinish = () => {
    const profile: Profile = {
      id: `usr-${Date.now()}`,
      name: name.trim() || 'Offscript Creator',
      handle: handle.trim() || 'creator',
      bio: bio.trim(),
      interests,
      goals,
      workspaceTypes,
      createdAt: new Date().toISOString(),
      completedOnboarding: true,
    };
    storageService.saveProfile(profile);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] p-4 sm:p-8 flex flex-col justify-center items-center font-sans">
      <div className="w-full max-w-2xl space-y-6 my-auto">
        <div className="flex items-center justify-between border-b-2 border-[var(--line)] pb-4">
          <Link to="/" className="font-display font-extrabold text-2xl tracking-tight text-[var(--ink)]">
            motif.
          </Link>
          <span className="font-mono text-xs text-[var(--ox)] uppercase font-bold tracking-wider">
            Workspace Initialization · Step {step} of 4
          </span>
        </div>

        <ProgressBar value={(step / 4) * 100} variant="oxblood" size="sm" />

        <div className="border-2 border-[var(--line)] bg-[var(--card-bg)] p-6 sm:p-8 shadow-hard space-y-6">
          {step === 1 && (
            <StepProfile
              name={name}
              handle={handle}
              bio={bio}
              onChange={(f, v) => (f === 'name' ? setName(v) : f === 'handle' ? setHandle(v) : setBio(v))}
            />
          )}
          {step === 2 && (
            <StepInterests selectedInterests={interests} onToggleInterest={(i) => setInterests((p) => toggle(p, i))} />
          )}
          {step === 3 && (
            <StepGoals
              selectedGoals={goals}
              onToggleGoal={(g) => setGoals((p) => toggle(p, g))}
              onAddCustomGoal={(g) => setGoals((p) => [...p, g])}
            />
          )}
          {step === 4 && (
            <StepWorkspaceType selectedTypes={workspaceTypes} onToggleType={(t) => setWorkspaceTypes((p) => toggle(p, t))} />
          )}

          <div className="pt-5 border-t-2 border-[var(--line)] flex items-center justify-between gap-4">
            {step > 1 ? (
              <Button variant="ghost" size="md" onClick={() => setStep((s) => s - 1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back</span>
              </Button>
            ) : (
              <Link to="/">
                <Button variant="ghost" size="md">Cancel</Button>
              </Link>
            )}

            <div className="flex items-center gap-3">
              {step === 4 && (
                <Button variant="ghost" size="md" onClick={handleFinish}>
                  Skip
                </Button>
              )}
              {step < 4 ? (
                <Button
                  variant="primary"
                  size="md"
                  disabled={step === 1 && (!name.trim() || !handle.trim())}
                  onClick={() => setStep((s) => s + 1)}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button variant="acid" size="lg" onClick={handleFinish} className="font-extrabold text-[#171717]">
                  <span>Finish &amp; Enter MOTIF</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
