import Flex from 'common/component/Flex';
import { HTMLProps } from 'react';
import { Anchor } from 'common/component/shared';

import AnchorIcon from '@icons/icons-anchor.svg';
import FirstIcon from '@icons/icons-first.svg';
import LastIcon from '@icons/icons-last.svg';
import PaginationIcon from '@icons/icons-pagination.svg';

interface IProps extends HTMLProps<HTMLDivElement> {
  page: string | number;
  totalPages: number;
  size?: number;
}

// [0, 1, 2, 3, 4, 5, 6, 7] => [[0, 1, 2, 3, 4], [5, 6, 7]]
const chunking = (arr: number[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );

/**
 * TODO
 * Anchor에 props 채워넣기
 */
export default function Pagination({
  page = 0,
  totalPages,
  size = 5,
  ...props
}: IProps) {
  const pages = Array.from({ length: totalPages || 1 }, (_, i) => i);
  const chunkedPages = chunking(pages, size);
  const currentChunk =
    chunkedPages.find(chunk => chunk.includes(Number(page))) || chunkedPages[0];

  const index = chunkedPages.indexOf(currentChunk);
  const prevIndex = (index - 1) * size;
  const nextIndex = (index + 1) * size;
  const isFirst = index === 0;
  const isLast = index === chunkedPages.length - 1;

  return (
    <Flex className="items-center" {...props}>
      <PageLink page={0} className="w-18 h-18 mx-4" disabled={isFirst}>
        <FirstIcon />
      </PageLink>
      <PageLink
        page={prevIndex}
        className="w-18 h-18 ml-4 mr-16"
        disabled={isFirst}
      >
        <div className="w-18 h-18 rotate-180">
          <AnchorIcon />
        </div>
      </PageLink>
      {currentChunk.map(item => (
        <Flex
          key={item}
          className="w-28 h-28 items-center justify-center mr-16"
        >
          <PageLink
            page={item}
            className={`${
              item === Number(page) ? 'text-white absolute' : 'text-gray'
            }`}
          >
            {item + 1}
          </PageLink>
          {item === Number(page) && <PaginationIcon />}
        </Flex>
      ))}

      <PageLink page={nextIndex} className="w-18 h-18 mr-4" disabled={isLast}>
        <AnchorIcon />
      </PageLink>
      <PageLink
        page={totalPages - 1}
        className="w-18 h-18 mx-4"
        disabled={isLast}
      >
        <LastIcon />
      </PageLink>
    </Flex>
  );
}

interface IPageLinkProps extends HTMLProps<HTMLElement> {
  page: number;
  disabled?: boolean;
}
const PageLink = ({ page, disabled, className, ...props }: IPageLinkProps) => {
  // const router = useRouter();
  console.log(props);
  return disabled ? (
    <Flex
      as="span"
      className={cn(
        'text-gray80 text-14 font-gmarket leading-normal',
        className,
      )}
      {...props}
    />
  ) : (
    <Anchor>
      <Flex
        as="a"
        className="text-gray text-14 font-gmarket leading-normal"
        {...props}
      />
    </Anchor>
  );
};
