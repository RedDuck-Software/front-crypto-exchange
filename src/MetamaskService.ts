import { erc20TokenContractAbi } from '@/constants'
import CommonSelectbox from '@/interfaces/CommonSelectbox'
import { ethers } from 'ethers'

// eslint-disable-next-line no-undef
let provider: ethers.providers.Provider | import('@ethersproject/abstract-signer').Signer | undefined
// @ts-ignore
window.ethereum.enable().then(provider = new ethers.providers.Web3Provider(window.ethereum))

export default class MetamaskService {
  public static getAmountPlusFee (amount: number) {
    const fees = MetamaskService.getFees(amount)

    return amount + fees
  }

  // not tested well, try 200$ value it will give 0
  public static getFees (amount : number) {
    const feePercent = this.getFeesPercent(amount)

    return feePercent * amount
  }

  public static getFeesPercent (givenAmount : number) {
    console.log('getFeesPercent:', givenAmount)

    const amount = parseFloat(givenAmount.toFixed(2))

    console.log('current amount:', amount)

    if (amount <= 0 || amount > 200) { return 0 }

    var map = [
      [30, 0.12],
      [50, 0.11],
      [70, 0.1],
      [90, 0.09],
      [100, 0.08],
      [130, 0.07],
      [160, 0.06],
      [201, 0.05]
    ]

    const fee = map.find(i => amount < i[0])

    console.log('found fee:', fee)

    // eslint-disable-next-line eqeqeq
    if (fee == undefined) {
      console.error('undefined fee at getFeesPercent, input:', amount)
      return -1
    }

    return fee[1]
  }

  private static async getContractInstance (contractAddress: string) {
    const tokenContract = new ethers.Contract(
      contractAddress,
      erc20TokenContractAbi,
      provider
    )

    return tokenContract
  }

  public async sendMoney (amount: number, sender: string, receiver: string, coin: (CommonSelectbox & {contractAddress: string})) {

  }

  public static async getBalance (address: string, coin: (CommonSelectbox & {contractAddress: string})) {
    if (coin.value === 'eth') {
      return MetamaskService.getEthBalancePromise(address)
    }

    return MetamaskService.getStableCoinBalancePromise(address, coin.contractAddress)
  }

  public static async getEthBalancePromise (address: string): Promise<number> {
    // @ts-ignore
    var balance = await provider.getBalance('ethers.eth')
    return +ethers.utils.formatEther(balance)
  }

  private static async getStableCoinBalancePromise (address: string, contractAddress: string): Promise<number> {
    const walletAddress = address
    console.log('walletAddress', walletAddress)

    // The minimum ABI to get ERC20 Token balance
    const minABI = [
      // balanceOf
      {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        type: 'function'
      },
      // decimals
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        type: 'function'
      }
    ]

    // Get ERC20 Token contract instance
    const contract = new ethers.Contract(contractAddress, minABI, provider)
    console.log('contract', contract)
    // const value = await contract.getValue()

    const decimals = await contract.decimals()
    console.log('decimal', decimals)
    const tokenBalance = await contract.balanceOf(walletAddress)
    console.log('tokenBalance', tokenBalance)

    let balance
    if (ethers.BigNumber.from(tokenBalance)) {
      balance = tokenBalance
    } else {
      balance = ethers.BigNumber.from(tokenBalance)
    }

    const bn10 = ethers.BigNumber.from(10)
    const bnDecimals = ethers.BigNumber.from(decimals)
    const divAmount = bn10.pow(bnDecimals)
    balance = balance.div(divAmount)

    console.log('fetched balance:', balance.toString())

    return balance.toNumber()
  }
}
