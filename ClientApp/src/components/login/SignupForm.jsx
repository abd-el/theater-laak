import React from "react";
import './SignupForm.css';

export function SignupForm() {

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

						<div className="col-md-4 mt-4">
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
											<input type="text" name="firstname" className="form-control" id="firstname" aria-describedby="emailHelp" placeholder="Voornaam*" />
										</div>
										<div className="form-group">
											<label htmlFor="exampleInputEmail1">Achternaam</label>
											<input type="text" name="lastname" className="form-control" id="lastname" aria-describedby="emailHelp" placeholder="Achternaam*" />
										</div>
										<div className="form-group">
											<label htmlFor="exampleInputEmail1">Gebruikersnaam</label>
											<input type="text" name="username" id="username" className="form-control" aria-describedby="emailHelp" placeholder="Gebruikersnaam*" />
										</div>
										<div className="form-group">
											<label htmlFor="exampleInputEmail1">Email</label>
											<input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email*" />
										</div>
										<div className="form-group">
											<label htmlFor="exampleInputEmail1">Wachtwoord</label>
											<input type="password" name="password" id="password" className="form-control" aria-describedby="emailHelp" placeholder="Wachtwoord*" />
										</div>
										<div className="form-group">
											<label htmlFor="exampleInputEmail1">Telefoonnummer</label>
											<input type='tel' name="phonenumber" id="phonenumber" className="form-control" aria-describedby="emailHelp" placeholder="Telefoonnummer" />
										</div>
										<div className="col-md-12 text-center mb-3 mt-3">
											<button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Registreren</button>
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