/** @format */

import React from 'react';
import BlurFadeText from '@/components/magicui/blur-fade-text';
import BlurFade from '@/components/magicui/blur-fade';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const HeroInfoSection = async () => {
  const response = await fetch('http://localhost:3000/api/peronalinfo', {
    cache: 'force-cache',
  });
  const data = await response.json();
  const BLUR_FADE_DELAY = 0.04;

  return (
    <div className='mx-auto w-full max-w-2xl space-y-8'>
      <div className='gap-2 flex justify-between'>
        <div className='flex-col flex flex-1 space-y-1.5'>
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'
            yOffset={8}
            text={`Hi, I'm ${data?.info?.name?.split(' ')[0]} 👋`}
          />
          <BlurFadeText
            // animateByCharacter={true}
            // characterDelay={0.05}
            className='max-w-[600px] overflow-x-hidden md:text-xl'
            delay={BLUR_FADE_DELAY}
            text={data?.info?.subtitle}
          />
        </div>
        <BlurFade delay={BLUR_FADE_DELAY}>
          <Avatar className='size-28 border'>
            <AvatarImage
              alt={data?.info?.name}
              src={data?.info?.profile_image}
            />
            {/* <AvatarFallback>{DATA.initials}</AvatarFallback> */}
          </Avatar>
        </BlurFade>
      </div>
    </div>
  );
};

export default HeroInfoSection;
