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
	"regexp"
)

type test_struct struct {
    Test string `json:"image"`
}

//structure for saveing user email and password
type credentials struct {
    Email string `json:"email"`
    Password string `json:"password"`
}

//initialize structure for credentials globally
var creds credentials
//initialize email type globally
var smtp string

/*------------------------VALIDATE USER CREDENTIALS-------------------------------*/
func Validate(rw http.ResponseWriter, req *http.Request, _ httprouter.Params) {

	//decode request body from JSON format
	decoder := json.NewDecoder(req.Body)  
    //save req.Body in credential structure
    err := decoder.Decode(&creds)
    //check if credentials were saved correctly
    if err != nil {
        panic(err)
    }

    //regex to extract email type from user email
    re := regexp.MustCompile("@(.*)\\.")
    smtp = re.FindAllString(creds.Email, 1)[0]
    smtp = smtp[1:len(smtp)-1]

    //send an email message to user email using credentials
    mail := gomail.NewMessage()
	mail.SetHeader("From", "ebolboa@gmail.com")
	mail.SetHeader("To", creds.Email)
	mail.SetHeader("Subject", "Got You Chrome Extension")
	mail.SetBody("text/html", "Thank You for using Got You Chrome Extension")

    send := gomail.NewDialer("smtp."+smtp+".com", 587, creds.Email, creds.Password)
    //if not sent, send error (this will be read on the front end)
	if err := send.DialAndSend(mail); err != nil {
		panic(err)
	}

	//encode success message to JSON format
	encoded, err := json.Marshal("success")
	//send success message to the front end
	emailSend, errSend := rw.Write(encoded)
	//if not encoded, throw error (this will be read on the front end)
	if errSend != nil {
		panic(errSend)
	}

	fmt.Println(emailSend)
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

	//encode success message to JSON format
	encoded, err := json.Marshal("success")
	//send success message to the front end
	emailSend, errSend := rw.Write(encoded)
	//if not encoded, throw error (this will be read on the front end)
	if errSend != nil {
		panic(errSend)
	}

	fmt.Println(emailSend)




}

func sendImage() {
	fmt.Println(creds.Email)
	
	mail := gomail.NewMessage()
	mail.SetHeader("From", "ebolboa@gmail.com")
	mail.SetHeader("To", creds.Email)
	mail.SetHeader("Subject", "works!")
	mail.Attach("./image.png")

	send := gomail.NewDialer("smtp."+smtp+".com", 587, creds.Email, creds.Password)
	if err := send.DialAndSend(mail); err != nil {
		panic(err)
	}
}

func main() {

	router := httprouter.New()
	router.POST("/", GetImage)
	router.POST("/validation", Validate)
	

	log.Fatal(http.ListenAndServe(":8080", router))
}
