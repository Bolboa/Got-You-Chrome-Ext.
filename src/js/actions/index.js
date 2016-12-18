
/*-------SAVE EMAIL AND PASSWORD TO LOCAL STORAGE--------*/
const save = (email, password) => {
	//create object
	var userInfo = {
    	user_email:email,
    	user_password:password
    }
    //convert to JSON format
    const serializedState = JSON.stringify(userInfo);
    //save object to local storage
	localStorage.setItem('token', serializedState);

	//return a message
	return {
		type: "SAVE_STORAGE",
		payload: "saved"
	}
}

/*------GET EMAIL AND PASSWORD FROM LOCAL STORAGE--------*/
const getInfo = () => {
	//get object from local storage
	const received = JSON.parse(localStorage.getItem('token'));

	//save object in redux store
	return {
		type: "GET_STORAGE",
		payload: received
	}
}

export {
	save,
	getInfo
}