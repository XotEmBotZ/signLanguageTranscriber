'use client'
import React from 'react'
import { AppShell, NavLink, Badge, Flex, Title, Text, Card, Image, Group, List } from '@mantine/core'
import Link from 'next/link'

const Home = () => {
    return (
        <>
            <AppShell.Navbar p={'md'}>
                <h1>Explore Our Services</h1>
                <NavLink
                    href="/detect"
                    label="Start detecting sign language"
                    description="Use or pre-trained model or try your custom model"
                    component={Link}
                    leftSection={
                        <Badge size="xs" variant="filled" color="red" w={16} h={16} p={0}>
                            1
                        </Badge>
                    }
                />
                <h1>Create Your Own Model</h1>
                <NavLink
                    href="/train/data-collection"
                    label="Collect your own data"
                    description="Collect data by yourself to train your own custom model"
                    component={Link}
                    leftSection={
                        <Badge size="xs" variant="filled" color="red" w={16} h={16} p={0}>
                            1
                        </Badge>
                    }
                />
                <NavLink
                    href="/train/model-train"
                    label="Train your own model"
                    description="Train your own model on your collected data and start using it"
                    component={Link}
                    leftSection={
                        <Badge size="xs" variant="filled" color="red" w={16} h={16} p={0}>
                            2
                        </Badge>
                    }
                />
            </AppShell.Navbar>
            <Flex
                gap="md"
                justify="center"
                align="flex-start"
                direction="column"
                wrap="wrap"
            >
                <Title order={1} size={'xxx-large'}>GestureCom: Bridging the communication gap</Title>
                <Title order={1} size={'xx-large'}>Explore your world of sign with us!</Title>
                <Text>GestureCom is a privacy first, offline capable sign language transcriber. <br />It comes with a pre-build model to get started and also offers the user, the ability to train their own model <br />All the data is processed on the device and it never leaves the device.</Text>
                <Text>Enjoy the privacy focussed, offline (partial) experience on your own by checking the following features</Text>
                <Flex>
                    <NavLink
                        href="/detect"
                        label="Start detecting sign language"
                        description="Use or pre-trained model or try your custom model"
                        component={Link}
                        leftSection={
                            <Badge size="xs" variant="filled" color="red" w={16} h={16} p={0}>
                                1
                            </Badge>
                        }
                    />
                    <NavLink
                        href="/train"
                        label="Start training your custom model"
                        description="Collect and train your own custom model."
                        component={Link}
                        leftSection={
                            <Badge size="xs" variant="filled" color="red" w={16} h={16} p={0}>
                                2
                            </Badge>
                        }
                    />
                </Flex>
                <Title order={2}>Default Model:</Title>
                <Text>The default model can recognise 7 general signs. <br />The gestues that are recognised by the default model is:</Text>
                <List>
                    <List.Item>yes</List.Item>
                    <List.Item>no</List.Item>
                    <List.Item>hello</List.Item>
                    <List.Item>peace</List.Item>
                    <List.Item>i love you</List.Item>
                    <List.Item>thank you</List.Item>
                    <List.Item>please</List.Item>
                </List>
                <Flex align={'flex-start'} justify={'center'} gap={'md'} wrap={'wrap'}>
                    <Flex direction={'column'}>
                        <Title order={2}>Check it out by yourself here:</Title>
                        <Image radius={'md'} src={'media/qrcode.svg'} w={'min(20rem,100svw)'} />
                    </Flex>
                    <Flex direction={'column'}>
                        <Title order={2}>Use cases:</Title>
                        <List>
                            <List.Item>Facilitate communication with differently abled people on the fly.</List.Item>
                            <List.Item>Used as a communication between children and elders.</List.Item>
                            <List.Item>Used in a public place to facilitate the communication between common people and differently abled people.</List.Item>
                            <List.Item>Used by emergency services to understand the situation of a differently abled person.</List.Item>
                            <List.Item>Many more...</List.Item>
                        </List>
                    </Flex>
                </Flex>
                <Title order={2}>Technologies used:</Title>
                <Flex
                    gap="md"
                    justify="center"
                    align="flex-start"
                    direction="row"
                    wrap="wrap">
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="media/tensorflowLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>Tensorlfow (Python)</Text>
                            <Badge color="pink">Machine Learning</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Used tensorflow-python to learn and train the initial 2 models
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="media/tensorflowLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>Tensorlfow (Java Script)</Text>
                            <Badge color="pink">Machine Learning</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Used tensorflow-js to facilitate the training and running of both pre-built and custom model right in your device
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="media/mediapipeLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>Mediapipe (Web)</Text>
                            <Badge color="pink">Landmark Detection</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Used mediapie to detect both pose and handlandmark. Thiseliminates the requirement to store or process personally identifiable information by converting the images to points in the space.
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="media/htmlLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>HTML</Text>
                            <Badge color="pink">Web</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Used to make the skeleton of the site.
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="media/jsLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>Javascript</Text>
                            <Badge color="pink">Web</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Javascript is used to run and handle the used interaction in the web. This also facilitate the intervace with webGl.
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="media/cssLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>CSS</Text>
                            <Badge color="pink">Web</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Css is used to style the site and make it look prety
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="media/webglLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>WebGl</Text>
                            <Badge color="pink">Web|Computing</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            WebGl is used to run the models in the machine directly. This eliminates the slow VM of JS and can handle large datasets with ease
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="media/gitLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>Git</Text>
                            <Badge color="pink">Version Control</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Git is used to manage the different code versions and allowed to easily find and rectify the mistakes. It also acted as backup to safeguare the source code.
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="media/pythonLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>Python</Text>
                            <Badge color="pink">Computing</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Python is used to explore the initial idea and train the first few models.
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="media/nextjsLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>NextJS</Text>
                            <Badge color="pink">Web</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            NextJS is used to streamline the developed experience and facilitate faster iteration
                        </Text>
                    </Card>
                    <Card shadow="sm" padding="lg" radius="md" withBorder w={'min-content'}>
                        <Card.Section p={'md'}>
                            <Image
                                src="media/githubLogo.svg"
                                height={'auto'}
                                alt="Norway"
                                w={'16rem'}
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>Github</Text>
                            <Badge color="pink">Version Control|Publishing</Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                            Github is used as remote code storace and as a hosting platform
                        </Text>
                    </Card>
                </Flex>
                <Text>Want to see the source code? See <a href="https://github.com/XotEmBotZ/singLanguageTranscriber">here</a></Text>
                <Flex
                    align={'flex-start'}
                    justify={'center'}
                    wrap={'wrap'}>
                    <Image
                        src={'flowChart.svg'}
                        alt='flowChartDetection'
                    />
                    <Image
                        src={'modelTrainFlowChart.svg'}
                        alt='flowChartModelTraining'
                    />
                </Flex>
                <Title order={2}>Future Plans:</Title>
                <List>
                    <List.Item>Make the whole site totaily offline to facilitate the use in the absence of internet</List.Item>
                    <List.Item>Convert the site to PWA for getter accessiblity</List.Item>
                    <List.Item>Add notification support to send notification upon recognising a particular sign</List.Item>
                    <List.Item>Expand the default model to recognise more general symbols</List.Item>
                </List>
            </Flex>
        </>
    )
}

export default Home