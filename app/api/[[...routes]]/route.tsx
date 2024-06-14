/** @jsxImportSource frog/jsx */

import { Button, Frog, parseEther } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { init, fetchQuery } from "@airstack/node"
import axios from 'axios'
import abi from './HeroAbi.json'

const airstackKey = process.env.AIRSTACK_API_KEY ?? ""
init(airstackKey);

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  hub: {
    apiUrl: "https://hubs.airstack.xyz",
    fetchOptions: {
      headers: {
        "x-airstack-hubs": process.env.AIRSTACK_API_KEY ? process.env.AIRSTACK_API_KEY : "",
      }
    }
  }
})

const apiUrl = 'https://farfantasy.com/api/profile/herofees?fid='

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  return c.res({
    action: '/check',
    image: (
      <div
        style={{
          alignItems: 'center',
          background: '#432889',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 50,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        > Hero Fee Withdraw
        </div>
        <div
          style={{
            color: 'white',
            fontSize: 40,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        > Check Hero fees you can withdraw
        </div>
      </div>
    ),
    intents: [
      <Button>Check</Button>,
    ],
  })
})

app.frame('/check', async (c) => {
  const { verified, frameData } = c

  if (!verified) {
    return ReturnUnverified(c, "Please login to Farcaster")
  }

  const { fid } = frameData || {}
  
  if (!fid) {
    return ReturnUnverified(c, "Unable to resolve FID . . .")
  }

  let fees = -1;
  try {
    const response = await axios.get(`${apiUrl}${fid}`);
    const data = response.data;
    fees = data.data.herofees
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }

  let response = "Failed to fetch fees."
  let intents = [
    <Button.Reset>Reset</Button.Reset>
  ]

  if (fees != -1) {
    response = `You have ${fees} unclaimed fees.`
    intents = [
      <Button.Transaction target='/claim'>Claim</Button.Transaction>
    ]
  }

  return c.res({
      image: (
        <div
          style={{
            alignItems: 'center',
            background: '#432889',
            backgroundSize: '100% 100%',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            height: '100%',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: 50,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              lineHeight: 1.4,
              marginTop: 30,
              padding: '0 120px',
              whiteSpace: 'pre-wrap',
            }}
          >
            {response}
          </div>
        </div>
      ),
      intents: intents,
      action: '/finish'
    })
})

app.frame('/check', async (c) => {
  const { verified, frameData } = c

  if (!verified) {
    return ReturnUnverified(c, "Please login to Farcaster")
  }

  const { fid } = frameData || {}
  
  if (!fid) {
    return ReturnUnverified(c, "Unable to resolve FID . . .")
  }

  let fees = -1;
  try {
    const response = await axios.get(`${apiUrl}${fid}`);
    const data = response.data;
    fees = data.data.herofees
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }

  let response = "Failed to fetch fees."
  let intents = [
    <Button.Reset>Reset</Button.Reset>
  ]

  if (fees != -1) {
    response = `You have ${fees} unclaimed fees.`
    intents = [
      <Button.Transaction target='/claim'>Claim</Button.Transaction>
    ]
  }

  return c.res({
      image: (
        <div
          style={{
            alignItems: 'center',
            background: '#432889',
            backgroundSize: '100% 100%',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            height: '100%',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: 50,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              lineHeight: 1.4,
              marginTop: 30,
              padding: '0 120px',
              whiteSpace: 'pre-wrap',
            }}
          >
            {response}
          </div>
        </div>
      ),
      intents: intents,
      action: '/finish'
    })
})

app.frame('/finish', async (c) => {
  const { verified, frameData, transactionId } = c

  if (!verified) {
    return ReturnUnverified(c, "Please login to Farcaster")
  }

  const { fid } = frameData || {}
  
  if (!fid) {
    return ReturnUnverified(c, "Unable to resolve FID . . .")
  }

  return c.res({
      image: (
        <div
          style={{
            alignItems: 'center',
            background: '#432889',
            backgroundSize: '100% 100%',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            height: '100%',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: 50,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              lineHeight: 1.4,
              marginTop: 30,
              padding: '0 120px',
              whiteSpace: 'pre-wrap',
            }}
          >
            Done!
          </div>
        </div>
      ),
      intents: [
        <Button.Link href={`https://basescan.org/tx/${transactionId}`}>Transaction</Button.Link>,
        <Button.Reset>Reset</Button.Reset>
      ]
    })
})

app.transaction('/claim', async (c) => {
  const { verified, frameData } = c
  const fid = frameData?.fid

  return c.contract({
    abi,
    chainId: 'eip155:8453',
    functionName: 'withdrawSubjectFees',
    args: [fid],
    to: '0xedd1c688d8e75849d52316237e6634e382b03310',
    value: parseEther("0")
  })
})

function ReturnUnverified(c: any, message: string) {
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        > `${message}`
        </div>
      </div>
    ),
  })
}


devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
