import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
	const [{}, dispatch] = useStateValue();
	const signIn = () => {
		auth.signInWithPopup(provider)
			.then((result) => {
				console.log(result);
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
				});
			})
			.catch((error) => alert(error.message));
	};
	return (
		<div className="login">
			<div className="login__container">
				<img
					className="login__logo"
					src="https://whatsappbrand.com/wp-content/themes/whatsapp-brc/images/WhatsApp_Logo_4.png"
				/>
				<div className="login__text">
					<h1>Sign in to WhatsApp</h1>
				</div>
				<button
					className="login__submit--btn"
					type="submit"
					onClick={signIn}
				>
					Sign In with Google
				</button>
			</div>
		</div>
	);
}

export default Login;
