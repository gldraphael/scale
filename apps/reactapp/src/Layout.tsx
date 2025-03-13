import './Layout.css'
import { Flex, Button, Text, Heading, Code, Card, Link, Box } from '@radix-ui/themes'
import GitHubButton from 'react-github-btn'

export default function Layout() {

    const GITHUB_URL = "https://github.com/gldraphael/scale"

  return (
    <>
      <Flex direction="column" gap="2" minHeight="100vh">

        <Heading mt="4">
          <Code size={'7'}>scale</Code>
        </Heading>

        <Flex mb="auto" mt="auto" >
          <Card>
            <Flex direction="column" gap="4" p="4">
              <Text>
                <Code>scale</Code> is an experimental classifier designed to predict obesity levels using a range of metrics beyond just height and weight.
              </Text>
              <Text>
                Details about the dataset, model training, and implementation are available <Link href={GITHUB_URL}>here</Link>. 
              </Text>
              <Button>Play</Button>
            </Flex>
          </Card>
        </Flex>

        <Box className="footer" my="4">
            <Flex gap="4" align="center" justify="center">
                <Text size="1">
                This project is <Link href={GITHUB_URL}>open source on GitHub</Link>. 
                </Text>
                <GitHubButton href="https://github.com/gldraphael/scale" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" aria-label="Star gldraphael/scale on GitHub">&nbsp;Star</GitHubButton>
            </Flex>
            
        </Box>
        
      </Flex>
    </>
  )
}
