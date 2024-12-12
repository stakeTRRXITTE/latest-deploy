import { useTranslation } from '@pancakeswap/localization'
import { AutoRenewIcon, Button } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import { PotteryDepositStatus } from 'state/types'
import { Address } from 'viem'
import { useWithdrawPottery } from 'views/Pottery/hooks/useWithdrawPottery'

interface WithdrawButtonProps {
  status: PotteryDepositStatus
  cakeNumber: BigNumber
  redeemShare: string
  potteryVaultAddress: Address
  balanceOf: string
}

const WithdrawButton: React.FC<React.PropsWithChildren<WithdrawButtonProps>> = ({
  status,
  cakeNumber,
  redeemShare,
  potteryVaultAddress,
  balanceOf,
}) => {
  const { t } = useTranslation()
  const { isPending, handleWithdraw } = useWithdrawPottery(redeemShare, potteryVaultAddress)

  const isDisabled = useMemo(() => {
    return (
      isPending ||
      cakeNumber.lte(0) ||
      cakeNumber.isNaN() ||
      new BigNumber(balanceOf).lte(0) ||
      status !== PotteryDepositStatus.UNLOCK
    )
  }, [isPending, cakeNumber, balanceOf, status])

  return (
    <Button
      width={['110px', '110px', '162px']}
      ml="auto"
      variant="secondary"
      disabled={isDisabled}
      endIcon={isPending ? <AutoRenewIcon spin color="currentColor" /> : null}
      onClick={handleWithdraw}
    >
      {t('Withdraw')}
    </Button>
  )
}

export default WithdrawButton
