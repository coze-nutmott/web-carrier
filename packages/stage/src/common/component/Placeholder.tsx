// NOTE: 프로필 사진 업로드 기능 비활성화
// const Wrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: 1px solid #d0d0d0;
//   border-radius: 50%;
//   position: relative;
//   overflow: hidden;
//   width: 100px;
//   height: 100px;
//   &:hover:after {
//     content: '수정';
//     position: absolute;
//     bottom: 0;
//     right: 0;
//     left: 0;
//     height: 24px;
//     padding-top: 2px;
//     background-color: rgba(16, 16, 16, 0.6);
//     font-size: 12px;
//     text-align: center;
//     vertical-align: coneter;
//     color: white;
//   }
// `;

import Flex from 'common/component/Flex';

interface IProps {
  src?: string;
  onClick: () => void;
}

// NOTE: 프로필 사진 업로드 기능 비활성화
export default function Placeholder({ src }: IProps) {
  return (
    <Flex className="justify-center items-center border-1 border-solid border-[#d0d0d0] rounded-1/2 relative overflow-hidden w-100 h-100">
      <img src={src} />
    </Flex>
  );
}
