import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'
import { COOKIE_AUTH_KEY, USER_ROLES } from '@/constants'


export async function middleware( req: NextRequest ) {

    const token = req.cookies.get(COOKIE_AUTH_KEY)
    const { protocol, host } = req.nextUrl 
    
    // ===== ===== ===== API ===== ===== =====
    
    // Protección de la API del Super Admin ( solo usuarios con role de 'super_admin' )
    if (req.nextUrl.pathname.startsWith('/api/super-admin')) {

        if (!token) {            
            return NextResponse.redirect(new URL('/api/unauthorized', req.url))
        }

        try {

            const { payload } = await jose.jwtVerify(String(token.value), new TextEncoder().encode(process.env.JWT_SECRET_SEED))
            if(payload.role !== USER_ROLES.superAdmin){
                return NextResponse.redirect(new URL('/api/unauthorized', req.url))
            }

            return NextResponse.next()

        } catch (error) {
            return NextResponse.redirect(new URL('/api/unauthorized', req.url))
        }
    }

    // Protección de la API del Admin ( solo usuarios con role de 'admin' )
    if (req.nextUrl.pathname.startsWith('/api/admin')) {

        if (!token) {            
            return NextResponse.redirect(new URL('/api/unauthorized', req.url))
        }

        try {

            const { payload } = await jose.jwtVerify(String(token.value), new TextEncoder().encode(process.env.JWT_SECRET_SEED))
            if(payload.role !== USER_ROLES.admin){
                return NextResponse.redirect(new URL('/api/unauthorized', req.url))
            }

            return NextResponse.next()

        } catch (error) {
            return NextResponse.redirect(new URL('/api/unauthorized', req.url))
        }
    }

    // ===== ===== ===== Frontend ===== ===== =====

    // Si el usuario ya esta autenticado, no mostrar las páginas relacionadas con autenticación
    if (
        req.nextUrl.pathname.startsWith('/iniciar-sesion') ||
        req.nextUrl.pathname.startsWith('/crear-cuenta')    ||
        req.nextUrl.pathname.startsWith('/confirmar-cuenta') ||    
        req.nextUrl.pathname.startsWith('/restablecer-contrasena')
    ) {
        if( !token ){
            return NextResponse.next()
        }

        try {
            
            await jose.jwtVerify(String(token.value), new TextEncoder().encode(process.env.JWT_SECRET_SEED))
            return NextResponse.redirect(`${protocol}//${host}/dashboard`)
            
        } catch (error) {
            return NextResponse.next()
        }
    }


    // Protección de las páginas del Super Administrador ( solo usuarios con role de 'super_admin' )
    if( 
        req.nextUrl.pathname.startsWith('/dashboard/usuarios')
    ){

        if( !token ){
            return NextResponse.redirect(`${protocol}//${host}/iniciar-sesion`)
        }
        try {
            const { payload } = await jose.jwtVerify(String(token.value), new TextEncoder().encode(process.env.JWT_SECRET_SEED))
            if(payload.role !== USER_ROLES.superAdmin){
                return NextResponse.redirect(`${protocol}//${host}/dashboard`)
            } 
            
            return NextResponse.next()

        } catch (error) {
            return NextResponse.redirect(`${protocol}//${host}/iniciar-sesion`)  
        }
    }
    
    // Protección de las páginas del Administrador ( solo usuarios con role de 'admin' )
    if( 
        req.nextUrl.pathname.startsWith('/dashboard/cupones') ||
        req.nextUrl.pathname.startsWith('/dashboard/productos') ||
        req.nextUrl.pathname.startsWith('/dashboard/ajustes') ||
        req.nextUrl.pathname.startsWith('/dashboard/usuarios')
    ){

        if( !token ){
            return NextResponse.redirect(`${protocol}//${host}/iniciar-sesion`)
        }
        try {
            const { payload } = await jose.jwtVerify(String(token.value), new TextEncoder().encode(process.env.JWT_SECRET_SEED))
            if(payload.role !== USER_ROLES.admin){
                return NextResponse.redirect(`${protocol}//${host}/dashboard`)
            } 
            
            return NextResponse.next()

        } catch (error) {
            return NextResponse.redirect(`${protocol}//${host}/iniciar-sesion`)  
        }
    }
    

    // Protección de la ruta del /dashboard (Solo usuarios autenticados)
    if( req.nextUrl.pathname.startsWith('/dashboard') ){

        if( !token ){
            return NextResponse.redirect(`${protocol}//${host}/iniciar-sesion`)
        }
        
        try {
            const { payload } = await jose.jwtVerify(String(token.value), new TextEncoder().encode(process.env.JWT_SECRET_SEED))
            if(
                payload.role !== USER_ROLES.admin &&
                payload.role !== USER_ROLES.superAdmin
            ){
                return NextResponse.redirect(`${protocol}//${host}/dashboard/perfil`)
            } 
            
            return NextResponse.next()

        } catch (error) {
            return NextResponse.redirect(`${protocol}//${host}/iniciar-sesion`)
        }
    }

}

export const config = {
    matcher: [
        // pages - admin
        '/dashboard/:path*',
        '/dashboard/cupones/:path*',
        '/dashboard/productos/:path*',
        '/dashboard/ajustes/:path*',

        // pages - super_admin
        '/dashboard/usuarios/:path*',
        
        //  Auth page routes 
        '/crear-cuenta',
        '/iniciar-sesion',
        '/confirmar-cuenta/:path*',
        '/restablecer-contrasena/:path*',
        
        // Api
        '/api/admin/:path*',
        '/api/shared/:path*',
        '/api/super-admin/:path*',
    ]
}