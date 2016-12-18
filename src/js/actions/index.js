const save = (email, password) => {

	var userInfo = {
    	user_email:email,
    	user_password:password
    }

    const serializedState = JSON.stringify(userInfo);

	localStorage.setItem('token', serializedState);

	return {
		type: "SAVE_STORAGE",
		payload: "saved"
	}
}

const getInfo = () => {
	const received = JSON.parse(localStorage.getItem('token'));
	return {
		type: "GET_STORAGE",
		payload: received
	}
}

export {
	save,
	getInfo
}