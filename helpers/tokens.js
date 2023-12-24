import jwt from "jsonwebtoken";

const generarJWT = (datos) => jwt.sign({ user_id : datos.id, user_handle: datos.nombre }, process.env.JWT_SECRET, {expiresIn: "1d",});

const generarId = () =>
  "aea" + Date.now().toString(32) + Math.random().toString(32).substring(2);

export { generarId, generarJWT };