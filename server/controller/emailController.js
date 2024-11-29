import Proyecto from "../models/Proyect.model.js";
import transporter from "../service/emailService.js";

export const applyForProject = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID del proyecto recibido:", id);

    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: "ID de proyecto no válido" });
    }

    const { email, name, message } = req.body;

    if (!email || !name || !message) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    const project = await Proyecto.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    const creatorEmail = project.email;

    if (!creatorEmail) {
      return res
        .status(400)
        .json({ message: "Correo del creador del proyecto no disponible" });
    }

    // Configuración del correo
    const mailOptions = {
      from: email, // Correo del desarrollador que postula
      to: creatorEmail, // Correo del creador del proyecto
      subject: `Nuevo mensaje de un desarrollador sobre tu proyecto: ${project.nombre}`,
      html: `
       <div
  style="
    font-family: 'Open Sans', Arial, sans-serif;
    color: #1b4956;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  "
>
  <header
    style="
      background-color: #81b4af;
      padding: 20px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    "
  >
    <h1
      style="
        color: #ff7d27;
        font-family: 'Montserrat', sans-serif;
        font-size: 40px;
        font-weight: bold;
        display: inline-block;
        position: relative;
      "
    >
      InspoIt
    </h1>
    <h2
      style="
        color: #1b4956;
        margin: 0;
        font-family: 'Montserrat', sans-serif;
        margin-top: -10px;
      "
    > ¡Tienes un nuevo mensaje!
    </h2>
  </header>
  <main
    style="padding: 20px; background-color: white; border-radius: 0 0 8px 8px"
  >
    <p style="font-size: 16px; line-height: 1.5; margin: 0 0 15px">
      Un desarrollador está interesado en uno de tus proyectos. Aquí tienes los
      detalles:
    </p>
    <div
      style="
        background-color: #f3f3f3;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 14px;
      "
    >
      <p style="margin: 0">
        <strong>Proyecto:</strong>
        <span style="color: #1b4956">${project.nombre}</span>
      </p>
      <p style="margin: 5px 0 0">
        <strong>Descripción:</strong> ${project.descripcion}
      </p>
    </div>

    <div
      style="
        background-color: #fff7e6;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-size: 14px;
      "
    >
      <p style="margin: 0">
        <strong>Nombre del desarrollador:</strong> ${name}
      </p>
      <p style="margin: 5px 0">
        <strong>Correo:</strong>
        <a
          href="mailto:{{developerEmail}}"
          style="color: #bac0b9; text-decoration: underline"
          >${email}</a
        >
      </p>
      <p style="margin: 0"><strong>Mensaje recibido:</strong></p>
      <p style="margin: 10px 0 0; font-style: italic">${message}</p>
    </div>
    <div style="text-align: center; margin: 20px 0">
      <a
        href="http://localhost:3000/detail/${id}"
        target="_blank"
        style="
          background-color: #de7a38;
          color: white;
          padding: 12px 20px;
          text-decoration: none;
          font-size: 16px;
          font-family: 'Montserrat', sans-serif;
          border-radius: 5px;
        "
      >
        Ver Proyecto
      </a>
    </div>
    <p style="margin: 0; text-align: center; font-size: 12px">
      Gracias por usar <strong>InspoIt</strong>. ¡Sigue conectando ideas y
      talento!
    </p>
  </main>
  <footer
    style="
      background-color: #81b4af;
      padding: 15px;
      text-align: center;
      color: #1b4956;
      font-size: 12px;
      font-family: 'Lato', sans-serif;
      border-radius: 0 0 8px 8px;
    "
  >
    <p style="margin: 5px 0 0">
      &copy; 2024 InspoIT. Todos los derechos reservados.
    </p>
  </footer>
</div>

      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    // Responder al cliente
    res
      .status(200)
      .json({ message: "Mensaje enviado al creador del proyecto" });
  } catch (error) {
    console.error("Error enviando el correo:", error);
    res.status(500).json({ message: "Error enviando el correo" });
  }
};
