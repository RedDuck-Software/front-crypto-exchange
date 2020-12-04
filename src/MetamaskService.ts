import { erc20TokenContractAbi } from '@/constants'
import CommonSelectbox from '@/interfaces/CommonSelectbox'
import Web3 from 'web3'

// not all methods are about metamask e.g getfees getamountminusfees
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

  private static getContractInstance (contractAddress: string) {
    const tokenContract = new window.web3.eth.Contract(
      erc20TokenContractAbi,
      contractAddress
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
    return new Promise((resolve, reject) => {
      window.web3.eth.getBalance(address, (err, result) => {
        const balance = window.web3.utils.fromWei(result, 'ether')
        if (!err) {
          resolve(balance as number)
        } else {
          reject(err)
        }
      })
    })
  }

  private static async getStableCoinBalancePromise (address: string, contractAddress: string): Promise<number> {
    const walletAddress = address

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
    const contract = new window.web3.eth.Contract(
      minABI,
      contractAddress
    )

    const decimals = await contract.methods.decimals().call()
    const tokenBalance = await contract.methods.balanceOf(walletAddress).call()

    let balance
    if (window.web3.utils.isBN(tokenBalance)) {
      balance = tokenBalance
    } else {
      balance = window.web3.utils.toBN(tokenBalance)
    }

    const bn10 = window.web3.utils.toBN(10)
    const bnDecimals = window.web3.utils.toBN(decimals)
    const divAmount = bn10.pow(bnDecimals)
    balance = balance.div(divAmount)

    console.log('fetched balance:', balance.toString())

    return balance.toNumber()
  }
}
