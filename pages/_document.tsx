import Document, {DocumentContext} from "next/document";
import {ServerStyleSheet} from "styled-components";
import {error} from "next/dist/build/output/log";

class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try{
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
                })

            const initialProps = await Document.getInitialProps(ctx);

            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            }
        } catch (e) {
            throw error()
        } finally {
            sheet.seal()
        }
    }
}

export default CustomDocument;