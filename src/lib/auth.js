export async function verifyCredentials(user) {
  const response = await fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: user.email,
      password: user.password,
    }),
  }).catch((err) => {
    console.log(err);
  });
  return await response.json();
}

//.then((data) => data.valid); //valid va a ser true o false
