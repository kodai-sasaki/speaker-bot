// Definition: Types for speaker

export type Version = `${number}.${number}.${number}`;

export type SpeakerStyle = {
  name: string;
  id: number;
  type: "talk";
};

export type Speaker = {
  name: string;
  speaker_uuid: string;
  styles: SpeakerStyle[];
  version: Version;
  supported_features: {
    permitted_synthesis_morphing: "ALL" | "SELF_ONLY" | "NOTHING";
  };
};
