package main

import (
	"net/http"
	"fmt"
	"github.com/julienschmidt/httprouter"
	"log"
	"encoding/json"
	"io/ioutil"
	"bytes"
	"gopkg.in/gomail.v2"
)

type test_struct struct {
    Test string `json:"image"`
}

func GetImage(rw http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	buf, err := ioutil.ReadAll(req.Body)
	reader := bytes.NewReader(buf)

	var t test_struct

	
	err = json.NewDecoder(reader).Decode(&t)
	fmt.Println(string(buf))
	if err != nil {
		http.Error(rw, err.Error(), 400)
        return
	}

	mail := gomail.NewMessage()
	mail.SetHeader("From", "ebolboa@gmail.com")
	mail.SetHeader("To", "ebolboa@gmail.ca")
	mail.SetHeader("Subject", "Hello!")
	mail.SetBody("text/html", `<div>hello</div>`)

	send := gomail.NewDialer("smtp.gmail.com", 587, "ebolboa@gmail.com", "password")
	
	if err := send.DialAndSend(mail); err != nil {
		panic(err)
	}


}

func main() {

	router := httprouter.New()
	router.POST("/", GetImage)

	log.Fatal(http.ListenAndServe(":8080", router))
}
