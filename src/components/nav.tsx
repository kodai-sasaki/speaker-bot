import type { FC } from "react";
import type { Speaker } from "@/domain/speaker/types";

type Props = {
	speakers?: Speaker[];
};

export const Nav: FC<Props> = (props) => {
	const { speakers } = props;
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
							<ul>{speakers.map(SpeakerItem)}</ul>
						)}
					</details>
				</li>
			</ul>
		</nav>
	);
};

const SpeakerItem = (speaker: Speaker) => {
	return (
		<li key={speaker.speaker_uuid}>
			<details>
				<summary>{speaker.name}</summary>
				<ul>
					{speaker.styles.map((style) => {
						return (
							<li key={style.id}>
								{style.name}({style.id})
							</li>
						);
					})}
				</ul>
			</details>
		</li>
	);
};
