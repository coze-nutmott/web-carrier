import Flex from 'common/component/Flex';

export default function Loading() {
  return (
    <div className="grid place-items-center h-full">
      <Flex
        className="justify-center items-center w-60 h-60 border-6 border-solid border-borderYellow rounded-30 animate-spin"
        style={{ borderRightColor: 'transparent' }}
      />
    </div>
  );
}
