import Flex from 'common/component/Flex';
import BookmarkIcon from '@icons/icons-bookmark-white.svg';

interface IProps {
  bookmarked?: boolean;
  onClick?: () => void;
}

export default function BookmarkButton({ bookmarked, onClick }: IProps) {
  return (
    <Flex
      as="button"
      className={cn(
        'flex-0-0-auto mt-3',
        bookmarked ? 'text-black' : 'text-white',
      )}
      onClick={onClick}
    >
      <BookmarkIcon />
    </Flex>
  );
}
