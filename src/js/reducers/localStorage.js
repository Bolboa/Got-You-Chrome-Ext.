export default function (state=null, action) {
	switch(action.type) {
		case "SAVE_STORAGE":
			return action.payload;
			break;
	}
	return state;
}