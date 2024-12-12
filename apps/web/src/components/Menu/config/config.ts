import { ContextApi } from '@pancakeswap/localization'
import { SUPPORTED_CHAIN_IDS as POOL_SUPPORTED_CHAINS } from '@pancakeswap/pools'
import { SUPPORTED_CHAIN_IDS as PREDICTION_SUPPORTED_CHAINS } from '@pancakeswap/prediction'
import {
  BridgeIcon,
  DropdownMenuItems,
  DropdownMenuItemType,
  EarnFillIcon,
  EarnIcon,
  GameIcon,
  MenuItemsType,
  MoreIcon,
  SwapFillIcon,
  SwapIcon,
} from '@pancakeswap/uikit'
import { SUPPORT_CAKE_STAKING, SUPPORT_FARMS, SUPPORT_ONLY_BSC } from 'config/constants/supportChains'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & {
  hideSubNav?: boolean
  overrideSubNavItems?: DropdownMenuItems['items']
  matchHrefs?: string[]
}
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & {
  hideSubNav?: boolean
  image?: string
  items?: ConfigMenuDropDownItemsType[]
  overrideSubNavItems?: ConfigMenuDropDownItemsType[]
}

export const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    {
      label: t('Trade'),
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '/',
      hideSubNav: true,
      items: [
        {
          label: t('Swap'),
          href: '/',
        },

      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Earn'),
      href: '/liquidity/pools',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      image: '/images/decorations/pe2.png',
      supportChainIds: SUPPORT_FARMS,
      overrideSubNavItems: [
        {
          label: t('Farm / Liquidity'),
          href: '/liquidity/pools',
          supportChainIds: SUPPORT_FARMS,
        },
        {
          label: t('CAKE Staking'),
          href: '/cake-staking',
          supportChainIds: SUPPORT_CAKE_STAKING,
        },
        {
          label: t('Syrup Pools'),
          href: '/pools',
          supportChainIds: POOL_SUPPORTED_CHAINS,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
      items: [
        {
          label: t('Farm / Liquidity'),
          href: '/liquidity/pools',
          matchHrefs: ['/liquidity/positions', '/farms'],
          supportChainIds: SUPPORT_FARMS,
        },
        {
          label: t('Staking'),
          supportChainIds: SUPPORT_CAKE_STAKING,
          items: [
            {
              label: t('ESTATE'),
              href: '/cake-staking',
              supportChainIds: SUPPORT_CAKE_STAKING,
            },
            {
              label: t('TRRXITTE'),
              href: '/trrxitte-staking',
              supportChainIds: SUPPORT_CAKE_STAKING,
            },
            {
              label: t('advanced dashboard'),
              href: '/pools',
              supportChainIds: POOL_SUPPORTED_CHAINS,
            },
          ].map((item) => addMenuItemSupported(item, chainId)),
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('TRRXITTE Int.'),
      href: 'https://trrxitte.com',
      icon: BridgeIcon,
      type: DropdownMenuItemType.EXTERNAL_LINK,
      image: '/images/decorations/pe2.png',
      items: [
        {
          label: t('Nyantereum International'),
          href: 'https://nyantereuminternational.com',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        {
          label: t('TRRXITTE International'),
          href: 'https://trrxitteinternational.com',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        {
          label: t('traaitt'),
          href: 'https://traaitt.com',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        {
          label: t('traaittXTCASH'),
          href: 'https://traaittxtcash.com',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        {
          label: t('NyanDOGE International'),
          href: 'https://nyandogeinternational.com',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Play'),
      icon: GameIcon,
      href: '/prediction',
      overrideSubNavItems: [
        {
          label: t('Prediction'),
          href: '/prediction',
        },
        {
          label: t('Lottery'),
          href: '/lottery',
        },
      ],
      items: [
        {
          label: t('Lottery'),
          href: '/lottery',
          image: '/images/decorations/lottery.png',
        },
        {
          label: t('Prediction'),
          href: '/prediction',
          image: '/images/decorations/prediction.png',
          supportChainIds: PREDICTION_SUPPORTED_CHAINS,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: '',
      href: '/info',
      icon: MoreIcon,
      hideSubNav: true,
      items: [
        {
          label: t('Info'),
          href: '/info/v3',
        },
        {
          label: t('IFO'),
          href: '/ifo',
          image: '/images/ifos/ifo-bunny.png',
          overrideSubNavItems: [
            {
              label: t('Latest'),
              href: '/ifo',
            },
            {
              label: t('Finished'),
              href: '/ifo/history',
            },
          ],
        },
        {
          label: t('Voting'),
          image: '/images/voting/voting-bunny.png',
          items: [
            {
              label: t('Proposals'),
              href: '/voting',
              supportChainIds: SUPPORT_ONLY_BSC,
            },
            {
              label: t('Gauges'),
              href: '/gauges-voting',
              supportChainIds: SUPPORT_CAKE_STAKING,
            },
          ].map((item) => addMenuItemSupported(item, chainId)),
        },
        {
          type: DropdownMenuItemType.DIVIDER,
        },
        {
          label: t('Blog'),
          href: 'https://blog.pancakeswap.finance',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        {
          label: t('Docs'),
          href: 'https://docs.pancakeswap.finance',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
