import { Resend } from 'resend'
import { PRIMARY_COLOR } from '@/constants'


interface SignInParams {
    email:string
    name:string
    token:string
}
export const signIn = async({ email, name, token }:SignInParams) => {
    
    const resend = new Resend(process.env.RESEND_API_KEY)

      const { data, error } = await resend.emails.send({
        from: 'Yolostyle <onboarding@resend.dev>',
        to: [ email ],
        subject: 'Confirma tu cuenta de Yolostyle.mx',
        html: `<body style="font-family: Arial, sans-serif; background-color: #f1f1f1; margin-top: 20px; padding: 0;">
            <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <tr>
                    <td style="padding: 30px; text-align: center;">
                        <img src="https://res.cloudinary.com/ton/image/upload/v1706423391/yolostyle/oy59cb6k6i25aizyobju.png" alt="Yolostyle Logo" style="max-width: 150px;">
                        <h2 style="color: #0F172A; margin-top: 20px;">¡Bienvenida/o a Yolostyle.mx!</h2>
                        <p style="color: #333; font-size: 16px; margin-top: 20px; line-height: 1.6;">
                            Hola, ${ name }! Gracias por registrarte en la tienda de Yolostyle. Para comenzar a realizar tus compras,
                            necesitamos confirmar tu cuenta. Por favor, haz clic en el botón de abajo para activarla:
                        </p>
                        <a href="${ process.env.NEXT_PUBLIC_BASE_URL }/confirmar-cuenta/${ token }" style="display: inline-block; background-color: ${ PRIMARY_COLOR }; color: #ffffff; text-decoration: none; font-size: 16px; padding: 12px 24px; border-radius: 5px; margin-top: 30px;">
                            Confirmar Cuenta
                        </a>
                        <p style="color: #666; font-size: 14px; margin-top: 30px;">Si tienes algún problema con el botón, copia y pega el siguiente enlace en tu navegador:</p>
                        <p style="color: #007BFF; font-size: 14px; word-wrap: break-word;">
                            ${ process.env.NEXT_PUBLIC_BASE_URL }/confirmar-cuenta/${ token }
                        </p>
                        <p style="color: #333; font-size: 16px; margin-top: 30px;">Si tu no creaste esta cuenta, puedes simplemente ignorar este mensaje.</p>
                        <p style="color: #333; font-size: 16px; margin-top: 30px;">¡Esperamos que disfrutes de la experiencia yolostyle.mx!</p>
                        <p style="color: ${ PRIMARY_COLOR }; font-size: 16px;">Encuentra tu estilo con Yolostyle</p>
                    </td>
                </tr>
            </table>
        </body>`,
      })
    
      if (error) {
        return console.error({ error })
      }

      console.log({ data })
}



interface ResetPasswordParams {
    email:string
    name:string
    token:string
}
export const resetPassword = async({ email, name, token }:ResetPasswordParams) => {
    
    const resend = new Resend(process.env.RESEND_API_KEY)

      const { data, error } = await resend.emails.send({
        from: 'Yolostyle <onboarding@resend.dev>',
        to: [ email ],
        subject: 'Recupera tu Contraseña de Yolostyle',
        html: `<body style="font-family: Arial, sans-serif; background-color: #f1f1f1; margin-top: 20px; padding: 0;">
            <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <tr>
                    <td style="padding: 30px; text-align: center;">
                        <img src="https://res.cloudinary.com/ton/image/upload/v1706423391/yolostyle/oy59cb6k6i25aizyobju.png" alt="Yolostyle Logo" style="max-width: 150px;">
                        <h2 style="color: #0F172A; margin-top: 20px;">Recupera tu Contraseña!</h2>
                        <p style="color: #333; font-size: 16px; margin-top: 20px; line-height: 1.6;">
                            Hola, ${ name }! ¿Olvidaste tu contraseña de Yolostyle? ¡No te preocupes! Haz clic en el botón de abajo para restablecer tu contraseña:
                        </p>
                        <a href="${ process.env.NEXT_PUBLIC_BASE_URL }/restablecer-contrasena/${ token }" style="display: inline-block; background-color: ${ PRIMARY_COLOR }; color: #ffffff; text-decoration: none; font-size: 16px; padding: 12px 24px; border-radius: 5px; margin-top: 30px;">
                            Restablecer Contraseña
                        </a>
                        <p style="color: #666; font-size: 14px; margin-top: 30px;">Si tienes algún problema con el botón, copia y pega el siguiente enlace en tu navegador:</p>
                        <p style="color: #007BFF; font-size: 14px; word-wrap: break-word;">
                            ${ process.env.NEXT_PUBLIC_BASE_URL }/restablecer-contrasena/${ token }
                        </p>
                        <p style="color: #333; font-size: 16px; margin-top: 30px;">Si tú no solicitaste restablecer tu contraseña, puedes simplemente ignorar este mensaje. Tu cuenta esta segura y este enlace expira en 24 horas.</p>
                        <p style="color: #333; font-size: 16px; margin-top: 30px;">¡Esperamos que continúes disfrutando de la experiencia yolostyle.mx!</p>
                        <p style="color: ${ PRIMARY_COLOR }; font-size: 16px;">Encuentra tu estilo con Yolostyle</p>
                    </td>
                </tr>
            </table>
        </body>`,
      })
    
      if (error) {
        return console.error({ error })
      }

      console.log({ data })
}




