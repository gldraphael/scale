import "@radix-ui/themes/styles.css";
import './Layout.css'

import { Flex, Text, Heading, Code, Card, Link, Container, Theme, Box } from '@radix-ui/themes'
import { ThemeProvider } from "next-themes"
import GitHubButton from 'react-github-btn'

import Steps from './Steps'

export default function Layout() {

    const GITHUB_URL = "https://github.com/gldraphael/scale"

  return (
    <>
      <ThemeProvider attribute="class">
        <Theme accentColor="purple" grayColor="mauve" radius="large" scaling="110%">
          <Container size="1">
            <Flex direction="column" gap="2" minHeight="100vh">

              <Heading mt="6">
                <Code size={'7'}>scale</Code>
              </Heading>

              <Flex mb="auto" mt="auto" >
                <Card>
                  <Steps  />
                </Card>
              </Flex>

              <Flex className='footer' gap="4" my="4" align="center" >
                  <Text size="1" mr="auto">
                  This project is <Link href={GITHUB_URL}>open source</Link>.<br/>
                  To read about dataset limitations, <Link href="https://github.com/gldraphael/scale/blob/main/dataset/README.md">click here</Link>. 
                  </Text>
                  <Box pt="7px">
                    <GitHubButton 
                        href="https://github.com/gldraphael/scale" 
                        data-color-scheme="no-preference: light; light: light; dark: dark;" 
                        aria-label="Star gldraphael/scale on GitHub">&nbsp;Star</GitHubButton>
                  </Box>
                  
              </Flex>
          
            </Flex>
          </Container>
        </Theme>
    </ThemeProvider>
    </>
  )
}
