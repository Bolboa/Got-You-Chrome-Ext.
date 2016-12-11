package main

import (
	"net/http"
	"fmt"
	"github.com/julienschmidt/httprouter"
	"log"
	"encoding/json"
)

type test_struct struct {
    Test string
}

func GetImage(rw http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	var t test_struct

	if req.Body == nil {
		http.Error(rw, "Please send a request body", 400)
		return
	}
	err := json.NewDecoder(req.Body).Decode(&t)
	fmt.Println(req.Body)
	if err != nil {
		http.Error(rw, err.Error(), 400)
        return
	}
	fmt.Println(t.Test);
}

func main() {

	router := httprouter.New()
	router.POST("/", GetImage)

	log.Fatal(http.ListenAndServe(":8080", router))
}
