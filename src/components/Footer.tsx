import { Divider, Flex, VStack, Link } from '@chakra-ui/react';
import { useGlobalContext } from 'components/Context';

const Footer = () => {
    const { isMobile } = useGlobalContext();

    if (isMobile) {
        return <></>;
    }

    return (
        <VStack mt={'600px'}>
            <Divider h={"2px"} w={'800px'} />
            <Flex w={'800px'} alignItems={'center'} justifyContent={'space-around'} padding={'20px 25px 20px 25px'}>
                <Link href="https://ton-staking-web.vercel.app/" isExternal>
                    {'Ton Staking'}
                </Link>
                <Link href="https://github.com/GrandF17/" isExternal>
                    {'GitHub'}
                </Link>
                <Link href="https://ai-dex-ebon.vercel.app/swap" isExternal>
                    {'AiDEX website'}
                </Link>
            </Flex>
        </VStack>

    );
};

export default Footer;