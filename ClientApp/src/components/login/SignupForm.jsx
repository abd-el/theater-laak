import React from "react";
import './SignupForm.css';
import { useRef } from 'react';
import { useState } from "react";

export function SignupForm() {

	const voornaam = useRef('');
	const gebruikersnaam = useRef('');
	const achternaam = useRef('');
	const email = useRef('');
	const wachtwoord = useRef('');
	const telefoonnummer = useRef('');

	const naamNotice = useRef('');
	const achterNotice = useRef('');
	const gebruikersNotice = useRef('');
	const mailNotice = useRef('');
	const wwNotice = useRef('');
	const telNotice = useRef('');

	const [state, setState] = useState([
		[voornaam, naamNotice],
		[achternaam, achterNotice],
		[gebruikersnaam, gebruikersNotice],
		[email, mailNotice],
		[wachtwoord, wwNotice],
		[telefoonnummer, telNotice]
	]);

	const onlyLetters = (name) => {
		return /[a-zA-Z]/.test(name);
	}

	const onlyLettersAndNumbers = (username) => {
		return /^[A-Za-z0-0]*$/.test(username);
	}

	const isEmail = (email) => {
		return /\S+@\S+\.\S+/.test(email);
	}

	const isPhoneNumber = (phoneNumber) => {
		return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(phoneNumber);
	}

	const myfunction = (test) => {
		const inputname = test[0].current.name;
		const input = test[0];
		let notice = test[1];
		
		if(input.current.value == '' || input.current.value == null){
			notice.current.value = 'Dit veld is verplicht om in te vullen';
			return test;
		}
		else{
			notice.current.value = '';
		}

		if(inputname == 'firstname'){
			if(input.current.value == 1){
				notice.current.value = 'voornaam mag niet minder dan 2 letters bevatten'
			}
			if(onlyLetters(input.current.value) == false){
				notice.current.value = 'voornaam mag alleen letters bevatten'
			}
		}

		if(inputname == 'lastname'){
			if(state[0][0].current.value == input.current.value){
				notice.current.value = 'achternaam mag niet overeenkomen met voornaam'
			}
			if(onlyLetters(input.current.value) == false){
				notice.current.value = 'achternaam mag alleen letters bevatten'
			}
		}

		if(inputname == 'username'){
			if(input.current.value.length < 6){
				notice.current.value = 'de minimale toegestane lengte is 6 karakters'
			}
			if(input.current.value.length > 20){
				notice.current.value = 'de maximale toegestane lengte is 20 karakters'
			}
			if(onlyLettersAndNumbers(input.current.value) == false){
				notice.current.value = 'karakters zoals: !@#$%^& zijn niet toegestaan'
			}
			//if(){} controleren op uniekheid, string vergelijken met username uit db
		}

		if(inputname == 'email'){
			if(input.current.value.length < 6){
				notice.current.value = 'de minimale toegestane lengte is 6 karakters'
			}
			if(input.current.value.length > 254){
				notice.current.value = 'de maximale toegestane lengte is 254 karakters'
			}
			if(isEmail(input.current.value) == false){
				notice.current.value = 'dit is geen geldige email adres, voorbeeld van een geldige email adres: <naam>@<domain>.<nl/com>'
			}
		}

		if(inputname == 'password'){
			if(input.current.value.length < 8){
				notice.current.value = 'uw wachtwoord mag niet minder dan 8 karakters bevatten'
			}
			if(input.current.value.length > 30){
				notice.current.value = 'uw wachtwoord mag niet meer dan 30 karakters bevatten'
			}
			if(onlyLettersAndNumbers(input.current.value)){
				notice.current.value = 'uw wachtwoord moet tenminste een van de volgende karakters bevatten: !@#$%^&'
			}
		}

		if(inputname == 'phonenumber'){
			if(input.current.value < 10){
				notice.current.value = 'uw telefoonnummer mag niet minder dan 10 cijfers bevatten'
			}
			if(input.current.value > 10){
				notice.current.value = 'uw telefoonnummer mag niet meer dan 10 cijfers bevatten'
			}
			if(isPhoneNumber(input.current.value) == false){
				notice.current.value = 'dit is geen geldige tel nr, voorbeeld van een tel nr: +31XXXXXXX'
			}
		}

		return test;
	}

	const ClickHandler = (e) => {
		const newArr = state.map(myfunction);
		setState(newArr);
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
										<form action="#" name="registration" />
										<div className="form-group">
											<label htmlFor="exampleInputEmail1">Voornaam</label>
											<input ref={voornaam} type="text" name="firstname" className="form-control" id="firstname" aria-describedby="emailHelp" placeholder="*Voornaam" />
											<label ref={naamNotice} className="text-danger">{state[0][1].current.value}</label>
										</div>
										<div className="form-group">
											<label htmlFor="exampleInputEmail1">Achternaam</label>
											<input ref={achternaam} type="text" name="lastname" className="form-control" id="lastname" aria-describedby="emailHelp" placeholder="*Achternaam" />
											<label ref={achterNotice} className="text-danger">{state[1][1].current.value}</label>
										</div>
										<div className="form-group">
											<label htmlFor="exampleInputEmail1">Gebruikersnaam</label>
											<input ref={gebruikersnaam} type="text" name="username" id="username" className="form-control" aria-describedby="emailHelp" placeholder="*Gebruikersnaam" />
											<label ref={gebruikersNotice} className="text-danger">{state[2][1].current.value}</label>
										</div>
										<div className="form-group">
											<label htmlFor="exampleInputEmail1">Email</label>
											<input ref={email} type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="*Email" />
											<label ref={mailNotice} className="text-danger">{state[3][1].current.value}</label>
										</div>
										<div className="form-group">
											<label htmlFor="exampleInputEmail1">Wachtwoord</label>
											<input ref={wachtwoord} type="password" name="password" id="password" className="form-control" aria-describedby="emailHelp" placeholder="*Wachtwoord" />
											<label ref={wwNotice} className="text-danger">{state[4][1].current.value}</label>
										</div>
										<div className="form-group">
											<label htmlFor="exampleInputEmail1">Telefoonnummer</label>
											<input ref={telefoonnummer} type='tel' name="phonenumber" id="phonenumber" className="form-control" aria-describedby="emailHelp" placeholder="Telefoonnummer" />
											<label ref={telNotice} className="text-danger">{state[5][1].current.value}</label>
										</div>
										<div className="form-check-padding-start mt-2">
											<label className="form-check-label" >Bent u een artiest?</label>
											<input checked={toggleArtiest} type="checkbox" name="toggleArtiest" id="toggleArtiest" className="form-check-input mx-2" aria-describedby="emailHelp" />
										</div>
										<div className="col-md-12 text-center mb-3 mt-3">
											<button onClick={ClickHandler} type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Registreren</button>
										</div>
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