import { forwardRef, HTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from 'common/component/Textarea.module.scss';

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, IProps>(function Textarea(
  props,
  ref,
) {
  const { className, ...rest } = props;
  return (
    <textarea
      ref={ref}
      className={cn(
        'outline-none border border-solid border-gray60 resize-none flex-1-1-full',
        className,
      )}
      {...rest}
    />
  );
});

/**
 * textarea의 height를 자동으로 확장하기 위해 사용
 * https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
 */

export const AutoGrow = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('grid', styles.autoGlow, className)} {...props} />;
};

Textarea.displayName = 'Textarea';

export default Textarea;
