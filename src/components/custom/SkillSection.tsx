/** @format */

import React from 'react';
import BlurFadeText from '@/components/magicui/blur-fade-text';
import BlurFade from '@/components/magicui/blur-fade';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Markdown from 'react-markdown';
import { Badge } from '@/components/ui/badge';

const SkillSections = async () => {
  const response = await fetch('http://localhost:3000/api/skill', {
    cache: 'default',
  });
  const data = await response.json();
  const BLUR_FADE_DELAY = 0.04;

  return (
    <div>
      <div className='flex min-h-0 flex-col gap-y-3'>
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <h2 className='text-xl font-bold'>Skills</h2>
        </BlurFade>
        <div className='flex flex-wrap gap-1'>
          {data.skill?.map((skill: any, id: any) => (
            <BlurFade
              key={skill.id}
              delay={BLUR_FADE_DELAY * 10 + id * 0.05}
            >
              <Badge key={skill?.name}>{skill?.name}</Badge>
            </BlurFade>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillSections;
