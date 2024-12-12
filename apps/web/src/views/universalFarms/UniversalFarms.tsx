import { useTranslation } from '@pancakeswap/localization'
import { Card, Text } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useRouter } from 'next/router'
import { PropsWithChildren, useMemo } from 'react'
import styled from 'styled-components'
import { PositionPage } from './PositionPage'

const StyledTab = styled.div`
  padding: 8px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 8px;
  margin: 0 4px;
  text-align: center;
`

const PAGES_LINK = {
  POSITIONS: '/liquidity/positions',
}

const usePageInfo = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const PAGES_MAP = useMemo(
    () => ({
      [PAGES_LINK.POSITIONS]: {
        tabIdx: 0,
        oldLink: '/liquidity',
        oldLinkText: t('Legacy Liquidity Page'),
      },
    }),
    [t],
  )
  return useMemo(() => PAGES_MAP[router.pathname] ?? {}, [PAGES_MAP, router.pathname])
}

export const UniversalFarms: React.FC<PropsWithChildren> = () => {
  const { t } = useTranslation()
  const { tabIdx } = usePageInfo()

  const tabsConfig = useMemo(() => {
    return {
      0: {
        menu: () => (
          <StyledTab key="positions">
            <Text>{t('My Positions')}</Text>
          </StyledTab>
        ),
        page: () => <PositionPage />,
      },
    }
  }, [t])

  return (
    <Page>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        {Object.values(tabsConfig).map(({ menu }) => menu())}
      </div>
      {tabsConfig[tabIdx !== undefined ? tabIdx : 0]?.page?.() || <Card>No page content available</Card>}
    </Page>
  )
}
