import React, { useEffect } from "react";
import './SignupForm.css';
import { api } from "../api";
import { useRef } from 'react';
import { useState } from "react";

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

	useEffect(()=>{
		
		let errors = false;
		
			for (const item of state ) {
				if(item[1].current.value != '✔️') {
					errors = true;
					break;
				}
			}
	
		console.log(errors);
		if(errors) return;
		
		const form = document.getElementById('registration');
		const formData = new FormData(form);
		
		for (let [key, value] of formData.entries()) {
			console.log(key, value);
		}

		const makePostRequest = async () => {
			const resp = await api.postForm('/api/account/RegistreerKlant', formData);
			console.log(resp);
		}
		makePostRequest();
	}, [state]);

	const onlyLetters = (name) => {
		return /^[a-zA-Z]+$/.test(name);
	}

	const onlyLettersAndNumbers = (username) => {
		return /^[A-Za-z0-9]*$/.test(username);
	}

	const containsSpaces = (str) => {
		return /^(?!.* )$/.test(str);
	}

	const isEmail = (email) => {
		return /\S+@\S+\.\S+/.test(email);
	}

	const isPhoneNumber = (phoneNumber) => {
		return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(phoneNumber);
	}

	// const userExists = async (username) => {
	// 	const response = await api.get(
	// 		`/api/account/GetUsername`,
	// 		{ params: { username: username } }
	// 	);
	// 	return response.data == username ? true : false;
	// }

	const validate = (item) => {
		const inputname = item[0].current.name;
		const input = item[0];
		let error = item[1];

		if ((input.current.value == '' || input.current.value == null) && inputname != 'phonenumber') {
			error.current.value = 'Dit veld is verplicht om in te vullen';
			return item;
		}
		else {
			error.current.value = '✔️';
		}

		if (inputname == 'firstname') {
			if (input.current.value.length == 1) {
				error.current.value = 'voornaam mag niet minder dan 2 letters bevatten'
			}
			if (onlyLetters(input.current.value) == false) {
				error.current.value = 'voornaam mag alleen letters bevatten'
			}
			return item;
		} 

		if (inputname == 'lastname') {
			if (state[0][0].current.value == input.current.value) {
				error.current.value = 'achternaam komt overeen met voornaam'
			}
			if (onlyLetters(input.current.value) == false) {
				error.current.value = 'achternaam mag alleen letters bevatten'
			}
			return item;
		} 

		if (inputname == 'username') {
			if (input.current.value.length < 6) {
				error.current.value = 'de minimale toegestane lengte is 6 karakters'
			}
			if (input.current.value.length > 20) {
				error.current.value = 'de maximale toegestane lengte is 20 karakters'
			}
			if (onlyLettersAndNumbers(input.current.value) == false) {
				error.current.value = 'tekens zoals: !@#$%^& zijn niet toegestaan'
			}
			return item;
			// console.log(await userExists(input.current.value));
			// if (userExists(input.current.value) == true) {
			// 	notice.current.value = 'de opgegeven gebruikersnaam bestaat al';
			// 	return test;
			// }
		} 

		if (inputname == 'email') {
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

		if (inputname == 'password') {
			if (input.current.value.length < 8) {
				error.current.value = 'uw wachtwoord mag niet minder dan 8 karakters bevatten'
			}
			if (input.current.value.length > 30) {
				error.current.value = 'uw wachtwoord mag niet meer dan 30 karakters bevatten'
			}
			if (containsSpaces(input.current.value)) {

			}
			if (onlyLettersAndNumbers(input.current.value)) {
				error.current.value = 'uw wachtwoord moet tenminste een van de volgende karakters bevatten: !@#$%^&'
			}
			return item;
		} 

		if (inputname == 'phonenumber' && input.current.value != '') {
			if (input.current.value.length < 10) {
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

	const HandleSubmit = (e) => {
		e.preventDefault();
		const arr = state.map(validate);
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
												<input ref={voornaam} type="text" name="firstname" className="form-control" id="firstname" aria-describedby="voornaam" placeholder="Voornaam" />
												<label ref={naamError} className="text-danger">{state[0][1].current.value}</label>
											</div>
											<div className="form-group">
												<label htmlFor="exampleInputEmail1">Achternaam*</label>
												<input ref={achternaam} type="text" name="lastname" className="form-control" id="lastname" aria-describedby="achternaam" placeholder="Achternaam" />
												<label ref={achterError} className="text-danger">{state[1][1].current.value}</label>
											</div>
											<div className="form-group">
												<label htmlFor="exampleInputEmail1">Gebruikersnaam*</label>
												<input ref={gebruikersnaam} type="text" name="username" id="username" className="form-control" aria-describedby="gebruikersnaam" placeholder="Gebruikersnaam" />
												<label ref={gebruikerError} className="text-danger">{state[2][1].current.value}</label>
											</div>
											<div className="form-group">
												<label htmlFor="exampleInputEmail1">Email*</label>
												<input ref={email} type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" />
												<label ref={mailError} className="text-danger">{state[3][1].current.value}</label>
											</div>
											<div className="form-group">
												<label htmlFor="exampleInputEmail1">Wachtwoord*</label>
												<input ref={wachtwoord} type="password" name="password" id="password" className="form-control" aria-describedby="wachtwoord" placeholder="Wachtwoord" />
												<label ref={wwError} className="text-danger">{state[4][1].current.value}</label>
											</div>
											<div className="form-group">
												<label htmlFor="exampleInputEmail1">Telefoonnummer</label>
												<input ref={telefoonnummer} type='tel' name="phonenumber" id="phonenumber" className="form-control" aria-describedby="telefoonnummer" placeholder="Telefoonnummer" />
												<label ref={telError} className="text-danger">{state[5][1].current.value}</label>
											</div>
											<div className="form-check-padding-start mt-2">
												<label className="form-check-label" >Bent u een artiest?</label>
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