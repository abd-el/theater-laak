import React, { useEffect } from "react";
import './SignupForm.css';
import { backendApi } from "../api";
import { useRef } from 'react';
import { useState } from "react";
import axios from "axios";
import { findRepeatedPattern } from "./vindPatronen";


async function passwordCheck(wachtwoord) {
	
	const resp = await backendApi.post('/api/account/WachtwoordCheck', {
		wachtwoord
	});

	const responseMsg = resp.data;
	const statusCode = resp.status;

	if (statusCode == 400) {
		if(responseMsg == 'bevatWoord'){
			return "uw wachtwoord mag geen woorden bevatten"
		}
		if(responseMsg == 'PwOnveilig'){
			return "dit wachtwoord is op het internet gevonden"
		}
	}
	return null;
}

async function userNameCheck(userName) {
	const resp = await backendApi.post('/api/account/UserNameCheck', {
		userName
	});
	const responseMsg = resp.data;
	const statusCode = resp.status;

	if (statusCode == 400) {
		return responseMsg == 'userNameBestaat' ? "het opgegeven gebruikersnaam bestaat al" : null
	}

	return null;
}

export function SignupForm() {

	const voornaam = useRef('');
	const gebruikersnaam = useRef('');
	const achternaam = useRef('');
	const email = useRef('');
	const wachtwoord = useRef('');
	const telefoonnummer = useRef('');

	const naamError = useRef('');
	const achterError = useRef('');
	const gebruikerError = useRef('');
	const mailError = useRef('');
	const wwError = useRef('');
	const telError = useRef('');

	const [state, setState] = useState([
		[voornaam, naamError],
		[achternaam, achterError],
		[gebruikersnaam, gebruikerError],
		[email, mailError],
		[wachtwoord, wwError],
		[telefoonnummer, telError]
	]);

	useEffect(() => {

		let errors = false;

		for (const item of state) {
			if (item[1].current.value != '✔️') {
				errors = true;
				break;
			}
		}

		if (errors) return;

		const form = document.getElementById('registration');
		const formData = new FormData(form);
		formData.append('Tickets', []);
		formData.append('Donaties', []);
		formData.append('Emailvoorkeur', 'geen'); //formcontrol voor maken

		for (let [key, value] of formData.entries()) {
			console.log(key, value);
		}

		const makePostRequest = async () => {
			const resp = await backendApi.postForm('/api/account/RegistreerKlant', formData);
			console.log(resp);
		}

		makePostRequest();

	}, [state]);

	const onlyLetters = (name) => {
		return /^[a-zA-Z]+$/.test(name);
	}

	const oneUppercase = (str) => {
		return /[A-Z]/.test(str);
	}

	const oneLowerCase = (str) => {
		return /[a-z]/.test(str);
	}

	const oneDigit = (str) => {
		return /\d/.test(str);
	}

	const onlyLettersAndNumbers = (str) => {
		return /^[A-Za-z0-9]*$/.test(str);
	}

	// const containsSpaces = (str) => {
	// 	return /^(?!.* )$/.test(str);
	// }

	const isEmail = (email) => {
		return /\S+@\S+\.\S+/.test(email);
	}

	const isPhoneNumber = (phoneNumber) => {
		return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(phoneNumber);
	}


	const validate = async (item) => {
		const inputname = item[0].current.name;
		const input = item[0];
		let error = item[1];

		if ((input.current.value == '' || input.current.value == null) && inputname != 'PhoneNumber') {
			error.current.value = 'Dit veld is verplicht om in te vullen';
			return item;
		}
		else {
			error.current.value = '✔️';
		}

		if (inputname == 'Voornaam') {
			if (input.current.value.length == 1) {
				error.current.value = 'voornaam mag niet minder dan 2 letters bevatten'
			}
			if (onlyLetters(input.current.value) == false) {
				error.current.value = 'voornaam mag alleen letters bevatten'
			}
			return item;
		}

		if (inputname == 'Achternaam') {
			if (state[0][0].current.value == input.current.value) {
				error.current.value = 'achternaam komt overeen met voornaam'
			}
			if (onlyLetters(input.current.value) == false) {
				error.current.value = 'achternaam mag alleen letters bevatten'
			}
			return item;
		}

		if (inputname == 'userName') {
			if (input.current.value.length < 6) {
				error.current.value = 'de minimale toegestane lengte is 6 karakters'
			}
			if (input.current.value.length > 20) {
				error.current.value = 'de maximale toegestane lengte is 20 karakters'
			}
			if (onlyLettersAndNumbers(input.current.value) == false) {
				error.current.value = 'tekens zoals: !@#$%^& zijn niet toegestaan'
			}

			const Msg = await userNameCheck(input.current.value);
			if (Msg != null) {
				error.current.value = Msg;
			}

			return item;
		}

		if (inputname == 'Email') {
			if (input.current.value.length < 6) {
				error.current.value = 'de minimale toegestane lengte is 6 karakters'
			}
			if (input.current.value.length > 254) {
				error.current.value = 'de maximale toegestane lengte is 254 karakters'
			}
			if (isEmail(input.current.value) == false) {
				error.current.value = 'dit is geen geldige email adres, voorbeeld van een geldige email adres: <naam>@<domain>.<nl/com>'
			}
			return item;
		}

		if (inputname == 'Password') {


			if (input.current.value.length < 7) {
				error.current.value = 'uw wachtwoord mag niet minder dan 7 karakters bevatten'
			}
			if (input.current.value.length > 30) {
				error.current.value = 'uw wachtwoord mag niet meer dan 30 karakters bevatten'
			}
			if (oneDigit(input.current.value) == false) {
				error.current.value = 'uw wachtwoord moet minstens een cijfer bevatten'
			}
			if (oneUppercase(input.current.value) == false) {
				error.current.value = 'uw wachtwoord moet minstens een hoofdletter bevatten'
			}
			if (oneLowerCase(input.current.value) == false) {
				error.current.value = 'uw wachtwoord moet minstens een kleine letter bevatten'
			}
			if (findRepeatedPattern(input.current.value)) {
				error.current.value = 'uw wachtwoord mag geen herhalende patronen bevatten';
			}
			// if (containsSpaces(input.current.value)) {
			// 	error.current.value = 'uw wachtwoord mag geen spaties bevatten';
			// }
			if (onlyLettersAndNumbers(input.current.value)) {
				error.current.value = 'uw wachtwoord moet tenminste een van de volgende karakters bevatten: !@#$%^&'
			}
			if (state[2][0].current.value == input.current.value) {
				error.current.value = 'uw wachtwoord mag niet overeenkomen met uw gebruikersnaam'
			}
			
			const Msg = await passwordCheck(input.current.value);
			if(Msg != null){
				error.current.value = Msg;
			}
			
			return item;
		}

		if (inputname == 'PhoneNumber' && input.current.value != '') {
			if (input.current.value.length < 12) {
				error.current.value = 'Uw telefoonnummer mag niet minder dan 10 cijfers bevatten'
			}
			if (input.current.value.length > 12) {
				error.current.value = 'Uw telefoonnummer mag niet meer dan 12 cijfers bevatten'
			}
			if (isPhoneNumber(input.current.value) == false) {
				error.current.value = 'dit is geen geldige tel nr, voorbeeld van een tel nr: +316XXXXXX'
			}
			return item;
		}

		return item;
	}

	const HandleSubmit = async (e) => {
		e.preventDefault();
		const arr = await Promise.all(state.map(validate));
		setState(arr);

	}

	const toggleArtiest = null;

	return (
		<div className="signup-container">
			<div className="container-fluid bg">
				<div className="container">
					<div className="row">
						<div className="col-md-7 ">
							<div className="row">
								<div className="col-sm-3 col-md-2 col-lg-2">
									<i className="lni lni-enter" aria-hidden="true"></i>
								</div>

								<div className="col-sm-9 col-md-10 col-lg-10">
									<h1 className="heading">Lorem Ipsum</h1>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
								</div>
							</div>

							<div className="row">
								<div className="col-sm-3 col-md-2 col-lg-2">
									<i className="lni lni-user" aria-hidden="true"></i>
								</div>

								<div className="col-sm-9 col-md-10 col-lg-10">
									<h1 className="heading">Lorem Ipsum</h1>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
								</div>
							</div>

							<div className="row">
								<div className="col-sm-3 col-md-2 col-lg-2">
									<i className="lni lni-cloud-upload" aria-hidden="true"></i>
								</div>

								<div className="col-sm-9 col-md-10 col-lg-10">
									<h1 className="heading">Lorem Ipsum</h1>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
								</div>
							</div>

						</div>

						<div className="col-md-4 mt-4\3">
							<div className="card regform bg-dark">
								<div className="card-body regform">
									<div className="myform form ">
										<div className="logo mb-3">
											<div className="col-md-12 text-center">
												<h1 className="sign text-white">Registreer</h1>
											</div>
										</div>
										<form onSubmit={HandleSubmit} name="registration" id="registration">
											<div className="form-group">
												<label htmlFor="exampleInputEmail1">Voornaam*</label>
												<input ref={voornaam} type="text" name="Voornaam" className="form-control" id="firstname" aria-describedby="voornaam" placeholder="Voornaam" />
												<label ref={naamError} className="text-danger">{state[0][1].current.value}</label>
											</div>
											<div className="form-group">
												<label htmlFor="exampleInputEmail1">Achternaam*</label>
												<input ref={achternaam} type="text" name="Achternaam" className="form-control" id="lastname" aria-describedby="achternaam" placeholder="Achternaam" />
												<label ref={achterError} className="text-danger">{state[1][1].current.value}</label>
											</div>
											<div className="form-group">
												<label htmlFor="exampleInputEmail1">Gebruikersnaam*</label>
												<input ref={gebruikersnaam} type="text" name="userName" id="username" className="form-control" aria-describedby="gebruikersnaam" placeholder="Gebruikersnaam" />
												<label ref={gebruikerError} className="text-danger">{state[2][1].current.value}</label>
											</div>
											<div className="form-group">
												<label htmlFor="exampleInputEmail1">Email*</label>
												<input ref={email} type="email" name="Email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" />
												<label ref={mailError} className="text-danger">{state[3][1].current.value}</label>
											</div>
											<div className="form-group">
												<label htmlFor="exampleInputEmail1">Wachtwoord*</label>
												<input ref={wachtwoord} type="password" name="Password" id="password" className="form-control" aria-describedby="wachtwoord" placeholder="Wachtwoord" />
												<label ref={wwError} className="text-danger">{state[4][1].current.value}</label>
											</div>
											<div className="form-group">
												<label htmlFor="exampleInputEmail1">Telefoonnummer</label>
												<input ref={telefoonnummer} type='tel' name="PhoneNumber" id="phonenumber" className="form-control" aria-describedby="telefoonnummer" placeholder="Telefoonnummer" />
												<label ref={telError} className="text-danger">{state[5][1].current.value}</label>
											</div>
											<div className="form-check-padding-start mt-2">
												<label className="form-check-label" >ik ga akkoord met de privacy voorwaarden</label>
												<input checked={toggleArtiest} type="checkbox" name="toggleArtiest" id="toggleArtiest" className="form-check-input mx-2" aria-describedby="Artiest" />
											</div>
											<div className="col-md-12 text-center mb-3 mt-3">
												<button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Registreren</button>
											</div>
										</form>
										<div className="col-md-12 ">
											<div className="form-group">
												<p className="text-center text-primary"><a href="/login" id="signin">Heb je al een account?</a></p>
											</div>
										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

}