import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode.react'

const wallets = [
  { label: 'MetaMask (EVM: ETH, Polygon, BSC, Base, Arbitrum, Optimism)', address: '0x2998cAE698b9eA846e1E50510D269a838A1aD7DF', note: 'Minimum: $5' },
  { label: 'BTC', address: 'bc1qpggv4lugp4j4lump3k4k8rtmdqzc5p9qcyk8fn', note: 'Minimum: 0.0001 BTC' },
  { label: 'TON', address: 'EQBNY7a1Gsy1O7TX0OhGBnM8YhpHQ6mAWIjq2glCTuJ1SlxF', note: 'Memo: 6030789245 — Minimum: 0.75 TON' },
  { label: 'USDT (TRC-20)', address: 'TFTCNEydbQjffdbgt3r7RcDE4iAGLfY8Pa', note: 'Minimum: $5' },
  { label: 'USDT (TON)', address: 'EQBNY7a1Gsy1O7TX0OhGBnM8YhpHQ6mAWIjq2glCTuJ1SlxF', note: 'Memo: 2468363482 — Minimum: $5' },
  { label: 'USDT (Polygon)', address: '0xDa4e6C2aaC258C2d468BbF5fab12a659c2A3F66a', note: 'Minimum: $5' },
  { label: 'USDT (ERC-20)', address: '0x91B55D8bbaCDf95F48Bc37863AE369c459F52E47', note: 'Minimum: $5' },
  { label: 'USDC (Solana)', address: 'G979BvyKWkdWajQk315g7bcTn5YnmYayxvk6SR1PAvBa', note: 'Minimum: $5' },
  { label: 'USDC (Polygon)', address: '0xA35A278F5951Ec37F618141Ca7c90F38E6fb34f0', note: 'Minimum: $5' },
  { label: 'USDC (BEP-20)', address: '0x57BCCE1166229EA050B6983b62a10367E0CB8bd1', note: 'Minimum: $1' },
  { label: 'USDC (ERC-20)', address: '0x418ec8d643A7F5abE3C8ba97cc1B12DfE47ec3dF', note: 'Minimum: $15' },
]

const phrases = [
  'Congratulations. You’ve just made the dumbest financial decision of your life.',
  'Your donation has been successfully ignored.',
  'Money well wasted. Good job.',
  'You’ve just fed the void. The void is still hungry.',
  'In a world of meaning, you chose nothing. Beautiful.',
  'The universe noticed your donation. It shrugged.',
  'Capitalism thanks you.',
]

export default function App () {
  const [copied, setCopied] = useState(null)
  const [phrase, setPhrase] = useState('')
  const [showWallets, setShowWallets] = useState(false)

  useEffect(() => {
    setPhrase(phrases[Math.floor(Math.random() * phrases.length)])
  }, [])

  const copy = async (text) => {
    await navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className='wrap'>
      <div className='hero'>
        <h1>WELCOME TO NOTHING</h1>
        <p className='subtitle'>{phrase}</p>
        <div className='description'>
          <p>Welcome to Nothing.</p>
          <p>It's simple: send us crypto and receive nothing in return.</p>
          <p>What is this website about? Well, that's a secret. Or not.</p>
          <p>We're just here for the fun, or maybe for the absurdity.</p>
          <p>Enjoy wasting your time. We do it all the time.</p>
        </div>
        <button className='donate-btn' onClick={() => setShowWallets(!showWallets)}>
          {showWallets ? 'Hide wallets' : 'Donate'}
        </button>
      </div>

      {showWallets && (
        <div className='grid'>
          {wallets.map((w, i) => (
            <div key={i} className='card'>
              <div className='label'>{w.label}</div>
              <div className='qr'><QRCode value={w.address} size={96} /></div>
              <div className='addr'>{w.address}</div>
              {w.note && <div className='note'>{w.note}</div>}
              <button onClick={() => copy(w.address)}>
                {copied === w.address ? 'Copied!' : 'Copy address'}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className='stats'>
        <div>Total donated to nothing: <b>$7,483.01</b></div>
        <div>Top donator: <b>existential.eth</b></div>
        <div>Smallest donation: <b>$0.01</b></div>
      </div>

      <footer>© {new Date().getFullYear()} DonateToNothing. All rights reversed.</footer>
    </div>
  )
}
