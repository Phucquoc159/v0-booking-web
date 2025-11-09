import * as Avatar from '@radix-ui/react-avatar';
import Image from 'next/image';
import { useMemo } from 'react';

interface NextJsCommonAvatarProps {
  imgSrc?: string;
  name?: string;
  size?: number;
}

const AvatarComponent: React.FC<NextJsCommonAvatarProps> = ({ 
  imgSrc, 
  name = 'User', 
  size = 50 
}) => {
  const fallbackLetter = useMemo(() => {
    if (!name) return 'U'; 
    return name.charAt(0).toUpperCase();
  }, [name]);

  return (
    <Avatar.Root
      className="relative flex h-fit w-fit overflow-hidden rounded-full align-middle"
      style={{ width: size, height: size }}
    >
      <Avatar.Image asChild>
        <Image
          src={imgSrc as string}
          alt={name || 'User Avatar'} 
          fill 
          className="object-cover transition-opacity duration-300"
          sizes={`${size}px`} 
          priority={false}
        />
      </Avatar.Image>

      <Avatar.Fallback
        className="flex h-full w-full items-center justify-center bg-gray-500 text-white font-medium text-lg"
        delayMs={300} 
      >
        {fallbackLetter}
      </Avatar.Fallback>
    </Avatar.Root>
  );
};

export default AvatarComponent;