import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@radix-ui/themes/styles.css";
import { Container, Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';
import Layout from './Layout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class">
      <Theme accentColor="purple" grayColor="mauve" radius="full" scaling="110%">
        <Container size="1">
            <Layout />
        </Container>
      </Theme>
    </ThemeProvider>
  </StrictMode>,
)
