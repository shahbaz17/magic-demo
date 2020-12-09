import Head from 'next/head';
import Header from './header';

const Layout = (props) => (
  <>
    <Head>
      <title>Magic</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <Header />

    <main>
      <div className='container'>{props.children}</div>
    </main>

    <footer>
      <ul>
        <li>View on Github</li>
        <li>Magic site</li>
        <li>Documentation</li>
        <li>Whitepaper</li>
      </ul>
      <div className='powered-by'>
        Powered by <img src='/magic.png' alt='Magic Logo' className='footer-img' />
      </div>
    </footer>
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
        outline: none;
      }
      body {
        margin: 0;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
          Noto Sans, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
          'Noto Color Emoji';
        background-color: #fff;
      }
      .container {
        max-width: 42rem;
        margin: 0 auto;
        padding: 2rem 1.25rem;
      }
      footer {
        width: 100%;
        height: 80px;
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: center;
        bottom: 0px;
        position: relative;
        clear: both;
        align-items: center;
        margin-top: 50px;
      }
      .powered-by {
        display: flex;
        justify-content: center;
        bottom: 0px;
        position: relative;
        clear: both;
        align-items: center;
      }
      .footer-img {
        height: 32px;
        margin-left: 10px;
      }
    `}</style>
  </>
);

export default Layout;
