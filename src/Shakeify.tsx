import React, { useState, useRef, useEffect } from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import indeed from './custom-emoji/indeed.png'
import angryFace from './custom-emoji/angry-face.png'
import { CanvasFrame } from './CanvasFrame';


const custom = [
  {
    id: 'gifs',
    name: 'GIFs',
    emojis: [
      {
        id: 'angry-face-right',
        name: 'Angry Face',
        keywords: ['angry', 'right', 'face'],
        skins: [{ src: angryFace }],
      },
      {
        id: 'indeed',
        name: 'Indeed',
        keywords: ['indeed'],
        skins: [{ src: indeed }],
      },
    ],
  },
]

export type Who = {
  src?: string
  native?: string
}

export function Shakeify() {
  const [who, setWho] = useState<Who>({});

  return (<form>
    <fieldset>
      <legend>Who is shaking?</legend>
      <Picker data={data} onEmojiSelect={setWho} custom={custom} />
    </fieldset>
    <fieldset>
      <legend>What is being shaken?</legend>
      <input id="shatText" type="text" maxLength={5} />
    </fieldset>
    <fieldset>
      <legend>First frame</legend>
      <CanvasFrame who={who}></CanvasFrame>
    </fieldset>
  </form>);
}
