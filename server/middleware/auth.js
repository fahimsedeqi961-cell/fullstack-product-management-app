export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(404).json({
    success: false,
    message: "Please log in first"
  })
}