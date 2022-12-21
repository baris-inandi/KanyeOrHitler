import hitler from "./hitler";
import kanye from "./kanye";

export default () => {
	let set = "";
	const dataset =
		Math.random() > 0.5
			? (() => {
					set = "kanye";
					return kanye;
			  })()
			: (() => {
					set = "hitler";
					return hitler;
			  })();
	return [dataset[Math.floor(Math.random() * dataset.length)], set];
};
