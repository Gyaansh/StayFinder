import jwt from "jsonwebtoken";
export default function getUsername(req, res) {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).send({ success: false, message: "No token" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  res.status(200).send({
    success: true,
    data: decoded,
  });
}
