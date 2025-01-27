import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No token Provided",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedData = await jwt.verify(token, "Subhendu");
    req.userId = decodedData?.id;
    next();
  } catch (error) {
    console.error(error);
  }
};

export default auth;
