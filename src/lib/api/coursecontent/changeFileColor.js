export const changeFileColor = async (
	/** @type {string} */ fileId,
	/** @type {string} */ color
) => {
	console.log('updateFileColor', fileId, color);

	const res = Math.random() > 0.5;
	console.log(res);
	return res;
};
