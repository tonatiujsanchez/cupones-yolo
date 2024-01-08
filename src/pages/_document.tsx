import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {


    return (
        <Html lang="es">
            <Head>
                <link rel="icon" href="/favicon-yolostyle.png" />
            </Head>
            <body className="custom-scroll">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
