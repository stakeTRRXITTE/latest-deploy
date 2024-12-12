import { ChainId } from '@pancakeswap/chains'
import { ERC20Token } from '@pancakeswap/sdk'
import getLpAddress from 'utils/getLpAddress'

const CAKE_AS_STRING = '0x8CE592512B8BC92F0BEEac62F7cB692bb21aB225'
const BUSD_AS_STRING = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
const CAKE_AS_TOKEN = new ERC20Token(ChainId.BSC, CAKE_AS_STRING, 18, 'CAKE')
const BUSD_AS_TOKEN = new ERC20Token(ChainId.BSC, BUSD_AS_STRING, 18, 'BUSD')
const CAKE_BUSD_LP = '0x804678fa97d91B974ec2af3c843270886528a9E6'

describe('getLpAddress', () => {
  it('returns correct LP address, both tokens are strings', () => {
    expect(getLpAddress(CAKE_AS_STRING, BUSD_AS_STRING)).toBe(CAKE_BUSD_LP)
  })
  it('returns correct LP address, token1 is string, token 2 is Token', () => {
    expect(getLpAddress(CAKE_AS_STRING, BUSD_AS_TOKEN)).toBe(CAKE_BUSD_LP)
  })
  it('returns correct LP address, both tokens are Token', () => {
    expect(getLpAddress(CAKE_AS_TOKEN, BUSD_AS_TOKEN)).toBe(CAKE_BUSD_LP)
  })
  it('returns null if any address is invalid', () => {
    expect(getLpAddress('123', '456')).toBe(null)
    expect(getLpAddress(undefined, undefined)).toBe(null)
    expect(getLpAddress(CAKE_AS_STRING, undefined)).toBe(null)
    expect(getLpAddress(undefined, BUSD_AS_TOKEN)).toBe(null)
    expect(getLpAddress(CAKE_AS_STRING, '456')).toBe(null)
    expect(getLpAddress('123', BUSD_AS_TOKEN)).toBe(null)
  })
})
