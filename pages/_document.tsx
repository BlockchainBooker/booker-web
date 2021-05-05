import { ServerStyleSheets as MaterialUiServerStyleSheets } from "@material-ui/styles";
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from "next/document";
import { ServerStyleSheet as StyledComponentSheets } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const styledComponentSheets = new StyledComponentSheets();
    const materialUiServerStyleSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentSheets.collectStyles(
              materialUiServerStyleSheets.collect(<App {...props} />)
            ),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {styledComponentSheets.getStyleElement()}
            {materialUiServerStyleSheets.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledComponentSheets.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />

          <Main />
          <NextScript />
          <style jsx global>{`
            /* Other global styles such as 'html, body' etc... */

            html {
              height: 100%;
              width: 100%;
            }

            body {
              height: 100%;
              width: 100%;
            }

            #__next {
              height: 100%;
              width: 100%;
            }
          `}</style>
        </body>
      </Html>
    );
  }
}
