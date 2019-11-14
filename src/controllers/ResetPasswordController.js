const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
  host: process.env.STMP_HOST,
  port: process.env.STMP_PORT,
  auth: {
    user: process.env.STMP_USER,
    pass: process.env.STMP_KEY
  }
})


exports.sendHtml = (req, res) => {
  let { mail, user, code } = req.body

  const msgInfo = {
    from: process.env.MAILER_EMAIL,
    to: mail,
    subject: `Solicitud de cambio de contraseña`,
    html: `<H2 align=\"center\"> Hola, </H1><p style=\"font-size:20px\">Se ha solicitado un cambio
    de contraseña de tu cuenta BrainBoost. Para continuar, da
    click en: </p><hr><br><a href=\"http://localhost:4200/reset_password/?user=${user}&code=${code}\" align=\"center\" style=\"color:green;
    background-color:transparent;text-decoration:none;\">CAMBIAR CONTRASEÑA
    </a><br><br><hr><p style=\"font-size:20px\">y proporcina tu nueva contraseña
    . Si no has solicitado cambiar tu contraseña, ignora este correo.</p>`
  }

  transport.sendMail(msgInfo, (err, info) => {
    if (err) {
      res.status(500).send({ message: info })
    } else {
      res.status(200).send({ message: 'Su mensaje ha sido enviado correctamente' })
    }
  })
}