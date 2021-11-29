import { LiHTMLAttributes, useState } from 'react';
import DefaultDivider from 'common/component/Divider';
import useMedia from 'common/hook/useMedia';
import Wrapper from 'common/component/Wrapper';
import Flex, { Column, Row } from 'common/component/Flex';
import KakaoPageCI from '@icons/img-ci.svg';
import DownIcon from '@icons/icons-dropdown-down.svg';
import UpIcon from '@icons/icons-dropdown-up.svg';
import { Anchor } from 'common/component/shared';
import { CS_CENTER_URL } from 'common/constant';

const Li = ({ className, ...props }: LiHTMLAttributes<HTMLLIElement>) => (
  <li className={cn('mr-8', className)} {...props} />
);

const Divider = () => (
  <DefaultDivider
    className="hidden desktop:inline my-0 mr-10 ml-2"
    style={{ color: '#dddddd' }}
  />
);

/**
 * TODO
 * useSession 활성화 + 파트너계정전환신청
 * Anchor에 pageInfo 추가
 * #f6f6f6 컬러 정의하면 좋을 듯. 여러군데서 쓰임
 */
export default function GlobalFooter() {
  // const { session, loggedOut } = useSession();
  const isDesktop = useMedia('desktop');
  const [collapsed, setCollapsed] = useState(true);
  // const [showPartnerModal, setShowPartnerModal] = useState(false);

  return (
    <footer
      className="mt-32 text-grayFont text-12 border-t-1 border-solid border-divideLine"
      style={{ backgroundColor: '#f6f6f6' }}
    >
      <Wrapper className="py-32 desktop:py-40">
        <Flex className="flex-col desktop:flex-row items-start desktop:items-center">
          <Flex
            as="a"
            href="https://kakaoent.com/company.html"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-40 mb-20 desktop:mb-0 w-88 desktop:w-104 flex-shrink-0"
          >
            <KakaoPageCI />
          </Flex>
          <Column>
            <Row
              as="ul"
              className="list-none mb-20 desktop:mb-5 p-0 text-gray font-medium"
            >
              <Li>
                <a
                  href="https://kakaoent.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  회사소개
                </a>
              </Li>
              <Divider />
              <Li>
                <Anchor>이용약관</Anchor>
              </Li>
              <Divider />
              <Li>
                <Anchor>
                  <strong>개인정보처리방침</strong>
                </Anchor>
              </Li>
              <Divider />
              <Li>
                <Anchor>청소년보호정책</Anchor>
              </Li>
              <Divider />
              <Li>
                <Anchor>권리침해신고센터</Anchor>
              </Li>
              <Divider />
              <Li>
                <Anchor>공지사항</Anchor>
              </Li>
              <Divider />
              <Li>
                <a href={CS_CENTER_URL}>고객센터</a>
              </Li>
              <Divider />
              <Li>
                <Anchor>도움말</Anchor>
              </Li>
              {/* {isDesktop && !loggedOut && session.user?.userType === 'USER' && ( */}
              {/* <>
                  <Divider />
                  <Li>
                    <Box
                      cursor="pointer"
                      onClick={() => setShowPartnerModal(true)}
                    >
                      파트너계정전환신청
                    </Box>
                  </Li>
                  {showPartnerModal && (
                    <PartnerGuideModal
                      onClose={() => setShowPartnerModal(false)}
                    />
                  )}
                </>
              )} */}
            </Row>
            <Row
              as="ul"
              className="list-none mb-20 desktop:mb-10 p-0 text-gray font-medium"
            >
              <Li>
                <Flex
                  className="items-center cursor-pointer"
                  onClick={() => setCollapsed(prev => !prev)}
                >
                  (주)카카오엔터테인먼트 사업자 정보
                  <Flex width="16px" height="16px">
                    {collapsed ? <DownIcon /> : <UpIcon />}
                  </Flex>
                </Flex>
              </Li>
              <Divider />
              <Li>
                <a
                  href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=2208802594"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  사업자 정보 확인
                </a>
              </Li>
            </Row>
            {!collapsed && (
              <>
                <Row
                  as="ul"
                  className="p-0 list-none font-medium flex-col desktop:flex-row"
                  style={{ color: '#aaa' }}
                >
                  <Li>대표자 : 이진수, 김성수</Li>
                  <Li>주소 : 경기도 성남시 분당구 판교역로 221</Li>
                  <Li>사업자등록번호 : 220-88-02594</Li>
                  <Li>통신판매업신고 : 2018-성남분당B-0004 </Li>
                </Row>
                <Row
                  as="ul"
                  className="p-0 mb-20 desktop:mb-10 list-none font-medium flex-col desktop:flex-row"
                  style={{ color: '#aaa' }}
                >
                  <Li>대표전화 : 1644-4755</Li>
                  <Li>이메일 : stage@kakaoent.com</Li>
                  <Li>호스팅서비스사업자 : (주)카카오엔터테인먼트</Li>
                </Row>
              </>
            )}
          </Column>
        </Flex>
      </Wrapper>
    </footer>
  );
}
