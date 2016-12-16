package main

import (
	"net/http"
	"fmt"
	"github.com/julienschmidt/httprouter"
	"log"
	"encoding/json"
	"strings"
	"encoding/base64"
	"bytes"
	"io/ioutil"
	"gopkg.in/gomail.v2"
)

type test_struct struct {
    Test string `json:"image"`
}

func GetImage(rw http.ResponseWriter, req *http.Request, _ httprouter.Params) {

	var img test_struct

	json.NewDecoder(req.Body).Decode(&img)
	
	position := strings.Index(img.Test, ",")

	if position == -1 {
		fmt.Println("no match")
	}

	reader := base64.NewDecoder(base64.StdEncoding, bytes.NewBufferString(img.Test[position+1:]))

	data, err := ioutil.ReadAll(reader)

	if err != nil {

	}
	ioutil.WriteFile("./image.png", data, 0644)
	sendImage()


}

func sendImage() {
	mail := gomail.NewMessage()
	mail.SetHeader("From", "ebolboa@gmail.com")
	mail.SetHeader("To", "ebolboa@gmail.com")
	mail.SetHeader("Subject", "works!")
	mail.Attach("./image.png")

	send := gomail.NewDialer("smtp.gmail.com", 587, "ebolboa@gmail.com", "XXXXXXX")
	if err := send.DialAndSend(mail); err != nil {
		panic(err)
	}
}

func main() {

	router := httprouter.New()
	router.POST("/", GetImage)

	

	log.Fatal(http.ListenAndServe(":8080", router))
}
