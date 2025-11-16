'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Lightbulb, Target, Sparkles } from 'lucide-react';

interface UserProfile {
  displayName: string;
  bio: string;
  interests: string[];
  personality: string[];
  goals: string[];
  values: string[];
  relationshipStatus: string;
  occupation: string;
  location: string;
  favoriteQuote: string;
  hobbies: string[];
}

interface ProfilerProps {
  onProfileComplete: (profile: UserProfile) => void;
}

const interestOptions = [
  'Meditation', 'Yoga', 'Nature', 'Music', 'Art', 'Cooking', 'Sports',
  'Reading', 'Writing', 'Photography', 'Travel', 'Volunteering', 'Gardening',
  'Dancing', 'Singing', 'Technology', 'Science', 'History', 'Philosophy'
];

const personalityOptions = [
  'Creative', 'Analytical', 'Empathetic', 'Adventurous', 'Calm', 'Energetic',
  'Introverted', 'Extroverted', 'Optimistic', 'Thoughtful', 'Spontaneous', 'Organized'
];

const valueOptions = [
  'Peace', 'Love', 'Harmony', 'Compassion', 'Honesty', 'Kindness', 'Respect',
  'Unity', 'Growth', 'Wisdom', 'Freedom', 'Justice', 'Equality', 'Sustainability'
];

const goalOptions = [
  'Personal Growth', 'Help Others', 'Build Community', 'Learn New Skills',
  'Travel the World', 'Create Art', 'Start a Business', 'Volunteer Regularly',
  'Achieve Inner Peace', 'Build Meaningful Relationships', 'Live Sustainably'
];

const Profiler: React.FC<ProfilerProps> = ({ onProfileComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    displayName: '',
    bio: '',
    interests: [],
    personality: [],
    goals: [],
    values: [],
    relationshipStatus: '',
    occupation: '',
    location: '',
    favoriteQuote: '',
    hobbies: []
  });

  const steps = [
    { title: 'Basic Info', icon: Users },
    { title: 'Personality', icon: Heart },
    { title: 'Interests & Values', icon: Lightbulb },
    { title: 'Goals & Dreams', icon: Target },
    { title: 'Complete Profile', icon: Sparkles }
  ];

  const updateProfile = (field: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof UserProfile, item: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(item)
        ? (prev[field] as string[]).filter(i => i !== item)
        : [...(prev[field] as string[]), item]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeProfile = () => {
    onProfileComplete(profile);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Basic Info
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="displayName" className="text-lg font-medium">
                What's your display name? *
              </Label>
              <Input
                id="displayName"
                value={profile.displayName}
                onChange={(e) => updateProfile('displayName', e.target.value)}
                placeholder="e.g., HarmonySeeker42"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="bio" className="text-lg font-medium">
                Tell us about yourself
              </Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => updateProfile('bio', e.target.value)}
                placeholder="Share your journey, passions, or what brings you to Oneness Kingdom..."
                className="mt-2 min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="occupation" className="text-lg font-medium">
                What do you do?
              </Label>
              <Input
                id="occupation"
                value={profile.occupation}
                onChange={(e) => updateProfile('occupation', e.target.value)}
                placeholder="e.g., Student, Artist, Teacher, Entrepreneur..."
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-lg font-medium">
                Where are you from?
              </Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => updateProfile('location', e.target.value)}
                placeholder="e.g., Tokyo, Japan or Global Citizen"
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-lg font-medium">Relationship Status</Label>
              <RadioGroup
                value={profile.relationshipStatus}
                onValueChange={(value) => updateProfile('relationshipStatus', value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="single" id="single" />
                  <Label htmlFor="single">Single</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in_relationship" id="in_relationship" />
                  <Label htmlFor="in_relationship">In a Relationship</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="married" id="married" />
                  <Label htmlFor="married">Married</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prefer_not_say" id="prefer_not_say" />
                  <Label htmlFor="prefer_not_say">Prefer not to say</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 1: // Personality
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Which words describe your personality?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select 3-5 traits that resonate with you
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {personalityOptions.map((trait) => (
                  <div key={trait} className="flex items-center space-x-2">
                    <Checkbox
                      id={trait}
                      checked={profile.personality.includes(trait)}
                      onCheckedChange={() => toggleArrayItem('personality', trait)}
                    />
                    <Label htmlFor={trait} className="text-sm cursor-pointer">
                      {trait}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
              <h4 className="font-medium text-pink-800 mb-2">Selected Traits:</h4>
              <div className="flex flex-wrap gap-2">
                {profile.personality.map((trait) => (
                  <Badge key={trait} variant="secondary" className="bg-pink-100 text-pink-800">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 2: // Interests & Values
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">What are your interests?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Choose activities and hobbies that bring you joy
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {interestOptions.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest}
                      checked={profile.interests.includes(interest)}
                      onCheckedChange={() => toggleArrayItem('interests', interest)}
                    />
                    <Label htmlFor={interest} className="text-sm cursor-pointer">
                      {interest}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">What values are important to you?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select the principles that guide your life
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {valueOptions.map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={value}
                      checked={profile.values.includes(value)}
                      onCheckedChange={() => toggleArrayItem('values', value)}
                    />
                    <Label htmlFor={value} className="text-sm cursor-pointer">
                      {value}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Your Interests:</h4>
                <div className="flex flex-wrap gap-1">
                  {profile.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Your Values:</h4>
                <div className="flex flex-wrap gap-1">
                  {profile.values.map((value) => (
                    <Badge key={value} variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      {value}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // Goals & Dreams
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">What are your goals and dreams?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Share what you hope to achieve or experience
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {goalOptions.map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal}
                      checked={profile.goals.includes(goal)}
                      onCheckedChange={() => toggleArrayItem('goals', goal)}
                    />
                    <Label htmlFor={goal} className="text-sm cursor-pointer">
                      {goal}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="favoriteQuote" className="text-lg font-medium">
                What's your favorite quote or mantra?
              </Label>
              <Textarea
                id="favoriteQuote"
                value={profile.favoriteQuote}
                onChange={(e) => updateProfile('favoriteQuote', e.target.value)}
                placeholder="A quote that inspires you..."
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="hobbies" className="text-lg font-medium">
                Any other hobbies or activities? (comma-separated)
              </Label>
              <Input
                id="hobbies"
                value={profile.hobbies.join(', ')}
                onChange={(e) => updateProfile('hobbies', e.target.value.split(',').map(h => h.trim()).filter(h => h))}
                placeholder="e.g., painting, hiking, meditation, cooking"
                className="mt-2"
              />
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">Your Goals:</h4>
              <div className="flex flex-wrap gap-2">
                {profile.goals.map((goal) => (
                  <Badge key={goal} variant="secondary" className="bg-purple-100 text-purple-800">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 4: // Complete Profile
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-green-600 mb-4">🎉 Your Profile is Complete!</h3>
              <p className="text-muted-foreground">
                Review your information below and click "Complete Setup" to join Oneness Kingdom.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Name:</strong> {profile.displayName}</p>
                  <p><strong>Occupation:</strong> {profile.occupation}</p>
                  <p><strong>Location:</strong> {profile.location}</p>
                  <p><strong>Status:</strong> {profile.relationshipStatus}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personality & Interests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <strong>Personality:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.personality.map((trait) => (
                        <Badge key={trait} variant="outline" className="text-xs">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>Interests:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.interests.slice(0, 3).map((interest) => (
                        <Badge key={interest} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                      {profile.interests.length > 3 && <span className="text-xs text-muted-foreground">+{profile.interests.length - 3} more</span>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {profile.bio && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About You</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{profile.bio}</p>
                </CardContent>
              </Card>
            )}

            {profile.favoriteQuote && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Favorite Quote</CardTitle>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-sm italic text-center">
                    "{profile.favoriteQuote}"
                  </blockquote>
                </CardContent>
              </Card>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-kawaii">
            🌟 Create Your Profile 🌟
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className={`flex flex-col items-center ${
                  index <= currentStep ? 'text-pink-600' : 'text-gray-400'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  index <= currentStep ? 'bg-pink-100' : 'bg-gray-100'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs mt-1 text-center">{step.title}</span>
              </div>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="min-h-[400px]">
        {renderStepContent()}

        <div className="flex justify-between mt-8">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
          >
            Previous
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={completeProfile}
              disabled={!profile.displayName.trim()}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              Complete Setup ✨
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={currentStep === 0 && !profile.displayName.trim()}
            >
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Profiler;
