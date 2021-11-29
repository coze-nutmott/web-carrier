import Flex from 'common/component/Flex';
import { IFile } from 'common/type';
import { HTMLProps } from 'react';

interface IProps extends HTMLProps<HTMLDivElement> {
  profile?: IFile | null;
}

export default function PropfileImage({
  profile,
  className,
  ...props
}: IProps) {
  return (
    <Flex
      className={cn(
        'border-1 border-solid border-divideLine rounded-1/2 overflow-hidden justify-center items-center',
        className,
      )}
      {...props}
    >
      <img
        alt={profile?.filename}
        src={profile ? profile.url : '/static/images/img-dummy-profile.png'}
      />
    </Flex>
  );
}
