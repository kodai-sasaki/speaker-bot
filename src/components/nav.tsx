import { useEffect, useState, type FC } from "react";
import type { Speaker, SpeakerStyle } from "@/domain/speaker/types";
import { speak } from "@/services/speak";
import clsx from "clsx";

type Props = {
  speakers?: Speaker[];
};

export const Nav: FC<Props> = (props) => {
  const { speakers } = props;
  const [sampleText, setSampleText] = useState("サンプルボイス");
  const [isLoadingStyleId, setIsLoadingStyleId] = useState<number | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const [speed, setSpeed] = useState(1);
  useEffect(() => {
    if (audio) {
      const audioElement = new Audio(audio);
      audioElement.play();
    }
  }, [audio]);
  return (
    <nav className="border-base-200 border-r-2 min-h-screen min-w-60 rounded-box">
      <ul className="menu">
        <li className="menu-title">MENU</li>
        <li>
          <details>
            <summary>SPEAKERS</summary>
            {!speakers ? (
              <span className="loading loading-dots loading-xs" />
            ) : (
              <ul>
                <li>
                  <input
                    type="text"
                    className="input input-primary input-sm"
                    value={sampleText}
                    placeholder="サンプルボイス"
                    onChange={(e) => setSampleText(e.target.value)}
                  />
                </li>
                <li>
                  <p>speed({speed})</p>
                  <input
                    type="range"
                    min={0.5}
                    max="3"
                    step={0.1}
                    value={speed}
                    className="range range-xs"
                    onChange={(e) => setSpeed(Number(e.target.value))}
                  />
                </li>
                {speakers.map(
                  SpeakerItem(
                    sampleText,
                    speed,
                    isLoadingStyleId,
                    setIsLoadingStyleId,
                    setAudio,
                  ),
                )}
              </ul>
            )}
          </details>
        </li>
      </ul>
    </nav>
  );
};

const SpeakerItem =
  (
    sampleText: string,
    speed: number,
    isLoadingStyleId: number | null,
    setIsLoadingStyleId: (styleId: number | null) => void,
    setAudio: (audio: string | null) => void,
  ) =>
  (speaker: Speaker) => {
    return (
      <li key={speaker.speaker_uuid}>
        <details>
          <summary>{speaker.name}</summary>
          <ul>
            {speaker.styles.map(
              SpeakerStyleItem(
                sampleText,
                speed,
                isLoadingStyleId,
                setIsLoadingStyleId,
                setAudio,
              ),
            )}
          </ul>
        </details>
      </li>
    );
  };

const SpeakerStyleItem =
  (
    sampleText: string,
    speed: number,
    isLoadingStyleId: number | null,
    setIsLoadingStyleId: (styleId: number | null) => void,
    setAudio: (audio: string | null) => void,
  ) =>
  (style: SpeakerStyle) => {
    return (
      <li key={style.id}>
        <button
          className={clsx(
            "flex justify-between",
            isLoadingStyleId === null && "cursor-default",
          )}
          type="button"
          onClick={async () => {
            if (isLoadingStyleId !== null) {
              return;
            }
            setIsLoadingStyleId(style.id);
            speak(sampleText, style.id, speed)
              .then((blob) => {
                URL.createObjectURL(blob);
                setAudio(URL.createObjectURL(blob));
              })
              .finally(() => {
                setIsLoadingStyleId(null);
              });
          }}
        >
          <span>
            {style.name}({style.id})
          </span>
          {isLoadingStyleId === style.id && (
            <span className="loading loading-xs" />
          )}
        </button>
      </li>
    );
  };
