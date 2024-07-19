import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '../../Button';
import { SuperfestXPIcon } from '../../illustrations/XPIcon';
import { FlexSpaceBetweenBox, SoraTypography } from '../Superfest.style';
import type { Chain } from '../SuperfestPage/Banner/Banner';
import { FlexCenterRowBox } from '../SuperfestPage/SuperfestMissionPage.style';
import Link from 'next/link';
import {
  QuestCardBottomBox,
  QuestCardInfoBox,
  QuestCardMainBox,
  QuestCardTitleBox,
  XPDisplayBox,
  XPIconBox,
} from './QuestCard.style';
import { OPBadge } from 'src/components/illustrations/OPBadge';
import { Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export interface RewardsInterface {
  logo: string;
  name: string;
  amount: number;
}

interface QuestCardProps {
  active?: boolean;
  title?: string;
  image?: string;
  points?: number;
  link?: string;
  startDate?: string;
  endDate?: string;
  platformName?: string;
  platformImage?: string;
  slug?: string;
  chains?: Chain[];
  rewards?: RewardsInterface;
  completed?: boolean;
}

export const QuestCard = ({
  active,
  title,
  image,
  points,
  link,
  startDate,
  endDate,
  slug,
  chains,
  rewards,
  completed,
}: QuestCardProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <QuestCardMainBox>
      <Link href={`/superfest/${slug}`}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {image && (
            <Image
              src={image}
              alt="Quest Card Image"
              width={288}
              height={288}
              style={{
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
              }}
            />
          )}
          <Box
            sx={{
              position: 'relative',
              marginLeft: '-32px',
              maringTop: '-16px',
            }}
          >
            {rewards?.amount && <OPBadge />}
          </Box>
        </Box>
      </Link>
      <QuestCardBottomBox>
        <QuestCardTitleBox>
          <SoraTypography fontSize="20px" lineHeight="20px" fontWeight={600}>
            {title && title.length > 22 ? `${title.slice(0, 21)}...` : title}
          </SoraTypography>
        </QuestCardTitleBox>
        <FlexSpaceBetweenBox marginBottom={'8px'} marginTop={'8px'}>
          <FlexCenterRowBox>
            {chains?.map((elem: Chain, i: number) => {
              return (
                <Image
                  key={elem.name + '-' + i}
                  src={elem.logo}
                  style={{
                    marginLeft: i === 0 ? '' : '-8px',
                    zIndex: 100 - i,
                  }}
                  alt={elem.name}
                  width="28"
                  height="28"
                />
              );
            })}
          </FlexCenterRowBox>
          {points ? (
            <FlexCenterRowBox>
              <XPDisplayBox
                active={active}
                bgcolor={!completed ? '#ff0420' : '#42B852'}
              >
                <SoraTypography
                  fontSize="14px"
                  fontWeight={700}
                  lineHeight="18px"
                  color={'#ffffff'}
                >
                  {`+${points}`}
                </SoraTypography>
                <XPIconBox marginLeft="4px">
                  {!completed ? (
                    <SuperfestXPIcon size={16} />
                  ) : (
                    <CheckCircleIcon sx={{ width: '16px', color: '#ffffff' }} />
                  )}
                </XPIconBox>
              </XPDisplayBox>
            </FlexCenterRowBox>
          ) : undefined}
        </FlexSpaceBetweenBox>
        <QuestCardInfoBox points={points}>
          {active && slug ? (
            <Button
              disabled={false}
              variant="secondary"
              size="medium"
              styles={{
                alignItems: 'center',
                width: '100%',
                backgroundColor: 'transparent',
                border: '2px dotted',
                padding: '16px',
                '&:hover': {
                  color: '#FFFFFF',
                  backgroundColor: '#ff0420',
                },
              }}
              onClick={() => router.push(slug)}
            >
              <SoraTypography
                fontSize="16px"
                lineHeight="18px"
                fontWeight={600}
              >
                {String(t('questCard.join')).toUpperCase()}
              </SoraTypography>
            </Button>
          ) : null}
        </QuestCardInfoBox>
      </QuestCardBottomBox>
    </QuestCardMainBox>
  );
};