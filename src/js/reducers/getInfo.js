export default function (state=null, action) {
	switch(action.type) {
		case "GET_STORAGE":
			return action.payload;
			break;
	}
	return state;
}